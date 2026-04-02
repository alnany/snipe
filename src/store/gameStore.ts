import { create } from 'zustand'
import type { CoinConfig, Tier } from '../game/config'
import { FAKE_WALLETS, COINS, TIER_LABEL, randInt } from '../game/config'

export type Screen = 'landing' | 'game' | 'dashboard' | 'stake'

export interface KillFeedEntry {
  id: string
  wallet: string        // 'you' or a fake wallet
  coinId: string
  coinTicker: string
  tier: Tier
  solPayout: number
  lootDrop: number
  timestamp: number
  isPlayer: boolean
  isBoss?: boolean
}

export interface KillToast {
  id: string
  coinTicker: string
  tier: Tier
  solPayout: number
  lootDrop: number
  streak: number
  isBoss?: boolean
}

interface BossState {
  active: boolean
  hp: number
  maxHP: number
  spawnedAt: number
  timeLeft: number   // seconds remaining
}

interface GameStore {
  // ── Navigation ──
  screen: Screen
  setScreen: (s: Screen) => void

  // ── Wallet (mock) ──
  isConnected: boolean
  walletAddress: string
  solBalance: number
  lootBalance: number
  connectWallet: () => void

  // ── Session stats ──
  shotsTotal: number
  hitsTotal: number
  solWagered: number
  solWon: number
  lootEarned: number
  killStreak: number
  maxStreak: number
  sessionPL: number

  // ── Wager settings ──
  bulletSize: number
  setBulletSize: (size: number) => void
  autoFire: boolean
  toggleAutoFire: () => void

  // ── Jackpot ──
  jackpotPool: number
  addToJackpot: (amount: number) => void

  // ── Boss ──
  boss: BossState
  spawnBoss: () => void
  hitBoss: (damage: number) => void
  escapeBoss: () => void

  // ── Kill feed ──
  killFeed: KillFeedEntry[]
  addKillFeedEntry: (entry: KillFeedEntry) => void
  addFakeKill: () => void

  // ── Toast ──
  toasts: KillToast[]
  addToast: (toast: KillToast) => void
  removeToast: (id: string) => void

  // ── Shot resolution ──
  addShot: (bulletCost: number) => void
  addHit: (config: CoinConfig, solPayout: number, lootDrop: number) => void
  resetStreak: () => void
}

const INITIAL_SOL = 10.0
const INITIAL_JACKPOT = 47

// Seeded kill feed entries (historical, pre-game)
function generateInitialFeed(): KillFeedEntry[] {
  const entries: KillFeedEntry[] = []
  const now = Date.now()
  const tiers: Tier[] = ['common', 'common', 'common', 'mid', 'mid', 'rare', 'common', 'epic']
  for (let i = 0; i < 12; i++) {
    const coin = COINS[Math.floor(Math.random() * COINS.length)]
    const tier = tiers[i % tiers.length]
    const sol = coin.payoutMult * [0.01, 0.05, 0.05, 0.10][Math.floor(Math.random() * 4)]
    entries.push({
      id: `seed-${i}`,
      wallet: FAKE_WALLETS[i % FAKE_WALLETS.length],
      coinId: coin.id,
      coinTicker: coin.ticker,
      tier,
      solPayout: parseFloat(sol.toFixed(4)),
      lootDrop: randInt(1, 50),
      timestamp: now - (12 - i) * 1200,
      isPlayer: false,
    })
  }
  return entries
}

export const useGameStore = create<GameStore>((set, get) => ({
  // ── Navigation ──
  screen: 'landing',
  setScreen: (screen) => set({ screen }),

  // ── Wallet ──
  isConnected: false,
  walletAddress: 'DEMO1234...5678',
  solBalance: INITIAL_SOL,
  lootBalance: 0,
  connectWallet: () =>
    set({ isConnected: true, walletAddress: 'DEMO1234...5678' }),

  // ── Session stats ──
  shotsTotal: 0,
  hitsTotal: 0,
  solWagered: 0,
  solWon: 0,
  lootEarned: 0,
  killStreak: 0,
  maxStreak: 0,
  sessionPL: 0,

  // ── Wager ──
  bulletSize: 0.05,
  setBulletSize: (size) => set({ bulletSize: size }),
  autoFire: false,
  toggleAutoFire: () => set((s) => ({ autoFire: !s.autoFire })),

  // ── Jackpot ──
  jackpotPool: INITIAL_JACKPOT,
  addToJackpot: (amount) => set((s) => ({ jackpotPool: s.jackpotPool + amount })),

  // ── Boss ──
  boss: { active: false, hp: 100, maxHP: 100, spawnedAt: 0, timeLeft: 30 },
  spawnBoss: () =>
    set({
      boss: { active: true, hp: 100, maxHP: 100, spawnedAt: Date.now(), timeLeft: 30 },
    }),
  hitBoss: (damage) =>
    set((s) => {
      const newHP = Math.max(0, s.boss.hp - damage)
      return { boss: { ...s.boss, hp: newHP } }
    }),
  escapeBoss: () =>
    set((s) => ({
      boss: { ...s.boss, active: false },
      jackpotPool: parseFloat((s.jackpotPool * 1.1).toFixed(3)), // +10% rollover
    })),

  // ── Kill feed ──
  killFeed: generateInitialFeed(),
  addKillFeedEntry: (entry) =>
    set((s) => ({
      killFeed: [entry, ...s.killFeed].slice(0, 40),
    })),

  addFakeKill: () => {
    const coin = COINS[Math.floor(Math.random() * COINS.length)]
    const bulletSizes = [0.01, 0.05, 0.10]
    const bs = bulletSizes[Math.floor(Math.random() * bulletSizes.length)]
    const sol = parseFloat((bs * coin.payoutMult).toFixed(4))
    const loot = randInt(coin.lootMin, coin.lootMax)
    const entry: KillFeedEntry = {
      id: `fake-${Date.now()}-${Math.random()}`,
      wallet: FAKE_WALLETS[Math.floor(Math.random() * FAKE_WALLETS.length)],
      coinId: coin.id,
      coinTicker: coin.ticker,
      tier: coin.tier,
      solPayout: sol,
      lootDrop: loot,
      timestamp: Date.now(),
      isPlayer: false,
    }
    set((s) => ({ killFeed: [entry, ...s.killFeed].slice(0, 40) }))
  },

  // ── Toasts ──
  toasts: [],
  addToast: (toast) =>
    set((s) => ({ toasts: [...s.toasts, toast].slice(-5) })),
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  // ── Shot logic ──
  addShot: (bulletCost) =>
    set((s) => ({
      shotsTotal: s.shotsTotal + 1,
      solWagered: parseFloat((s.solWagered + bulletCost).toFixed(4)),
      solBalance: parseFloat((Math.max(0, s.solBalance - bulletCost)).toFixed(4)),
      sessionPL: parseFloat((s.solWon - s.solWagered - bulletCost).toFixed(4)),
      // 5% of bullet goes to jackpot pool
      jackpotPool: parseFloat((s.jackpotPool + bulletCost * 0.05).toFixed(4)),
    })),

  addHit: (config, solPayout, lootDrop) =>
    set((s) => {
      const newStreak = s.killStreak + 1
      const streakMult = newStreak >= 5 ? 3 : newStreak >= 3 ? 2 : 1
      const boostedLoot = lootDrop * streakMult
      const newSolWon = parseFloat((s.solWon + solPayout).toFixed(4))
      const newLootEarned = s.lootEarned + boostedLoot
      const newLootBalance = s.lootBalance + boostedLoot
      const newSolBalance = parseFloat((s.solBalance + solPayout).toFixed(4))
      const newPL = parseFloat((newSolWon - s.solWagered).toFixed(4))
      return {
        hitsTotal: s.hitsTotal + 1,
        solWon: newSolWon,
        lootEarned: newLootEarned,
        lootBalance: newLootBalance,
        solBalance: newSolBalance,
        sessionPL: newPL,
        killStreak: newStreak,
        maxStreak: Math.max(s.maxStreak, newStreak),
      }
    }),

  resetStreak: () => set({ killStreak: 0 }),
}))

// ── Helpers ──────────────────────────────────────────────────────────────────
export function formatSOL(val: number): string {
  return val.toFixed(val < 0.01 ? 4 : 3)
}

export function formatLOOT(val: number): string {
  return val >= 1000
    ? `${(val / 1000).toFixed(1)}K`
    : val.toString()
}

export function formatPL(val: number): string {
  const sign = val >= 0 ? '+' : ''
  return `${sign}${formatSOL(val)} SOL`
}

export function tierLabel(tier: Tier): string {
  return TIER_LABEL[tier]
}
