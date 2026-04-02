import { Suspense, lazy } from 'react'
import TopBar from '../components/TopBar'
import JackpotBar from '../components/JackpotBar'
import WagerPanel from '../components/WagerPanel'
import KillFeed from '../components/KillFeed'
import KillToastOverlay from '../components/KillToast'
import { useGameStore } from '../store/gameStore'
import { BULLET_SIZES } from '../game/config'

// Lazy-load Phaser to avoid SSR issues
const GameCanvas = lazy(() => import('../components/GameCanvas'))

export default function Game() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
    }}>
      <TopBar />
      <JackpotBar />

      {/* Main game area */}
      <div style={{
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
        minHeight: 0,
      }}>
        {/* Canvas + kill feed column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <Suspense fallback={<CanvasPlaceholder />}>
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
              <GameCanvas />
            </div>
          </Suspense>
          <KillFeed />
        </div>

        {/* Wager panel (desktop sidebar) */}
        <div className="hide-mobile" style={{ display: 'flex' }}>
          <WagerPanel />
        </div>

        {/* Kill toasts overlay (absolute, inside canvas area) */}
        <KillToastOverlay />
      </div>

      {/* Mobile wager bar */}
      <MobileWagerBar />
    </div>
  )
}

function CanvasPlaceholder() {
  return (
    <div style={{
      flex: 1,
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      height: '100%',
    }}>
      Loading game engine...
    </div>
  )
}

function MobileWagerBar() {
  const { bulletSize, setBulletSize } = useGameStore()

  return (
    <div className="show-mobile" style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 12px',
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      paddingBottom: 'calc(8px + env(safe-area-inset-bottom))',
      overflowX: 'auto',
    }}>
      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
        BULLET:
      </span>
      {BULLET_SIZES.map((size) => (
        <button
          key={size}
          onClick={() => setBulletSize(size)}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid ' + (bulletSize === size ? 'var(--green)' : 'var(--border)'),
            background: bulletSize === size ? 'rgba(20,241,149,0.1)' : 'transparent',
            color: bulletSize === size ? 'var(--green)' : 'var(--text-2)',
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            flexShrink: 0,
            minHeight: 36,
          }}
        >
          {size.toFixed(2)}
        </button>
      ))}
    </div>
  )
}
