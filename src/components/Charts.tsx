import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar,
  Legend,
  ComposedChart,
} from 'recharts'

// ---------- Color palette ----------
export const COLORS = {
  primary: '#1A1A1A',
  secondary: '#6B6B6B',
  light: '#A0A0A0',
  lighter: '#D4D4D4',
  success: '#16A34A',
  warning: '#D97706',
  error: '#DC2626',
  blue: '#3B82F6',
  symantec: '#1A1A1A',
  trend: '#6B6B6B',
  canary: '#DC2626',
}

const axisStyle = { fontSize: 11, fill: '#6B6B6B' }

// ---------- Grouped / stacked bar ----------
export function GroupedBar({
  data,
  keys,
  xKey = 'name',
  height = 280,
  stacked = false,
  horizontal = false,
}: {
  data: any[]
  keys: { key: string; label: string; color: string }[]
  xKey?: string
  height?: number
  stacked?: boolean
  horizontal?: boolean
}) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout={horizontal ? 'vertical' : 'horizontal'}
          margin={{ top: 8, right: 12, left: horizontal ? 60 : -12, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={!horizontal} horizontal={horizontal} />
          {horizontal ? (
            <>
              <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey={xKey} tick={axisStyle} axisLine={false} tickLine={false} width={90} />
            </>
          ) : (
            <>
              <XAxis dataKey={xKey} tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
            </>
          )}
          <Tooltip
            cursor={{ fill: 'rgba(0,0,0,0.03)' }}
            contentStyle={{ borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)', fontSize: 12 }}
          />
          {keys.map((k) => (
            <Bar
              key={k.key}
              dataKey={k.key}
              name={k.label}
              stackId={stacked ? 'a' : undefined}
              fill={k.color}
              radius={horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
              maxBarSize={horizontal ? 22 : 42}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ---------- Donut ----------
export function Donut({
  data,
  height = 260,
  innerRadius = 55,
  outerRadius = 85,
}: {
  data: { name: string; value: number; color: string }[]
  height?: number
  innerRadius?: number
  outerRadius?: number
}) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)', fontSize: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

// ---------- Area chart ----------
export function AreaSeries({
  data,
  keys,
  xKey = 'date',
  height = 280,
}: {
  data: any[]
  keys: { key: string; label: string; color: string }[]
  xKey?: string
  height?: number
}) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
          <defs>
            {keys.map((k) => (
              <linearGradient key={k.key} id={`grad-${k.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={k.color} stopOpacity={0.22} />
                <stop offset="100%" stopColor={k.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} tick={axisStyle} axisLine={false} tickLine={false} />
          <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)', fontSize: 12 }} />
          {keys.map((k) => (
            <Area
              key={k.key}
              type="monotone"
              dataKey={k.key}
              name={k.label}
              stroke={k.color}
              strokeWidth={2}
              fill={`url(#grad-${k.key})`}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// ---------- Line chart ----------
export function LineSeries({
  data,
  keys,
  xKey = 'date',
  height = 280,
}: {
  data: any[]
  keys: { key: string; label: string; color: string }[]
  xKey?: string
  height?: number
}) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} tick={axisStyle} axisLine={false} tickLine={false} />
          <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)', fontSize: 12 }} />
          {keys.map((k) => (
            <Line
              key={k.key}
              type="monotone"
              dataKey={k.key}
              name={k.label}
              stroke={k.color}
              strokeWidth={2.5}
              dot={{ r: 3, fill: k.color }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ---------- Composed (area + bar) ----------
export function ComposedSeries({
  data,
  areaKeys,
  barKeys,
  xKey = 'day',
  height = 300,
}: {
  data: any[]
  areaKeys: { key: string; label: string; color: string }[]
  barKeys: { key: string; label: string; color: string }[]
  xKey?: string
  height?: number
}) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
          <defs>
            {areaKeys.map((k) => (
              <linearGradient key={k.key} id={`cgrad-${k.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={k.color} stopOpacity={0.18} />
                <stop offset="100%" stopColor={k.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} tick={axisStyle} axisLine={false} tickLine={false} />
          <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)', fontSize: 12 }} />
          {barKeys.map((k) => (
            <Bar key={k.key} dataKey={k.key} name={k.label} fill={k.color} radius={[4, 4, 0, 0]} maxBarSize={36} />
          ))}
          {areaKeys.map((k) => (
            <Area
              key={k.key}
              type="monotone"
              dataKey={k.key}
              name={k.label}
              stroke={k.color}
              strokeWidth={2.5}
              fill={`url(#cgrad-${k.key})`}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

// ---------- Radial bar ----------
export function RadialGauge({
  data,
  height = 240,
}: {
  data: { name: string; value: number; fill: string }[]
  height?: number
}) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="30%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar background={{ fill: 'rgba(0,0,0,0.04)' }} dataKey="value" cornerRadius={10} />
          <Legend
            iconType="circle"
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ fontSize: 12, lineHeight: '20px' }}
          />
          <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)', fontSize: 12 }} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}
