/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  User as UserIcon, 
  LayoutDashboard, 
  GraduationCap, 
  Newspaper, 
  Bot, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Sun, 
  Moon, 
  ChevronRight,
  Monitor,
  Lock,
  Mail,
  Phone,
  Menu,
  X,
  Users,
  TrendingUp,
  AlertCircle,
  Plus,
  MessageSquare,
  BarChart3,
  Calendar,
  Award,
  Cake,
  Star,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Role, User, SubjectGrade, NewsItem, Language, Theme, TeacherClass, RiskStudent, ParentFeedItem, SchoolStats, ClassStudent } from './types';
import { translations } from './translations';

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${active ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

function UserMenuItem({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-3 w-full p-3 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function NewsCard({ item, onClick }: { item: NewsItem, onClick: () => void, key?: any }) {
  return (
    <div 
      onClick={onClick}
      className="group bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-5 cursor-pointer hover:border-blue-500 transition-all hover:shadow-lg"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{item.category}</span>
        <span className="text-xs text-slate-400">{item.date}</span>
      </div>
      <h4 className="font-bold mb-2 group-hover:text-blue-500 transition-colors">{item.title}</h4>
      <p className="text-sm text-slate-500 line-clamp-2">{item.content}</p>
    </div>
  );
}

function GradeBadge({ value }: { value: number }) {
  const getColor = () => {
    const val = isNaN(value) ? 0 : value;
    if (val >= 90) return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
    if (val >= 75) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    if (val >= 50) return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
  };

  return (
    <span className={`px-2 py-1 rounded-md text-xs font-bold ${getColor()}`}>
      {isNaN(value) ? '—' : `${value}%`}
    </span>
  );
}

function GradesTable({ grades, t, translateSubject }: { grades: SubjectGrade[], t: any, translateSubject: (s: string) => string }) {
  const [activeQuarter, setActiveQuarter] = useState(0); // 0-3 for Q1-Q4, 4 for Yearly
  
  return (
    <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
        {[1, 2, 3, 4].map((q, idx) => (
          <button 
            key={q}
            onClick={() => setActiveQuarter(idx)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeQuarter === idx ? 'bg-blue-500 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-500'}`}
          >
            {t.quarter} {q}
          </button>
        ))}
        <button 
          onClick={() => setActiveQuarter(4)}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeQuarter === 4 ? 'bg-emerald-500 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-500'}`}
        >
          {t.yearly}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-bold">{t.subject}</th>
              {activeQuarter < 4 ? (
                <>
                  <th className="p-4 font-bold text-center">{t.fo}</th>
                  <th className="p-4 font-bold text-center">{t.sor}</th>
                  <th className="p-4 font-bold text-center">{t.sorFoPercent}</th>
                  <th className="p-4 font-bold text-center">{t.soch}</th>
                  <th className="p-4 font-bold text-center">{t.sochPercent}</th>
                  <th className="p-4 font-bold text-center">{t.final}</th>
                </>
              ) : (
                <th className="p-4 font-bold text-center">{t.yearly}</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {grades.map((g, i) => (
              <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="p-4 font-semibold">{translateSubject(g.subject)}</td>
                {activeQuarter < 4 ? (
                  <>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {g.quarters[activeQuarter]?.fo.map((f, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-medium">
                            {f}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {g.quarters[activeQuarter]?.sor.map((s, idx) => (
                          <span key={idx} className="text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded font-medium">
                            {s.score}/{s.total}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-center font-bold text-slate-700 dark:text-slate-300">
                      {g.quarters[activeQuarter]?.sorFoPercent}%
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-[10px] bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-1.5 py-0.5 rounded font-medium">
                        {g.quarters[activeQuarter]?.soch.score}/{g.quarters[activeQuarter]?.soch.total}
                      </span>
                    </td>
                    <td className="p-4 text-center font-bold text-slate-700 dark:text-slate-300">
                      {g.quarters[activeQuarter]?.sochPercent}%
                    </td>
                    <td className="p-4 text-center font-bold text-blue-600 dark:text-blue-400">
                      {g.quarters[activeQuarter]?.final || 0}%
                    </td>
                  </>
                ) : (
                  <td className="p-4 text-center font-bold text-emerald-600 dark:text-emerald-400 text-lg">{g.yearly}%</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 dark:border-slate-800 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 flex items-center justify-between text-left hover:text-blue-500 transition-colors"
      >
        <span className="text-sm font-medium">{question}</span>
        <ChevronRight size={16} className={`transform transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-slate-500">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState<Role>(() => (localStorage.getItem('role') as Role) || 'student');
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('lang') as Language) || 'ru');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [grades, setGrades] = useState<SubjectGrade[]>([]);
  const [aiAdvice, setAiAdvice] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(() => !!localStorage.getItem('user'));

  const t = translations[lang] || translations.ru;

  const translateSubject = (subject: string) => {
    const key = subject.toLowerCase();
    if (key.includes('математика') || key.includes('math')) return t.math;
    if (key.includes('физика') || key.includes('physics')) return t.physics;
    if (key.includes('история') || key.includes('history')) return t.history;
    if (key.includes('английский') || key.includes('english')) return t.english;
    if (key.includes('алгебра') || key.includes('algebra')) return t.algebra;
    if (key.includes('геометрия') || key.includes('geometry')) return t.geometry;
    if (key.includes('биология') || key.includes('biology')) return t.biology;
    if (key.includes('химия') || key.includes('chemistry')) return t.chemistry;
    if (key.includes('география') || key.includes('geography')) return t.geography;
    if (key.includes('казах') || key.includes('kazakh')) return t.kazakh;
    if (key.includes('русский') || key.includes('russian')) return t.russian;
    if (key.includes('информатика') || key.includes('computer')) return t.computerScience;
    if (key.includes('физкультура') || key.includes('physical')) return t.physicalEducation;
    return subject;
  };

  useEffect(() => {
    localStorage.setItem('role', role);
    localStorage.setItem('theme', theme);
    localStorage.setItem('lang', lang);
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [role, theme, lang]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser({
        id: '1',
        name: 'Алибек',
        surname: 'Сейтов',
        role: role,
        class: '10A',
        school: 'Aqbobek Lyceum'
      });
    }
  }, [role]);
    
  useEffect(() => {
    fetchNews();
    if (role === 'student' || role === 'parent') {
      fetchGrades('1');
    }
  }, [role, lang]);

  const fetchNews = async () => {
    try {
      const res = await fetch(`/api/news?lang=${lang}`);
      const data = await res.json();
      setNews(data);
    } catch (err) {
      console.error("Failed to fetch news", err);
    }
  };

  const fetchGrades = async (studentId: string) => {
    try {
      const res = await fetch(`/api/grades/${studentId}`);
      const data = await res.json();
      setGrades(data);
    } catch (err) {
      console.error("Failed to fetch grades", err);
    }
  };

  const getAiAdvice = async () => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: user?.id, lang })
      });
      const data = await res.json();
      setAiAdvice(data.advice);
    } catch (err) {
      console.error("Failed to fetch AI advice", err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setIsRegistered(false);
    window.location.reload();
  };

  if (!isRegistered) {
    return <Auth onComplete={() => setIsRegistered(true)} t={t} />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card-light dark:bg-card-dark border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <h1 className="text-xl font-bold tracking-tight">Aqbobek</h1>
          </div>

          <nav className="space-y-2">
            <NavItem icon={<LayoutDashboard size={20} />} label={t.dashboard} active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
            {(role === 'student' || role === 'parent') && (
              <NavItem icon={<GraduationCap size={20} />} label={t.grades} active={activeTab === 'grades'} onClick={() => setActiveTab('grades')} />
            )}
            <NavItem icon={<Newspaper size={20} />} label={t.news} active={activeTab === 'news'} onClick={() => setActiveTab('news')} />
            {(role === 'student') && (
              <NavItem icon={<Bot size={20} />} label={t.aiMentor} active={activeTab === 'aiMentor'} onClick={() => setActiveTab('aiMentor')} />
            )}
            <NavItem icon={<Monitor size={20} />} label={t.kiosk} active={activeTab === 'kiosk'} onClick={() => setActiveTab('kiosk')} />
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">{t.logout}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between">
          <button className="md:hidden p-2 text-slate-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex-1 md:flex-none">
            <h2 className="text-lg font-semibold">{t[activeTab as keyof typeof t] || activeTab}</h2>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-blue-500 transition-all"
              title={theme === 'light' ? t.dark : t.light}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                  {user?.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" /> : <UserIcon size={18} className="text-slate-500" />}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold leading-none">{user?.name} {user?.surname}</p>
                  <p className="text-xs text-slate-500 mt-1 capitalize">{t[role]}</p>
                </div>
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 z-20 overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-100 dark:border-slate-700">
                        <p className="font-bold">{user?.name} {user?.surname}</p>
                        <p className="text-xs text-slate-500">{user?.class}, {user?.school}</p>
                      </div>
                      <div className="p-2">
                        <UserMenuItem icon={<Settings size={16} />} label={t.settings} onClick={() => { setActiveTab('settings'); setIsUserMenuOpen(false); }} />
                        <UserMenuItem icon={<HelpCircle size={16} />} label={t.help} onClick={() => { setActiveTab('help'); setIsUserMenuOpen(false); }} />
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 max-w-6xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }} className="space-y-6">
                {role === 'student' && <StudentDashboard t={t} news={news} setSelectedNews={setSelectedNews} grades={grades} translateSubject={translateSubject} />}
                {role === 'teacher' && <TeacherDashboard t={t} user={user} />}
                {role === 'parent' && <ParentDashboard t={t} user={user} lang={lang} />}
                {role === 'admin' && <AdminDashboard t={t} />}
              </motion.div>
            )}

            {activeTab === 'grades' && (
              <motion.div key="grades" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }}>
                <GradesTable grades={grades} t={t} translateSubject={translateSubject} />
              </motion.div>
            )}

            {activeTab === 'news' && (
              <motion.div key="news" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map(item => (
                  <NewsCard key={item.id} item={item} onClick={() => setSelectedNews(item)} />
                ))}
              </motion.div>
            )}

            {activeTab === 'aiMentor' && (
              <motion.div key="aiMentor" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }}>
                <AiMentor t={t} aiAdvice={aiAdvice} getAiAdvice={getAiAdvice} isAiLoading={isAiLoading} />
              </motion.div>
            )}

            {activeTab === 'kiosk' && (
              <motion.div key="kiosk" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }}>
                <Kiosk t={t} lang={lang} />
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }} className="max-w-2xl space-y-6">
                <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold mb-4">{t.theme}</h3>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setTheme('light')}
                        className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'border-slate-100 dark:border-slate-800'}`}
                      >
                        <Sun size={20} /> {t.light}
                      </button>
                      <button 
                        onClick={() => setTheme('dark')}
                        className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'border-slate-100 dark:border-slate-800'}`}
                      >
                        <Moon size={20} /> {t.dark}
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-4">{t.language}</h3>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setLang('ru')}
                        className={`flex-1 p-3 rounded-xl border-2 transition-all ${lang === 'ru' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'border-slate-100 dark:border-slate-800'}`}
                      >
                        Русский
                      </button>
                      <button 
                        onClick={() => setLang('kz')}
                        className={`flex-1 p-3 rounded-xl border-2 transition-all ${lang === 'kz' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'border-slate-100 dark:border-slate-800'}`}
                      >
                        Қазақша
                      </button>
                      <button 
                        onClick={() => setLang('en')}
                        className={`flex-1 p-3 rounded-xl border-2 transition-all ${lang === 'en' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'border-slate-100 dark:border-slate-800'}`}
                      >
                        English
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button className="flex items-center gap-2 text-blue-500 font-medium hover:underline">
                      <Lock size={16} /> {t.changePassword}
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">{t.role} (Debug)</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {(['student', 'teacher', 'parent', 'admin'] as Role[]).map(r => (
                      <button 
                        key={r}
                        onClick={() => setRole(r)}
                        className={`p-2 rounded-lg text-sm capitalize ${role === r ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
                      >
                        {t[r]}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'help' && (
              <motion.div key="help" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: -20 }} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-4">{t.contactUs}</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                        <Mail size={20} className="text-blue-500" />
                        <span>support@aqbobek.kz</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                        <Phone size={20} className="text-blue-500" />
                        <span>+7 (7112) 55-66-77</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-4">{t.faq}</h3>
                    <div className="space-y-3">
      <FaqItem question={t.howToReset} answer={t.howToResetAns} />
      <FaqItem question={t.whereSchedule} answer={t.whereScheduleAns} />
      <FaqItem question={t.howAiWorks} answer={t.howAiWorksAns} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* News Modal */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedNews(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center text-white">
                <Newspaper size={64} />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">
                  {selectedNews.category} • {selectedNews.date}
                </div>
                <h3 className="text-2xl font-bold mb-4">{selectedNews.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {selectedNews.content}
                </p>
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="mt-8 w-full py-3 bg-slate-100 dark:bg-slate-700 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  {t.cancel}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}



function StudentDashboard({ t, news, setSelectedNews, grades, translateSubject }: { t: any, news: NewsItem[], setSelectedNews: any, grades: SubjectGrade[], translateSubject: (s: string) => string }) {
  const [view, setView] = useState<'overview' | 'diary' | 'homework'>('overview');

  const homework = [
    { subject: t.math, task: t.homeworkTask1, deadline: t.tomorrow },
    { subject: t.physics, task: t.homeworkTask2, deadline: "02.04" },
    { subject: t.history, task: t.homeworkTask3, deadline: t.friday },
    { subject: t.english, task: t.homeworkTask4, deadline: t.tomorrow },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
        <button 
          onClick={() => setView('overview')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'overview' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}
        >
          {t.dashboard}
        </button>
        <button 
          onClick={() => setView('diary')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'diary' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}
        >
          {t.diary}
        </button>
        <button 
          onClick={() => setView('homework')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'homework' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}
        >
          {t.homework}
        </button>
      </div>

      {view === 'overview' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
              <p className="text-blue-100 text-sm font-medium mb-1">{t.averageScore}</p>
              <h3 className="text-3xl font-bold">4.85</h3>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs text-blue-100">
                  <span>{t.progressToGoal}</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-white h-full w-[92%]" />
                </div>
                <p className="text-[10px] text-blue-100 opacity-80">{t.progressToGoalDesc}</p>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 shadow-sm">
              <p className="text-slate-500 text-sm font-medium mb-1">{t.attendance}</p>
              <h3 className="text-3xl font-bold">98%</h3>
              <div className="mt-4 w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[98%]" />
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 shadow-sm">
              <p className="text-slate-500 text-sm font-medium mb-1">{t.myRank}</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-blue-500">#1</h3>
                <span className="text-xs text-slate-400">{t.ofStudents.replace('{count}', '28')}</span>
              </div>
              <div className="mt-4 flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full ${i === 1 ? 'bg-blue-500' : 'bg-slate-100 dark:bg-slate-700'}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">{t.grades}</h3>
                  <button onClick={() => setView('diary')} className="text-blue-500 text-sm font-bold hover:underline">{t.diary}</button>
                </div>
                <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
                  <div className="space-y-3">
                    {grades.slice(0, 3).map((g, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <span className="font-medium">{translateSubject(g.subject)}</span>
                        <GradeBadge value={g.quarters[0]?.final || 0} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold mb-4">{t.news}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {news.slice(0, 2).map(item => (
                    <NewsCard key={item.id} item={item} onClick={() => setSelectedNews(item)} />
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">{t.rating} ({t.top10})</h3>
                <div className="space-y-4">
                  {[
                    { name: t.studentName1, score: 4.9, rank: 1 },
                    { name: t.studentName2, score: 4.8, rank: 2 },
                    { name: t.studentName3, score: 4.7, rank: 3 },
                    { name: t.studentName4, score: 4.6, rank: 4 },
                    { name: t.studentName5, score: 4.5, rank: 5 },
                  ].map((s, i) => (
                    <div key={i} className={`flex items-center justify-between p-2 rounded-lg ${s.name === t.studentName1 ? 'bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500/30' : ''}`}>
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i < 3 ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                          {s.rank}
                        </span>
                        <span className={`text-sm font-medium ${s.name === t.studentName1 ? 'text-blue-600 dark:text-blue-400' : ''}`}>{s.name} {s.name === t.studentName1 ? `(${t.myRank})` : ''}</span>
                      </div>
                      <span className="text-sm font-bold text-blue-500">{s.score}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </>
      ) : view === 'diary' ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-bold">{t.subject}</th>
                  <th className="p-4 font-bold">{t.grade}</th>
                  <th className="p-4 font-bold">{t.comment}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {grades.map((g, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-semibold">{translateSubject(g.subject)}</td>
                    <td className="p-4"><GradeBadge value={g.quarters[0]?.final || 0} /></td>
                    <td className="p-4 text-sm text-slate-500">{g.comment || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {homework.map((hw, i) => (
            <div key={i} className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:border-blue-500 transition-all">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-lg">{hw.subject}</h4>
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold">
                  {hw.deadline}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">{hw.task}</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

function TeacherDashboard({ t, user }: { t: any, user: User | null }) {
  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [riskStudents, setRiskStudents] = useState<RiskStudent[]>([]);
  const [view, setView] = useState<'overview' | 'journal'>('overview');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [students, setStudents] = useState<ClassStudent[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch('/api/teacher/classes').then(res => res.json()).then(setClasses);
    fetch('/api/teacher/risk-zone').then(res => res.json()).then(setRiskStudents);
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetch(`/api/teacher/class-students/${selectedClass}`)
        .then(res => res.json())
        .then(setStudents);
    }
  }, [selectedClass]);

  const handleUpdateGrade = async (studentId: string, type: 'fo' | 'sor' | 'soch' | 'comment', index: number, value: any, total?: number) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const updated = { ...s };
        if (type === 'fo') {
          updated.fo = [...updated.fo];
          updated.fo[index] = value;
        } else if (type === 'sor') {
          updated.sor = [...updated.sor];
          updated.sor[index] = { score: value, total: total || updated.sor[index].total };
        } else if (type === 'soch') {
          updated.soch = { score: value, total: total || updated.soch.total };
        } else if (type === 'comment') {
          updated.comment = value;
        }
        
        // Recalculate percentages
        const foSum = updated.fo.reduce((a, b) => a + b, 0);
        const foMax = updated.fo.length * 10;
        const sorSum = updated.sor.reduce((a, b) => a + b.score, 0);
        const sorMax = updated.sor.reduce((a, b) => a + b.total, 0);
        updated.sorFoPercent = Math.round(((foSum + sorSum) / (foMax + sorMax)) * 100) || 0;
        
        updated.sochPercent = Math.round((updated.soch.score / updated.soch.total) * 100) || 0;
        
        // Final grade calculation (50% SOR+FO, 50% SOCH)
        updated.final = Math.round((updated.sorFoPercent * 0.5) + (updated.sochPercent * 0.5));
        
        return updated;
      }
      return s;
    }));
    
    try {
      await fetch('/api/teacher/update-grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, classId: selectedClass, type, index, value, total })
      });
    } catch (err) {
      console.error("Failed to update grade", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
          <button 
            onClick={() => setView('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'overview' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}
          >
            {t.dashboard}
          </button>
          <button 
            onClick={() => { setView('journal'); if (!selectedClass && classes.length > 0) setSelectedClass(classes[0].id); }}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'journal' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}
          >
            {t.journal}
          </button>
        </div>
        
        {user && (
          <div className="flex items-center gap-3 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <div className="p-2 bg-blue-500 text-white rounded-lg">
              <BookOpen size={18} />
            </div>
            <div>
              <p className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">{t.subject}</p>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{user.subject}</p>
            </div>
            {user.isClassTeacher && (
              <div className="ml-4 pl-4 border-l border-blue-200 dark:border-blue-800">
                <p className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">{t.classTeacher}</p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{user.managedClass}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {view === 'overview' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 shadow-sm">
              <p className="text-slate-500 text-sm font-medium mb-1">{t.myClasses}</p>
              <h3 className="text-3xl font-bold">{classes.length}</h3>
            </div>
            <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 shadow-sm">
              <p className="text-red-500 text-sm font-medium mb-1">{t.riskZone}</p>
              <h3 className="text-3xl font-bold text-red-600">{riskStudents.length}</h3>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center">
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors">
                <Plus size={20} /> {t.addAchievement}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">{t.myClasses}</h3>
              <div className="space-y-4">
                {classes.map(c => (
                  <div key={c.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div>
                      <p className="font-bold">{c.name}</p>
                      <p className="text-xs text-slate-500">{c.subject} • {t.ofStudents.replace('{count}', c.studentCount.toString())}</p>
                    </div>
                    <button 
                      onClick={() => { setSelectedClass(c.id); setView('journal'); }}
                      className="text-blue-500 text-sm font-bold hover:underline"
                    >
                      {t.journal}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-red-500 mb-4">
                <AlertCircle size={20} />
                <h3 className="text-lg font-bold">{t.riskZone}</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">{t.riskZoneDesc}</p>
              <div className="space-y-3">
                {riskStudents && riskStudents.length > 0 ? riskStudents.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-3 rounded-xl border border-red-100 dark:border-red-900/20 bg-red-50/30 dark:bg-red-900/5">
                    <div>
                      <p className="text-sm font-bold">{s.name} {s.surname}</p>
                      <p className="text-[10px] text-slate-500">{s.class}</p>
                    </div>
                    <span className="text-sm font-bold text-red-500">{s.score}</span>
                  </div>
                )) : null}
              </div>
            </section>
          </div>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {classes && classes.length > 0 ? classes.map(c => (
              <button 
                key={c.id}
                onClick={() => setSelectedClass(c.id)}
                className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${selectedClass === c.id ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-white dark:bg-slate-800 text-slate-500'}`}
              >
                {c.name}
              </button>
            )) : null}
          </div>
          
          <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-[10px] uppercase tracking-wider">
                    <th className="p-4 font-bold sticky left-0 bg-slate-50 dark:bg-slate-800/50 z-10">{t.student}</th>
                    <th className="p-4 font-bold text-center">{t.fo}</th>
                    <th className="p-4 font-bold text-center">{t.sor}</th>
                    <th className="p-4 font-bold text-center">{t.sorFoPercent}</th>
                    <th className="p-4 font-bold text-center">{t.soch}</th>
                    <th className="p-4 font-bold text-center">{t.sochPercent}</th>
                    <th className="p-4 font-bold text-center">{t.final}</th>
                    <th className="p-4 font-bold">{t.comment}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {students.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 font-semibold sticky left-0 bg-white dark:bg-card-dark z-10">{s.name}</td>
                      <td className="p-4">
                        <div className="flex gap-1 justify-center">
                          {s.fo.map((val, idx) => (
                            <input 
                              key={idx}
                              type="number" 
                              value={val === 0 ? '' : val} 
                              onChange={(e) => handleUpdateGrade(s.id, 'fo', idx, parseInt(e.target.value) || 0)}
                              className="w-8 p-1 text-center bg-slate-50 dark:bg-slate-800 rounded border-none focus:ring-1 focus:ring-blue-500 text-xs"
                              max={10}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2 justify-center">
                          {s.sor.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-0.5 bg-blue-50 dark:bg-blue-900/20 p-1 rounded">
                              <input 
                                type="number" 
                                value={item.score === 0 ? '' : item.score} 
                                onChange={(e) => handleUpdateGrade(s.id, 'sor', idx, parseInt(e.target.value) || 0)}
                                className="w-8 p-0.5 text-center bg-transparent border-none focus:ring-0 text-xs font-bold text-blue-600 dark:text-blue-400"
                              />
                              <span className="text-slate-400">/</span>
                              <input 
                                type="number" 
                                value={item.total} 
                                onChange={(e) => handleUpdateGrade(s.id, 'sor', idx, item.score, parseInt(e.target.value) || 1)}
                                className="w-8 p-0.5 text-center bg-transparent border-none focus:ring-0 text-xs text-slate-500"
                              />
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-center font-bold text-slate-700 dark:text-slate-300">{s.sorFoPercent}%</td>
                      <td className="p-4">
                        <div className="flex items-center gap-0.5 justify-center bg-purple-50 dark:bg-purple-900/20 p-1 rounded w-fit mx-auto">
                          <input 
                            type="number" 
                            value={s.soch.score === 0 ? '' : s.soch.score} 
                            onChange={(e) => handleUpdateGrade(s.id, 'soch', 0, parseInt(e.target.value) || 0)}
                            className="w-8 p-0.5 text-center bg-transparent border-none focus:ring-0 text-xs font-bold text-purple-600 dark:text-purple-400"
                          />
                          <span className="text-slate-400">/</span>
                          <input 
                            type="number" 
                            value={s.soch.total} 
                            onChange={(e) => handleUpdateGrade(s.id, 'soch', 0, s.soch.score, parseInt(e.target.value) || 1)}
                            className="w-8 p-0.5 text-center bg-transparent border-none focus:ring-0 text-xs text-slate-500"
                          />
                        </div>
                      </td>
                      <td className="p-4 text-center font-bold text-slate-700 dark:text-slate-300">{s.sochPercent}%</td>
                      <td className="p-4 text-center font-bold text-blue-500">{s.final}%</td>
                      <td className="p-4">
                        <input 
                          type="text" 
                          value={s.comment} 
                          onChange={(e) => handleUpdateGrade(s.id, 'comment', 0, e.target.value)}
                          className="w-full p-1 bg-slate-50 dark:bg-slate-800 rounded border-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder={t.addComment || "Добавить комментарий..."}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function ParentDashboard({ t, user, lang }: { t: any, user: User | null, lang: string }) {
  const [feed, setFeed] = useState<ParentFeedItem[]>([]);

  useEffect(() => {
    fetch(`/api/parent/feed?lang=${lang}`).then(res => res.json()).then(setFeed);
  }, [lang]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-6">{t.parentFeed}</h3>
            <div className="space-y-6">
              {feed && feed.length > 0 ? feed.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    item.type === 'grade' ? 'bg-blue-100 text-blue-600' :
                    item.type === 'event' ? 'bg-amber-100 text-amber-600' :
                    'bg-emerald-100 text-emerald-600'
                  }`}>
                    {item.type === 'grade' ? <Award size={20} /> : item.type === 'event' ? <Calendar size={20} /> : <TrendingUp size={20} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.text}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{item.date}</p>
                  </div>
                </div>
              )) : null}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">{t.analytics}</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <p className="text-xs text-slate-500 mb-2">{t.compareWithClass}</p>
                <div className="flex items-end gap-2 h-24">
                  <div className="flex-1 bg-blue-500 rounded-t-lg h-[90%] relative group">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">4.85</span>
                  </div>
                  <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-t-lg h-[75%] relative group">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">4.2</span>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                  <span>{user?.name}</span>
                  <span>{t.class}</span>
                </div>
              </div>
              <button className="w-full py-3 flex items-center justify-center gap-2 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors">
                <MessageSquare size={18} /> {t.sendMessage}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function AiMentor({ t, aiAdvice, getAiAdvice, isAiLoading }: { t: any, aiAdvice: string | null, getAiAdvice: any, isAiLoading: boolean }) {
  return (
    <div className="glass p-8 rounded-3xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full -ml-32 -mb-32" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <Bot size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{t.aiMentor}</h2>
            <p className="text-slate-500">{t.aiMentorDesc}</p>
          </div>
        </div>

        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white dark:border-slate-700 rounded-2xl p-6 min-h-[200px] flex flex-col justify-center">
          {isAiLoading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-500 font-medium">{t.loading}</p>
            </div>
          ) : aiAdvice ? (
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 italic">
                "{aiAdvice}"
              </p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-slate-500">{t.aiAdvicePlaceholder}</p>
              <button 
                onClick={getAiAdvice}
                className="px-8 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
              >
                {t.getAdvice}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Kiosk({ t, lang }: { t: any, lang: string }) {
  const [data, setData] = useState<{ birthdays: any[], events: any[], heroes: any[] } | null>(null);

  useEffect(() => {
    fetch(`/api/kiosk/data?lang=${lang}`).then(res => res.json()).then(setData);
  }, [lang]);

  if (!data) return <div className="p-12 text-center">{t.loading}</div>;

  return (
    <div className="space-y-8 pb-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t.kiosk}</h2>
        <p className="text-slate-500">{t.schoolStats}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 text-amber-500">
            <Cake size={24} />
            <h3 className="text-xl font-bold">{t.birthdays}</h3>
          </div>
          <div className="space-y-4">
            {data.birthdays.map((b, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20">
                <div>
                  <p className="font-bold">{b.name} {b.surname}</p>
                  <p className="text-xs text-slate-500">{b.class}</p>
                </div>
                <span className="text-sm font-bold text-amber-600">{b.date}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 text-blue-500">
            <Calendar size={24} />
            <h3 className="text-xl font-bold">{t.events_cat}</h3>
          </div>
          <div className="space-y-4">
            {data.events.map((e, i) => (
              <div key={i} className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                <p className="font-bold mb-1">{e.title}</p>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{e.date}</span>
                  <span>{e.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 text-emerald-500">
            <Star size={24} />
            <h3 className="text-xl font-bold">{t.heroes}</h3>
          </div>
          <div className="space-y-4">
            {data.heroes.map((h, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
                <img src={h.image} alt={h.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div>
                  <p className="font-bold text-sm">{h.name} {h.surname}</p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">{h.achievement}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function AdminDashboard({ t }: { t: any }) {
  const [stats, setStats] = useState<SchoolStats | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [newsForm, setNewsForm] = useState({ title: '', content: '', category: t.announcements });
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/stats').then(res => res.json()).then(setStats);
    fetch('/api/admin/users').then(res => res.json()).then(setUsers);
  }, []);

  const handlePublishNews = async () => {
    if (!newsForm.title || !newsForm.content) return;
    try {
      await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsForm)
      });
      setNewsForm({ title: '', content: '', category: t.announcements });
      setIsPublishing(false);
      alert(t.instructionsSent);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm(t.confirmDeleteUser || 'Вы уверены, что хотите удалить этого пользователя?')) return;
    try {
      await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-slate-500 text-sm font-medium mb-1">{t.allStudents}</p>
          <h3 className="text-3xl font-bold">{stats?.totalStudents}</h3>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-slate-500 text-sm font-medium mb-1">{t.allTeachers}</p>
          <h3 className="text-3xl font-bold">{stats?.totalTeachers}</h3>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center">
          <button 
            onClick={() => setIsPublishing(true)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors"
          >
            <Plus size={20} /> {t.publishNews}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isPublishing && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6 overflow-hidden"
          >
            <h3 className="text-lg font-bold mb-4">{t.publishNews}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">{t.title}</label>
                  <input 
                    type="text" 
                    value={newsForm.title}
                    onChange={e => setNewsForm({...newsForm, title: e.target.value})}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">{t.category}</label>
                  <select 
                    value={newsForm.category}
                    onChange={e => setNewsForm({...newsForm, category: e.target.value})}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={t.announcements}>{t.announcements}</option>
                    <option value={t.events_cat}>{t.events_cat}</option>
                    <option value={t.achievements_cat}>{t.achievements_cat}</option>
                    <option value={t.activities_cat}>{t.activities_cat}</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">{t.content}</label>
                <textarea 
                  rows={4}
                  value={newsForm.content}
                  onChange={e => setNewsForm({...newsForm, content: e.target.value})}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setIsPublishing(false)} className="px-6 py-2 rounded-xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">{t.cancel}</button>
                <button onClick={handlePublishNews} className="px-6 py-2 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600">{t.publish}</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-6">{t.schoolStats}</h3>
          <div className="space-y-4">
            {(stats?.averageScoreByGrade || []).map(s => (
              <div key={s.grade} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>{s.grade} {t.class}</span>
                  <span>{s.score}</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full" style={{ width: `${(s.score / 5) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">{t.manageUsers}</h3>
          <div className="space-y-3">
            {users && users.length > 0 ? users.map((u) => (
              <div key={u.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div>
                  <p className="text-sm font-bold">{u.name} {u.surname}</p>
                  <p className="text-[10px] text-slate-500">
                    {t[u.role as keyof typeof t] || u.role} 
                    {u.role === 'teacher' ? (
                      <> • {u.subject} {u.isClassTeacher ? `• ${t.classTeacher} ${u.managedClass}` : ''}</>
                    ) : (
                      <> • {u.class}</>
                    )}
                  </p>
                  <p className="text-[10px] text-slate-400">{u.email}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
                    <Settings size={16} />
                  </button>
                  <button onClick={() => handleDeleteUser(u.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                    <X size={16} />
                  </button>
                </div>
              </div>
            )) : null}
          </div>
        </section>
      </div>
    </div>
  );
}

function Auth({ onComplete, t }: { onComplete: () => void, t: any }) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<Role>('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    class: '10A'
  });

  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const handleSubmit = async () => {
    // Mock auth/register
    localStorage.setItem('user', JSON.stringify({
      ...formData,
      id: '1',
      role: role,
      school: 'Aqbobek Lyceum'
    }));
    localStorage.setItem('role', role);
    onComplete();
  };

  const handleDemoAccess = () => {
    localStorage.setItem('user', JSON.stringify({
      id: '1',
      name: 'Demo',
      surname: 'User',
      role: role,
      class: '10A',
      school: 'Aqbobek Lyceum'
    }));
    localStorage.setItem('role', role);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 blur-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] translate-x-1/2 translate-y-1/2 rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-slate-800 p-10 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center text-white font-bold text-4xl mx-auto mb-6 shadow-2xl shadow-blue-500/20">
            A
          </div>
          <h2 className="text-3xl font-black tracking-tight">Aqbobek <span className="text-blue-500">Lyceum</span></h2>
          <p className="text-slate-500 mt-2 font-medium">{isLogin ? t.login : t.register}</p>
        </div>

        <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${isLogin ? 'bg-white dark:bg-slate-700 shadow-lg' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            {t.login}
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${!isLogin ? 'bg-white dark:bg-slate-700 shadow-lg' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            {t.register}
          </button>
        </div>

        <div className="space-y-5">
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            {(['student', 'teacher', 'parent', 'admin'] as Role[]).map(r => (
              <button 
                key={r}
                onClick={() => setRole(r)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${role === r ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                {t[r]}
              </button>
            ))}
          </div>

          {!isLogin && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">{t.name}</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">{t.surname}</label>
                <input 
                  type="text" 
                  value={formData.surname}
                  onChange={e => setFormData({...formData, surname: e.target.value})}
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all" 
                />
              </div>
            </motion.div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Email / {t.iin || 'ИИН'}</label>
            <input 
              type="text" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">{t.password}</label>
            <input 
              type="password" 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 transition-all" 
            />
          </div>

          {isLogin && (
            <div className="text-right">
              <button onClick={() => setIsForgotModalOpen(true)} className="text-xs text-blue-500 font-bold hover:underline">{t.forgotPassword}</button>
            </div>
          )}

          <div className="pt-4 space-y-3">
            <button 
              onClick={handleSubmit}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-2xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {isLogin ? t.login : t.register}
            </button>

            <button 
              onClick={handleDemoAccess}
              className="w-full py-4 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            >
              {t.demoAccess}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {isForgotModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsForgotModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8"
            >
              <h3 className="text-xl font-bold mb-4">{t.forgotPassword}</h3>
              <p className="text-sm text-slate-500 mb-6">{t.enterEmail}</p>
              <input 
                type="email" 
                placeholder="email@example.com"
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 mb-6"
              />
              <div className="flex gap-3">
                <button onClick={() => setIsForgotModalOpen(false)} className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 rounded-xl font-bold">{t.cancel}</button>
                <button onClick={() => { alert(t.instructionsSent); setIsForgotModalOpen(false); }} className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-bold">{t.send}</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

