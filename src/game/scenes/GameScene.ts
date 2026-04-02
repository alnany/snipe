import Phaser from 'phaser'
import {
  COINS, BOSS_CONFIG, GAME_CONFIG, pickRandomCoin, randInt,
  type CoinConfig,
} from '../config'
import { useGameStore } from '../../store/gameStore'

interface CoinSprite extends Phaser.GameObjects.Container {
  coinConfig: CoinConfig
  baseY: number
  phaseOffset: number
  swingT: number
  speed: number
}

export class GameScene extends Phaser.Scene {
  private coins: CoinSprite[] = []
  private bossContainer: Phaser.GameObjects.Container | null = null
  private bossHP = 100
  private bossPhase = 0
  private bossVY = 0
  private bossTimer: Phaser.Time.TimerEvent | null = null

  private spawnTimer!: Phaser.Time.TimerEvent
  private fakeKillTimer!: Phaser.Time.TimerEvent
  private bossSpawnTimer!: Phaser.Time.TimerEvent
  private autoFireTimer: Phaser.Time.TimerEvent | null = null

  private shotCount = 0
  private nextBossAt = BOSS_CONFIG.spawnIntervalShots

  constructor() {
    super({ key: 'GameScene' })
  }

  create() {
    const { width, height } = this.scale

    // Background + grid
    this.add.rectangle(0, 0, width, height, 0x0B0B0F).setOrigin(0, 0)
    this.drawGrid(width, height)

    // Input
    this.input.on('pointerdown', this.handlePointerDown, this)

    // Coin spawn timer
    this.spawnTimer = this.time.addEvent({
      delay: GAME_CONFIG.SPAWN_INTERVAL_MS,
      callback: this.maybeSpawnCoin,
      callbackScope: this,
      loop: true,
    })

    // Fake kill feed (simulated other players)
    this.fakeKillTimer = this.time.addEvent({
      delay: GAME_CONFIG.FAKE_KILL_INTERVAL_MS,
      callback: () => useGameStore.getState().addFakeKill(),
      loop: true,
    })

    // Initial coin burst
    for (let i = 0; i < 8; i++) {
      this.time.delayedCall(i * 280, () => this.spawnCoin(), [])
    }
  }

  private drawGrid(w: number, h: number) {
    const g = this.add.graphics()
    g.lineStyle(1, 0x1A1A2E, 0.5)
    const step = 60
    for (let x = 0; x < w; x += step) g.lineBetween(x, 0, x, h)
    for (let y = 0; y < h; y += step) g.lineBetween(0, y, w, y)
  }

  private maybeSpawnCoin() {
    if (this.coins.length < GAME_CONFIG.MAX_COINS_ON_SCREEN) {
      this.spawnCoin()
    }
  }

  private spawnCoin() {
    const config = pickRandomCoin()
    const { height } = this.scale
    const margin = config.radius + 20
    const y = Phaser.Math.Between(margin, height - margin)
    const x = this.scale.width + config.radius + 10

    const container = this.createCoinContainer(config, x, y) as CoinSprite
    container.coinConfig = config
    container.baseY = y
    container.phaseOffset = Math.random() * Math.PI * 2
    container.swingT = 0
    container.speed = config.baseSpeed + Phaser.Math.Between(-20, 20)

    this.coins.push(container)
  }

  private createCoinContainer(config: CoinConfig, x: number, y: number): Phaser.GameObjects.Container {
    const g = this.add.graphics()

    // Outer glow
    g.fillStyle(config.color, 0.15)
    g.fillCircle(0, 0, config.radius + 10)

    // Body
    g.fillStyle(config.color, 0.9)
    g.fillCircle(0, 0, config.radius)

    // Inner highlight
    g.fillStyle(0xFFFFFF, 0.12)
    g.fillCircle(-config.radius * 0.2, -config.radius * 0.2, config.radius * 0.45)

    // Border
    g.lineStyle(2, 0xFFFFFF, 0.25)
    g.strokeCircle(0, 0, config.radius)

    // Ticker text
    const fontSize = config.radius > 28 ? 12 : config.radius > 22 ? 10 : 9
    const text = this.add.text(0, 0, config.ticker, {
      fontSize: `${fontSize}px`,
      fontFamily: "'JetBrains Mono', 'Courier New', monospace",
      color: '#FFFFFF',
      fontStyle: 'bold',
      resolution: 2,
    }).setOrigin(0.5, 0.5)

    const container = this.add.container(x, y, [g, text])
    container.setSize(config.radius * 2, config.radius * 2)
    container.setInteractive({ useHandCursor: false })
    return container
  }

  private handlePointerDown(pointer: Phaser.Input.Pointer) {
    const store = useGameStore.getState()
    if (store.solBalance < store.bulletSize) return

    const px = pointer.x
    const py = pointer.y

    // Find nearest coin in click radius
    let nearest: CoinSprite | null = null
    let minDist = GAME_CONFIG.CLICK_HIT_RADIUS

    // Check boss first
    if (this.bossContainer && store.boss.active) {
      const bd = Phaser.Math.Distance.Between(px, py, this.bossContainer.x, this.bossContainer.y)
      if (bd < BOSS_CONFIG.radius + 20) {
        this.fireBullet(px, py, this.bossContainer.x, this.bossContainer.y, null, true)
        return
      }
    }

    for (const coin of this.coins) {
      const d = Phaser.Math.Distance.Between(px, py, coin.x, coin.y)
      if (d < minDist) {
        minDist = d
        nearest = coin
      }
    }

    if (nearest) {
      this.fireBullet(px, py, nearest.x, nearest.y, nearest, false)
    } else {
      // Empty space click — rare random miss
      this.fireBullet(px, py, px, py, null, false)
    }
  }

  private fireBullet(
    fromX: number, fromY: number,
    toX: number, toY: number,
    targetCoin: CoinSprite | null,
    isBoss: boolean,
  ) {
    const store = useGameStore.getState()
    store.addShot(store.bulletSize)
    this.shotCount++

    // Boss spawn check
    if (!store.boss.active && this.shotCount >= this.nextBossAt) {
      this.time.delayedCall(Phaser.Math.Between(1000, 3000), () => this.spawnBoss())
      this.nextBossAt = this.shotCount + 500 + Phaser.Math.Between(0, 200)
    }

    // Bullet visual
    const bullet = this.add.graphics()
    bullet.fillStyle(0xFFFF88, 1)
    bullet.fillCircle(0, 0, 4)
    // Bullet trail
    bullet.fillStyle(0xFFFF88, 0.3)
    bullet.fillCircle(0, 0, 7)

    const startX = this.scale.width / 2
    const startY = this.scale.height - 30
    bullet.setPosition(startX, startY)

    this.tweens.add({
      targets: bullet,
      x: toX,
      y: toY,
      duration: GAME_CONFIG.BULLET_SPEED_MS,
      ease: 'Cubic.easeIn',
      onComplete: () => {
        bullet.destroy()
        if (isBoss) {
          this.resolveBossShot()
        } else if (targetCoin) {
          this.resolveCoinShot(targetCoin)
        }
        // else: empty space — just miss
      },
    })
  }

  private resolveCoinShot(coin: CoinSprite) {
    const roll = Math.random()
    if (roll <= coin.coinConfig.hitRate) {
      this.onCoinHit(coin)
    } else {
      // Miss effect — brief red flash on coin
      this.showMissFlash(coin)
      useGameStore.getState().resetStreak()
    }
  }

  private resolveBossShot() {
    const store = useGameStore.getState()
    if (!store.boss.active || !this.bossContainer) return

    store.hitBoss(1)
    this.showBossHitEffect()

    if (store.boss.hp - 1 <= 0) {
      this.onBossKilled()
    }
  }

  private onCoinHit(coin: CoinSprite) {
    const config = coin.coinConfig
    const store = useGameStore.getState()
    const bulletSize = store.bulletSize
    const solPayout = parseFloat((bulletSize * config.payoutMult).toFixed(4))
    const lootDrop = randInt(config.lootMin, config.lootMax)

    // Explosion
    this.createExplosion(coin.x, coin.y, config.color, config.radius)

    // Floating payout text
    this.showPayoutFloat(coin.x, coin.y, solPayout, lootDrop, config.color)

    // Remove coin
    this.coins = this.coins.filter((c) => c !== coin)
    coin.destroy()

    // Update store
    store.addHit(config, solPayout, lootDrop)
    store.addKillFeedEntry({
      id: `kill-${Date.now()}`,
      wallet: 'you',
      coinId: config.id,
      coinTicker: config.ticker,
      tier: config.tier,
      solPayout,
      lootDrop,
      timestamp: Date.now(),
      isPlayer: true,
    })
    store.addToast({
      id: `toast-${Date.now()}`,
      coinTicker: config.ticker,
      tier: config.tier,
      solPayout,
      lootDrop,
      streak: store.killStreak + 1,
    })
  }

  private onBossKilled() {
    const store = useGameStore.getState()
    const jackpot = store.jackpotPool
    const lootDrop = randInt(BOSS_CONFIG.lootMin, BOSS_CONFIG.lootMax)

    if (this.bossContainer) {
      this.createExplosion(this.bossContainer.x, this.bossContainer.y, 0xFFD700, BOSS_CONFIG.radius, true)
      this.bossContainer.destroy()
      this.bossContainer = null
    }

    if (this.bossTimer) { this.bossTimer.destroy(); this.bossTimer = null }

    store.addHit(
      { ...BOSS_CONFIG, hitRate: 1, payoutMult: 1, spawnWeight: 0, swingAmp: 0, swingFreq: 0, cssColor: BOSS_CONFIG.cssColor, glowColor: BOSS_CONFIG.glowColor },
      jackpot,
      lootDrop,
    )
    store.addKillFeedEntry({
      id: `boss-${Date.now()}`,
      wallet: 'you',
      coinId: 'moonshot',
      coinTicker: 'MOONSHOT',
      tier: 'boss',
      solPayout: jackpot,
      lootDrop,
      timestamp: Date.now(),
      isPlayer: true,
      isBoss: true,
    })
    store.addToast({
      id: `boss-toast-${Date.now()}`,
      coinTicker: '👑 MOONSHOT',
      tier: 'boss',
      solPayout: jackpot,
      lootDrop,
      streak: store.killStreak + 1,
      isBoss: true,
    })

    // Reset jackpot
    useGameStore.setState({ jackpotPool: 10, boss: { active: false, hp: 100, maxHP: 100, spawnedAt: 0, timeLeft: 30 } })

    this.showBossKillBanner(jackpot)
  }

  private spawnBoss() {
    if (this.bossContainer) return
    const store = useGameStore.getState()
    store.spawnBoss()

    const { height } = this.scale
    const x = this.scale.width + BOSS_CONFIG.radius + 10
    const y = height / 2

    // Boss visual
    const g = this.add.graphics()

    // Outer halo layers
    g.fillStyle(0xFFD700, 0.08)
    g.fillCircle(0, 0, BOSS_CONFIG.radius + 30)
    g.fillStyle(0xFFD700, 0.15)
    g.fillCircle(0, 0, BOSS_CONFIG.radius + 18)

    // Body
    g.fillStyle(0xFFD700, 0.92)
    g.fillCircle(0, 0, BOSS_CONFIG.radius)

    // Crown ring
    g.lineStyle(3, 0xFFFFFF, 0.5)
    g.strokeCircle(0, 0, BOSS_CONFIG.radius)

    // Text
    const text = this.add.text(0, -6, '👑', { fontSize: '28px' }).setOrigin(0.5, 0.5)
    const sub = this.add.text(0, 22, 'MOONSHOT', {
      fontSize: '10px',
      fontFamily: "'JetBrains Mono', monospace",
      color: '#0B0B0F',
      fontStyle: 'bold',
    }).setOrigin(0.5, 0.5)

    this.bossContainer = this.add.container(x, y, [g, text, sub])
    this.bossHP = 100
    this.bossPhase = Math.random() * Math.PI * 2

    // Boss moves in
    this.tweens.add({
      targets: this.bossContainer,
      x: this.scale.width * 0.7,
      duration: 1200,
      ease: 'Back.easeOut',
    })

    // Boss timer (30s)
    this.bossTimer = this.time.addEvent({
      delay: BOSS_CONFIG.lifetimeMs,
      callback: () => {
        if (store.boss.active) {
          this.bossContainer?.destroy()
          this.bossContainer = null
          store.escapeBoss()
        }
      },
    })

    // Screen flash alert
    const flash = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xFFD700, 0)
      .setOrigin(0, 0)
    this.tweens.add({
      targets: flash,
      alpha: 0.08,
      yoyo: true,
      repeat: 3,
      duration: 200,
      onComplete: () => flash.destroy(),
    })
  }

  private showBossHitEffect() {
    if (!this.bossContainer) return
    this.tweens.add({
      targets: this.bossContainer,
      alpha: 0.3,
      yoyo: true,
      duration: 80,
    })
  }

  private showBossKillBanner(jackpot: number) {
    const { width, height } = this.scale
    const bg = this.add.rectangle(0, height / 2 - 40, width, 80, 0xFFD700, 0.9).setOrigin(0, 0)
    const text = this.add.text(width / 2, height / 2, `👑  MOONSHOT SNIPED  +${jackpot.toFixed(2)} SOL`, {
      fontSize: '22px',
      fontFamily: "'JetBrains Mono', monospace",
      color: '#0B0B0F',
      fontStyle: 'bold',
    }).setOrigin(0.5, 0.5)

    this.time.delayedCall(3000, () => {
      bg.destroy()
      text.destroy()
    })
  }

  private createExplosion(x: number, y: number, color: number, radius: number, big = false) {
    const count = big ? 30 : 16
    for (let i = 0; i < count; i++) {
      const p = this.add.graphics()
      const size = Phaser.Math.Between(3, big ? 9 : 6)
      p.fillStyle(color, 0.9)
      p.fillCircle(0, 0, size)
      p.setPosition(x, y)

      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3
      const dist = Phaser.Math.Between(radius, radius * 2.5)
      const tx = x + Math.cos(angle) * dist
      const ty = y + Math.sin(angle) * dist

      this.tweens.add({
        targets: p,
        x: tx, y: ty,
        alpha: 0,
        duration: big ? 700 : 450,
        ease: 'Cubic.easeOut',
        onComplete: () => p.destroy(),
      })
    }

    // Center flash
    const flash = this.add.graphics()
    flash.fillStyle(0xFFFFFF, 0.8)
    flash.fillCircle(x, y, radius * 1.3)
    this.tweens.add({
      targets: flash,
      alpha: 0,
      scaleX: 1.5, scaleY: 1.5,
      duration: 300,
      onComplete: () => flash.destroy(),
    })
  }

  private showMissFlash(coin: CoinSprite) {
    const flash = this.add.graphics()
    flash.lineStyle(3, 0xFF4444, 1)
    flash.strokeCircle(coin.x, coin.y, coin.coinConfig.radius + 6)
    this.tweens.add({
      targets: flash,
      alpha: 0,
      duration: 400,
      onComplete: () => flash.destroy(),
    })
  }

  private showPayoutFloat(x: number, y: number, sol: number, loot: number, _color: number) {
    const t = this.add.text(x, y - 10, `+${sol.toFixed(3)} SOL  +${loot} $LOOT`, {
      fontSize: '13px',
      fontFamily: "'JetBrains Mono', monospace",
      color: '#14F195',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5, 1)

    this.tweens.add({
      targets: t,
      y: y - 70,
      alpha: 0,
      duration: 1400,
      ease: 'Cubic.easeOut',
      onComplete: () => t.destroy(),
    })
  }

  update(time: number, delta: number) {
    const dt = delta / 1000

    // Update coins
    for (let i = this.coins.length - 1; i >= 0; i--) {
      const coin = this.coins[i]
      coin.x -= coin.speed * dt
      coin.swingT += dt
      coin.y = coin.baseY + Math.sin(coin.swingT * coin.coinConfig.swingFreq + coin.phaseOffset) * coin.coinConfig.swingAmp

      // Off-screen left — remove
      if (coin.x < -coin.coinConfig.radius - 20) {
        coin.destroy()
        this.coins.splice(i, 1)
      }
    }

    // Update boss movement
    if (this.bossContainer && useGameStore.getState().boss.active) {
      this.bossPhase += dt * 0.9
      this.bossVY += (Math.sin(this.bossPhase * 1.3) * 2 - this.bossVY) * 0.05
      this.bossContainer.y += this.bossVY * BOSS_CONFIG.baseSpeed * dt

      // Clamp to screen
      const margin = BOSS_CONFIG.radius + 20
      this.bossContainer.y = Phaser.Math.Clamp(
        this.bossContainer.y,
        margin,
        this.scale.height - margin,
      )

      // Boss moves left slowly
      if (this.bossContainer.x > this.scale.width * 0.2) {
        this.bossContainer.x -= BOSS_CONFIG.baseSpeed * 0.3 * dt
      }

      // Pulsing halo
      const pulse = 1 + Math.sin(time * 0.004) * 0.06
      this.bossContainer.setScale(pulse)

      // Update boss timer in store
      const store = useGameStore.getState()
      if (store.boss.active) {
        const elapsed = (Date.now() - store.boss.spawnedAt) / 1000
        const left = Math.max(0, Math.ceil(30 - elapsed))
        if (store.boss.timeLeft !== left) {
          useGameStore.setState((s) => ({ boss: { ...s.boss, timeLeft: left } }))
        }
      }
    }

    // Auto-fire
    const store = useGameStore.getState()
    if (store.autoFire && !this.autoFireTimer) {
      this.startAutoFire()
    } else if (!store.autoFire && this.autoFireTimer) {
      this.stopAutoFire()
    }
  }

  private startAutoFire() {
    this.autoFireTimer = this.time.addEvent({
      delay: GAME_CONFIG.AUTO_FIRE_RATE_MS,
      loop: true,
      callback: () => {
        if (!useGameStore.getState().autoFire) { this.stopAutoFire(); return }
        if (this.coins.length === 0) return
        const target = this.coins[Math.floor(Math.random() * this.coins.length)]
        const jitter = () => Phaser.Math.Between(-15, 15)
        this.fireBullet(target.x + jitter(), target.y + jitter(), target.x, target.y, target, false)
      },
    })
  }

  private stopAutoFire() {
    this.autoFireTimer?.destroy()
    this.autoFireTimer = null
  }
}
