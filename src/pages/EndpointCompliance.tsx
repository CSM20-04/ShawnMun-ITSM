import { ShieldCheck, ShieldAlert, Clock } from 'lucide-react'
import { Card, KpiCard, StatusBadge, Legend } from '../components/UI'
import { GroupedBar, Donut, AreaSeries } from '../components/Charts'
import {
  agentStatusData, agentStatusTotals, signatureAgeData, patchLevelData,
  softwareVersioningData,
} from '../data'

export default function EndpointCompliance() {
  return (
    <>
      <div className="page-header">
        <div>
          <h2>Endpoint Compliance & Asset Health</h2>
          <p>Antivirus agent status, definition freshness, OS patch levels, and software versioning</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        <KpiCard label="Agents Healthy" value={String(agentStatusTotals.healthy)} delta="92.0% coverage" trend="up" icon={<ShieldCheck size={19} />} iconColor="green" />
        <KpiCard label="Agents Outdated" value={String(agentStatusTotals.outdated)} delta="2.3% of fleet" trend="down" icon={<ShieldAlert size={19} />} iconColor="amber" />
        <KpiCard label="Agents Offline" value={String(agentStatusTotals.offline)} delta="0.9% of fleet" trend="flat" icon={<Clock size={19} />} iconColor="dark" />
        <KpiCard label="Agents Disabled" value={String(agentStatusTotals.disabled)} delta="4.8% of fleet" trend="down" icon={<ShieldAlert size={19} />} iconColor="red" />
      </div>

      {/* 1. Antivirus Agent Status */}
      <SectionTitleWrap title="1 · Antivirus Agent Status">
        <div className="chart-grid cols-2">
          <Card title="Agent Status by Platform" subtitle="Endpoint count per protection vendor & state" hint="4,101 endpoints">
            <GroupedBar
              data={agentStatusData}
              xKey="name"
              stacked
              height={290}
              keys={[
                { key: 'healthy', label: 'Healthy', color: '#1A1A1A' },
                { key: 'outdated', label: 'Outdated', color: '#D97706' },
                { key: 'offline', label: 'Offline', color: '#A0A0A0' },
                { key: 'disabled', label: 'Disabled', color: '#DC2626' },
              ]}
            />
            <Legend items={[
              { label: 'Healthy', color: '#1A1A1A' },
              { label: 'Outdated', color: '#D97706' },
              { label: 'Offline', color: '#A0A0A0' },
              { label: 'Disabled', color: '#DC2626' },
            ]} />
          </Card>
          <Card title="Agent Health Distribution" subtitle="Share of endpoints by agent health">
            <Donut
              data={[
                { name: 'Healthy', value: agentStatusTotals.healthy, color: '#16A34A' },
                { name: 'Outdated', value: agentStatusTotals.outdated, color: '#D97706' },
                { name: 'Offline', value: agentStatusTotals.offline, color: '#A0A0A0' },
                { name: 'Disabled', value: agentStatusTotals.disabled, color: '#DC2626' },
              ]}
              height={290}
            />
            <Legend items={[
              { label: 'Healthy', color: '#16A34A' },
              { label: 'Outdated', color: '#D97706' },
              { label: 'Offline', color: '#A0A0A0' },
              { label: 'Disabled', color: '#DC2626' },
            ]} />
          </Card>
        </div>
      </SectionTitleWrap>

      {/* 2. Definition / Signature Age */}
      <SectionTitleWrap title="2 · Definition / Signature Age">
        <div className="chart-grid cols-2">
          <Card title="Signature Age Distribution" subtitle="How stale are antivirus definitions across the fleet?" hint="Updated 09:30 UTC">
            <GroupedBar
              data={signatureAgeData}
              xKey="range"
              keys={[{ key: 'count', label: 'Endpoints', color: '#1A1A1A' }]}
              height={290}
            />
            <Legend items={[{ label: 'Endpoints', color: '#1A1A1A' }]} />
          </Card>
          <Card title="Signature Age Breakdown" subtitle="Percentage of fleet by freshness bucket">
            <Donut
              data={signatureAgeData.map((d, i) => ({
                name: d.range,
                value: d.count,
                color: ['#16A34A', '#86EFAC', '#D97706', '#FCD34D', '#DC2626'][i],
              }))}
              height={290}
            />
            <Legend items={signatureAgeData.map((d, i) => ({
              label: `${d.range} (${d.pct}%)`,
              color: ['#16A34A', '#86EFAC', '#D97706', '#FCD34D', '#DC2626'][i],
            }))} />
          </Card>
        </div>
      </SectionTitleWrap>

      {/* 3. OS & Patch Level Compliance */}
      <SectionTitleWrap title="3 · OS & Patch Level Compliance">
        <Card title="Patch Level by Operating System" subtitle="Current vs. N-1, N-2, and older patch versions">
          <GroupedBar
            data={patchLevelData}
            xKey="os"
            stacked
            height={300}
            keys={[
              { key: 'current', label: 'Current', color: '#1A1A1A' },
              { key: 'n1', label: 'N-1', color: '#6B6B6B' },
              { key: 'n2', label: 'N-2', color: '#A0A0A0' },
              { key: 'older', label: 'Older', color: '#DC2626' },
            ]}
          />
          <Legend items={[
            { label: 'Current', color: '#1A1A1A' },
            { label: 'N-1', color: '#6B6B6B' },
            { label: 'N-2', color: '#A0A0A0' },
            { label: 'Older', color: '#DC2626' },
          ]} />
        </Card>
      </SectionTitleWrap>

      {/* 4. Software Versioning */}
      <SectionTitleWrap title="4 · Software Versioning">
        <div className="chart-grid cols-2">
          <Card title="Software Currency by Category" subtitle="Percentage of installed software that is up-to-date vs. behind">
            <GroupedBar
              data={softwareVersioningData}
              xKey="name"
              stacked
              height={290}
              keys={[
                { key: 'upToDate', label: 'Up to Date', color: '#16A34A' },
                { key: 'behind1', label: 'Behind 1 version', color: '#D97706' },
                { key: 'behind2Plus', label: 'Behind 2+ versions', color: '#DC2626' },
              ]}
            />
            <Legend items={[
              { label: 'Up to Date', color: '#16A34A' },
              { label: 'Behind 1 version', color: '#D97706' },
              { label: 'Behind 2+ versions', color: '#DC2626' },
            ]} />
          </Card>
          <Card title="Versioning Trend (last 6 weeks)" subtitle="Overall % of software that is up-to-date">
            <AreaSeries
              data={[
                { week: 'W-5', pct: 62 },
                { week: 'W-4', pct: 64 },
                { week: 'W-3', pct: 67 },
                { week: 'W-2', pct: 69 },
                { week: 'W-1', pct: 67 },
                { week: 'Now', pct: 71 },
              ]}
              xKey="week"
              keys={[{ key: 'pct', label: '% Up to Date', color: '#1A1A1A' }]}
              height={290}
            />
            <Legend items={[{ label: '% Up to Date', color: '#1A1A1A' }]} />
          </Card>
        </div>
      </SectionTitleWrap>

      {/* Asset detail table */}
      <SectionTitleWrap title="Asset Compliance Detail">
        <Card>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Hostname</th>
                  <th>Agent</th>
                  <th>Signature Age</th>
                  <th>OS Patch</th>
                  <th>Software</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {assetRows.map((r) => (
                  <tr key={r.host}>
                    <td className="mono">{r.host}</td>
                    <td>{r.agent}</td>
                    <td>{r.sigAge}</td>
                    <td>{r.patch}</td>
                    <td>{r.sw}</td>
                    <td>
                      <StatusBadge status={r.statusType}>{r.status}</StatusBadge>
                    </td>
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

const assetRows = [
  { host: 'WS-0412', agent: 'Symantec EP', sigAge: '< 24h', patch: 'Current', sw: 'Up to Date', status: 'Compliant', statusType: 'success' as const },
  { host: 'WS-0188', agent: 'Trend Micro', sigAge: '< 24h', patch: 'N-1', sw: 'Behind 1', status: 'Warning', statusType: 'warning' as const },
  { host: 'WS-0203', agent: 'Symantec EP', sigAge: '3 days', patch: 'Current', sw: 'Up to Date', status: 'Compliant', statusType: 'success' as const },
  { host: 'WS-0377', agent: 'Trend Micro', sigAge: '6 days', patch: 'N-2', sw: 'Behind 2+', status: 'Non-Compliant', statusType: 'error' as const },
  { host: 'WS-0519', agent: 'Symantec EP', sigAge: '< 24h', patch: 'Current', sw: 'Up to Date', status: 'Compliant', statusType: 'success' as const },
  { host: 'WS-0091', agent: 'Trend Micro', sigAge: '1 day', patch: 'N-1', sw: 'Behind 1', status: 'Warning', statusType: 'warning' as const },
  { host: 'WS-0264', agent: 'Symantec EP', sigAge: '14 days', patch: 'Older', sw: 'Behind 2+', status: 'Non-Compliant', statusType: 'error' as const },
  { host: 'WS-0301', agent: 'Trend Micro', sigAge: '< 24h', patch: 'Current', sw: 'Up to Date', status: 'Compliant', statusType: 'success' as const },
]
