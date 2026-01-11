
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Bell, 
  User as UserIcon, 
  Globe, 
  AlertTriangle,
  LogOut,
  LayoutDashboard,
  Search as SearchIcon,
  Heart,
  ShieldCheck,
  ClipboardList,
  MapPin
} from 'lucide-react';
import { TRANSLATIONS } from './constants';
import { User, Language, UserRole } from './types';

// Pages
import HomePage from './pages/HomePage';
import DonorSearch from './pages/DonorSearch';
import FirstAidPage from './pages/FirstAidPage';
import EmergencyServices from './pages/EmergencyServices';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/admin/AdminDashboard';

// Context
interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// Protected Route Component
// Fix: Use optional children to satisfy TypeScript's strict prop checking when used as a JSX wrapper
const ProtectedRoute = ({ children, allowedRoles }: { children?: React.ReactNode, allowedRoles?: UserRole[] }) => {
  const { user } = useApp();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const Navbar = () => {
  const { user, setUser, lang, setLang, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-red-600 p-1.5 rounded-lg shadow-lg">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <span className="text-xl font-bold text-gray-800 tracking-tight hidden md:block">
                {t('title')}
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/donors" className="text-gray-600 hover:text-red-600 px-3 py-2 font-medium">{t('blood_donor')}</Link>
            <Link to="/first-aid" className="text-gray-600 hover:text-red-600 px-3 py-2 font-medium">{t('first_aid')}</Link>
            
            {/* Role Specific Nav Items */}
            {user?.role === 'volunteer' && (
              <Link to="/profile" className="text-blue-600 hover:text-blue-700 px-3 py-2 font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Tasks
              </Link>
            )}
            
            <button 
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="flex items-center gap-1 text-gray-600 hover:text-red-600 px-3 py-2 font-medium"
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'বাংলা' : 'English'}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 hover:bg-gray-200 transition">
                    <LayoutDashboard className="w-4 h-4" /> {t('dashboard')}
                  </Link>
                )}
                <Link to="/profile" className="flex items-center gap-2 group">
                   <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-red-50 group-hover:text-red-600 transition">
                     <UserIcon className="w-4 h-4" />
                   </div>
                   <span className="text-sm font-semibold text-gray-700 hidden lg:block">{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-600 transition">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-gray-600 hover:text-red-600 px-3 py-2 font-medium">{t('login')}</Link>
                <Link to="/register" className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition shadow-md font-semibold">
                  {t('register')}
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-3">
             <button 
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="text-gray-600 p-2"
            >
              <Globe className="w-5 h-5" />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4">
          <div className="space-y-1">
            <Link to="/donors" className="block px-3 py-2 text-gray-600 font-medium" onClick={() => setIsOpen(false)}>{t('blood_donor')}</Link>
            <Link to="/first-aid" className="block px-3 py-2 text-gray-600 font-medium" onClick={() => setIsOpen(false)}>{t('first_aid')}</Link>
            {user ? (
              <>
                <Link to="/profile" className="block px-3 py-2 text-gray-900 font-bold" onClick={() => setIsOpen(false)}>My Profile ({user.role})</Link>
                {user.role === 'admin' && <Link to="/admin" className="block px-3 py-2 text-red-600 font-bold" onClick={() => setIsOpen(false)}>Admin Panel</Link>}
                <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-gray-400 font-medium">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-gray-600 font-medium" onClick={() => setIsOpen(false)}>{t('login')}</Link>
                <Link to="/register" className="block px-3 py-2 text-red-600 font-bold" onClick={() => setIsOpen(false)}>{t('register')}</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const SOSButton = () => {
  const { t } = useApp();
  const [active, setActive] = useState(false);

  const handleSOS = () => {
    setActive(true);
    alert("SOS ALERT SENT! Authorities and emergency contacts have been notified with your current location.");
    setTimeout(() => setActive(false), 3000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      <button
        onClick={handleSOS}
        className={`sos-pulse bg-red-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${active ? 'bg-red-800' : ''}`}
        title={t('women_safety')}
      >
        <AlertTriangle className="w-8 h-8" />
        <span className="absolute -top-10 right-0 bg-red-600 text-white text-xs font-bold py-1 px-3 rounded shadow-lg whitespace-nowrap md:block hidden">
          {t('sos')}
        </span>
      </button>
    </div>
  );
};

const Footer = () => {
  const { t } = useApp();
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Heart className="w-6 h-6 text-red-600 fill-current" />
          <h3 className="text-xl font-bold">{t('title')}</h3>
        </div>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          A dedicated platform to bridge the gap between emergency seekers and life-saving providers.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400 mb-8">
          <Link to="/donors" className="hover:text-white">Blood Bank</Link>
          <Link to="/services/ambulance" className="hover:text-white">Ambulance Services</Link>
          <Link to="/first-aid" className="hover:text-white">First Aid Guides</Link>
          <Link to="/register" className="hover:text-white">Join as Donor</Link>
        </div>
        <div className="border-t border-gray-800 pt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} Blood & Emergency Help. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [lang, setLang] = useState<Language>('en');

  const t = (key: string): string => {
    return (TRANSLATIONS[lang] as any)[key] || key;
  };

  return (
    <AppContext.Provider value={{ user, setUser, lang, setLang, t }}>
      <HashRouter>
        <div className="min-h-screen flex flex-col font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/donors" element={<DonorSearch />} />
              <Route path="/first-aid" element={<FirstAidPage />} />
              <Route path="/services/:type" element={<EmergencyServices />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Private Routes */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
          <SOSButton />
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
