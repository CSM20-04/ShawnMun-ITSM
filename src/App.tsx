import { useState, useEffect } from 'react'
import {
  ShieldCheck, LayoutDashboard, ShieldAlert, Activity, Gauge,
  Bell, Search, Menu, X, Settings, ExternalLink,
} from 'lucide-react'
import Overview from './pages/Overview'
import EndpointCompliance from './pages/EndpointCompliance'
import IncidentThreat from './pages/IncidentThreat'
import BehavioralAnomaly from './pages/BehavioralAnomaly'
import OperationalPerformance from './pages/OperationalPerformance'

type PageId = 'overview' | 'endpoint' | 'incident' | 'behavioral' | 'operational'

const navSections: {
  label: string
  items: { id: PageId; label: string; icon: React.ReactNode; badge?: string }[]
}[] = [
  {
    label: 'Dashboard',
    items: [
      { id: 'overview', label: 'Overview', icon: <LayoutDashboard /> },
    ],
  },
  {
    label: 'Data Analytics',
    items: [
      { id: 'endpoint', label: 'Endpoint Compliance & Asset Health', icon: <ShieldCheck /> },
      { id: 'incident', label: 'Incident & Threat Telemetry', icon: <ShieldAlert />, badge: '44' },
      { id: 'behavioral', label: 'Behavioral & Anomaly Detection', icon: <Activity />, badge: '6' },
      { id: 'operational', label: 'Operational & Performance Impact', icon: <Gauge /> },
    ],
  },
]

const pageMeta: Record<PageId, { title: string; subtitle: string }> = {
  overview: { title: 'Overview', subtitle: 'Unified security posture across all endpoints' },
  endpoint: { title: 'Endpoint Compliance', subtitle: 'Antivirus agents, definitions, patches & software' },
  incident: { title: 'Incident & Threat Telemetry', subtitle: 'Malware indicators, quarantine & infection vectors' },
  behavioral: { title: 'Behavioral & Anomaly Detection', subtitle: 'Process spikes, system alterations & exfiltration' },
  operational: { title: 'Operational & Performance', subtitle: 'False positive rates & resource overhead' },
}

export default function App() {
  const [page, setPage] = useState<PageId>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Close sidebar on page change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [page])

  const renderPage = () => {
    switch (page) {
      case 'overview': return <Overview />
      case 'endpoint': return <EndpointCompliance />
      case 'incident': return <IncidentThreat />
      case 'behavioral': return <BehavioralAnomaly />
      case 'operational': return <OperationalPerformance />
      default: return <Overview />
    }
  }

  return (
    <div className="app">
      {/* ---------- Sidebar ---------- */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="logo">
            <ShieldCheck />
          </div>
          <div>
            <div className="brand-name">SentinelView</div>
            <div className="brand-sub">Security Ops</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navSections.map((section) => (
            <div key={section.label}>
              <div className="sidebar-section-label">{section.label}</div>
              {section.items.map((item) => (
                <button
                  key={item.id}
                  className={`nav-item ${page === item.id ? 'active' : ''}`}
                  onClick={() => setPage(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </button>
              ))}
            </div>
          ))}

          {/* Integration links */}
          <div className="sidebar-section-label">Integrations</div>
          <button className="nav-item" onClick={() => {}}>
            <span className="nav-icon"><ShieldAlert size={18} /></span>
            <span>Symantec Endpoint Protection</span>
            <ExternalLink size={13} style={{ marginLeft: 'auto', opacity: 0.4 }} />
          </button>
          <button className="nav-item" onClick={() => {}}>
            <span className="nav-icon"><ShieldCheck size={18} /></span>
            <span>Trend Micro Security</span>
            <ExternalLink size={13} style={{ marginLeft: 'auto', opacity: 0.4 }} />
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="avatar">SA</div>
          <div className="user-info">
            <div className="user-name">Security Admin</div>
            <div className="user-role">Tier-3 Analyst</div>
          </div>
          <button className="icon-btn" style={{ color: 'rgba(255,255,255,0.4)' }} onClick={() => {}}>
            <Settings size={17} />
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="overlay show" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ---------- Main ---------- */}
      <div className="main">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="topbar-title">
              <h1>{pageMeta[page].title}</h1>
              <p>{pageMeta[page].subtitle}</p>
            </div>
          </div>
          <div className="topbar-right">
            {/* Integration status chips */}
            <div className="integration-chips">
              <span className="integration-chip sep" title="Symantec Endpoint Protection — Connected">
                <span className="dot" />
                Symantec EP
              </span>
              <span className="integration-chip tm" title="Trend Micro — Connected">
                <span className="dot" />
                Trend Micro
              </span>
            </div>
            <button className="icon-btn" onClick={() => {}}>
              <Search size={18} />
            </button>
            <button className="icon-btn" onClick={() => {}}>
              <Bell size={18} />
              <span className="notif-dot" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="content">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
