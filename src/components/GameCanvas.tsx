import { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { GameScene } from '../game/scenes/GameScene'
import { GAME_CONFIG } from '../game/config'

let gameInstance: Phaser.Game | null = null

export default function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    if (gameInstance) { gameInstance.destroy(true); gameInstance = null }

    const el = containerRef.current
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      width: el.clientWidth || 900,
      height: GAME_CONFIG.CANVAS_HEIGHT,
      backgroundColor: '#0B0B0F',
      parent: el,
      scene: [GameScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
      },
      render: {
        antialias: true,
        pixelArt: false,
      },
      input: {
        mouse: { preventDefaultDown: false },
        touch: { capture: false },
      },
    }

    gameInstance = new Phaser.Game(config)

    return () => {
      if (gameInstance) { gameInstance.destroy(true); gameInstance = null }
    }
  }, [])

  return (
    <div
      className="game-canvas-wrapper"
      ref={containerRef}
      style={{ height: GAME_CONFIG.CANVAS_HEIGHT }}
    />
  )
}
