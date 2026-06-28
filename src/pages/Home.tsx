import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, signInAsGuest } from '../lib/firebase';
import { loadActiveGame } from '../lib/gameState';
import type { GameState } from '../constants/ledgerTypes';
import { useLanguage } from '../contexts/LanguageContext';

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

  return (
    <div className="page home-page">
      <div className="home-hero">
        <div className="home-logo">{t('appNameAr')}</div>
        <h1 className="home-title">{isAr ? 'الورث' : 'Heirloom'}</h1>
        <p className="home-tagline">{t('tagline')}</p>
      </div>

      <div className="home-actions">
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
                {isAr
                  ? `${t('continueStory')} ${activeGame.familyName}`
                  : `${t('continueStory')} ${activeGame.familyName} Story`}
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
