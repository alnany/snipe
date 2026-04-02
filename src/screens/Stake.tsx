import { useState } from 'react'
import TopBar from '../components/TopBar'

export default function Stake() {
  const [stakeAmount, setStakeAmount] = useState('1000')
  const [confirmUnstake, setConfirmUnstake] = useState(false)
  const apy = 12.4

  const stakedLoot = 5000
  const earnedSol = 0.840
  const claimable = 0.034

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <TopBar />
      <div className="screen" style={{ padding: 20 }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>

          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Stake $LOOT</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Stake your tokens and earn passive SOL yield from protocol revenue</p>
          </div>

          {/* APY banner */}
          <div style={{
            padding: '18px 24px',
            background: 'linear-gradient(135deg, rgba(20,241,149,0.1) 0%, rgba(20,241,149,0.04) 100%)',
            border: '1px solid rgba(20,241,149,0.25)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            marginBottom: 16,
            flexWrap: 'wrap',
          }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--green)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginBottom: 4 }}>
                CURRENT APY
              </div>
              <div style={{ fontSize: 36, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--green)' }}>
                {apy}%
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                Updates in real-time with protocol volume
              </div>
            </div>
            <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap' }}>
              <ApyStat label="Total Pool Staked" value="4,204,000 LOOT" />
              <ApyStat label="Protocol Volume (24h)" value="892 SOL" />
              <ApyStat label="Your Share" value="0.12%" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {/* My position */}
            <div className="card" style={{ flex: 1, minWidth: 260 }}>
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 14 }}>
                MY POSITION
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <PositionRow label="Staked" value={`${stakedLoot.toLocaleString()} LOOT`} />
                <PositionRow label="Value" value="≈ 2.10 SOL" />
                <PositionRow label="SOL Earned Total" value={`${earnedSol.toFixed(3)} SOL`} color="var(--green)" />
                <PositionRow label="Claimable Now" value={`${claimable.toFixed(3)} SOL`} color="var(--gold)" />
              </div>
              <button
                className="btn btn-primary"
                style={{ marginTop: 16, width: '100%' }}
              >
                CLAIM {claimable.toFixed(3)} SOL
              </button>

              <div className="divider" />

              {/* APY chart placeholder */}
              <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 10 }}>
                APY HISTORY (30D)
              </div>
              <div className="chart-placeholder">
                8% – 24% range · higher volume = higher APY
              </div>
            </div>

            {/* Stake/Unstake panel */}
            <div style={{ flex: 1, minWidth: 260, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Stake more */}
              <div className="card">
                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 14 }}>
                  STAKE MORE
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid var(--border-hi)',
                  borderRadius: 8,
                  overflow: 'hidden',
                  marginBottom: 12,
                }}>
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="Amount"
                    style={{
                      flex: 1,
                      background: 'none',
                      border: 'none',
                      outline: 'none',
                      padding: '10px 14px',
                      color: 'var(--text)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 15,
                      fontWeight: 600,
                    }}
                  />
                  <span style={{
                    padding: '0 14px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: 'var(--green)',
                    fontWeight: 600,
                    borderLeft: '1px solid var(--border)',
                  }}>
                    $LOOT
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                  {[250, 500, 1000, 'MAX'].map((v) => (
                    <button
                      key={v}
                      className="btn btn-ghost"
                      style={{ flex: 1, height: 30, fontSize: 11, padding: 0 }}
                      onClick={() => setStakeAmount(v === 'MAX' ? '1204' : v.toString())}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                <button className="btn btn-primary" style={{ width: '100%' }}>
                  STAKE {stakeAmount || '0'} LOOT
                </button>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8, textAlign: 'center' }}>
                  Earning starts immediately
                </div>
              </div>

              {/* Unstake */}
              <div className="card">
                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 14 }}>
                  UNSTAKE
                </div>
                {!confirmUnstake ? (
                  <>
                    <div style={{
                      padding: '10px 12px',
                      background: 'rgba(255,68,68,0.07)',
                      border: '1px solid rgba(255,68,68,0.2)',
                      borderRadius: 8,
                      marginBottom: 12,
                      fontSize: 12,
                      color: 'var(--text-2)',
                      fontFamily: 'var(--font-mono)',
                      lineHeight: 1.6,
                    }}>
                      ⚠️  7-day cooldown — tokens are locked during withdrawal period.
                    </div>
                    <button
                      className="btn btn-ghost"
                      style={{ width: '100%', borderColor: 'var(--red)', color: 'var(--red)' }}
                      onClick={() => setConfirmUnstake(true)}
                    >
                      UNSTAKE {stakedLoot.toLocaleString()} LOOT
                    </button>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 13, color: 'var(--text)', marginBottom: 14, lineHeight: 1.6 }}>
                      Confirm unstake of <strong>{stakedLoot.toLocaleString()} LOOT</strong>?
                      <br />
                      <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                        Available after 7-day cooldown. You will not earn SOL during this period.
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setConfirmUnstake(false)}>
                        CANCEL
                      </button>
                      <button className="btn btn-danger" style={{ flex: 1 }} onClick={() => setConfirmUnstake(false)}>
                        CONFIRM
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* How staking works */}
          <div className="card" style={{ marginTop: 16 }}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 14 }}>
              HOW STAKING WORKS
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[
                { num: '01', text: 'Stake $LOOT to earn your share of protocol SOL revenue' },
                { num: '02', text: '5% house edge on every wager flows to the SOL treasury' },
                { num: '03', text: 'Every 24h, stakers receive pro-rata SOL distribution' },
                { num: '04', text: 'Higher protocol volume = higher APY. The game funds your yield.' },
              ].map(({ num, text }) => (
                <div key={num} style={{ display: 'flex', gap: 12, flex: 1, minWidth: 180, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)', fontWeight: 700, flexShrink: 0, paddingTop: 2 }}>{num}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ApyStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 14, fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text)' }}>{value}</div>
    </div>
  )
}

function PositionRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{label}</span>
      <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 600, color: color ?? 'var(--text)' }}>{value}</span>
    </div>
  )
}
