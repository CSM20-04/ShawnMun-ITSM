// ============================================================
//  SentinelView — Real-time telemetry & analytics data
//  Live feeds from Symantec Endpoint Protection & Trend Micro
//  Last refreshed: September 2026
// ============================================================

export const lastUpdated = "Sep 18, 2026 · 09:47 UTC";

// ---------- 1. Endpoint Compliance & Asset Health ----------
export const agentStatusData = [
  { name: "Symantec EP", healthy: 1684, outdated: 47, offline: 22, disabled: 5 },
  { name: "Trend Micro", healthy: 1312, outdated: 38, offline: 14, disabled: 3 },
  { name: "CrowdStrike", healthy: 478, outdated: 6, offline: 2, disabled: 1 },
  { name: "Microsoft Defender", healthy: 296, outdated: 4, offline: 1, disabled: 0 },
  { name: "Unmanaged", healthy: 0, outdated: 0, offline: 0, disabled: 188 },
];

export const agentStatusTotals = {
  healthy: 3770,
  outdated: 95,
  offline: 39,
  disabled: 197,
  total: 4101,
};

export const signatureAgeData = [
  { range: "< 24 hrs", count: 2688, pct: 66 },
  { range: "1–3 days", count: 812, pct: 20 },
  { range: "4–7 days", count: 348, pct: 8 },
  { range: "8–14 days", count: 164, pct: 4 },
  { range: "> 14 days", count: 89, pct: 2 },
];

export const patchLevelData = [
  { os: "Windows 11", current: 924, n1: 168, n2: 41, older: 8 },
  { os: "Windows 10", current: 388, n1: 244, n2: 112, older: 54 },
  { os: "macOS 15", current: 312, n1: 48, n2: 14, older: 4 },
  { os: "macOS 14", current: 96, n1: 28, n2: 9, older: 2 },
  { os: "RHEL 10", current: 118, n1: 18, n2: 6, older: 2 },
  { os: "Ubuntu 24.04", current: 108, n1: 14, n2: 5, older: 1 },
];

export const softwareVersioningData = [
  { name: "Browsers", upToDate: 78, behind1: 15, behind2Plus: 7 },
  { name: "Productivity", upToDate: 71, behind1: 19, behind2Plus: 10 },
  { name: "Dev Tools", upToDate: 54, behind1: 28, behind2Plus: 18 },
  { name: "Runtime/SDKs", upToDate: 62, behind1: 24, behind2Plus: 14 },
  { name: "Security Tools", upToDate: 94, behind1: 5, behind2Plus: 1 },
  { name: "AI/ML Tooling", upToDate: 41, behind1: 34, behind2Plus: 25 },
  { name: "System Utils", upToDate: 68, behind1: 21, behind2Plus: 11 },
];

// ---------- 2. Incident & Threat Telemetry ----------
export const malwareIndicatorsData = [
  { date: "Sep 12", critical: 4, high: 9, medium: 14, low: 28 },
  { date: "Sep 13", critical: 2, high: 6, medium: 19, low: 34 },
  { date: "Sep 14", critical: 7, high: 14, medium: 24, low: 31 },
  { date: "Sep 15", critical: 3, high: 10, medium: 17, low: 38 },
  { date: "Sep 16", critical: 9, high: 16, medium: 21, low: 25 },
  { date: "Sep 17", critical: 5, high: 11, medium: 15, low: 22 },
  { date: "Sep 18", critical: 6, high: 13, medium: 18, low: 29 },
];

export const quarantineActions = [
  { action: "Quarantined", count: 198 },
  { action: "Cleaned", count: 124 },
  { action: "Blocked", count: 418 },
  { action: "Deleted", count: 72 },
  { action: "User Allowed", count: 8 },
  { action: "Failed", count: 4 },
];

export const infectionVectorData = [
  { vector: "AI-Phishing Email", count: 52 },
  { vector: "Email Attachment", count: 31 },
  { vector: "Web Download", count: 26 },
  { vector: "Cloud Storage Sync", count: 19 },
  { vector: "USB / Removable", count: 11 },
  { vector: "Lateral Movement", count: 8 },
  { vector: "Drive-by Exploit", count: 5 },
];

export const recentThreats = [
  { hash: "9a3f1b9c8d7e6...e441", threat: "Ransom.BlackCat-v3", source: "Symantec EP", severity: "Critical", host: "WS-0412", action: "Quarantined", time: "09:38 UTC" },
  { hash: "7c2d4e8f1a6b...9d03", threat: "Trojan.Lumma-Stealer", source: "Trend Micro", severity: "Critical", host: "WS-0188", action: "Blocked", time: "09:12 UTC" },
  { hash: "b5e9a2f3c7d1...4a8e", threat: "Spyware.PegasusLite", source: "Symantec EP", severity: "High", host: "WS-0203", action: "Cleaned", time: "08:47 UTC" },
  { hash: "2f8a1d6c4b7e...f1c2", threat: "Worm.Conficker-2026", source: "Trend Micro", severity: "High", host: "WS-0377", action: "Quarantined", time: "08:21 UTC" },
  { hash: "9d4c7b2e8f1a...6a5b", threat: "Adware.ShlayerX", source: "Symantec EP", severity: "Medium", host: "WS-0519", action: "Blocked", time: "07:58 UTC" },
  { hash: "c1f6a3d8e7b2...2c9f", threat: "CoinMiner.MoneroX", source: "Trend Micro", severity: "High", host: "WS-0091", action: "Deleted", time: "07:33 UTC" },
  { hash: "e8b2f5a1c9d4...7e3a", threat: "Backdoor.Cobalt-4.9", source: "Symantec EP", severity: "Critical", host: "WS-0264", action: "Quarantined", time: "06:54 UTC" },
];

// ---------- 3. Behavioral & Anomaly Detection ----------
export const processSpikesData = [
  { time: "00:00", symantec: 135, trend: 108, baseline: 100 },
  { time: "02:00", symantec: 85, trend: 72, baseline: 100 },
  { time: "04:00", symantec: 68, trend: 55, baseline: 100 },
  { time: "06:00", symantec: 122, trend: 96, baseline: 100 },
  { time: "08:00", symantec: 375, trend: 298, baseline: 100 },
  { time: "10:00", symantec: 580, trend: 445, baseline: 100 },
  { time: "12:00", symantec: 520, trend: 410, baseline: 100 },
  { time: "14:00", symantec: 690, trend: 530, baseline: 100 },
  { time: "16:00", symantec: 470, trend: 380, baseline: 100 },
  { time: "18:00", symantec: 310, trend: 248, baseline: 100 },
  { time: "20:00", symantec: 195, trend: 162, baseline: 100 },
  { time: "22:00", symantec: 142, trend: 118, baseline: 100 },
];

export const systemAlterationsData = [
  { category: "Registry Mods", attempted: 54, blocked: 47, allowed: 7 },
  { category: "Driver Installs", attempted: 14, blocked: 12, allowed: 2 },
  { category: "Service Changes", attempted: 38, blocked: 33, allowed: 5 },
  { category: "Scheduled Tasks", attempted: 31, blocked: 27, allowed: 4 },
  { category: "Boot Config", attempted: 9, blocked: 8, allowed: 1 },
  { category: "Firewall Rules", attempted: 22, blocked: 20, allowed: 2 },
];

export const exfiltrationTrapsData = [
  { hour: "08h", symantec: 5, trend: 4, canary: 1 },
  { hour: "09h", symantec: 8, trend: 6, canary: 2 },
  { hour: "10h", symantec: 14, trend: 10, canary: 4 },
  { hour: "11h", symantec: 9, trend: 7, canary: 1 },
  { hour: "12h", symantec: 17, trend: 12, canary: 3 },
  { hour: "13h", symantec: 7, trend: 5, canary: 1 },
  { hour: "14h", symantec: 11, trend: 8, canary: 2 },
];

export const anomaliesLog = [
  { host: "WS-0264", event: "PowerShell encoded payload with AI-obfuscation", type: "Execution Spike", source: "Symantec EP", severity: "High", time: "09:22 UTC" },
  { host: "WS-0412", event: "Unauthorized registry run-key add", type: "System Alteration", source: "Trend Micro", severity: "Medium", time: "08:58 UTC" },
  { host: "WS-0091", event: "Sudden outbound 3.8 GB transfer to unknown CDN", type: "Exfiltration Trap", source: "Symantec EP", severity: "Critical", time: "08:14 UTC" },
  { host: "WS-0188", event: "Mass file rename + .blackcat extension change", type: "Execution Spike", source: "Trend Micro", severity: "High", time: "07:41 UTC" },
  { host: "WS-0377", event: "New kernel driver loaded (unsigned)", type: "System Alteration", source: "Symantec EP", severity: "Critical", time: "06:52 UTC" },
  { host: "WS-0519", event: "DNS tunneling C2 beacon to .su domain", type: "Exfiltration Trap", source: "Trend Micro", severity: "High", time: "06:18 UTC" },
];

// ---------- 4. Operational & Performance Impact ----------
export const falsePositiveData = [
  { week: "W-5", symantec: 7.1, trend: 5.4 },
  { week: "W-4", symantec: 6.4, trend: 4.9 },
  { week: "W-3", symantec: 5.8, trend: 4.5 },
  { week: "W-2", symantec: 5.2, trend: 4.0 },
  { week: "W-1", symantec: 4.6, trend: 3.6 },
  { week: "Current", symantec: 3.9, trend: 3.1 },
];

export const performanceOverheadData = [
  { metric: "CPU", symantec: 2.8, trend: 1.9 },
  { metric: "Memory", symantec: 164, trend: 128 },
  { metric: "Disk I/O", symantec: 3.8, trend: 2.6 },
  { metric: "Scan Time", symantec: 36, trend: 24 },
];

export const performanceOverheadMeta = {
  cpu: { unit: "%", symantecTarget: 5, trendTarget: 4 },
  memory: { unit: "MB", symantecTarget: 256, trendTarget: 200 },
  disk: { unit: "MB/s", symantecTarget: 8, trendTarget: 6 },
  scan: { unit: "s", symantecTarget: 60, trendTarget: 45 },
};

// ---------- Summary KPIs (Overview page) ----------
export const overviewKPIs = [
  { label: "Endpoints Managed", value: "4,101", delta: "+1,159", trend: "up", icon: "shield" },
  { label: "Active Threats", value: "44", delta: "+7", trend: "down", icon: "alert" },
  { label: "Compliance Rate", value: "94.8%", delta: "+2.6%", trend: "up", icon: "check" },
  { label: "Avg Signature Age", value: "1.7 days", delta: "-0.4d", trend: "up", icon: "clock" },
];

export const overviewTrend = [
  { day: "Mon", threats: 48, blocked: 388, scanned: 2410 },
  { day: "Tue", threats: 42, blocked: 362, scanned: 2520 },
  { day: "Wed", threats: 58, blocked: 412, scanned: 2780 },
  { day: "Thu", threats: 35, blocked: 338, scanned: 2280 },
  { day: "Fri", threats: 44, blocked: 395, scanned: 2620 },
  { day: "Sat", threats: 21, blocked: 248, scanned: 1480 },
  { day: "Sun", threats: 26, blocked: 272, scanned: 1720 },
];

export const overviewAgentDistribution = [
  { name: "Symantec EP", value: 1758, color: "#1A1A1A" },
  { name: "Trend Micro", value: 1367, color: "#6B6B6B" },
  { name: "CrowdStrike", value: 487, color: "#A0A0A0" },
  { name: "MS Defender", value: 301, color: "#B8B8B8" },
  { name: "Unmanaged", value: 188, color: "#D4D4D4" },
];

export const recentActivity = [
  { event: "Threat quarantined on WS-0412 — Ransom.BlackCat-v3", source: "Symantec EP", severity: "critical", time: "3 min ago" },
  { event: "Signature update deployed (v2026.09.18)", source: "Trend Micro", severity: "info", time: "8 min ago" },
  { event: "Policy 'Block AI-tool cloud upload' enforced on 312 endpoints", source: "Symantec EP", severity: "warning", time: "22 min ago" },
  { event: "Anomaly: AI-obfuscated PowerShell payload on WS-0264", source: "Symantec EP", severity: "critical", time: "35 min ago" },
  { event: "Full scan completed on WS-0188 — clean", source: "Trend Micro", severity: "success", time: "1 hr ago" },
  { event: "8 endpoints fell below 85% patch compliance", source: "System", severity: "warning", time: "2 hr ago" },
  { event: "Exfiltration trap triggered on WS-0091 — 3.8 GB to CDN", source: "Symantec EP", severity: "critical", time: "3 hr ago" },
];
