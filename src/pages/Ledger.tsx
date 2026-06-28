import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadGame } from '../lib/gameState';
import { getLedgerProse } from '../lib/ledgerEngine';
import type { GameState } from '../constants/ledgerTypes';
import FamilyTree from '../components/FamilyTree';
import { useLanguage } from '../contexts/LanguageContext';

export default function Ledger() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const gameId = (location.state as { gameId?: string })?.gameId;

  const [game, setGame] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gameId) { navigate('/'); return; }
    loadGame(gameId).then((g) => {
      if (!g) { navigate('/'); return; }
      setGame(g);
      setLoading(false);
    });
  }, [gameId, navigate]);

  if (loading || !game) {
    return <div className="screen-center"><div className="loading-dots"><span /><span /><span /></div></div>;
  }

  const prose = getLedgerProse(game.ledger);

  return (
    <div className="page ledger-page">
      <div className="ledger-header">
        <div className="ledger-label">{t('endOfGen')} {game.currentGeneration}</div>
        <h2 className="ledger-family">{game.familyName}</h2>
      </div>

      <FamilyTree
        generation={game.currentGeneration}
        characterNames={game.characterNames}
        familyName={game.familyName}
      />

      <div className="ledger-prose">
        <p>{prose}</p>
      </div>

      <button className="btn-primary" onClick={() => navigate('/transition', { state: { gameId } })}>
        {t('storyContinues')}
      </button>
    </div>
  );
}
