import { useGameStore } from '../store/gameStore'
import type { Screen } from '../store/gameStore'

const NAV_ITEMS: { label: string; icon: string; screen: Screen }[] = [
  { label: 'SNIPE', icon: '🎯', screen: 'game' },
  { label: 'DASH',  icon: '📊', screen: 'dashboard' },
  { label: 'STAKE', icon: '⚡', screen: 'stake' },
]

export default function BottomNav() {
  const { screen, setScreen } = useGameStore()

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map((item) => {
        const active = screen === item.screen
        return (
          <button
            key={item.screen}
            onClick={() => setScreen(item.screen)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: active ? 'var(--green)' : 'var(--text-muted)',
              borderTop: active ? '2px solid var(--green)' : '2px solid transparent',
              transition: 'color 0.15s',
            }}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>{item.icon}</span>
            <span style={{
              fontSize: 10,
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              letterSpacing: '0.06em',
            }}>
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
