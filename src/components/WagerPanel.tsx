import { useGameStore, formatSOL, formatPL } from '../store/gameStore'
import { BULLET_SIZES } from '../game/config'

export default function WagerPanel() {
  const {
    bulletSize, setBulletSize,
    autoFire, toggleAutoFire,
    shotsTotal, hitsTotal,
    solWagered, sessionPL,
    lootEarned, killStreak, maxStreak,
  } = useGameStore()

  const hitRate = shotsTotal > 0 ? ((hitsTotal / shotsTotal) * 100).toFixed(1) : '—'
  const plColor = sessionPL >= 0 ? 'var(--green)' : 'var(--red)'

  return (
    <div style={{
      width: 220,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface)',
      borderLeft: '1px solid var(--border)',
      overflow: 'hidden',
    }}>
      {/* ── Bullet size ── */}
      <Section title="BULLET SIZE">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {BULLET_SIZES.map((size) => (
            <BulletOption
              key={size}
              size={size}
              active={bulletSize === size}
              onClick={() => setBulletSize(size)}
            />
          ))}
        </div>
      </Section>

      <div className="divider" style={{ margin: 0 }} />

      {/* ── Auto-fire ── */}
      <Section title="AUTO-FIRE">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>
            1 shot / sec
          </span>
          <Toggle active={autoFire} onToggle={toggleAutoFire} />
        </div>
        {autoFire && (
          <div style={{
            marginTop: 8,
            padding: '6px 10px',
            background: 'rgba(20,241,149,0.08)',
            border: '1px solid rgba(20,241,149,0.2)',
            borderRadius: 6,
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--green)',
          }}>
            ⚡ AUTO-FIRING
          </div>
        )}
      </Section>

      <div className="divider" style={{ margin: 0 }} />

      {/* ── Session stats ── */}
      <Section title="THIS SESSION" flex>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <StatRow label="Shots" value={shotsTotal.toString()} />
          <StatRow label="Hits" value={`${hitsTotal} (${hitRate}%)`} />
          <StatRow label="Wagered" value={`${formatSOL(solWagered)} SOL`} />
          <StatRow label="P&L" value={formatPL(sessionPL)} color={plColor} />
          <StatRow label="$LOOT earned" value={`+${lootEarned}`} color="var(--green)" />
        </div>

        <div className="divider" />

        {/* Kill streak */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>STREAK</span>
            {killStreak > 0 && (
              <span style={{
                fontSize: 10,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}>
                ×{killStreak >= 5 ? 3 : killStreak >= 3 ? 2 : 1} $LOOT
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[...Array(7)].map((_, i) => (
              <div key={i} style={{
                flex: 1,
                height: 5,
                borderRadius: 2,
                background: i < killStreak ? 'var(--green)' : 'var(--border)',
                transition: 'background 0.2s',
                boxShadow: i < killStreak ? '0 0 4px rgba(20,241,149,0.5)' : undefined,
              }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>
              {killStreak} kills
            </span>
            <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              best: {maxStreak}
            </span>
          </div>
        </div>
      </Section>
    </div>
  )
}

function Section({
  title, children, flex,
}: {
  title: string
  children: React.ReactNode
  flex?: boolean
}) {
  return (
    <div style={{
      padding: '14px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      flex: flex ? 1 : undefined,
      overflow: flex ? 'auto' : undefined,
    }}>
      <span style={{
        fontSize: 10,
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        letterSpacing: '0.1em',
        color: 'var(--text-muted)',
      }}>
        {title}
      </span>
      {children}
    </div>
  )
}

function BulletOption({ size, active, onClick }: { size: number; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '7px 10px',
        borderRadius: 6,
        background: active ? 'rgba(20,241,149,0.1)' : 'transparent',
        border: active ? '1px solid rgba(20,241,149,0.35)' : '1px solid transparent',
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 8, height: 8,
          borderRadius: '50%',
          background: active ? 'var(--green)' : 'var(--border-hi)',
          flexShrink: 0,
        }} />
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          fontWeight: active ? 600 : 400,
          color: active ? 'var(--green)' : 'var(--text-2)',
        }}>
          {size.toFixed(2)} SOL
        </span>
      </div>
      {active && (
        <span style={{
          fontSize: 10,
          fontFamily: 'var(--font-mono)',
          color: 'var(--green)',
          letterSpacing: '0.04em',
        }}>
          ACTIVE
        </span>
      )}
    </button>
  )
}

function Toggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: active ? 'var(--green)' : 'var(--border-hi)',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 0.2s',
        border: 'none',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        top: 3, left: active ? 22 : 3,
        width: 18, height: 18,
        borderRadius: '50%',
        background: active ? '#0B0B0F' : 'var(--text-muted)',
        transition: 'left 0.2s',
      }} />
    </button>
  )
}

function StatRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        {label}
      </span>
      <span style={{
        fontSize: 12,
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        color: color ?? 'var(--text)',
      }}>
        {value}
      </span>
    </div>
  )
}
