import { useGameStore } from '../store/gameStore'

export default function JackpotBar() {
  const { jackpotPool, boss } = useGameStore()

  const fillPct = Math.min(100, (jackpotPool / 200) * 100)  // 200 SOL = "full"
  const isBossActive = boss.active

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      height: 38,
      padding: '0 16px',
      borderBottom: '1px solid var(--border)',
      background: isBossActive ? 'rgba(255,215,0,0.06)' : 'var(--bg)',
      flexShrink: 0,
      transition: 'background 0.3s',
    }}>
      {/* Icon + Label */}
      <span style={{ fontSize: 13, lineHeight: 1 }}>{isBossActive ? '👑' : '🏆'}</span>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.06em',
        color: isBossActive ? 'var(--gold)' : 'var(--text-muted)',
        whiteSpace: 'nowrap',
      }}>
        {isBossActive ? 'MOONSHOT LIVE' : 'JACKPOT POOL'}
      </span>

      {/* Bar */}
      <div style={{
        flex: 1,
        maxWidth: 240,
        height: 5,
        background: 'var(--border)',
        borderRadius: 3,
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${fillPct}%`,
          height: '100%',
          background: isBossActive
            ? 'linear-gradient(90deg, #FFD700, #FF8C00)'
            : 'linear-gradient(90deg, var(--green-dim), var(--green))',
          borderRadius: 3,
          transition: 'width 0.5s ease',
          boxShadow: isBossActive ? '0 0 8px rgba(255,215,0,0.6)' : undefined,
        }} />
      </div>

      {/* Amount */}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        fontWeight: 700,
        color: isBossActive ? 'var(--gold)' : 'var(--text)',
      }}>
        {jackpotPool.toFixed(2)} SOL
      </span>

      {/* Boss countdown */}
      {isBossActive && (
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: boss.timeLeft <= 10 ? 'var(--red)' : 'var(--gold)',
          fontWeight: 600,
          animation: boss.timeLeft <= 10 ? 'blink 1s step-end infinite' : undefined,
        }}>
          {boss.timeLeft}s
        </span>
      )}

      <div style={{ flex: 1 }} />

      {/* Live indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{
          width: 5, height: 5,
          borderRadius: '50%',
          background: 'var(--green)',
          animation: 'pulse-green 1.8s infinite',
        }} />
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--text-muted)',
          letterSpacing: '0.04em',
        }}>
          DEMO MODE — Provably fair on mainnet
        </span>
      </div>
    </div>
  )
}
