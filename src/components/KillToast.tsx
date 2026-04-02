import { useEffect, useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { TIER_COLOR, TIER_LABEL, type Tier } from '../game/config'

export default function KillToastOverlay() {
  const { toasts, removeToast } = useGameStore()

  return (
    <div style={{
      position: 'absolute',
      top: 60,
      right: 12,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      zIndex: 200,
      pointerEvents: 'none',
    }}>
      {toasts.map((t) => (
        <KillToastItem
          key={t.id}
          id={t.id}
          coinTicker={t.coinTicker}
          tier={t.tier}
          solPayout={t.solPayout}
          lootDrop={t.lootDrop}
          streak={t.streak}
          isBoss={t.isBoss}
          onDone={() => removeToast(t.id)}
        />
      ))}
    </div>
  )
}

function KillToastItem({
  coinTicker, tier, solPayout, lootDrop, streak, isBoss, onDone,
}: {
  id: string
  coinTicker: string
  tier: Tier
  solPayout: number
  lootDrop: number
  streak: number
  isBoss?: boolean
  onDone: () => void
}) {
  const [phase, setPhase] = useState<'enter' | 'exit'>('enter')
  const duration = isBoss ? 5000 : 3200

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase('exit'), duration - 250)
    const doneTimer = setTimeout(onDone, duration)
    return () => { clearTimeout(exitTimer); clearTimeout(doneTimer) }
  }, [])

  const tierColor = TIER_COLOR[tier]
  const tierStr = TIER_LABEL[tier]
  const dots = [1, 2, 3, 4, 5].map((n) => n <= ({ common: 1, mid: 2, rare: 3, epic: 4, boss: 5 }[tier] ?? 1))

  return (
    <div
      className={phase === 'enter' ? 'toast-enter' : 'toast-exit'}
      style={{
        background: isBoss ? 'rgba(255,215,0,0.12)' : 'var(--surface)',
        border: `1px solid ${isBoss ? 'rgba(255,215,0,0.5)' : 'var(--border-hi)'}`,
        borderRadius: 10,
        padding: '12px 16px',
        minWidth: 240,
        boxShadow: isBoss
          ? '0 4px 24px rgba(255,215,0,0.25), 0 0 0 1px rgba(255,215,0,0.1)'
          : '0 4px 20px rgba(0,0,0,0.5)',
        pointerEvents: 'none',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{
          fontSize: 15,
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          color: tierColor,
          letterSpacing: '0.03em',
        }}>
          {coinTicker} SNIPED
        </span>
        <div style={{ display: 'flex', gap: 3, marginLeft: 'auto' }}>
          {dots.map((filled, i) => (
            <div key={i} style={{
              width: 6, height: 6,
              borderRadius: '50%',
              background: filled ? tierColor : 'var(--border-hi)',
            }} />
          ))}
        </div>
      </div>

      {/* Tier label */}
      <div style={{
        fontSize: 10,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.08em',
        color: tierColor,
        marginBottom: 10,
        fontWeight: 600,
      }}>
        {tierStr}
      </div>

      {/* Payout row */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
        <div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 2 }}>SOL</div>
          <div style={{
            fontSize: 16,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: 'var(--green)',
          }}>+{solPayout.toFixed(4)}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 2 }}>$LOOT</div>
          <div style={{
            fontSize: 16,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: 'var(--green)',
          }}>+{lootDrop}</div>
        </div>
      </div>

      {/* Streak */}
      {streak >= 3 && (
        <div style={{
          marginTop: 10,
          padding: '4px 10px',
          borderRadius: 5,
          background: 'rgba(20,241,149,0.1)',
          border: '1px solid rgba(20,241,149,0.25)',
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
          color: 'var(--green)',
          fontWeight: 700,
          letterSpacing: '0.04em',
        }}>
          ⚡ {streak}-KILL STREAK  ×{streak >= 5 ? 3 : 2} $LOOT
        </div>
      )}
    </div>
  )
}
