import { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  CreditCard,
  LayoutDashboard,
  CheckCircle2,
  FileText,
  ArrowRight,
  Menu,
  X,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Globe,
  PieChart
} from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans selection:bg-lime-300 selection:text-slate-900">
      {/* Navigation */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100/50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-lime-400 rounded-full"></div>
            </div>
            <span className="text-xl font-bold tracking-tighter text-slate-900">Apotsa</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['Product', 'Solutions', 'Customers', 'Pricing'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onLogin}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2"
            >
              Log in
            </button>
            <button
              onClick={onLogin}
              className="group relative px-6 py-2.5 bg-slate-900 rounded-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-lime-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10 text-sm font-medium text-white group-hover:text-slate-900 transition-colors duration-300">
                Start Now
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-slate-900">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <motion.div
          initial={false}
          animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden bg-white border-b border-slate-100"
        >
          <div className="p-6 flex flex-col gap-4">
            {['Product', 'Solutions', 'Customers', 'Pricing'].map((item) => (
              <a key={item} href="#" className="text-lg font-medium text-slate-900">{item}</a>
            ))}
            <div className="h-px bg-slate-100 my-2"></div>
            <button onClick={onLogin} className="text-left text-lg font-medium text-slate-600">Log in</button>
            <button onClick={onLogin} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-medium">Get Started</button>
          </div>
        </motion.div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-slate-900 mb-8 leading-[0.95]">
                  Control spend, <br />
                  <span className="text-slate-400">accelerate growth.</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Apotsa is the all-in-one financial OS. Corporate cards, expense management, and bill payments in one platform.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={onLogin}
                    className="w-full sm:w-auto px-8 py-4 bg-lime-400 hover:bg-lime-500 text-slate-900 rounded-2xl font-bold text-lg transition-all transform hover:-translate-y-1"
                  >
                    Start Free Trial
                  </button>
                  <button
                    onClick={onLogin}
                    className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-900 rounded-2xl font-bold text-lg transition-all"
                  >
                    Contact Sales
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Floating UI Elements Parallax */}
            <div className="relative max-w-6xl mx-auto h-[400px] md:h-[600px] perspective-1000">
              {/* Main Dashboard - Center */}
              <motion.div
                style={{ y: y1 }}
                className="absolute inset-x-4 md:inset-x-20 top-0 rounded-2xl shadow-2xl overflow-hidden border border-slate-200/50 bg-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmaW50ZWNoJTIwZGFzaGJvYXJkJTIwdWklMjBkYXJrJTIwbW9kZXxlbnwxfHx8fDE3NzA4OTIxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Dashboard"
                  className="w-full h-auto object-cover"
                />
              </motion.div>

              {/* Floating Card - Left */}
              <motion.div
                style={{ y: y2 }}
                className="hidden md:block absolute -left-12 top-20 w-72 bg-[#1A1A1A] rounded-2xl p-6 shadow-2xl border border-slate-800 text-white transform -rotate-6"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="w-10 h-6 bg-slate-700 rounded-md opacity-50"></div>
                  <span className="text-lime-400 font-mono">VISA</span>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Card Holder</div>
                      <div className="text-sm font-medium">Alex Morgan</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Limit</div>
                      <div className="text-sm font-medium">$50,000</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Notification - Right */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="hidden md:flex absolute -right-8 top-40 bg-white rounded-xl p-4 shadow-xl border border-slate-100 items-center gap-4 max-w-xs transform rotate-3"
              >
                <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center flex-shrink-0 text-lime-600">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Expense Approved</div>
                  <div className="text-xs text-slate-500">Flight to Bangalore • ₹12,400</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Background Gradients */}
          <div className="absolute top-0 left-0 right-0 h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-lime-200/20 rounded-full blur-[120px] opacity-50 mix-blend-multiply"></div>
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-200/20 rounded-full blur-[120px] opacity-50 mix-blend-multiply"></div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section id="product" className="py-32 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 mb-6">
                Everything you need to <br />
                <span className="text-slate-400">master your cash flow.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
              {/* Card 1: Large Span */}
              <div className="md:col-span-2 rounded-3xl bg-white p-8 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="relative z-10 max-w-md">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-lime-400 flex items-center justify-center mb-6">
                    <CreditCard size={24} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Corporate Cards</h3>
                  <p className="text-lg text-slate-500 leading-relaxed">Issue unlimited physical and virtual cards with built-in controls. Set limits by merchant, category, or team member.</p>
                </div>
                <div className="absolute right-0 bottom-0 w-1/2 h-3/4 bg-slate-50 rounded-tl-3xl border-t border-l border-slate-100 p-6 transition-transform group-hover:translate-x-2 group-hover:translate-y-2">
                  {/* Abstract Card UI */}
                  <div className="w-full h-full bg-[#111] rounded-xl relative p-6">
                    <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-lime-400/20 flex items-center justify-center">
                      <Zap size={16} className="text-lime-400" />
                    </div>
                    <div className="mt-auto absolute bottom-6 left-6">
                      <div className="flex gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-lime-400"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                      </div>
                      <div className="text-white font-mono text-sm">**** 4291</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-3xl bg-slate-900 p-8 md:p-10 border border-slate-800 shadow-sm relative overflow-hidden text-white group">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6 backdrop-blur-sm">
                    <LayoutDashboard size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">Real-time Insights</h3>
                  <p className="text-slate-400 leading-relaxed">Visualize spend as it happens. No more end-of-month surprises.</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-lime-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Chart Graphic */}
                <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-full border-[32px] border-lime-400/20 border-t-lime-400 border-r-lime-400 transform rotate-45 transition-transform group-hover:rotate-90 duration-700"></div>
              </div>

              {/* Card 3 */}
              <div className="rounded-3xl bg-white p-8 md:p-10 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-lime-100 text-lime-700 flex items-center justify-center mb-6">
                    <FileText size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Invoice Processing</h3>
                  <p className="text-slate-500 leading-relaxed">AI that reads receipts and invoices instantly. 99% accuracy on extraction.</p>
                </div>
                <div className="absolute bottom-6 right-6 p-4 bg-white border border-slate-100 shadow-lg rounded-xl rotate-3 group-hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <CheckCircle2 size={16} />
                    </div>
                    <div className="text-xs font-semibold text-slate-700">OCR Complete</div>
                  </div>
                </div>
              </div>

              {/* Card 4: Large Span */}
              <div className="md:col-span-2 rounded-3xl bg-[#F4F4F5] p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden group hover:bg-[#E4E4E7] transition-colors duration-500">
                <div className="relative z-10 grid md:grid-cols-2 gap-8 h-full items-center">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white text-slate-900 flex items-center justify-center mb-6 shadow-sm">
                      <Globe size={24} />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Global Payments</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">Pay vendors in 40+ currencies. Best-in-class FX rates without the hidden markups.</p>
                  </div>
                  <div className="relative h-full flex items-center justify-center">
                    <div className="w-64 h-64 relative">
                      {/* Globe/Map Abstract */}
                      <div className="absolute inset-0 rounded-full border border-slate-300 opacity-20 animate-[spin_10s_linear_infinite]"></div>
                      <div className="absolute inset-4 rounded-full border border-slate-300 opacity-40 animate-[spin_15s_linear_infinite_reverse]"></div>
                      <div className="absolute inset-8 rounded-full border border-slate-300 opacity-60 animate-[spin_20s_linear_infinite]"></div>

                      {/* Nodes */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-lime-500 rounded-full shadow-[0_0_20px_rgba(132,204,22,0.6)]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20 bg-white border-y border-slate-100 overflow-hidden">
          <div className="container mx-auto px-6 text-center mb-12">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Trusted by forward-thinking teams</p>
          </div>
          <div className="flex gap-12 animate-[scroll_30s_linear_infinite] w-max px-6 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {/* Repeat logos twice for seamless loop */}
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-12">
                <div className="text-2xl font-bold text-slate-800 flex items-center gap-2"><Zap size={24} /> Bolt</div>
                <div className="text-2xl font-bold text-slate-800 flex items-center gap-2"><Shield size={24} /> SecureTech</div>
                <div className="text-2xl font-bold text-slate-800 flex items-center gap-2"><Users size={24} /> WorkLife</div>
                <div className="text-2xl font-bold text-slate-800 flex items-center gap-2"><LayoutDashboard size={24} /> FinStack</div>
                <div className="text-2xl font-bold text-slate-800 flex items-center gap-2"><PieChart size={24} /> Analytica</div>
                <div className="text-2xl font-bold text-slate-800 flex items-center gap-2"><Globe size={24} /> GlobalX</div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-32 bg-slate-900 text-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Simple, transparent pricing</h2>
              <p className="text-slate-400 text-lg">No hidden fees. Cancel anytime.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <PricingCard
                title="Growth"
                price="Free"
                description="For startups just getting started."
                features={[
                  "Up to 10 cards",
                  "Basic expense policies",
                  "Slack integration",
                  "1 day retention"
                ]}
                cta="Start Free"
                onClick={onLogin}
                dark={true}
              />
              <PricingCard
                title="Scale"
                price="₹399"
                suffix="/user"
                description="For scaling teams requiring control."
                features={[
                  "Unlimited cards",
                  "Advanced multi-level approvals",
                  "NetSuite & Xero sync",
                  "Dedicated success manager"
                ]}
                cta="Start Trial"
                onClick={onLogin}
                highlight={true}
                dark={true}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center">
                <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
              </div>
              <span className="text-lg font-bold tracking-tighter text-slate-900">Apotsa</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              The financial operating system designed for the next generation of Indian business.
            </p>
          </div>

          {['Product', 'Company', 'Resources'].map((col, i) => (
            <div key={col}>
              <h4 className="font-bold text-slate-900 mb-6">{col}</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                {['Features', 'Pricing', 'Security', 'Enterprise'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-lime-600 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="container mx-auto px-6 mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <div>© 2024 Apotsa Technologies. All rights reserved.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-900">Privacy</a>
            <a href="#" className="hover:text-slate-900">Terms</a>
            <a href="#" className="hover:text-slate-900">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const PricingCard = ({
  title,
  price,
  suffix = "",
  description,
  features,
  cta,
  onClick,
  highlight,
  dark
}: any) => (
  <div className={`rounded-3xl p-8 border flex flex-col transition-all duration-300 ${highlight
    ? 'bg-[#1A1A1A] border-lime-500/50 shadow-[0_0_40px_rgba(132,204,22,0.1)]'
    : 'bg-transparent border-slate-800 hover:bg-[#111]'
    }`}>
    <div className="mb-8">
      <h3 className={`text-xl font-bold mb-2 ${highlight ? 'text-lime-400' : 'text-white'}`}>{title}</h3>
      <div className="flex items-baseline mb-4">
        <span className="text-5xl font-bold tracking-tighter text-white">{price}</span>
        {suffix && <span className="text-slate-500 ml-1">{suffix}</span>}
      </div>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
    <ul className="space-y-4 mb-10 flex-1">
      {features.map((feature: string, i: number) => (
        <li key={i} className="flex items-start">
          <CheckCircle2 className={`w-5 h-5 mr-3 flex-shrink-0 ${highlight ? 'text-lime-400' : 'text-slate-500'}`} />
          <span className="text-slate-300 text-sm">{feature}</span>
        </li>
      ))}
    </ul>
    <button
      onClick={onClick}
      className={`w-full py-4 px-6 rounded-xl font-bold text-sm transition-all ${highlight
        ? 'bg-lime-400 hover:bg-lime-500 text-slate-900'
        : 'bg-white hover:bg-slate-100 text-slate-900'
        }`}
    >
      {cta}
    </button>
  </div>
);
