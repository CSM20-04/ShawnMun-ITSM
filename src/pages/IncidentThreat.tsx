import { ShieldAlert, ShieldX, Activity, Bug } from 'lucide-react'
import { Card, KpiCard, StatusBadge, Legend } from '../components/UI'
import { AreaSeries, GroupedBar } from '../components/Charts'
import { malwareIndicatorsData, quarantineActions, infectionVectorData, recentThreats } from '../data'

export default function IncidentThreat() {
  const totalThreats = malwareIndicatorsData.reduce((s, d) => s + d.critical + d.high + d.medium + d.low, 0)
  const totalQuarantined = quarantineActions.reduce((s, d) => s + d.count, 0)
  const criticalCount = malwareIndicatorsData.reduce((s, d) => s + d.critical, 0)

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Incident & Threat Telemetry</h2>
          <p>Malware indicators, quarantine actions, and infection root-cause analysis</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        <KpiCard label="Total Threats (7d)" value={String(totalThreats)} delta="+22% vs prior" trend="down" icon={<ShieldAlert size={19} />} iconColor="red" />
        <KpiCard label="Critical Threats" value={String(criticalCount)} delta="+4 today" trend="down" icon={<ShieldX size={19} />} iconColor="red" />
        <KpiCard label="Quarantine Actions" value={String(totalQuarantined)} delta="824 total" trend="up" icon={<Activity size={19} />} iconColor="green" />
        <KpiCard label="Top Vector" value="AI-Phishing" delta="52 incidents" trend="flat" icon={<Bug size={19} />} iconColor="amber" />
      </div>

      {/* 1. Malware Indicators & Hashes */}
      <SectionTitleWrap title="1 · Malware Indicators & Hashes">
        <Card title="Malware Detections by Severity (7 days)" subtitle="Daily count of indicators flagged by Symantec EP & Trend Micro" hint="IoC feed">
          <AreaSeries
            data={malwareIndicatorsData}
            xKey="date"
            height={300}
            keys={[
              { key: 'critical', label: 'Critical', color: '#DC2626' },
              { key: 'high', label: 'High', color: '#D97706' },
              { key: 'medium', label: 'Medium', color: '#D4D4D4' },
              { key: 'low', label: 'Low', color: '#A0A0A0' },
            ]}
          />
          <Legend items={[
            { label: 'Critical', color: '#DC2626' },
            { label: 'High', color: '#D97706' },
            { label: 'Medium', color: '#D4D4D4' },
            { label: 'Low', color: '#A0A0A0' },
          ]} />
        </Card>
      </SectionTitleWrap>

      {/* 2. Quarantine & Action Logs */}
      <SectionTitleWrap title="2 · Quarantine & Action Logs">
        <div className="chart-grid cols-2">
          <Card title="Actions Taken by Type" subtitle="How the AV engines responded to detected threats">
            <GroupedBar
              data={quarantineActions}
              xKey="action"
              keys={[{ key: 'count', label: 'Actions', color: '#1A1A1A' }]}
              height={290}
            />
            <Legend items={[{ label: 'Action Count', color: '#1A1A1A' }]} />
          </Card>
          <Card title="Action Distribution" subtitle="Breakdown of 824 total actions">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 290 }}>
              <GroupedBar
                data={quarantineActions}
                xKey="action"
                keys={[{ key: 'count', label: 'Actions', color: '#1A1A1A' }]}
                horizontal
                height={290}
              />
            </div>
          </Card>
        </div>
      </SectionTitleWrap>

      {/* 3. Infection Root/Vector */}
      <SectionTitleWrap title="3 · Infection Root / Vector">
        <Card title="Infection Vectors" subtitle="How malware entered the environment (last 30 days)" hint="Root-cause">
          <GroupedBar
            data={infectionVectorData}
            xKey="vector"
            keys={[{ key: 'count', label: 'Incidents', color: '#1A1A1A' }]}
            height={300}
          />
          <Legend items={[{ label: 'Incidents', color: '#1A1A1A' }]} />
        </Card>
      </SectionTitleWrap>

      {/* Recent threats table */}
      <SectionTitleWrap title="Recent Threat Detections">
        <Card>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>File Hash</th>
                  <th>Threat Name</th>
                  <th>Source</th>
                  <th>Host</th>
                  <th>Severity</th>
                  <th>Action</th>
                  <th style={{ textAlign: 'right' }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentThreats.map((t, i) => (
                  <tr key={i}>
                    <td className="mono">{t.hash}</td>
                    <td style={{ fontWeight: 600 }}>{t.threat}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{t.source}</td>
                    <td className="mono">{t.host}</td>
                    <td>
                      <StatusBadge status={t.severity === 'Critical' ? 'error' : t.severity === 'High' ? 'warning' : 'neutral'}>
                        {t.severity}
                      </StatusBadge>
                    </td>
                    <td>{t.action}</td>
                    <td style={{ textAlign: 'right', color: 'var(--text-secondary)' }}>{t.time}</td>
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
