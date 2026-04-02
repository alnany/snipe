import TopBar from '../components/TopBar'
import { useGameStore, formatSOL, formatLOOT } from '../store/gameStore'

const LEADERBOARD = [
  { rank: 1, wallet: '8fK2...3xPq', solWon: 284.4,  loot: 24812 },
  { rank: 2, wallet: '3cRt...f1mW', solWon: 91.2,   loot: 8104 },
  { rank: 3, wallet: 'Qv7N...2aLP', solWon: 55.7,   loot: 5240 },
  { rank: 4, wallet: 'nZ4j...8bYc', solWon: 38.1,   loot: 3890 },
  { rank: 5, wallet: 'pX9A...7sKd', solWon: 22.9,   loot: 2204 },
  { rank: 6, wallet: 'Wr5M...1tFe', solWon: 17.4,   loot: 1840 },
  { rank: 7, wallet: 'you',         solWon: 0,       loot: 0, isYou: true },
]

export default function Dashboard() {
  const { solBalance, lootBalance, hitsTotal, shotsTotal, lootEarned, solWon, jackpotPool } = useGameStore()
  const hitRate = shotsTotal > 0 ? ((hitsTotal / shotsTotal) * 100).toFixed(1) : '0.0'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <TopBar />
      <div className="screen" style={{ padding: 20 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>

          {/* Page heading */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Dashboard</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Your portfolio and protocol stats</p>
          </div>

          {/* Top row: portfolio + protocol */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>

            {/* Portfolio card */}
            <div className="card" style={{ flex: 1, minWidth: 260 }}>
              <SectionLabel>WALLET BALANCE</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 12 }}>
                <BalanceRow label="SOL" value={`${formatSOL(solBalance)} SOL`} sub="≈ $XXX" color="var(--text)" />
                <BalanceRow label="$LOOT" value={formatLOOT(lootBalance)} sub="earned in-game" color="var(--green)" />
              </div>
              <div className="divider" />
              <SectionLabel>STAKING POSITION</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
                <StatRow label="Staked LOOT" value="5,000 LOOT" />
                <StatRow label="Est. APY" value="12.4%" color="var(--green)" />
                <StatRow label="SOL Earned" value="0.840 SOL" color="var(--green)" />
                <StatRow label="Claimable" value="0.034 SOL" color="var(--gold)" />
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button className="btn btn-primary" style={{ flex: 1 }}>STAKE MORE</button>
                <button className="btn btn-ghost" style={{ flex: 1 }}>CLAIM SOL</button>
              </div>
            </div>

            {/* Protocol stats card */}
            <div className="card" style={{ flex: 1, minWidth: 260 }}>
              <SectionLabel>$LOOT PROTOCOL</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
                <StatRow label="Total Supply" value="10,000,000" />
                <StatRow label="Circulating" value="7,842,001" />
                <div>
                  <StatRow label="Total Burned" value="2,157,999  (21.6%)" color="var(--red)" />
                  <div className="progress-bar" style={{ marginTop: 6 }}>
                    <div className="progress-fill" style={{ width: '21.6%', background: 'var(--red)' }} />
                  </div>
                </div>
                <StatRow label="Jackpot Pool" value={`${jackpotPool.toFixed(2)} SOL`} color="var(--gold)" />
              </div>
              <div className="divider" />
              <SectionLabel>LAST BUYBACK</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
                <div style={{
                  padding: '10px 12px',
                  background: 'rgba(20,241,149,0.06)',
                  border: '1px solid rgba(20,241,149,0.15)',
                  borderRadius: 8,
                }}>
                  <div style={{ fontSize: 12, color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    +22,450 $LOOT bought
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3, fontFamily: 'var(--font-mono)' }}>
                    11,225 burned · 11,225 to rewards pool
                  </div>
                </div>
                <StatRow label="Buybacks (24h)" value="47 SOL" />
                <StatRow label="Next Buyback" value="00:47:12" color="var(--text)" />
              </div>
              <button className="btn btn-ghost" style={{ marginTop: 14, width: '100%', fontSize: 11 }}>
                VIEW ON SOLSCAN →
              </button>
            </div>
          </div>

          {/* Session + Leaderboard row */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>

            {/* Session stats */}
            <div className="card" style={{ flex: 1, minWidth: 220 }}>
              <SectionLabel>YOUR SESSION</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
                <StatRow label="Shots fired" value={shotsTotal.toString()} />
                <StatRow label="Kills" value={`${hitsTotal}  (${hitRate}%)`} />
                <StatRow label="SOL Won" value={`${formatSOL(solWon)} SOL`} color="var(--green)" />
                <StatRow label="$LOOT Earned" value={formatLOOT(lootEarned)} color="var(--green)" />
              </div>
              <div className="divider" />
              <div className="chart-placeholder" style={{ marginTop: 4 }}>P&L chart — mainnet</div>
            </div>

            {/* Leaderboard */}
            <div className="card" style={{ flex: 2, minWidth: 320 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <SectionLabel>TODAY'S TOP SNIPERS</SectionLabel>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>24H</span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['#', 'WALLET', 'SOL WON', '$LOOT'].map((h) => (
                      <th key={h} style={{
                        padding: '4px 12px 8px',
                        textAlign: 'left',
                        fontSize: 10,
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        color: 'var(--text-muted)',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LEADERBOARD.map((row) => (
                    <tr
                      key={row.rank}
                      style={{
                        borderBottom: '1px solid rgba(42,42,58,0.4)',
                        background: row.isYou ? 'rgba(20,241,149,0.04)' : undefined,
                      }}
                    >
                      <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: 12, color: row.rank <= 3 ? 'var(--gold)' : 'var(--text-muted)' }}>
                        {row.rank === 1 ? '🥇' : row.rank === 2 ? '🥈' : row.rank === 3 ? '🥉' : row.rank}
                      </td>
                      <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: 12, color: row.isYou ? 'var(--green)' : 'var(--text)' }}>
                        {row.isYou ? 'you  ◀' : row.wallet}
                      </td>
                      <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--green)' }}>
                        {row.isYou ? formatSOL(solWon) : `+${row.solWon}`} SOL
                      </td>
                      <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-2)' }}>
                        {row.isYou ? formatLOOT(lootEarned) : row.loot.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="btn btn-ghost" style={{ marginTop: 14, width: '100%', fontSize: 11 }}>
                FULL LEADERBOARD
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 10,
      fontFamily: 'var(--font-mono)',
      fontWeight: 600,
      letterSpacing: '0.1em',
      color: 'var(--text-muted)',
    }}>
      {children}
    </div>
  )
}

function BalanceRow({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>{label}</span>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 15, fontFamily: 'var(--font-mono)', fontWeight: 700, color }}>{value}</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{sub}</div>
      </div>
    </div>
  )
}

function StatRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{label}</span>
      <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 600, color: color ?? 'var(--text)' }}>{value}</span>
    </div>
  )
}
