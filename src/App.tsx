import { useGameStore } from './store/gameStore'
import Landing from './screens/Landing'
import Game from './screens/Game'
import Dashboard from './screens/Dashboard'
import Stake from './screens/Stake'
import BottomNav from './components/BottomNav'

export default function App() {
  const screen = useGameStore((s) => s.screen)

  return (
    <div className="app-shell">
      {screen === 'landing' && <Landing />}
      {screen === 'game'    && <Game />}
      {screen === 'dashboard' && <Dashboard />}
      {screen === 'stake'   && <Stake />}
      {screen !== 'landing' && <BottomNav />}
    </div>
  )
}
