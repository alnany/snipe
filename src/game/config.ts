// ─── Coin Roster: Top 10 meme coins by volume ───────────────────────────────

export type Tier = 'common' | 'mid' | 'rare' | 'epic' | 'boss'

export interface CoinConfig {
  id: string
  ticker: string
  logo: string         // path to logo image in /public/logos/
  color: number        // Phaser hex (0xRRGGBB) — used for glow ring
  cssColor: string     // CSS string
  glowColor: string    // CSS rgba for glow
  tier: Tier
  baseSpeed: number    // px/s
  radius: number       // sprite radius px
  hitRate: number      // probability 0–1 on aimed click
  payoutMult: number   // × bullet cost on hit
  lootMin: number
  lootMax: number
  spawnWeight: number  // relative spawn frequency
  swingAmp: number     // vertical sine amplitude
  swingFreq: number    // sine frequency
}

export const COINS: CoinConfig[] = [
  // ── COMMON ──
  {
    id: 'pepe',
    ticker: 'PEPE',
    logo: '/logos/pepe.png',
    color: 0x00C846,
    cssColor: '#00C846',
    glowColor: 'rgba(0,200,70,0.35)',
    tier: 'common',
    baseSpeed: 190,
    radius: 32,
    hitRate: 0.62,
    payoutMult: 0.90,
    lootMin: 1, lootMax: 3,
    spawnWeight: 20,
    swingAmp: 40, swingFreq: 0.8,
  },
  {
    id: 'bonk',
    ticker: 'BONK',
    logo: '/logos/bonk.png',
    color: 0xFF6B35,
    cssColor: '#FF6B35',
    glowColor: 'rgba(255,107,53,0.35)',
    tier: 'common',
    baseSpeed: 210,
    radius: 30,
    hitRate: 0.60,
    payoutMult: 0.90,
    lootMin: 1, lootMax: 3,
    spawnWeight: 18,
    swingAmp: 55, swingFreq: 1.1,
  },
  {
    id: 'shib',
    ticker: 'SHIB',
    logo: '/logos/shib.png',
    color: 0xE32234,
    cssColor: '#E32234',
    glowColor: 'rgba(227,34,52,0.35)',
    tier: 'common',
    baseSpeed: 200,
    radius: 31,
    hitRate: 0.60,
    payoutMult: 0.90,
    lootMin: 1, lootMax: 3,
    spawnWeight: 18,
    swingAmp: 35, swingFreq: 0.9,
  },

  // ── MID ──
  {
    id: 'doge',
    ticker: 'DOGE',
    logo: '/logos/doge.png',
    color: 0xC3A634,
    cssColor: '#C3A634',
    glowColor: 'rgba(195,166,52,0.4)',
    tier: 'mid',
    baseSpeed: 145,
    radius: 28,
    hitRate: 0.38,
    payoutMult: 1.55,
    lootMin: 5, lootMax: 15,
    spawnWeight: 14,
    swingAmp: 45, swingFreq: 0.7,
  },
  {
    id: 'wif',
    ticker: 'WIF',
    logo: '/logos/wif.png',
    color: 0x7B61FF,
    cssColor: '#7B61FF',
    glowColor: 'rgba(123,97,255,0.4)',
    tier: 'mid',
    baseSpeed: 155,
    radius: 27,
    hitRate: 0.36,
    payoutMult: 1.55,
    lootMin: 5, lootMax: 15,
    spawnWeight: 13,
    swingAmp: 50, swingFreq: 1.0,
  },
  {
    id: 'floki',
    ticker: 'FLOKI',
    logo: '/logos/floki.png',
    color: 0xFFBD39,
    cssColor: '#FFBD39',
    glowColor: 'rgba(255,189,57,0.4)',
    tier: 'mid',
    baseSpeed: 160,
    radius: 27,
    hitRate: 0.36,
    payoutMult: 1.55,
    lootMin: 5, lootMax: 15,
    spawnWeight: 11,
    swingAmp: 60, swingFreq: 0.85,
  },

  // ── RARE ──
  {
    id: 'brett',
    ticker: 'BRETT',
    logo: '/logos/brett.png',
    color: 0x4A90E2,
    cssColor: '#4A90E2',
    glowColor: 'rgba(74,144,226,0.5)',
    tier: 'rare',
    baseSpeed: 100,
    radius: 24,
    hitRate: 0.18,
    payoutMult: 3.0,
    lootMin: 20, lootMax: 50,
    spawnWeight: 8,
    swingAmp: 30, swingFreq: 0.6,
  },
  {
    id: 'ponke',
    ticker: 'PONKE',
    logo: '/logos/ponke.png',
    color: 0x9B59B6,
    cssColor: '#9B59B6',
    glowColor: 'rgba(155,89,182,0.5)',
    tier: 'rare',
    baseSpeed: 95,
    radius: 23,
    hitRate: 0.18,
    payoutMult: 3.0,
    lootMin: 20, lootMax: 50,
    spawnWeight: 7,
    swingAmp: 25, swingFreq: 0.5,
  },

  // ── EPIC ──
  {
    id: 'popcat',
    ticker: 'POPCAT',
    logo: '/logos/popcat.png',
    color: 0xFF69B4,
    cssColor: '#FF69B4',
    glowColor: 'rgba(255,105,180,0.6)',
    tier: 'epic',
    baseSpeed: 270,
    radius: 20,
    hitRate: 0.08,
    payoutMult: 8.0,
    lootMin: 100, lootMax: 200,
    spawnWeight: 4,
    swingAmp: 80, swingFreq: 1.5,
  },
  {
    id: 'mew',
    ticker: 'MEW',
    logo: '/logos/mew.png',
    color: 0x00BCD4,
    cssColor: '#00BCD4',
    glowColor: 'rgba(0,188,212,0.6)',
    tier: 'epic',
    baseSpeed: 260,
    radius: 21,
    hitRate: 0.08,
    payoutMult: 8.0,
    lootMin: 100, lootMax: 200,
    spawnWeight: 3,
    swingAmp: 70, swingFreq: 1.4,
  },
]

// ── Boss (MOONSHOT) ──
export const BOSS_CONFIG = {
  id: 'moonshot',
  ticker: 'MOONSHOT',
  color: 0xFFD700,
  cssColor: '#FFD700',
  glowColor: 'rgba(255,215,0,0.7)',
  tier: 'boss' as Tier,
  radius: 54,
  maxHP: 100,
  baseSpeed: 70,
  payoutPool: true, // pays full jackpot
  lootMin: 500, lootMax: 2000,
  spawnIntervalShots: 500,   // spawn every ~500 player shots
  lifetimeMs: 30000,         // 30 sec window
}

// ── Game constants ────────────────────────────────────────────────────────────
export const GAME_CONFIG = {
  CANVAS_HEIGHT: 520,
  MAX_COINS_ON_SCREEN: 14,
  SPAWN_INTERVAL_MS: 1400,
  CLICK_HIT_RADIUS: 72,        // px — how close click must be to coin center
  EMPTY_CLICK_HIT_RATE: 0.04,  // tiny chance when clicking empty space
  BULLET_SPEED_MS: 140,        // bullet travel time in ms
  FAKE_KILL_INTERVAL_MS: 1100, // simulated other players (avg)
  JACKPOT_INITIAL_SOL: 47,
  JACKPOT_BOSS_ESCAPE_BONUS: 0.10, // 10% added to pool when boss escapes
  AUTO_FIRE_RATE_MS: 900,      // ms between auto shots
}

// ── Bullet sizes ──────────────────────────────────────────────────────────────
export const BULLET_SIZES = [0.01, 0.05, 0.10, 0.50, 1.00]

// ── Tier labels ───────────────────────────────────────────────────────────────
export const TIER_LABEL: Record<Tier, string> = {
  common: 'COMMON',
  mid: 'MID-TIER',
  rare: 'RARE',
  epic: 'EPIC',
  boss: '👑 MOONSHOT',
}

export const TIER_COLOR: Record<Tier, string> = {
  common: '#8888AA',
  mid: '#C3A634',
  rare: '#4A90E2',
  epic: '#FF69B4',
  boss: '#FFD700',
}

// ── Fake wallet names for kill feed ──────────────────────────────────────────
export const FAKE_WALLETS = [
  '8fK2...3xPq', '3cRt...f1mW', 'Qv7N...2aLP', 'nZ4j...8bYc',
  'pX9A...7sKd', 'Wr5M...1tFe', 'gH6B...9nOr', 'jL0D...4uVs',
  'eI2C...6wQz', 'kU8E...5cAi', 'mN3F...0dBt', 'oY1G...2gXh',
]

// Weighted random coin selection for spawning
export function pickRandomCoin(): CoinConfig {
  const totalWeight = COINS.reduce((s, c) => s + c.spawnWeight, 0)
  let r = Math.random() * totalWeight
  for (const coin of COINS) {
    r -= coin.spawnWeight
    if (r <= 0) return coin
  }
  return COINS[0]
}

// Random int inclusive
export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
