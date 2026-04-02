import { useGameStore, formatSOL, formatLOOT, formatPL } from '../store/gameStore'

export default function TopBar() {
  const { walletAddress, solBalance, lootBalance, sessionPL, hitsTotal, setScreen, screen } = useGameStore()

  const plColor = sessionPL >= 0 ? 'var(--green)' : 'var(--red)'
  const plStr = formatPL(sessionPL)

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      height: 52,
      padding: '0 16px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--surface)',
      gap: 20,
      flexShrink: 0,
      zIndex: 50,
    }}>
      {/* Logo */}
      <button
        onClick={() => setScreen('game')}
        style={{ background: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <div style={{
          width: 28, height: 28,
          background: 'var(--green)',
          borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14,
        }}>🎯</div>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: '0.06em',
          color: 'var(--text)',
        }}>SNIPE</span>
      </button>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Stats — hide on mobile */}
      <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <StatItem label="SOL" value={formatSOL(solBalance)} unit="" color="var(--text)" />
        <StatItem label="$LOOT" value={formatLOOT(lootBalance)} unit="" color="var(--green)" />
        <StatItem label="KILLS" value={hitsTotal.toString()} unit="" color="var(--text)" />
        {screen === 'game' && (
          <StatItem label="P&L" value={plStr} unit="" color={plColor} />
        )}
      </div>

      <div style={{ width: 1, height: 24, background: 'var(--border)' }} className="hide-mobile" />

      {/* Nav links */}
      <div className="hide-mobile" style={{ display: 'flex', gap: 4 }}>
        <NavBtn label="GAME" active={screen === 'game'} onClick={() => setScreen('game')} />
        <NavBtn label="DASH" active={screen === 'dashboard'} onClick={() => setScreen('dashboard')} />
        <NavBtn label="STAKE" active={screen === 'stake'} onClick={() => setScreen('stake')} />
      </div>

      {/* Wallet */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 12px',
        borderRadius: 6,
        border: '1px solid var(--border)',
        background: 'var(--surface-hi)',
        fontSize: 12,
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-2)',
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--green)',
          display: 'inline-block',
        }} />
        {walletAddress}
      </div>
    </div>
  )
}

function StatItem({ label, value, color }: { label: string; value: string; unit: string; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
      <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
        {label}
      </span>
      <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 600, color }}>
        {value}
      </span>
    </div>
  )
}

function NavBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? 'var(--surface-hi)' : 'none',
        border: active ? '1px solid var(--border-hi)' : '1px solid transparent',
        borderRadius: 6,
        padding: '5px 12px',
        fontSize: 11,
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        letterSpacing: '0.06em',
        color: active ? 'var(--text)' : 'var(--text-2)',
      }}
    >
      {label}
    </button>
  )
}
