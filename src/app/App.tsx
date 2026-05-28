import { useState, useEffect, useRef } from "react";
import {
  Shield,
  Wrench,
  Lock,
  ChevronDown,
  LogOut,
  User,
  AlertTriangle,
  Clock,
  CheckCircle2,
  X,
  Calendar,
  Building2,
  FlaskConical,
  Eye,
  Bell,
  ClipboardList,
  ChevronRight,
  RefreshCw,
  XCircle,
  Circle,
  Loader,
  CheckCheck,
  Edit2,
  Check,
} from "lucide-react";

type Role = "student" | "lecturer" | "maintenance" | null;

// ─── Credential hints ─────────────────────────────────────────────────────────
const CREDS = {
  student: { email: "student1@s.uni.com", password: "123" },
  lecturer: { email: "lecture1@l.uni.com", password: "123" },
  maintenance: { email: "staff1@st.uni.com", password: "123" },
};

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (role: Role) => void }) {
  const [tab, setTab] = useState<"student" | "lecturer" | "maintenance" | "maintenance">("student");
  const [email, setEmail] = useState(CREDS.student.email);
  const [password, setPassword] = useState("123");
  const [showPass, setShowPass] = useState(false);

  const switchTab = (t: "student" | "lecturer" | "maintenance") => {
    setTab(t);
    setEmail(CREDS[t].email);
    setPassword("123");
  };

  const tabs: { key: "student" | "lecturer" | "maintenance"; label: string }[] = [
    { key: "student", label: "Student Login" },
    { key: "lecturer", label: "Lecturer Login" },
    { key: "maintenance", label: "Maintenance Staff Login" },
  ];

  return (
    <div className="min-h-screen w-full flex" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #07112a 0%, #0f2044 50%, #142b5e 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #1a56db, transparent 70%)" }} />
          <div className="absolute bottom-[-60px] left-[-40px] w-64 h-64 rounded-full opacity-8" style={{ background: "radial-gradient(circle, #0e9f6e, transparent 70%)" }} />
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 p-14 pt-16">
          <div className="flex items-center gap-3 mb-20">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-sm">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-extrabold text-base leading-none tracking-wide">SSCSS</p>
              <p className="text-slate-500 text-[10px] mt-0.5 font-medium tracking-wider uppercase">Secure Smart Campus</p>
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">University Portal</p>
            <h1 className="text-white text-5xl font-extrabold leading-[1.1] tracking-tight">
              Campus<br />Services<br />System
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Role-based access control for classroom scheduling, facility management, and maintenance operations.
            </p>
          </div>
        </div>

        <div className="relative z-10 p-14 pb-16 space-y-5">
          {[
            { icon: Lock, label: "Tier-Based Access Control", sub: "Permissions enforced per role" },
            { icon: Calendar, label: "Real-Time Clash Detection", sub: "Automated double-booking prevention" },
            { icon: Wrench, label: "Live Maintenance Tracking", sub: "Rapid response ticket system" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-white/[0.07] flex items-center justify-center flex-shrink-0 border border-white/10">
                <Icon className="w-4 h-4 text-blue-300" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{label}</p>
                <p className="text-slate-500 text-[10px] mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center bg-[#f0f2f7] px-8 py-12">
        <div className="w-full max-w-[440px]">
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <Shield className="w-6 h-6 text-[#0f2044]" />
            <span className="font-extrabold text-[#0f2044] text-lg">SSCSS Portal</span>
          </div>

          <div className="mb-8">
            <h2 className="text-[#0d1b2a] text-3xl font-extrabold mb-1.5">Sign in</h2>
            <p className="text-[#5a6680] text-sm">Access your university portal</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[rgba(15,32,68,0.09)] overflow-hidden">
            {/* Tab bar */}
            <div className="flex border-b border-[rgba(15,32,68,0.08)] bg-[#f7f8fa]">
              {tabs.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => switchTab(key)}
                  className={`flex-1 py-3.5 text-xs font-bold tracking-wide transition-all relative ${
                    tab === key
                      ? "text-[#0f2044] bg-white"
                      : "text-[#9aa3bb] hover:text-[#5a6680]"
                  }`}
                >
                  {label}
                  {tab === key && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a56db] rounded-t-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#0f2044] uppercase tracking-widest">
                  University Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#eef0f6] border border-transparent focus:border-[#1a56db] focus:bg-white focus:outline-none text-sm text-[#0d1b2a] placeholder-[#9aa3bb] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#0f2044] uppercase tracking-widest">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-14 rounded-xl bg-[#eef0f6] border border-transparent focus:border-[#1a56db] focus:bg-white focus:outline-none text-sm text-[#0d1b2a] placeholder-[#9aa3bb] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#9aa3bb] hover:text-[#5a6680] uppercase tracking-wider transition-colors"
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                onClick={() => onLogin(tab)}
                className="w-full py-3.5 rounded-xl text-white text-sm font-bold tracking-wide transition-all hover:opacity-90 active:scale-[0.98] mt-2"
                style={{ background: "linear-gradient(135deg, #0f2044 0%, #1a3a6e 50%, #1a56db 100%)" }}
              >
                Login
              </button>

              {/* Credential hint */}
              <div className="bg-[#f7f8fa] border border-[rgba(15,32,68,0.07)] rounded-xl p-4 space-y-2">
                <p className="text-[10px] font-bold text-[#9aa3bb] uppercase tracking-widest mb-2.5">
                  Test credentials (password: 123 for all)
                </p>
                {[
                  { role: "Student", email: CREDS.student.email },
                  { role: "Lecturer", email: CREDS.lecturer.email },
                  { role: "Staff", email: CREDS.maintenance.email },
                ].map(({ role: r, email: e }) => (
                  <div key={r} className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#5a6680]">{r}</span>
                    <span
                      className="text-[11px] text-[#9aa3bb]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {e}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-[11px] text-[#b0bad0] mt-6">
            Protected by university SSO · SSCSS v2.4.1
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Shared Sidebar ───────────────────────────────────────────────────────────
type NavItem = { icon: React.ElementType; label: string; disabled?: boolean; note?: string };

const NAV: Record<NonNullable<Role>, NavItem[]> = {
  student: [
    { icon: Wrench, label: "Report Maintenance" },
    { icon: ClipboardList, label: "Update Report" },
  ],
  lecturer: [
    { icon: Building2, label: "Classroom Booking" },
    { icon: FlaskConical, label: "Laboratory Booking" },
    { icon: Wrench, label: "Report Maintenance" },
    { icon: ClipboardList, label: "Update Report" },
  ],
  maintenance: [
    { icon: ClipboardList, label: "Maintenance Tickets" },
  ],
};

const ROLE_META: Record<NonNullable<Role>, { tag: string; id: string; color: string }> = {
  student: { tag: "Student", id: "20260401", color: "#0e9f6e" },
  lecturer: { tag: "Lecturer", id: "LEC-0842", color: "#1a56db" },
  maintenance: { tag: "Maint. Staff", id: "MNT-0217", color: "#e3a008" },
};

function Sidebar({
  role, activeTab, setActiveTab, onLogout,
}: {
  role: NonNullable<Role>;
  activeTab: string;
  setActiveTab: (t: string) => void;
  onLogout: () => void;
}) {
  const meta = ROLE_META[role];
  return (
    <aside
      className="w-56 flex-shrink-0 flex flex-col min-h-screen"
      style={{ background: "#0a1628" }}
    >
      <div className="px-5 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/15">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-extrabold text-sm leading-none">SSCSS</p>
            <p className="text-slate-600 text-[10px] mt-0.5 font-medium">Campus Portal</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 pb-3">
        <div className="bg-white/[0.05] border border-white/[0.07] rounded-xl px-4 py-3 flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
            style={{ background: meta.color }}
          >
            {meta.tag[0]}
          </div>
          <div className="overflow-hidden min-w-0">
            <p className="text-white text-xs font-bold truncate">{meta.tag}</p>
            <p
              className="text-[10px] font-semibold truncate"
              style={{ color: meta.color, fontFamily: "'JetBrains Mono', monospace" }}
            >
              ID: {meta.id}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-0.5">
        {NAV[role].map(({ icon: Icon, label, disabled, note }) => {
          const active = activeTab === label;
          return (
            <button
              key={label}
              onClick={() => !disabled && setActiveTab(label)}
              disabled={disabled}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all text-left ${
                disabled
                  ? "opacity-40 cursor-not-allowed text-slate-500"
                  : active
                  ? "bg-[#1a56db] text-white shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="flex-1 truncate">{label}</span>
              {note && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-slate-500 uppercase tracking-wide">
                  {note}
                </span>
              )}
              {active && !disabled && <ChevronRight className="w-3 h-3 opacity-50" />}
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-5">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          Log Out
        </button>
      </div>
    </aside>
  );
}

// ─── Topbar ───────────────────────────────────────────────────────────────────
function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="h-14 bg-white border-b border-[rgba(15,32,68,0.08)] px-7 flex items-center justify-between flex-shrink-0">
      <div>
        <h1 className="text-[#0d1b2a] text-sm font-bold">{title}</h1>
        {subtitle && <p className="text-[#9aa3bb] text-[11px] mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2.5">
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9aa3bb] hover:bg-[#eef0f6] transition-colors">
          <Bell className="w-3.5 h-3.5" />
        </button>
        <div className="w-8 h-8 rounded-full bg-[#0f2044] flex items-center justify-center cursor-pointer hover:bg-[#1a3a6e] transition-colors">
          <User className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
    </header>
  );
}

// ─── Student: Report Maintenance ──────────────────────────────────────────────
function StudentReportMaintenance() {
  const [loc, setLoc] = useState("");
  const [cat, setCat] = useState("");
  const [desc, setDesc] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7 text-green-600" />
          </div>
          <div>
            <p className="text-[#0d1b2a] font-bold text-lg">Report Submitted</p>
            <p className="text-[#5a6680] text-sm mt-1">Your maintenance request has been logged.</p>
          </div>
          <button
            onClick={() => { setSubmitted(false); setLoc(""); setCat(""); setDesc(""); }}
            className="px-5 py-2 rounded-lg bg-[#1a56db] text-white text-sm font-semibold hover:bg-[#1648c0] transition-colors"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div>
        <h2 className="text-lg font-bold text-[#0d1b2a]">Report a Maintenance Issue</h2>
        <p className="text-xs text-[#5a6680] mt-0.5">Submit a campus facility complaint for review</p>
      </div>
      <div className="bg-white rounded-2xl border border-[rgba(15,32,68,0.09)] p-7 max-w-lg space-y-5">
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-[#0f2044] uppercase tracking-widest">Facility Location</label>
          <input
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            placeholder="e.g., Lab 2, Building B, Room 201"
            className="w-full px-4 py-3 rounded-xl bg-[#eef0f6] border border-transparent focus:border-[#1a56db] focus:bg-white focus:outline-none text-sm text-[#0d1b2a] placeholder-[#9aa3bb] transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-[#0f2044] uppercase tracking-widest">Issue Category</label>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#eef0f6] border border-transparent focus:border-[#1a56db] focus:bg-white focus:outline-none text-sm text-[#0d1b2a] transition-all appearance-none cursor-pointer"
          >
            <option value="">Select a category</option>
            <option>Projector / AV Equipment</option>
            <option>Air Conditioning / HVAC</option>
            <option>Electrical / Lighting</option>
            <option>Plumbing / Water</option>
            <option>Door / Lock</option>
            <option>Network / IT</option>
            <option>Other</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-[#0f2044] uppercase tracking-widest">Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            placeholder="Describe the issue in detail..."
            className="w-full px-4 py-3 rounded-xl bg-[#eef0f6] border border-transparent focus:border-[#1a56db] focus:bg-white focus:outline-none text-sm text-[#0d1b2a] placeholder-[#9aa3bb] transition-all resize-none"
          />
        </div>
        <button
          onClick={() => loc && cat && desc && setSubmitted(true)}
          className="px-6 py-2.5 rounded-xl bg-[#0f2044] text-white text-sm font-bold hover:bg-[#1a3a6e] transition-colors disabled:opacity-40"
          disabled={!loc || !cat || !desc}
        >
          Submit Report
        </button>
      </div>
    </div>
  );
}

// ─── Student: Update Report ───────────────────────────────────────────────────
type TicketStatus = "Pending" | "In Progress" | "Complete" | "Reject";

interface StudentTicket {
  id: string;
  location: string;
  category: string;
  submitted: string;
  status: TicketStatus;
  note?: string;
}

const statusStyle: Record<TicketStatus, { bg: string; text: string; border: string; icon: React.ElementType }> = {
  Pending: { bg: "#fef9c3", text: "#854d0e", border: "#fde047", icon: Circle },
  "In Progress": { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd", icon: Loader },
  Complete: { bg: "#bbf7d0", text: "#14532d", border: "#4ade80", icon: CheckCheck },
  Reject: { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5", icon: XCircle },
};

const STUDENT_TICKETS: StudentTicket[] = [
  { id: "TK-3041", location: "Lab 2", category: "Projector Malfunction", submitted: "27 May, 09:12", status: "In Progress", note: "Technician dispatched" },
  { id: "TK-3038", location: "Room 201", category: "AC Not Cooling", submitted: "26 May, 14:30", status: "Complete", note: "AC serviced and tested" },
  { id: "TK-3029", location: "IT Lab", category: "Network Outage", submitted: "24 May, 08:40", status: "Pending" },
  { id: "TK-3020", location: "Room 102", category: "Broken Window Latch", submitted: "22 May, 16:15", status: "Reject", note: "Duplicate request — merged with TK-3018" },
];

const STATUS_ORDER: TicketStatus[] = ["Pending", "In Progress", "Complete", "Reject"];

function ProgressStepper({ status }: { status: TicketStatus }) {
  const steps: TicketStatus[] = ["Pending", "In Progress", "Complete"];
  const rejected = status === "Reject";
  const currentIdx = rejected ? -1 : steps.indexOf(status);

  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => {
        const done = !rejected && i <= currentIdx;
        const active = !rejected && i === currentIdx;
        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all ${
                  done
                    ? active
                      ? "border-[#1a56db] bg-[#1a56db]"
                      : "border-[#0e9f6e] bg-[#0e9f6e]"
                    : "border-[#dde2ec] bg-white"
                }`}
              >
                {done && !active && <CheckCircle2 className="w-3 h-3 text-white" />}
                {active && <span className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-0.5 w-10 transition-all ${
                  !rejected && i < currentIdx ? "bg-[#0e9f6e]" : "bg-[#dde2ec]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function StudentUpdateReport() {
  const [filter, setFilter] = useState<"All" | TicketStatus>("All");
  const filtered = STUDENT_TICKETS.filter((t) => filter === "All" || t.status === filter);

  return (
    <div className="p-8 space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#0d1b2a]">Update Report</h2>
          <p className="text-xs text-[#5a6680] mt-0.5">Track the lifecycle of your submitted facility requests</p>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {(["All", ...STATUS_ORDER] as (TicketStatus | "All")[]).map((s) => {
            const active = filter === s;
            const style = s !== "All" ? statusStyle[s as TicketStatus] : null;
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                  active && style
                    ? ""
                    : active
                    ? "bg-[#0f2044] text-white border-transparent"
                    : "bg-white text-[#5a6680] border-[rgba(15,32,68,0.1)] hover:border-[rgba(15,32,68,0.2)]"
                }`}
                style={
                  active && style
                    ? { backgroundColor: style.bg, color: style.text, borderColor: style.border }
                    : {}
                }
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((ticket) => {
          const s = statusStyle[ticket.status];
          const Icon = s.icon;
          return (
            <div
              key={ticket.id}
              className="bg-white rounded-2xl border border-[rgba(15,32,68,0.08)] p-5 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border"
                    style={{ backgroundColor: s.bg, borderColor: s.border }}
                  >
                    <Icon className="w-4 h-4" style={{ color: s.text }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-xs font-bold"
                        style={{ fontFamily: "'JetBrains Mono', monospace", color: "#1a56db" }}
                      >
                        {ticket.id}
                      </span>
                      <span className="text-[#dde2ec] text-xs">·</span>
                      <span className="text-xs font-semibold text-[#0d1b2a]">{ticket.category}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Building2 className="w-3 h-3 text-[#9aa3bb]" />
                      <span className="text-xs text-[#5a6680]">{ticket.location}</span>
                      <span className="text-[#dde2ec] text-xs">·</span>
                      <span className="text-xs text-[#9aa3bb]" />
                      <span className="text-xs text-[#9aa3bb]">{ticket.submitted}</span>
                    </div>
                    {ticket.note && (
                      <p className="text-xs text-[#5a6680] mt-1.5 italic">"{ticket.note}"</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border"
                    style={{ backgroundColor: s.bg, color: s.text, borderColor: s.border }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.text }} />
                    {ticket.status}
                  </span>
                  {ticket.status !== "Reject" && (
                    <ProgressStepper status={ticket.status} />
                  )}
                  {ticket.status === "Reject" && (
                    <span className="text-[10px] text-[#9aa3bb] font-medium">Request closed</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Lecturer Dashboard ───────────────────────────────────────────────────────
const DAYS = ["Mon 27", "Tue 28", "Wed 29", "Thu 30", "Fri 31"];
const SLOTS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const OCCUPIED_SLOTS: Record<string, boolean> = {
  "Mon 27-09:00": true, "Mon 27-10:00": true,
  "Tue 28-11:00": true, "Tue 28-12:00": true,
  "Wed 29-09:00": true, "Wed 29-14:00": true,
  "Thu 30-10:00": true, "Thu 30-15:00": true,
  "Fri 31-08:00": true, "Fri 31-13:00": true,
};

const LAB_OPTIONS = [
  "Cybersecurity Lab 2",
  "Software Engineering Lab 3",
  "Data Science Lab 4",
];

const CLASSROOM_OPTIONS = [
  "Room 101 — 30 seats, 1st Floor",
  "Room 102 — 45 seats, 1st Floor",
  "Room 201 — 60 seats, 2nd Floor",
  "Room 202 — 30 seats, 2nd Floor",
  "Room 301 — 80 seats, 3rd Floor",
  "Lecture Hall A — 120 seats, Ground",
  "Lecture Hall B — 150 seats, Ground",
];

function BookingGrid({ label, defaultBookings }: { label: string; defaultBookings?: string[] }) {
  const [clashSlot, setClashSlot] = useState<string | null>(null);
  const [cancelSlot, setCancelSlot] = useState<string | null>(null);
  const [myBookings, setMyBookings] = useState<string[]>(defaultBookings ?? ["Mon 27-13:00"]);
  const [selectedLab, setSelectedLab] = useState(LAB_OPTIONS[0]);
  const [selectedRoom, setSelectedRoom] = useState(CLASSROOM_OPTIONS[0]);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const isLab = label === "Laboratory Booking";
  const options = isLab ? LAB_OPTIONS : CLASSROOM_OPTIONS;
  const selected = isLab ? selectedLab : selectedRoom;

  return (
    <div className="p-8 space-y-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div>
        <h2>{label} — May 2026</h2>
        <p>Click an available slot to book · Occupied slots are clash-protected</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative">
          <button
            onClick={() => setSelectorOpen(!selectorOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-[rgba(15,32,68,0.12)] text-sm font-semibold text-[#0d1b2a] hover:border-[#1a56db] transition-colors shadow-sm max-w-xs"
          >
            {isLab
              ? <FlaskConical className="w-3.5 h-3.5 text-[#1a56db] flex-shrink-0" />
              : <Building2 className="w-3.5 h-3.5 text-[#1a56db] flex-shrink-0" />
            }
            <span className="truncate">{selected}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#9aa3bb] transition-transform flex-shrink-0 ${selectorOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        <div className="flex items-center gap-5 text-[11px] font-bold text-[#5a6680] flex-shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#c8d0e4] flex-shrink-0" />
            Occupied
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#1a56db] flex-shrink-0" />
            Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#0e9f6e] flex-shrink-0" />
            My Bookings
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f7f8fa] border-b">
              <th className="w-16 px-4 py-3 text-left text-[11px] font-bold text-[#9aa3bb] uppercase tracking-widest">Time</th>
              {DAYS.map((d) => (
                <th key={d} className="px-3 py-3 text-center text-[11px] font-bold uppercase tracking-widest">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SLOTS.map((slot, si) => (
              <tr key={slot} className={`border-b ${si % 2 ? "bg-[#fafbfd]" : ""}`}>
                <td className="px-4 py-2 text-[11px] font-semibold text-[#9aa3bb]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {slot}
                </td>
                {DAYS.map((day) => {
                  const key = `${day}-${slot}`;
                  const occ = !!OCCUPIED_SLOTS[key];
                  const mine = myBookings.includes(key);
                  return (
                    <td key={day} className="px-2 py-1.5 text-center">
                      <button
                        onClick={() => {
                          if (mine) setCancelSlot(key);
                          else if (occ) setClashSlot(key);
                          else setMyBookings([...myBookings, key]);
                        }}
                        className={`w-full py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                          mine ? "bg-[#0e9f6e] text-white hover:bg-red-400" : occ ? "bg-[#c8d0e4] text-[#8898b8]" : "bg-blue-50 text-[#1a56db]"
                        }`}
                      >
                        {mine ? "Booked ×" : occ ? "Occupied" : "Free"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const LECTURER_TICKETS: StudentTicket[] = [
  { id: "TK-3044", location: "Lecture Hall A", category: "Microphone Feedback Issue", submitted: "27 May, 10:30", status: "In Progress", note: "Technician reviewing audio system" },
  { id: "TK-3031", location: "Cybersecurity Lab 2", category: "Switch Port Failure", submitted: "23 May, 09:00", status: "In Progress", note: "Replacement parts arriving today" },
  { id: "TK-3019", location: "Room 302", category: "Projector Lamp Burnt", submitted: "20 May, 15:20", status: "Complete", note: "New lamp installed and tested" },
  { id: "TK-3011", location: "Software Engineering Lab 3", category: "Workstation BSOD", submitted: "18 May, 11:45", status: "Pending" },
  { id: "TK-3004", location: "Data Science Lab 4", category: "Network Drive Unreachable", submitted: "15 May, 08:10", status: "Reject", note: "Issue resolved remotely" },
];

function LecturerUpdateReport() {
  const [filter, setFilter] = useState<"All" | TicketStatus>("All");
  const filtered = LECTURER_TICKETS.filter((t) => filter === "All" || t.status === filter);

  return (
    <div className="p-8 space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="flex items-start justify-between">
        <div>
          <h2>Update Report</h2>
          <p>Track your submitted facility logs</p>
        </div>
      </div>
      <div className="space-y-3">
        {filtered.map((ticket) => {
          const s = statusStyle[ticket.status];
          return (
            <div key={ticket.id} className="bg-white rounded-2xl border p-5">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-blue-600" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{ticket.id}</span>
                  <p className="text-sm font-semibold">{ticket.category}</p>
                </div>
                <span className="text-xs font-bold border px-3 py-1 rounded-full" style={{ backgroundColor: s.bg, color: s.text, borderColor: s.border }}>{ticket.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Maintenance Dashboard ────────────────────────────────────────────────────
type MaintStatus = "Pending" | "In Progress" | "Resolved" | "Rejected";

interface MaintTicket {
  id: string;
  location: string;
  category: string;
  createdAt: number;
  inProgressAt?: number; // Captured exactly when moved to In Progress
  completedAt?: number;  // Captures resolution timestamp
  status: MaintStatus;
  rejectReason?: string;
  manualSettlementTime?: number; // Total custom task deadline pool defined in structural minutes
}

// Formats a duration cleanly into text fields
function formatCountdownDisplay(ms: number): string {
  const isOverdue = ms < 0;
  const absMs = Math.abs(ms);
  
  const totalSec = Math.floor(absMs / 1000);
  const days = Math.floor(totalSec / 86400);
  const hrs = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  let timeString = "";
  if (days > 0) timeString = `${days}d ${hrs}h ${mins}m ${secs}s`;
  else if (hrs > 0) timeString = `${hrs}h ${mins}m ${secs}s`;
  else if (mins > 0) timeString = `${mins}m ${secs}s`;
  else timeString = `${secs}s`;

  return isOverdue ? `-${timeString}` : timeString;
}

// Color coding based on remaining time
function getCountdownColor(ms: number): string {
  if (ms <= 0) return "#c81e1e"; // Overdue -> Red
  const mins = ms / 60000;
  if (mins < 15) return "#e3a008"; // Less than 15 mins left -> Amber warning
  return "#0e9f6e"; // Plentiful time remaining -> Green
}

const maintStatusStyle: Record<MaintStatus, { bg: string; text: string; dot: string; border: string }> = {
  Pending: { bg: "#fef9c3", text: "#854d0e", dot: "bg-amber-400", border: "#fde047" },
  "In Progress": { bg: "#dbeafe", text: "#1e40af", dot: "bg-blue-500", border: "#93c5fd" },
  Resolved: { bg: "#bbf7d0", text: "#14532d", dot: "bg-green-500", border: "#4ade80" },
  Rejected: { bg: "#fee2e2", text: "#991b1b", dot: "bg-red-500", border: "#fca5a5" },
};

const REJECT_REASONS = [
  "Out of scope — refer to facilities management",
  "Insufficient information provided",
  "Duplicate request already being processed",
  "Requested fix not feasible / no parts available",
  "Issue resolved by another department",
  "Other (see note below)",
];

const NOW = Date.now();
const INIT_TICKETS: MaintTicket[] = [
  { id: "#8942", location: "Lab 2", category: "Projector Malfunction", createdAt: NOW - 30 * 60 * 1000, status: "Pending" },
  { id: "#8937", location: "Room 201", category: "AC Unit Failure", createdAt: NOW - 120 * 60 * 1000, inProgressAt: NOW - 10 * 60 * 1000, status: "In Progress" },
  { id: "#8930", location: "Lecture Hall B", category: "Broken Door Lock", createdAt: NOW - 180 * 60 * 1000, status: "Pending" },
  { id: "#8921", location: "IT Lab", category: "Network Outage", createdAt: NOW - 300 * 60 * 1000, inProgressAt: NOW - 70 * 60 * 1000, status: "In Progress" }, // Initial standard 1hr SLA has expired
  { id: "#8914", location: "Library Floor 2", category: "Water Leak", createdAt: NOW - 400 * 60 * 1000, inProgressAt: NOW - 390 * 60 * 1000, completedAt: NOW - 345 * 60 * 1000, status: "Resolved", manualSettlementTime: 60 },
  { id: "#8908", location: "Room 102", category: "Lighting Issue", createdAt: NOW - 1500 * 60 * 1000, inProgressAt: NOW - 1400 * 60 * 1000, completedAt: NOW - 1300 * 60 * 1000, status: "Resolved" },
];

function MaintenanceDashboard({ activeTab }: { activeTab: string }) {
  const [tickets, setTickets] = useState<MaintTicket[]>(INIT_TICKETS);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [rejectTarget, setRejectTarget] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectNote, setRejectNote] = useState("");
  const [now, setNow] = useState(Date.now());
  
  // Track inputs separated into structural categories
  const [editingTimeId, setEditingTimeId] = useState<string | null>(null);
  const [inputDays, setInputDays] = useState<string>("");
  const [inputMinutes, setInputMinutes] = useState<string>("");

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const update = (id: string, nextStatus: MaintStatus) => {
    if (nextStatus === "Rejected") {
      setRejectTarget(id);
      setRejectReason("");
      setRejectNote("");
      setOpenDrop(null);
      return;
    }

    setTickets(tickets.map((t) => {
      if (t.id !== id) return t;
      
      let updatedPatch: Partial<MaintTicket> = { status: nextStatus, rejectReason: undefined };
      
      if (nextStatus === "In Progress" && !t.inProgressAt) {
        updatedPatch.inProgressAt = Date.now();
      }
      
      if ((nextStatus === "Resolved" || nextStatus === "Rejected") && !t.completedAt) {
        updatedPatch.completedAt = Date.now();
      }

      if (nextStatus === "Pending") {
        updatedPatch.inProgressAt = undefined;
        updatedPatch.completedAt = undefined;
        updatedPatch.manualSettlementTime = undefined;
      }

      return { ...t, ...updatedPatch };
    }));
    setOpenDrop(null);
  };

  const confirmReject = () => {
    if (!rejectTarget || !rejectReason) return;
    const reason = rejectReason === "Other (see note below)" && rejectNote ? rejectNote : rejectReason;
    setTickets(tickets.map((t) => t.id === rejectTarget ? { ...t, status: "Rejected", rejectReason: reason, completedAt: Date.now() } : t));
    setRejectTarget(null);
    setRejectReason("");
    setRejectNote("");
  };

  const saveManualTime = (id: string) => {
    const days = Math.max(0, parseInt(inputDays, 10) || 0);
    const mins = Math.max(0, parseInt(inputMinutes, 10) || 0);
    
    const totalMinutes = (days * 1440) + mins;
    setTickets(tickets.map((t) => (t.id === id ? { ...t, manualSettlementTime: totalMinutes } : t)));
    
    setEditingTimeId(null);
    setInputDays("");
    setInputMinutes("");
  };

  const clearManualTime = (id: string) => {
    setTickets(tickets.map((t) => (t.id === id ? { ...t, manualSettlementTime: undefined } : t)));
    setEditingTimeId(null);
    setInputDays("");
    setInputMinutes("");
  };

  const pending = tickets.filter((t) => t.status === "Pending").length;
  const inProg = tickets.filter((t) => t.status === "In Progress").length;
  const resolved = tickets.filter((t) => t.status === "Resolved").length;
  const rejected = tickets.filter((t) => t.status === "Rejected").length;

  return (
    <div className="p-8 space-y-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#0d1b2a]">Campus Operations & Repair Control Panel</h2>
          <p className="text-xs text-[#5a6680] mt-0.5">Active complaints · Update status to resolve or reject tickets</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { label: `${pending} Pending`, style: maintStatusStyle.Pending },
            { label: `${inProg} In Progress`, style: maintStatusStyle["In Progress"] },
            { label: `${resolved} Resolved`, style: maintStatusStyle.Resolved },
            { label: `${rejected} Rejected`, style: maintStatusStyle.Rejected },
          ].map(({ label, style }) => (
            <span
              key={label}
              className="px-3 py-1.5 rounded-full text-[11px] font-bold border"
              style={{ backgroundColor: style.bg, color: style.text, borderColor: style.border }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[rgba(15,32,68,0.09)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f7f8fa] border-b border-[rgba(15,32,68,0.07)]">
              {["Ticket ID", "Facility Location", "Issue Category", "Time Remaining", "Action Status"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-[11px] font-bold text-[#9aa3bb] uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tickets.map((t, ti) => {
              const s = maintStatusStyle[t.status];
              return (
                <tr
                  key={t.id}
                  className={`border-b border-[rgba(15,32,68,0.04)] hover:bg-[#fafbfd] transition-colors ${ti % 2 ? "bg-[#fafbfd]" : ""}`}
                >
                  <td className="px-5 py-4">
                    <span className="text-xs font-bold text-[#1a56db]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {t.id}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#9aa3bb] flex-shrink-0" />
                      <span className="text-sm font-medium text-[#0d1b2a]">{t.location}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-[#0d1b2a]">{t.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 group min-h-[32px]">
                      {editingTimeId === t.id ? (
                        <div className="flex items-center gap-1.5 bg-[#eef0f6] p-1.5 rounded-lg border border-[rgba(15,32,68,0.12)]">
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              className="w-12 px-1 py-0.5 text-xs rounded border bg-white focus:outline-none"
                              placeholder="Days"
                              value={inputDays}
                              onChange={(e) => setInputDays(e.target.value)}
                              min="0"
                            />
                            <span className="text-[10px] text-slate-500 font-bold">d</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              className="w-12 px-1 py-0.5 text-xs rounded border bg-white focus:outline-none"
                              placeholder="Mins"
                              value={inputMinutes}
                              onChange={(e) => setInputMinutes(e.target.value)}
                              min="0"
                            />
                            <span className="text-[10px] text-slate-500 font-bold">m</span>
                          </div>
                          <button
                            onClick={() => saveManualTime(t.id)}
                            className="p-1 bg-green-600 rounded text-white hover:bg-green-700"
                            title="Save Allotted Time Window"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                          {t.manualSettlementTime !== undefined && (
                            <button
                              onClick={() => clearManualTime(t.id)}
                              className="p-1 bg-amber-600 rounded text-white hover:bg-amber-700 text-[9px] font-bold px-1"
                              title="Clear Overrides"
                            >
                              Reset
                            </button>
                          )}
                          <button
                            onClick={() => setEditingTimeId(null)}
                            className="p-1 bg-slate-400 rounded text-white hover:bg-slate-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <>
                          {(() => {
                            // 1. Pending Status -> Not Started yet
                            if (t.status === "Pending") {
                              return (
                                <div className="flex items-center gap-1.5 text-slate-400">
                                  <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                                  <span className="text-xs font-semibold italic">--h --m --s (Not Started)</span>
                                </div>
                              );
                            }

                            // Calculate available target resolution budget parameter
                            // Standard allowance fallback goal = 1 hour (60 minutes) if no manual value is assigned
                            const allocationMinutes = t.manualSettlementTime !== undefined ? t.manualSettlementTime : 60;
                            const totalAllottedMs = allocationMinutes * 60 * 1000;

                            let remainingMs = 0;
                            const hasManual = t.manualSettlementTime !== undefined;

                            if (t.status === "In Progress") {
                              const targetDeadline = (t.inProgressAt || now) + totalAllottedMs;
                              remainingMs = targetDeadline - now;
                            } else {
                              // Resolved / Rejected status -> Displays final static snapshot context upon closure
                              const finalSpentTime = (t.completedAt || now) - (t.inProgressAt || t.createdAt);
                              remainingMs = totalAllottedMs - finalSpentTime;
                            }

                            const isClosed = t.status === "Resolved" || t.status === "Rejected";
                            
                            // Style determination based on remaining calculation status
                            const color = isClosed ? "#9aa3bb" : getCountdownColor(remainingMs);
                            const displayString = isClosed 
                              ? `Completed in: ${formatCountdownDisplay(Math.abs(totalAllottedMs - remainingMs))}`
                              : formatCountdownDisplay(remainingMs);
                            
                            return (
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color }} />
                                <span
                                  className="text-xs font-bold tabular-nums flex items-center gap-1"
                                  style={{ fontFamily: "'JetBrains Mono', monospace", color }}
                                >
                                  {displayString}
                                  {hasManual && <span className="text-[9px] font-medium opacity-65">(Manual Target)</span>}
                                </span>
                                {!isClosed && remainingMs <= 0 && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-red-50 text-red-500 border border-red-200 uppercase tracking-wide flex-shrink-0 animate-pulse">
                                    Overdue
                                  </span>
                                )}
                              </div>
                            );
                          })()}
                          
                          {/* Only allow edit accessibility fields if item has left structural baseline pending index */}
                          {t.status !== "Pending" && (
                            <button
                              onClick={() => {
                                setEditingTimeId(t.id);
                                if (t.manualSettlementTime !== undefined) {
                                  setInputDays(String(Math.floor(t.manualSettlementTime / 1440)));
                                  setInputMinutes(String(t.manualSettlementTime % 1440));
                                } else {
                                  setInputDays("");
                                  setInputMinutes("");
                                }
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#eef0f6] rounded transition-all text-[#9aa3bb] hover:text-[#0f2044]"
                              title="Manually alter ticket deadline allocation"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="space-y-1">
                      <div className="relative">
                        <button
                          onClick={() => t.status !== "Rejected" && setOpenDrop(openDrop === t.id ? null : t.id)}
                          disabled={t.status === "Rejected"}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${t.status !== "Rejected" ? "hover:shadow-sm" : "cursor-default opacity-90"}`}
                          style={{ backgroundColor: s.bg, color: s.text, borderColor: s.border }}
                        >
                          <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                          {t.status}
                          {t.status !== "Rejected" && (
                            <ChevronDown className={`w-3 h-3 ml-0.5 transition-transform ${openDrop === t.id ? "rotate-180" : ""}`} />
                          )}
                        </button>
                        {openDrop === t.id && (
                          <div className="absolute left-0 top-full mt-1.5 z-20 bg-white rounded-xl border border-[rgba(15,32,68,0.12)] shadow-xl overflow-hidden w-44">
                            {(["Pending", "In Progress", "Resolved", "Rejected"] as MaintStatus[]).map((st) => {
                              const ss = maintStatusStyle[st];
                              return (
                                <button
                                  key={st}
                                  onClick={() => update(t.id, st)}
                                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold transition-colors text-left hover:bg-[#f7f8fa] ${t.status === st ? "bg-[#f0f2f7]" : ""}`}
                                >
                                  <span className={`w-2 h-2 rounded-full ${ss.dot}`} />
                                  <span style={{ color: ss.text }}>{st}</span>
                                  {t.status === st && <CheckCircle2 className="w-3.5 h-3.5 ml-auto text-[#1a56db]" />}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      {t.status === "Rejected" && t.rejectReason && (
                        <p className="text-[10px] text-red-500 font-medium italic max-w-[180px] truncate" title={t.rejectReason}>
                          Reason: {t.rejectReason}
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Reject Reason Modal */}
      {rejectTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setRejectTarget(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4" style={{ border: "2px solid #c81e1e" }}>
            <div className="bg-red-50 px-6 pt-6 pb-5 border-b border-red-100 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 border border-red-200">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-extrabold text-red-700 text-sm">Reject Maintenance Request</p>
                  <p className="text-red-400 text-xs mt-0.5">Ticket {rejectTarget} · Please provide a reason</p>
                </div>
                <button onClick={() => setRejectTarget(null)} className="text-red-300 hover:text-red-600 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <p className="text-[11px] font-bold text-[#0f2044] uppercase tracking-widest mb-3">Select Rejection Reason</p>
                <div className="space-y-2">
                  {REJECT_REASONS.map((reason) => (
                    <label
                      key={reason}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        rejectReason === reason ? "border-red-300 bg-red-50" : "border-[rgba(15,32,68,0.08)] bg-[#fafbfd]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="rejectReason"
                        value={reason}
                        checked={rejectReason === reason}
                        onChange={() => setRejectReason(reason)}
                        className="mt-0.5 accent-red-500 flex-shrink-0"
                      />
                      <span className={`text-xs font-medium leading-relaxed ${rejectReason === reason ? "text-red-700" : "text-[#0d1b2a]"}`}>{reason}</span>
                    </label>
                  ))}
                </div>
              </div>

              {rejectReason === "Other (see note below)" && (
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#0f2044] uppercase tracking-widest">Additional Note</label>
                  <textarea
                    value={rejectNote}
                    onChange={(e) => setRejectNote(e.target.value)}
                    rows={3}
                    placeholder="Describe the reason for rejection..."
                    className="w-full px-4 py-3 rounded-xl bg-[#eef0f6] border border-transparent focus:border-red-400 focus:bg-white focus:outline-none text-sm text-[#0d1b2a] transition-all resize-none"
                  />
                </div>
              )}
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button onClick={() => setRejectTarget(null)} className="flex-1 py-2.5 rounded-xl bg-[#eef0f6] text-[#5a6680] text-sm font-bold">Cancel</button>
              <button
                onClick={confirmReject}
                disabled={!rejectReason || (rejectReason === "Other (see note below)" && !rejectNote)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold disabled:opacity-40"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Shell ─────────────────────────────────────────────────────────────────────
const ROLE_CFG: Record<NonNullable<Role>, { title: string; subtitle: string; defaultTab: string }> = {
  student: {
    title: "Welcome back, Student | ID: 20260401",
    subtitle: "Undergraduate Portal · SSCSS",
    defaultTab: "Update Report",
  },
  lecturer: {
    title: "Lecturer Portal | Room & Lab Management Console",
    subtitle: "Faculty Portal · ID: LEC-0842",
    defaultTab: "Classroom Booking",
  },
  maintenance: {
    title: "Campus Operations & Repair Control Panel",
    subtitle: "Maintenance Staff Portal · ID: MNT-0217",
    defaultTab: "Maintenance Tickets",
  },
};

export default function App() {
  const [role, setRole] = useState<Role>(null);
  const [activeTab, setActiveTab] = useState("");

  const handleLogin = (r: Role) => {
    setRole(r);
    if (r) setActiveTab(ROLE_CFG[r].defaultTab);
  };

  const handleLogout = () => {
    setRole(null);
    setActiveTab("");
  };

  if (!role) return <LoginScreen onLogin={handleLogin} />;

  const cfg = ROLE_CFG[role];

  return (
    <div className="flex min-h-screen bg-[#f0f2f7]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Sidebar role={role} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Topbar title={cfg.title} subtitle={cfg.subtitle} />
        <main className="flex-1 overflow-y-auto">
          {role === "student" && activeTab === "Report Maintenance" && <StudentReportMaintenance />}
          {role === "student" && activeTab === "Update Report" && <StudentUpdateReport />}
          {role === "lecturer" && activeTab === "Classroom Booking" && <BookingGrid label="Classroom Booking" />}
          {role === "lecturer" && activeTab === "Laboratory Booking" && <BookingGrid label="Laboratory Booking" defaultBookings={["Tue 28-13:00"]} />}
          {role === "lecturer" && activeTab === "Report Maintenance" && <StudentReportMaintenance />}
          {role === "lecturer" && activeTab === "Update Report" && <LecturerUpdateReport />}
          {role === "maintenance" && <MaintenanceDashboard activeTab={activeTab} />}
        </main>
      </div>
    </div>
  );
}
