import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  ChevronRight, 
  FileText,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

const weeklyTrend = [
  { day: 'Mon', spend: 4000 },
  { day: 'Tue', spend: 8500 },
  { day: 'Wed', spend: 3200 },
  { day: 'Thu', spend: 12000 },
  { day: 'Fri', spend: 6500 },
  { day: 'Sat', spend: 1000 },
  { day: 'Sun', spend: 500 },
];

const teamSpenders = [
  { name: 'Amit P.', role: 'Senior Dev', spend: 24500, limit: 50000 },
  { name: 'Sarah J.', role: 'Designer', spend: 18200, limit: 30000 },
  { name: 'Rajesh K.', role: 'QA Lead', spend: 12000, limit: 30000 },
  { name: 'Priya M.', role: 'Product', spend: 8500, limit: 40000 },
];

const approvals = [
  { id: 101, name: 'Amit P.', description: 'Client Lunch - Taj Hotel', amount: '₹4,500', date: 'Today, 1:30 PM', policy: 'Warning: Exceeds per-meal limit (₹3,000)' },
  { id: 102, name: 'Sarah J.', description: 'Software License - Figma', amount: '₹1,200', date: 'Yesterday', policy: 'Within policy' },
  { id: 103, name: 'Rajesh K.', description: 'Team Outing Transport', amount: '₹2,500', date: 'Yesterday', policy: 'Within policy' },
];

export const ManagerDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Engineering Team</h2>
          <p className="text-slate-500 mt-1">Manage budget, expenses, and approvals.</p>
        </div>
        <div className="text-right bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Monthly Budget</p>
          <div className="flex items-baseline justify-end gap-2">
            <p className="text-2xl font-bold text-slate-900">₹63,200</p>
            <span className="text-sm text-slate-400 font-medium">/ ₹2,00,000</span>
          </div>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="bg-slate-900 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-sm font-medium text-slate-400 block mb-1">Budget Utilization</span>
              <span className="text-4xl font-bold text-white tracking-tight">31.6%</span>
            </div>
            <div className="text-right">
              <span className="text-sm text-lime-400 font-bold bg-lime-400/10 px-3 py-1 rounded-full">On Track</span>
            </div>
          </div>
          
          <div className="w-full bg-slate-800 rounded-full h-4 mb-4 overflow-hidden">
            <div className="bg-gradient-to-r from-lime-500 to-lime-300 h-full rounded-full" style={{ width: '31.6%' }}></div>
          </div>
          
          <div className="flex justify-between text-xs font-medium text-slate-500 uppercase tracking-wide">
            <span>Feb 1</span>
            <span>Feb 28</span>
          </div>
        </div>
        
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Approvals */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
             <h3 className="text-lg font-bold text-slate-900">Pending Approvals</h3>
             <button className="text-sm font-semibold text-lime-600 hover:text-lime-700 flex items-center">
               View All <ArrowRight size={16} className="ml-1" />
             </button>
          </div>
          
          <div className="space-y-4">
            {approvals.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-transform hover:scale-[1.01]">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 flex-shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="font-bold text-slate-900">{item.description}</h4>
                      <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md border border-slate-200">{item.amount}</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-2">Requested by <span className="font-medium text-slate-700">{item.name}</span> • {item.date}</p>
                    
                    {item.policy.includes('Warning') ? (
                      <p className="inline-flex items-center text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                        <AlertTriangle size={12} className="mr-1.5" />
                        {item.policy}
                      </p>
                    ) : (
                      <p className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                        <CheckCircle size={12} className="mr-1.5" />
                        {item.policy}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button className="flex-1 md:flex-none px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-sm font-bold transition-all">
                    Reject
                  </button>
                  <button className="flex-1 md:flex-none px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-lime-500 hover:text-slate-900 text-sm font-bold transition-all shadow-lg shadow-slate-900/10">
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Spend Summary */}
        <div className="bg-white p-6 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col h-full">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Top Spenders</h3>
          <div className="space-y-6 mb-8 flex-1">
            {teamSpenders.map((member, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                       <p className="text-sm font-bold text-slate-900">{member.name}</p>
                       <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">₹{member.spend.toLocaleString()}</p>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-slate-900 h-1.5 rounded-full group-hover:bg-lime-500 transition-colors duration-300" 
                    style={{ width: `${(member.spend / member.limit) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-6 border-t border-slate-100">
             <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Weekly Trend</h4>
             <div className="h-32 min-h-[128px]">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={weeklyTrend}>
                   <Tooltip 
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: '#0F172A', color: '#fff' }}
                     itemStyle={{ color: '#fff' }}
                     formatter={(value: number) => [`₹${value}`, '']}
                     labelStyle={{ display: 'none' }}
                   />
                   <Line type="monotone" dataKey="spend" stroke="#84cc16" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#fff' }} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
