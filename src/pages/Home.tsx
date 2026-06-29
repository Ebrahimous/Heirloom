import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, signInAsGuest } from '../lib/firebase';
import { loadActiveGame } from '../lib/gameState';
import type { GameState } from '../constants/ledgerTypes';
import { useLanguage } from '../contexts/LanguageContext';

const GEN_YEARS_AR = ['١٩٥٨', '١٩٧٨', '١٩٩٢', '٢٠١٠'];
const GEN_YEARS_EN = ['1958', '1978', '1992', '2010'];
const GEN_LABELS_AR = ['الجيل الأول', 'الجيل الثاني', 'الجيل الثالث', 'الجيل الرابع'];
const GEN_LABELS_EN = ['Generation I', 'Generation II', 'Generation III', 'Generation IV'];

export default function Home() {
  const navigate = useNavigate();
  const { t, isAr } = useLanguage();
  const [user, setUser] = useState(auth.currentUser);
  const [activeGame, setActiveGame] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        try {
          const game = await loadActiveGame(u.uid);
          setActiveGame(game);
        } catch { /* ignore */ }
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  async function handleSignIn() {
    setSigningIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.error(e);
    } finally {
      setSigningIn(false);
    }
  }

  async function handleGuest() {
    setSigningIn(true);
    try {
      await signInAsGuest();
    } catch (e) {
      console.error(e);
    } finally {
      setSigningIn(false);
    }
  }

  if (loading) {
    return <div className="screen-center"><div className="loading-dots"><span /><span /><span /></div></div>;
  }

  const isGuest = user?.isAnonymous;
  const gen = activeGame?.currentGeneration ?? 0;
  const genYears = isAr ? GEN_YEARS_AR : GEN_YEARS_EN;
  const genLabels = isAr ? GEN_LABELS_AR : GEN_LABELS_EN;

  return (
    <div className="page home-page">
      <div className="home-hero">
        <div className="home-year-range">{isAr ? '١٩٥٨ — ٢٠٢٦' : '1958 — 2026'}</div>
        <div className="home-ornament" />
        <h1 className="home-title">{isAr ? 'الموروث' : 'Heirloom'}</h1>
        <div className="home-diamond" />
        <p className="home-tagline">{t('tagline')}</p>
        {gen > 0 && (
          <div className="home-gen-dots">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`home-gen-dot${i < gen ? ' filled' : ''}`} />
            ))}
          </div>
        )}
      </div>

      <div className="home-actions">
        <div className="home-rule" />
        {!user ? (
          <>
            <button className="btn-primary" onClick={handleSignIn} disabled={signingIn}>
              {signingIn ? t('signingIn') : t('signInGoogle')}
            </button>
            <button className="btn-secondary" onClick={handleGuest} disabled={signingIn}>
              {t('playAsGuest')}
            </button>
          </>
        ) : (
          <>
            {isGuest && (
              <p className="guest-notice">{t('guestNotice')}</p>
            )}
            {activeGame && (
              <button
                className="btn-primary"
                onClick={() => navigate('/chapter', { state: { gameId: activeGame.gameId } })}
              >
                <span>{isAr ? `أكمل قصة ${activeGame.familyName}` : `Continue ${activeGame.familyName}`}</span>
                <span className="btn-sub">{genLabels[gen - 1]} · {genYears[gen - 1]}</span>
              </button>
            )}
            <button
              className={activeGame ? 'btn-secondary' : 'btn-primary'}
              onClick={() => navigate('/new-game')}
            >
              {t('beginNewFamily')}
            </button>
            {isGuest && !activeGame && (
              <button className="btn-secondary" onClick={handleSignIn}>
                {t('signInGoogle')}
              </button>
            )}
          </>
        )}
      </div>

      <p className="home-footer">{t('footerEra')}</p>
    </div>
  );
}
