import { Gauge, Cpu, HardDrive } from 'lucide-react'
import { Card, KpiCard, Legend } from '../components/UI'
import { LineSeries, GroupedBar } from '../components/Charts'
import { falsePositiveData, performanceOverheadData } from '../data'

export default function OperationalPerformance() {
  return (
    <>
      <div className="page-header">
        <div>
          <h2>Operational & Performance Impact Metrics</h2>
          <p>False positive rates and endpoint performance overhead from AV agent activity</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        <KpiCard label="Symantec FP Rate" value={`${falsePositiveData[falsePositiveData.length - 1].symantec}%`} delta="-0.7% WoW" trend="up" icon={<Gauge size={19} />} iconColor="green" />
        <KpiCard label="Trend Micro FP Rate" value={`${falsePositiveData[falsePositiveData.length - 1].trend}%`} delta="-0.5% WoW" trend="up" icon={<Gauge size={19} />} iconColor="green" />
        <KpiCard label="Avg CPU Overhead" value="2.8%" delta="Below 5% target" trend="up" icon={<Cpu size={19} />} iconColor="green" />
        <KpiCard label="Avg Memory Overhead" value="164 MB" delta="Below 256 MB target" trend="up" icon={<HardDrive size={19} />} iconColor="green" />
      </div>

      {/* 1. False Positive Rates */}
      <SectionTitleWrap title="1 · False Positive Rates">
        <Card title="False Positive Rate Trend (6 weeks)" subtitle="Percentage of detections that were benign — lower is better" hint="Weekly">
          <LineSeries
            data={falsePositiveData}
            xKey="week"
            height={300}
            keys={[
              { key: 'symantec', label: 'Symantec EP', color: '#1A1A1A' },
              { key: 'trend', label: 'Trend Micro', color: '#6B6B6B' },
            ]}
          />
          <Legend items={[
            { label: 'Symantec EP', color: '#1A1A1A' },
            { label: 'Trend Micro', color: '#6B6B6B' },
          ]} />
        </Card>
      </SectionTitleWrap>

      {/* 2. Performance Overhead Data */}
      <SectionTitleWrap title="2 · Performance Overhead Data">
        <Card title="Agent Resource Consumption" subtitle="Average overhead per endpoint by metric and vendor" hint="Live sampling">
          <GroupedBar
            data={performanceOverheadData}
            xKey="metric"
            keys={[
              { key: 'symantec', label: 'Symantec EP', color: '#1A1A1A' },
              { key: 'trend', label: 'Trend Micro', color: '#6B6B6B' },
            ]}
            height={300}
          />
          <Legend items={[
            { label: 'Symantec EP', color: '#1A1A1A' },
            { label: 'Trend Micro', color: '#6B6B6B' },
          ]} />
        </Card>
      </SectionTitleWrap>

      {/* Threshold table */}
      <SectionTitleWrap title="Performance Thresholds & Status">
        <Card>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Symantec EP</th>
                  <th>Symantec Target</th>
                  <th>Trend Micro</th>
                  <th>Trend Target</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {perfRows.map((r) => (
                  <tr key={r.metric}>
                    <td style={{ fontWeight: 600 }}>{r.metric}</td>
                    <td className="mono">{r.symantec}</td>
                    <td className="mono" style={{ color: 'var(--text-secondary)' }}>{r.symTarget}</td>
                    <td className="mono">{r.trend}</td>
                    <td className="mono" style={{ color: 'var(--text-secondary)' }}>{r.trendTarget}</td>
                    <td>
                      <span className={`status-badge ${r.statusType}`}>
                        <span className="dot" />
                        {r.status}
                      </span>
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

const perfRows = [
  { metric: 'CPU Usage', symantec: '2.8%', symTarget: '< 5%', trend: '1.9%', trendTarget: '< 4%', status: 'Within Target', statusType: 'success' as const },
  { metric: 'Memory', symantec: '164 MB', symTarget: '< 256 MB', trend: '128 MB', trendTarget: '< 200 MB', status: 'Within Target', statusType: 'success' as const },
  { metric: 'Disk I/O', symantec: '3.8 MB/s', symTarget: '< 8 MB/s', trend: '2.6 MB/s', trendTarget: '< 6 MB/s', status: 'Within Target', statusType: 'success' as const },
  { metric: 'Scan Time', symantec: '36 s', symTarget: '< 60 s', trend: '24 s', trendTarget: '< 45 s', status: 'Within Target', statusType: 'success' as const },
]
