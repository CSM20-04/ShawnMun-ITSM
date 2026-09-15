import {
  Shield, ShieldAlert, ShieldCheck, Clock, Download, RefreshCw,
} from 'lucide-react'
import { Card, KpiCard, StatusBadge, SectionTitle, Legend } from '../components/UI'
import { ComposedSeries, Donut } from '../components/Charts'
import {
  overviewKPIs, overviewTrend, overviewAgentDistribution, recentActivity,
  lastUpdated,
} from '../data'

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield size={19} />,
  alert: <ShieldAlert size={19} />,
  check: <ShieldCheck size={19} />,
  clock: <Clock size={19} />,
}

export default function Overview() {
  return (
    <>
      <div className="page-header">
        <div>
          <h2>Security Operations Overview</h2>
          <p>Unified telemetry across Symantec EP & Trend Micro · Last updated {lastUpdated}</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-ghost">
            <Download size={15} /> Export Report
          </button>
          <button className="btn btn-primary">
            <RefreshCw size={15} /> Refresh
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        {overviewKPIs.map((k) => (
          <KpiCard
            key={k.label}
            label={k.label}
            value={k.value}
            delta={k.delta}
            trend={k.trend as 'up' | 'down' | 'flat'}
            icon={iconMap[k.icon]}
            iconColor={
              k.icon === 'alert' ? 'red' : k.icon === 'check' ? 'green' : k.icon === 'clock' ? 'amber' : 'dark'
            }
          />
        ))}
      </div>

      {/* Weekly trend + Agent distribution */}
      <div className="chart-grid cols-2">
        <Card
          title="Weekly Threat & Scan Activity"
          subtitle="Blocked events vs. threats detected (last 7 days)"
          hint="Live"
        >
          <ComposedSeries
            data={overviewTrend}
            xKey="day"
            barKeys={[{ key: 'blocked', label: 'Blocked', color: '#D4D4D4' }]}
            areaKeys={[{ key: 'threats', label: 'Threats', color: '#DC2626' }]}
            height={290}
          />
          <Legend
            items={[
              { label: 'Threats Detected', color: '#DC2626' },
              { label: 'Blocked Events', color: '#D4D4D4' },
              { label: 'Total Scans (area under)', color: '#1A1A1A' },
            ]}
          />
        </Card>

        <Card
          title="Endpoint Agent Distribution"
          subtitle="4,101 total endpoints by protection agent"
        >
          <Donut data={overviewAgentDistribution} height={290} />
          <Legend
            items={[
              { label: 'Symantec EP', color: '#1A1A1A' },
              { label: 'Trend Micro', color: '#6B6B6B' },
              { label: 'CrowdStrike', color: '#A0A0A0' },
              { label: 'MS Defender', color: '#B8B8B8' },
              { label: 'Unmanaged', color: '#D4D4D4' },
            ]}
          />
        </Card>
      </div>

      {/* Recent activity */}
      <SectionTitle>Recent Security Activity</SectionTitle>
      <Card>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Source</th>
                <th>Severity</th>
                <th style={{ textAlign: 'right' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((a, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{a.event}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{a.source}</td>
                  <td>
                    <StatusBadge
                      status={
                        a.severity === 'critical' ? 'error' :
                        a.severity === 'warning' ? 'warning' :
                        a.severity === 'success' ? 'success' : 'neutral'
                      }
                    >
                      {a.severity.charAt(0).toUpperCase() + a.severity.slice(1)}
                    </StatusBadge>
                  </td>
                  <td style={{ textAlign: 'right', color: 'var(--text-secondary)' }}>{a.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}
