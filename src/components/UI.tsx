import type { ReactNode } from 'react'

// ---------- Card ----------
export function Card({
  title,
  subtitle,
  hint,
  children,
  headerExtra,
  style,
}: {
  title?: string
  subtitle?: string
  hint?: string
  children: ReactNode
  headerExtra?: ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div className="card" style={style}>
      {title && (
        <div className="card-header">
          <div>
            <div className="card-title">{title}</div>
            {subtitle && <div className="card-subtitle">{subtitle}</div>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {hint && <span className="chart-hint">{hint}</span>}
            {headerExtra}
          </div>
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  )
}

// ---------- KPI Card ----------
export function KpiCard({
  label,
  value,
  delta,
  trend,
  icon,
  iconColor = 'dark',
}: {
  label: string
  value: string
  delta: string
  trend: 'up' | 'down' | 'flat'
  icon: ReactNode
  iconColor?: 'green' | 'red' | 'amber' | 'dark'
}) {
  const trendIcon =
    trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'
  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <div className="kpi-label">{label}</div>
        <div className={`kpi-icon ${iconColor}`}>{icon}</div>
      </div>
      <div className="kpi-value">{value}</div>
      <div className={`kpi-trend ${trend}`}>
        <span>{trendIcon}</span>
        <span>{delta}</span>
      </div>
    </div>
  )
}

// ---------- Status Badge ----------
export function StatusBadge({
  status,
  children,
}: {
  status: 'success' | 'warning' | 'error' | 'neutral'
  children: ReactNode
}) {
  return (
    <span className={`status-badge ${status}`}>
      <span className="dot" />
      {children}
    </span>
  )
}

// ---------- Section title ----------
export function SectionTitle({ children }: { children: ReactNode }) {
  return <div className="section-title">{children}</div>
}

// ---------- Legend ----------
export function Legend({
  items,
}: {
  items: { label: string; color: string }[]
}) {
  return (
    <div className="legend-row">
      {items.map((item) => (
        <div className="legend-item" key={item.label}>
          <span className="legend-dot" style={{ background: item.color }} />
          {item.label}
        </div>
      ))}
    </div>
  )
}
