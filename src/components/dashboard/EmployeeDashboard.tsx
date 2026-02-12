import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Upload, 
  Calendar, 
  DollarSign, 
  FileText,
  Copy,
  Eye,
  EyeOff,
  MoreVertical,
  ArrowUpRight,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const myExpenses = [
  { id: 1, merchant: 'Uber India', date: 'Feb 12, 2024', amount: '₹450', status: 'Approved', category: 'Transport', logo: 'UB' },
  { id: 2, merchant: 'Starbucks', date: 'Feb 10, 2024', amount: '₹840', status: 'Pending', category: 'Meals', logo: 'SB' },
  { id: 3, merchant: 'Amazon AWS', date: 'Feb 05, 2024', amount: '₹12,500', status: 'Approved', category: 'Software', logo: 'AM' },
  { id: 4, merchant: 'WeWork', date: 'Feb 01, 2024', amount: '₹25,000', status: 'Rejected', category: 'Office', logo: 'WW' },
];

export const EmployeeDashboard = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-3xl font-bold text-slate-900 tracking-tight">My Expenses</h2>
           <p className="text-slate-500 mt-1">Manage your spending and virtual cards.</p>
        </div>
        <button 
          onClick={() => setIsExpenseModalOpen(true)}
          className="flex items-center px-5 py-3 bg-slate-900 rounded-xl text-sm font-bold text-white hover:bg-lime-500 hover:text-slate-900 shadow-xl shadow-slate-900/10 transition-all transform hover:-translate-y-0.5"
        >
          <Plus size={18} className="mr-2" />
          Submit Expense
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Stats Cards */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard 
            label="Spent this month" 
            value="₹13,790" 
            icon={<DollarSign size={20} className="text-white" />} 
            bg="bg-indigo-500"
            trend="+12%"
          />
          <StatCard 
            label="Pending Approval" 
            value="3" 
            icon={<Clock size={20} className="text-white" />} 
            bg="bg-amber-500"
            trend="Needs Attn"
          />
          <StatCard 
            label="Available Limit" 
            value="₹36,210" 
            icon={<CreditCard size={20} className="text-white" />} 
            bg="bg-emerald-500"
            trend="Good"
          />
        </div>

        {/* Virtual Card Widget */}
        <div className="md:row-span-2 space-y-6">
           {/* Card Visual */}
           <div className="bg-[#111] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group transition-all duration-500 hover:rotate-1 hover:scale-[1.02]">
             {/* Abstract Glow */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2"></div>
             
             <div className="relative z-10 flex flex-col h-[220px] justify-between">
               <div className="flex justify-between items-start">
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center">
                       <div className="w-3 h-3 bg-[#111] rounded-full"></div>
                    </div>
                    <span className="font-bold tracking-tight">Apotsa</span>
                 </div>
                 <span className="text-lg font-bold italic text-white/80">VISA</span>
               </div>
               
               <div className="space-y-6">
                 <div>
                    <div className="flex items-center gap-4 mb-2">
                       <div className="flex gap-1.5">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                       </div>
                       <div className="flex gap-1.5">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                       </div>
                       <div className="flex gap-1.5">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                       </div>
                       <span className="font-mono text-lg tracking-widest text-lime-400">
                         {showCardDetails ? '4291' : '••••'}
                       </span>
                    </div>
                 </div>

                 <div className="flex justify-between items-end">
                   <div>
                     <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Card Holder</p>
                     <p className="font-medium tracking-wide">ALEX MORGAN</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Expires</p>
                     <p className="font-medium">09/28</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           
           {/* Card Controls */}
           <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
             <div className="flex justify-between items-center mb-4">
               <span className="text-sm font-bold text-slate-700">Monthly Limit</span>
               <span className="text-sm font-bold text-slate-900">₹50,000</span>
             </div>
             <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
               <div className="bg-slate-900 h-2 rounded-full" style={{ width: '27%' }}></div>
             </div>
             
             <div className="grid grid-cols-2 gap-3 mt-6">
                <button 
                  onClick={() => setShowCardDetails(!showCardDetails)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  {showCardDetails ? <EyeOff size={16} /> : <Eye size={16} />}
                  {showCardDetails ? 'Hide' : 'Show'}
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                   <Copy size={16} />
                   Copy
                </button>
             </div>
           </div>
        </div>

        {/* Recent Expenses List */}
        <div className="md:col-span-2 bg-white rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col h-full">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Recent Transactions</h3>
            <div className="flex gap-2">
               <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                 <Search size={18} />
               </button>
               <button className="text-sm text-lime-600 font-bold hover:text-lime-700 px-3 py-2 rounded-lg hover:bg-lime-50 transition-colors">View All</button>
            </div>
          </div>
          <div className="divide-y divide-slate-50 flex-1">
            {myExpenses.map((expense) => (
              <div key={expense.id} className="p-6 flex items-center justify-between hover:bg-slate-50/80 transition-colors cursor-pointer group">
                <div className="flex items-center space-x-5">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-xs font-bold text-slate-500 group-hover:bg-white group-hover:shadow-md transition-all">
                    {expense.logo}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 mb-0.5">{expense.merchant}</p>
                    <p className="text-xs font-medium text-slate-400">{expense.date} • {expense.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-bold text-slate-900 text-right">{expense.amount}</span>
                  <StatusBadge status={expense.status} />
                  <MoreVertical size={16} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Expense Modal */}
      <AnimatePresence>
        {isExpenseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-900">Submit New Expense</h3>
                <button onClick={() => setIsExpenseModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <XCircle size={24} />
                </button>
              </div>
              
              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Merchant Name</label>
                  <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-transparent outline-none transition-all font-medium text-slate-900" placeholder="e.g. Uber, Amazon" />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-slate-400 font-bold">₹</span>
                      <input type="number" className="w-full p-3 pl-8 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-transparent outline-none transition-all font-bold text-slate-900" placeholder="0.00" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Date</label>
                    <input type="date" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-transparent outline-none transition-all font-medium text-slate-900" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Category</label>
                  <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-transparent outline-none transition-all font-medium text-slate-900 appearance-none">
                    <option>Select Category</option>
                    <option>Travel</option>
                    <option>Meals</option>
                    <option>Office Supplies</option>
                    <option>Software</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Receipt</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-lime-400 transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-400 mb-3 group-hover:text-lime-500 group-hover:scale-110 transition-all">
                       <Upload size={20} />
                    </div>
                    <p className="text-sm font-medium text-slate-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-400 mt-1">PDF, PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 flex justify-end gap-3 border-t border-slate-100">
                <button 
                  onClick={() => setIsExpenseModalOpen(false)}
                  className="px-6 py-3 text-slate-600 font-bold text-sm hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsExpenseModalOpen(false)}
                  className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-lime-500 hover:text-slate-900 font-bold text-sm shadow-lg shadow-slate-900/10 transition-all transform hover:-translate-y-0.5"
                >
                  Submit Expense
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatCard = ({ label, value, icon, bg, trend }: any) => (
  <div className="bg-white p-6 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between h-36 hover:shadow-lg transition-all duration-300 group">
    <div className="flex justify-between items-start">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <div className={`p-2.5 rounded-xl ${bg} shadow-md group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
    </div>
    <div>
       <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
       {trend && (
         <p className="text-xs font-semibold text-slate-400 mt-1 flex items-center gap-1">
           {trend === 'Needs Attn' ? <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> : <ArrowUpRight size={12} className="text-lime-500" />}
           {trend}
         </p>
       )}
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    Approved: 'bg-lime-100 text-lime-700 border-lime-200',
    Pending: 'bg-amber-100 text-amber-700 border-amber-200',
    Rejected: 'bg-red-100 text-red-700 border-red-200',
  };
  
  // @ts-ignore
  const style = styles[status] || 'bg-slate-100 text-slate-700 border-slate-200';
  
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${style}`}>
      {status}
    </span>
  );
};
