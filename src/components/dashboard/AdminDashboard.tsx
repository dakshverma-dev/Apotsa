import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  AlertCircle, 
  Plus, 
  Download, 
  CreditCard, 
  UserPlus, 
  Wallet,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const data = [
  { name: 'Marketing', spend: 450000 },
  { name: 'Sales', spend: 320000 },
  { name: 'Engineering', spend: 580000 },
  { name: 'Ops', spend: 120000 },
  { name: 'HR', spend: 85000 },
];

const activity = [
  { id: 1, user: 'Rahul Verma', action: 'Requested new card', time: '2m', amount: '₹50,000' },
  { id: 2, user: 'Priya Singh', action: 'Submitted expense', time: '15m', amount: '₹12,400' },
  { id: 3, user: 'Amit Kumar', action: 'Exceeded budget policy', time: '1h', amount: '₹1,200', alert: true },
  { id: 4, user: 'System', action: 'Monthly report generated', time: '2h', amount: '' },
];

export const AdminDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h2>
           <p className="text-slate-500">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
            <Download size={16} className="mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 bg-slate-900 rounded-xl text-sm font-semibold text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20 transition-all transform hover:-translate-y-0.5">
            <Plus size={16} className="mr-2" />
            New Card
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Spend (MTD)" 
          value="₹15,54,320" 
          change="12%" 
          trend="up"
        />
        <KPICard 
          title="Budget Utilized" 
          value="68%" 
          change="On track" 
          trend="neutral"
        />
        <KPICard 
          title="Pending Approvals" 
          value="14" 
          change="3 urgent" 
          trend="down"
          alert
        />
        <KPICard 
          title="Active Users" 
          value="124" 
          change="5 new" 
          trend="up"
        />
      </div>

      {/* Charts & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-slate-100">
          <div className="flex justify-between items-center mb-8">
             <h3 className="text-lg font-bold text-slate-900">Spend by Department</h3>
             <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg px-3 py-1 outline-none">
                <option>This Month</option>
                <option>Last Month</option>
             </select>
          </div>
          <div className="h-80 min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#64748B', fontSize: 13, fontWeight: 500 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#F8FAFC' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '12px' }}
                  formatter={(value: number) => [<span className="font-bold text-slate-900">₹{value.toLocaleString()}</span>, <span className="text-slate-500">Spend</span>]}
                />
                <Bar 
                  dataKey="spend" 
                  fill="#0F172A" 
                  radius={[0, 6, 6, 0]} 
                  barSize={24}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h3>
          <div className="space-y-6 flex-1 overflow-y-auto">
            {activity.map((item) => (
              <div key={item.id} className="group flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                   item.alert ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-500'
                }`}>
                   {item.alert ? <AlertCircle size={14} /> : <Wallet size={14} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-semibold text-slate-900 truncate">{item.user}</p>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{item.time}</span>
                  </div>
                  <p className="text-sm text-slate-500">{item.action}</p>
                </div>
                {item.amount && (
                  <div className="text-sm font-bold text-slate-900 ml-2">
                    {item.amount}
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-sm text-slate-600 font-semibold hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors">
            View All Activity
          </button>
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ActionButton icon={<CreditCard size={20} />} label="Issue Card" />
        <ActionButton icon={<UserPlus size={20} />} label="Invite Team" />
        <ActionButton icon={<Wallet size={20} />} label="Set Budget" />
        <ActionButton icon={<Download size={20} />} label="Export Data" />
      </div>
    </div>
  );
};

const KPICard = ({ title, value, change, trend, alert }: any) => (
  <div className="bg-white p-6 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between h-32 hover:shadow-lg transition-shadow duration-300">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
    </div>
    <div className="flex items-center gap-2 mt-2">
      <span className={`inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${
        alert ? 'bg-red-100 text-red-700' : 
        trend === 'up' ? 'bg-green-100 text-green-700' : 
        trend === 'down' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
      }`}>
        {trend === 'up' && <ArrowUpRight size={12} className="mr-1" />}
        {trend === 'down' && <ArrowDownRight size={12} className="mr-1" />}
        {change}
      </span>
      {trend !== 'neutral' && <span className="text-xs text-slate-400">vs last month</span>}
    </div>
  </div>
);

const ActionButton = ({ icon, label }: any) => (
  <button className="group flex items-center justify-center p-4 bg-white border border-slate-200 rounded-2xl hover:border-lime-400 hover:shadow-[0_0_20px_rgba(132,204,22,0.15)] transition-all duration-300">
    <div className="p-2 rounded-lg bg-slate-50 text-slate-600 group-hover:bg-lime-400 group-hover:text-slate-900 transition-colors mr-3">
      {icon}
    </div>
    <span className="font-semibold text-slate-700 group-hover:text-slate-900">{label}</span>
  </button>
);
