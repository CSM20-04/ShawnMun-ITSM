import { Activity, GitBranch, Network, AlertTriangle } from 'lucide-react'
import { Card, KpiCard, StatusBadge, Legend } from '../components/UI'
import { LineSeries, GroupedBar } from '../components/Charts'
import { processSpikesData, systemAlterationsData, exfiltrationTrapsData, anomaliesLog } from '../data'

export default function BehavioralAnomaly() {
  const maxSpike = Math.max(...processSpikesData.map(d => Math.max(d.symantec, d.trend)))
  const totalAlterations = systemAlterationsData.reduce((s, d) => s + d.attempted, 0)
  const blockedAlterations = systemAlterationsData.reduce((s, d) => s + d.blocked, 0)
  const totalExfil = exfiltrationTrapsData.reduce((s, d) => s + d.symantec + d.trend + d.canary, 0)

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Behavioral & Anomaly Detection Logs</h2>
          <p>Process execution spikes, unauthorized system alterations, and network exfiltration traps</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        <KpiCard label="Peak Process Spike" value={`${maxSpike}`} delta="690 exec/min" trend="down" icon={<Activity size={19} />} iconColor="red" />
        <KpiCard label="Alterations Blocked" value={`${blockedAlterations}/${totalAlterations}`} delta="87.0% blocked" trend="up" icon={<GitBranch size={19} />} iconColor="green" />
        <KpiCard label="Exfil Traps Triggered" value={String(totalExfil)} delta="7-hour window" trend="down" icon={<Network size={19} />} iconColor="amber" />
        <KpiCard label="Active Anomalies" value="6" delta="+1 today" trend="down" icon={<AlertTriangle size={19} />} iconColor="red" />
      </div>

      {/* 1. Process and Execution Spikes */}
      <SectionTitleWrap title="1 · Process and Execution Spikes">
        <Card title="Process Execution Rate (24h)" subtitle="Processes spawned per minute vs. baseline — Symantec EP & Trend Micro" hint="Anomaly zone">
          <LineSeries
            data={processSpikesData}
            xKey="time"
            height={300}
            keys={[
              { key: 'symantec', label: 'Symantec EP', color: '#1A1A1A' },
              { key: 'trend', label: 'Trend Micro', color: '#6B6B6B' },
              { key: 'baseline', label: 'Baseline', color: '#DC2626' },
            ]}
          />
          <Legend items={[
            { label: 'Symantec EP', color: '#1A1A1A' },
            { label: 'Trend Micro', color: '#6B6B6B' },
            { label: 'Baseline', color: '#DC2626' },
          ]} />
        </Card>
      </SectionTitleWrap>

      {/* 2. Unauthorized System Alterations */}
      <SectionTitleWrap title="2 · Unauthorized System Alterations">
        <Card title="System Alterations by Category" subtitle="Attempted vs. blocked alterations across the fleet">
          <GroupedBar
            data={systemAlterationsData}
            xKey="category"
            stacked
            height={300}
            keys={[
              { key: 'blocked', label: 'Blocked', color: '#16A34A' },
              { key: 'allowed', label: 'Allowed', color: '#DC2626' },
            ]}
          />
          <Legend items={[
            { label: 'Blocked', color: '#16A34A' },
            { label: 'Allowed (suspicious)', color: '#DC2626' },
          ]} />
        </Card>
      </SectionTitleWrap>

      {/* 3. Network Exfiltration Traps */}
      <SectionTitleWrap title="3 · Network Exfiltration Traps">
        <Card title="Exfiltration Trap Hits (by hour)" subtitle="Canary traps and DLP rules triggered — Symantec EP & Trend Micro">
          <GroupedBar
            data={exfiltrationTrapsData}
            xKey="hour"
            stacked
            height={300}
            keys={[
              { key: 'symantec', label: 'Symantec EP', color: '#1A1A1A' },
              { key: 'trend', label: 'Trend Micro', color: '#6B6B6B' },
              { key: 'canary', label: 'Canary Traps', color: '#DC2626' },
            ]}
          />
          <Legend items={[
            { label: 'Symantec EP', color: '#1A1A1A' },
            { label: 'Trend Micro', color: '#6B6B6B' },
            { label: 'Canary Traps', color: '#DC2626' },
          ]} />
        </Card>
      </SectionTitleWrap>

      {/* Anomaly log table */}
      <SectionTitleWrap title="Anomaly Detection Log">
        <Card>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Host</th>
                  <th>Event</th>
                  <th>Type</th>
                  <th>Source</th>
                  <th>Severity</th>
                  <th style={{ textAlign: 'right' }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {anomaliesLog.map((a, i) => (
                  <tr key={i}>
                    <td className="mono">{a.host}</td>
                    <td style={{ fontWeight: 500 }}>{a.event}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{a.type}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{a.source}</td>
                    <td>
                      <StatusBadge status={a.severity === 'Critical' ? 'error' : 'warning'}>
                        {a.severity}
                      </StatusBadge>
                    </td>
                    <td style={{ textAlign: 'right', color: 'var(--text-secondary)' }}>{a.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </SectionTitleWrap>
    </>
  )
}

function SectionTitleWrap({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <div className="section-title">{title}</div>
      {children}
    </>
  )
}
