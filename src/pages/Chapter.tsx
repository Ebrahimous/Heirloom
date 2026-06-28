import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadGame } from '../lib/gameState';
import type { GameState } from '../constants/ledgerTypes';
import { GEN1_DECISIONS } from '../data/gen1Decisions';
import { GEN2_DECISIONS } from '../data/gen2Decisions';
import GenerationHeader from '../components/GenerationHeader';
import PremiumGate from '../components/PremiumGate';
import { useLanguage } from '../contexts/LanguageContext';

const GEN_DECISIONS = [GEN1_DECISIONS, GEN2_DECISIONS];

export default function Chapter() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, isAr } = useLanguage();
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

  const gen = game.currentGeneration;

  if (gen >= 3) {
    return (
      <div className="page chapter-page">
        <PremiumGate generation={gen} />
      </div>
    );
  }

  const decisions = GEN_DECISIONS[gen - 1] ?? [];
  const currentDecision = decisions[game.currentDecisionIndex];

  if (!currentDecision) {
    navigate('/ledger', { state: { gameId } });
    return null;
  }

  const era = isAr ? (currentDecision.eraAr ?? currentDecision.era) : currentDecision.era;
  const situation = isAr ? (currentDecision.situationAr ?? currentDecision.situation) : currentDecision.situation;
  const historicalContext = isAr
    ? (currentDecision.historicalContextAr ?? currentDecision.historicalContext)
    : currentDecision.historicalContext;

  return (
    <div className="page chapter-page">
      <GenerationHeader
        era={era}
        generation={gen}
        familyName={game.familyName}
        characterName={gen === 1 ? game.characterNames.gen1 : game.characterNames.gen2}
      />

      {historicalContext && (
        <div className="historical-context">
          <p>{historicalContext}</p>
        </div>
      )}

      <div className="situation-text">
        <p>{situation}</p>
      </div>

      <button
        className="btn-primary"
        onClick={() => navigate('/decision', { state: { gameId, decisionId: currentDecision.id } })}
      >
        {t('continueBtn')}
      </button>
    </div>
  );
}
