import {
  LayoutDashboard,
  CreditCard,
  Users,
  PieChart,
  LogOut,
  Bell,
  Search,
  CheckSquare,
  Receipt,
  Settings
} from 'lucide-react';
import { AdminDashboard } from './dashboard/AdminDashboard';
import { ManagerDashboard } from './dashboard/ManagerDashboard';
import { EmployeeDashboard } from './dashboard/EmployeeDashboard';
import { UserRole } from '../App';

interface DashboardProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ role, setRole, onLogout }) => {
  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden font-sans text-slate-900 selection:bg-lime-200 selection:text-slate-900">
      {/* Sidebar - Dark Mode like Ramp/Spendesk mixed style */}
      <aside className="w-64 bg-[#0F172A] border-r border-slate-800 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-[#0F172A] rounded-full"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Apotsa</span>
        </div>

        <div className="px-4 mb-6">
          <div className="bg-slate-800/50 rounded-lg p-2 flex items-center border border-slate-700/50">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs mr-3">
              TS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">TechSpire</p>
              <p className="text-xs text-slate-400 truncate">Free Plan</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 mt-4">
            Platform
          </p>

          {role === 'admin' && (
            <>
              <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active />
              <NavItem icon={<Receipt size={18} />} label="Expenses" />
              <NavItem icon={<CreditCard size={18} />} label="Cards" />
              <NavItem icon={<Users size={18} />} label="People" />
              <NavItem icon={<PieChart size={18} />} label="Accounting" />
              <NavItem icon={<Settings size={18} />} label="Company Settings" />
            </>
          )}
          {role === 'manager' && (
            <>
              <NavItem icon={<LayoutDashboard size={18} />} label="Team Overview" active />
              <NavItem icon={<Users size={18} />} label="Team Spend" />
              <NavItem icon={<CheckSquare size={18} />} label="Approvals" badge="3" />
              <NavItem icon={<PieChart size={18} />} label="Reports" />
            </>
          )}
          {role === 'employee' && (
            <>
              <NavItem icon={<LayoutDashboard size={18} />} label="Home" active />
              <NavItem icon={<Receipt size={18} />} label="My Expenses" />
              <NavItem icon={<CreditCard size={18} />} label="My Cards" />
            </>
          )}
        </nav>

        {/* Role Switcher for Demo */}
        <div className="p-4 border-t border-slate-800 bg-[#0F172A]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Demo Mode</p>
          </div>
          <div className="flex gap-1 mb-4 bg-slate-800 p-1 rounded-lg">
            {['admin', 'manager', 'employee'].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r as UserRole)}
                className={`flex - 1 py - 1.5 rounded - md text - [10px] font - bold uppercase tracking - wide transition - all ${role === r
                    ? 'bg-lime-400 text-slate-900 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  } `}
              >
                {r.slice(0, 3)}
              </button>
            ))}
          </div>
          <button
            onClick={onLogout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-200 transition-colors mr-3">
              <Search size={16} />
            </div>
            <span className="text-sm text-slate-400 group-hover:text-slate-600 transition-colors">Search anything... (Cmd+K)</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900 leading-none mb-1">Alex Morgan</p>
                <p className="text-xs text-slate-500 leading-none capitalize">{role}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 ring-2 ring-white shadow-sm"></div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 relative scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {role === 'admin' && <AdminDashboard />}
            {role === 'manager' && <ManagerDashboard />}
            {role === 'employee' && <EmployeeDashboard />}
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false, badge }: { icon: React.ReactNode, label: string, active?: boolean, badge?: string }) => (
  <a
    href="#"
    className={`flex items - center justify - between px - 3 py - 2 rounded - lg text - sm font - medium transition - all duration - 200 group ${active
        ? 'bg-lime-400/10 text-lime-400'
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      } `}
  >
    <div className="flex items-center gap-3">
      <span className={`${active ? 'text-lime-400' : 'text-slate-500 group-hover:text-white'} transition - colors`}>{icon}</span>
      {label}
    </div>
    {badge && (
      <span className="bg-lime-400 text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
        {badge}
      </span>
    )}
  </a>
);
