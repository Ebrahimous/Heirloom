import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadGame, completeGame } from '../lib/gameState';
import { summariseLedger } from '../lib/ledgerEngine';
import { generateLegacy } from '../lib/claudeApi';
import type { GameState } from '../constants/ledgerTypes';
import FamilyTree from '../components/FamilyTree';
import PremiumGate from '../components/PremiumGate';
import { GEN1_DECISIONS } from '../data/gen1Decisions';
import { GEN2_DECISIONS } from '../data/gen2Decisions';
import { useLanguage } from '../contexts/LanguageContext';

const IS_PREMIUM = false;

export default function Legacy() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, isAr, lang } = useLanguage();
  const gameId = (location.state as { gameId?: string })?.gameId;

  const [game, setGame] = useState<GameState | null>(null);
  const [legacy, setLegacy] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gameId) { navigate('/'); return; }
    loadGame(gameId).then(async (g) => {
      if (!g) { navigate('/'); return; }
      const completed = await completeGame(g).catch(() => g);
      setGame(completed);

      if (!IS_PREMIUM) { setLoading(false); return; }

      const allDecisions = [...GEN1_DECISIONS, ...GEN2_DECISIONS];
      const historyForAI = g.decisionHistory.map((h, i) => {
        const dp = allDecisions.find((d) => d.id === h.decisionId);
        const opt = dp?.options.find((o) => o.id === h.optionId);
        return {
          situation: isAr ? (dp?.situationAr ?? dp?.situation ?? '') : (dp?.situation ?? ''),
          choice: isAr ? (opt?.choiceAr ?? opt?.choice ?? '') : (opt?.choice ?? ''),
          generation: i < 5 ? 1 : 2,
        };
      });

      try {
        const text = await generateLegacy({
          familyName: g.familyName,
          ledgerSummary: summariseLedger(g.ledger, g.familyName),
          narrativeFlags: g.narrativeFlags,
          decisionHistory: historyForAI,
        });
        setLegacy(text);
      } catch {
        setLegacy(
          isAr
            ? `صمدت أسرة ${g.familyName}. ما بنوه على مدى أربعة أجيال يقف شاهدًا بذاته على السؤال الذي واجهه جدّهم أوّل مرة.`
            : `The ${g.familyName} family endured. What they built across four generations stands as its own kind of answer to the question their grandfather first faced.`
        );
      }
      setLoading(false);
    });
  }, [gameId, navigate, lang, isAr]);

  if (loading || !game) {
    return <div className="screen-center"><div className="loading-dots"><span /><span /><span /></div></div>;
  }

  if (!IS_PREMIUM) {
    return <div className="page legacy-page"><PremiumGate generation={5} /></div>;
  }

  return (
    <div className="page legacy-page">
      <div className="legacy-header">
        <div className="legacy-label">{t('legacyLabel')}</div>
        <h2 className="legacy-family">{game.familyName}</h2>
        <div className="legacy-span">{t('legacySpan')}</div>
      </div>

      <FamilyTree generation={4} characterNames={game.characterNames} familyName={game.familyName} />

      <div className="legacy-text"><p>{legacy}</p></div>
      <div className="legacy-verdict"><p>{summariseLedger(game.ledger, game.familyName)}</p></div>

      <button className="btn-