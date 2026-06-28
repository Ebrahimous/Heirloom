import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Home from './pages/Home';
import NewGame from './pages/NewGame';
import Chapter from './pages/Chapter';
import Decision from './pages/Decision';
import Ledger from './pages/Ledger';
import Transition from './pages/Transition';
import Legacy from './pages/Legacy';

function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <button
      className="lang-toggle"
      onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
      type="button"
      aria-label="Toggle language"
    >
      {lang === 'ar' ? 'EN' : 'ع'}
    </button>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <LanguageToggle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-game" element={<NewGame />} />
          <Route path="/chapter" element={<Chapter />} />
          <Route path="/decision" element={<Decision />} />
          <Route path="/ledger" element={<Ledger />} />
          <Route path="/transition" element={<Transition />} />
          <Route path="/legacy" element={<Legacy />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppRoutes />
    </LanguageProvider>
  );
}
