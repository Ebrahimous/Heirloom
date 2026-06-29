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

function replaceName(text: string, gen1: string, gen2: string): string {
  return text
    .split('حسن').join(gen1).split('Hassan').join(gen1)
    .split('يوسف').join(gen2).split('Yousef').join(gen2);
}

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

  function pickVariant(base: string, variants?: string[], seed?: string): string {
    if (!variants || variants.length === 0) return base;
    const all = [base, ...variants];
    const hash = (seed ?? '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return all[hash % all.length];
  }

  const n1 = game.characterNames.gen1;
  const n2 = game.characterNames.gen2;
  const variantSeed = (gameId ?? '') + currentDecision.id;
  const era = isAr ? (currentDecision.eraAr ?? currentDecision.era) : currentDecision.era;
  const rawSituation = isAr
    ? pickVariant(currentDecision.situationAr ?? currentDecision.situation, currentDecision.situationVariantsAr, variantSeed)
    : pickVariant(currentDecision.situation, currentDecision.situationVariants, variantSeed);
  const rawContext = isAr
    ? (currentDecision.historicalContextAr ?? currentDecision.historicalContext)
    : currentDecision.historicalContext;

  const situation = replaceName(rawSituation, n1, n2);
  const historicalContext = rawContext ? replaceName(rawContext, n1, n2) : undefined;

  return (
    <div className="page chapter-page">
      <button className="back-btn" onClick={() => navigate("/")}>{t("back")}</button>
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
        {t('continue')}
      </button>
    </div>
  );
}
