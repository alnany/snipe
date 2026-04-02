import { useGameStore } from '../store/gameStore'
import { TIER_COLOR, type Tier } from '../game/config'

export default function KillFeed() {
  const killFeed = useGameStore((s) => s.killFeed)

  return (
    <div style={{
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      padding: '8px 16px',
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      overflowX: 'auto',
      flexShrink: 0,
      height: 44,
    }}>
      <span style={{
        fontSize: 10,
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        letterSpacing: '0.08em',
        color: 'var(--text-muted)',
        flexShrink: 0,
      }}>
        KILL FEED
      </span>

      <div style={{
        display: 'flex',
        gap: 20,
        overflow: 'hidden',
        alignItems: 'center',
      }}>
        {killFeed.slice(0, 20).map((entry) => (
          <div
            key={entry.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              flexShrink: 0,
              opacity: entry.isPlayer ? 1 : 0.65,
            }}
          >
            {/* Wallet */}
            <span style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: entry.isPlayer ? 'var(--green)' : 'var(--text-2)',
              fontWeight: entry.isPlayer ? 700 : 400,
            }}>
              {entry.isPlayer ? 'YOU' : entry.wallet}
            </span>

            {/* Arrow */}
            <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>›</span>

            {/* Coin ticker */}
            <span style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              color: entry.isBoss ? 'var(--gold)' : TIER_COLOR[entry.tier as Tier],
            }}>
              {entry.isBoss ? '👑' : ''} {entry.coinTicker}
            </span>

            {/* Payout */}
            <span style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text)',
            }}>
              +{entry.solPayout.toFixed(3)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
