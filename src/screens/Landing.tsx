import { useGameStore } from '../store/gameStore'

const TICKER_ITEMS = [
  '💰 TOTAL WAGERED: 14,892 SOL',
  '🔥 $LOOT BURNED: 2,340,112',
  '🏆 JACKPOT POOL: 47 SOL',
  '👑 LAST MOONSHOT: 22 min ago',
  '📈 $LOOT PRICE: 0.0000214 SOL',
  '⚡ ACTIVE SNIPERS: 1,247',
  '🎯 KILLS TODAY: 48,392',
  '🔁 LAST BUYBACK: +22,450 $LOOT burned',
]

export default function Landing() {
  const { setScreen, connectWallet } = useGameStore()

  const handleConnect = () => {
    connectWallet()
    setScreen('game')
  }

  const handleDemo = () => {
    setScreen('game')
  }

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: 'var(--bg)',
    }}>
      {/* Nav */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        height: 60,
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: 'var(--green)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16,
          }}>🎯</div>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: '0.08em',
          }}>SNIPE</span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" onClick={handleDemo}>PLAY DEMO</button>
          <button className="btn btn-primary" onClick={handleConnect}>CONNECT WALLET</button>
        </div>
      </header>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Hero */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px 60px',
          textAlign: 'center',
          gap: 24,
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 14px',
            borderRadius: 20,
            border: '1px solid rgba(20,241,149,0.3)',
            background: 'rgba(20,241,149,0.07)',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--green)',
            letterSpacing: '0.06em',
          }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)', animation: 'pulse-green 1.8s infinite' }} />
            LIVE ON SOLANA · DEMO MODE
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            maxWidth: 700,
          }}>
            SNIPE MEMECOINS.
            <br />
            <span style={{ color: 'var(--green)' }}>EARN REAL SOL.</span>
          </h1>

          {/* Sub */}
          <p style={{
            fontSize: 18,
            color: 'var(--text-2)',
            maxWidth: 500,
            lineHeight: 1.6,
          }}>
            The only GambleFi game where the house<br />buys your token — on every single shot.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              className="btn btn-primary"
              style={{ height: 52, fontSize: 15, padding: '0 32px', borderRadius: 10 }}
              onClick={handleConnect}
            >
              CONNECT WALLET
            </button>
            <button
              className="btn btn-ghost"
              style={{ height: 52, fontSize: 15, padding: '0 32px', borderRadius: 10 }}
              onClick={handleDemo}
            >
              ▷  PLAY DEMO
            </button>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'flex',
            gap: 40,
            marginTop: 16,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <HeroStat label="TOTAL WAGERED" value="14,892 SOL" />
            <HeroStat label="$LOOT BURNED" value="2.34M" />
            <HeroStat label="JACKPOT POOL" value="47 SOL" />
            <HeroStat label="ACTIVE PLAYERS" value="1,247" />
          </div>
        </div>

        {/* Ticker tape */}
        <div style={{
          overflow: 'hidden',
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '10px 0',
        }}>
          <div className="ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: 'var(--text-2)',
                  paddingRight: 60,
                  letterSpacing: '0.04em',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div style={{ padding: '60px 24px', maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.12em',
            color: 'var(--text-muted)',
            marginBottom: 32,
            textAlign: 'center',
          }}>
            HOW IT WORKS
          </h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <HowCard
              num="01"
              icon="🎯"
              title="Load bullets"
              desc="Buy bullets with SOL. 0.01 SOL minimum per shot. No limits — one shot or a thousand."
            />
            <HowCard
              num="02"
              icon="🔫"
              title="Snipe memecoins"
              desc="Hit targets to win SOL back. Every kill drops $LOOT. Rare targets = bigger payouts."
            />
            <HowCard
              num="03"
              icon="🔥"
              title="Protocol burns your token"
              desc="5% house edge funds continuous $LOOT buybacks. 50% burned forever. 50% back to players."
            />
          </div>
        </div>

        {/* Fair launch callout */}
        <div style={{
          margin: '0 24px 40px',
          maxWidth: 900,
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '28px 32px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 16,
        }}>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
            <FairItem icon="🚀" title="100% Fair Launch" desc="0% team tokens. Every $LOOT was earned by a player or bought on the open market." />
            <FairItem icon="🔒" title="Provably Fair" desc="On-chain VRF via Switchboard. Every shot is publicly verifiable. No manipulation possible." />
            <FairItem icon="♾️" title="Perpetual Rewards" desc="Kill drops never stop. Protocol revenue funds buybacks → tokens recycled back to players." />
          </div>
        </div>

        {/* Target tiers */}
        <div style={{ padding: '0 24px 60px', maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.12em',
            color: 'var(--text-muted)',
            marginBottom: 24,
            textAlign: 'center',
          }}>
            TARGET TIERS
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['TIER', 'TARGETS', 'HIT RATE', 'SOL PAYOUT', '$LOOT DROP'].map((h) => (
                    <th key={h} style={{ padding: '8px 16px', color: 'var(--text-muted)', fontWeight: 600, fontSize: 11, letterSpacing: '0.06em', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { tier: 'COMMON', targets: 'PEPE · BONK · SHIB', rate: '60%', sol: '0.9×', loot: '1–3', color: 'var(--text-muted)' },
                  { tier: 'MID', targets: 'DOGE · WIF · FLOKI', rate: '38%', sol: '1.55×', loot: '5–15', color: '#C3A634' },
                  { tier: 'RARE', targets: 'BRETT · MOG', rate: '18%', sol: '3×', loot: '20–50', color: '#4A90E2' },
                  { tier: 'EPIC', targets: 'POPCAT · MEME', rate: '8%', sol: '8×', loot: '100–200', color: '#FF69B4' },
                  { tier: '👑 BOSS', targets: 'MOONSHOT', rate: '—', sol: 'JACKPOT', loot: '500–2000', color: '#FFD700' },
                ].map((row) => (
                  <tr key={row.tier} style={{ borderBottom: '1px solid rgba(42,42,58,0.5)' }}>
                    <td style={{ padding: '12px 16px', color: row.color, fontWeight: 600 }}>{row.tier}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-2)' }}>{row.targets}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text)' }}>{row.rate}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--green)' }}>{row.sol}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--green)' }}>{row.loot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer CTA */}
        <div style={{
          padding: '40px 24px 60px',
          textAlign: 'center',
          borderTop: '1px solid var(--border)',
        }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
            Ready to snipe?
          </h2>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ height: 48, fontSize: 14, padding: '0 28px' }} onClick={handleConnect}>
              CONNECT WALLET
            </button>
            <button className="btn btn-ghost" style={{ height: 48, fontSize: 14, padding: '0 28px' }} onClick={handleDemo}>
              TRY DEMO FIRST
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 22, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text)' }}>
        {value}
      </div>
    </div>
  )
}

function HowCard({ num, icon, title, desc }: { num: string; icon: string; title: string; desc: string }) {
  return (
    <div style={{
      flex: 1, minWidth: 240, maxWidth: 280,
      padding: '24px',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--green)',
          fontWeight: 700,
          letterSpacing: '0.06em',
        }}>{num}</span>
        <span style={{ fontSize: 22 }}>{icon}</span>
      </div>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{title}</div>
      <div style={{ color: 'var(--text-2)', fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
    </div>
  )
}

function FairItem({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div style={{ flex: 1, minWidth: 200, maxWidth: 260, textAlign: 'center' }}>
      <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{title}</div>
      <div style={{ color: 'var(--text-2)', fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
    </div>
  )
}
