import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadGame, recordDecision, saveGame } from '../lib/gameState';
import { applyEffect, applyVariance, summariseLedger } from '../lib/ledgerEngine';
import { filterOptions } from '../lib/decisionGating';
import { generateNarration } from '../lib/claudeApi';
import type { GameState, DecisionPoint, DecisionOption } from '../constants/ledgerTypes';
import { GEN1_DECISIONS } from '../data/gen1Decisions';
import { GEN2_DECISIONS } from '../data/gen2Decisions';
import { pickBonusEvent } from '../data/bonusEvents';
import type { BonusEvent } from '../constants/ledgerTypes';
import GenerationHeader from '../components/GenerationHeader';
import DecisionCard from '../components/DecisionCard';
import NarrationBlock from '../components/NarrationBlock';
import { useLanguage } from '../contexts/LanguageContext';

const GEN_DECISIONS: DecisionPoint[][] = [GEN1_DECISIONS, GEN2_DECISIONS];

export default function Decision() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAr, lang } = useLanguage();
  const { gameId, decisionId } = (location.state ?? {}) as { gameId?: string; decisionId?: string };

  const [game, setGame] = useState<GameState | null>(null);
  const [decision, setDecision] = useState<DecisionPoint | null>(null);
  const [availableOptions, setAvailableOptions] = useState<DecisionOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<DecisionOption | null>(null);
  const [narration, setNarration] = useState('');
  const [narrationLoading, setNarrationLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [canContinue, setCanContinue] = useState(false);
  const [bonusEvent, setBonusEvent] = useState<BonusEvent | null>(null);
  const [firedEvents, setFiredEvents] = useState<string[]>([]);

  useEffect(() => {
    if (!gameId || !decisionId) { navigate('/'); return; }
    loadGame(gameId).then((g) => {
      if (!g) { navigate('/'); return; }
      setGame(g);
      const decisions = GEN_DECISIONS[g.currentGeneration - 1] ?? [];
      const dp = decisions.find((d) => d.id === decisionId);
      if (!dp) { navigate('/chapter', { state: { gameId } }); return; }
      setDecision(dp);
      setAvailableOptions(filterOptions(dp.options, g.ledger));
      setLoading(false);
    });
  }, [gameId, decisionId, navigate]);

  const handleSelect = useCallback(async (option: DecisionOption) => {
    if (!game || !decision || selectedOption) return;

    setSelectedOption(option);
    const fallback = isAr ? (option.shortNarrationAr ?? option.shortNarration) : option.shortNarration;
    setNarration(fallback);
    setNarrationLoading(true);

    const variedEffect = option.variance ? applyVariance(option.ledgerEffect, option.variance) : option.ledgerEffect;
    const newLedger = applyEffect(game.ledger, variedEffect);
    const newFlags = [...game.narrativeFlags, ...(option.narrativeFlags ?? [])];
    const updatedGame: GameState = { ...game, ledger: newLedger, narrativeFlags: newFlags };

    await saveGame(updatedGame).catch(console.error);

    const allDecisions = [...GEN1_DECISIONS, ...GEN2_DECISIONS];
    const historyForAI = game.decisionHistory.map((h) => {
      const dp = allDecisions.find((d) => d.id === h.decisionId);
      const opt = dp?.options.find((o) => o.id === h.optionId);
      return {
        situation: isAr ? (dp?.situationAr ?? dp?.situation ?? '') : (dp?.situation ?? ''),
        choice: isAr ? (opt?.choiceAr ?? opt?.choice ?? '') : (opt?.choice ?? ''),
      };
    });

    const characterName = game.currentGeneration === 1
      ? game.characterNames.gen1
      : game.characterNames.gen2;

    try {
      const text = await generateNarration({
        situation: isAr ? (decision.situationAr ?? decision.situation) : decision.situation,
        choiceText: isAr ? (option.choiceAr ?? option.choice) : option.choice,
        ledgerSummary: summariseLedger(newLedger, game.familyName),
        narrativeFlags: newFlags,
        familyName: game.familyName,
        characterName,
        decisionHistory: historyForAI,
        language: lang,
      });
      setNarration(text);
    } catch {
      // fallback already set
    } finally {
      setNarrationLoading(false);

      // 40% chance of a bonus event after each decision
      if (Math.random() < 0.4) {
        const event = pickBonusEvent(game.currentGeneration, firedEvents);
        if (event) {
          setBonusEvent(event);
          setFiredEvents((prev) => [...prev, event.id]);
          const eventLedger = applyEffect(newLedger, event.ledgerEffect);
          const eventGame: GameState = { ...updatedGame, ledger: eventLedger };
          await saveGame(eventGame).catch(console.error);
          setGame(eventGame);
        }
      }

      setCanContinue(true);
    }

    const record = { decisionId: decision.id, optionId: option.id, narration: fallback };
    const finalGame = await recordDecision(updatedGame, record).catch(() => updatedGame);
    setGame(finalGame);
  }, [game, decision, selectedOption, isAr, lang]);

  function handleContinue() {
    if (!game || !decision) return;
    const decisions = GEN_DECISIONS[game.currentGeneration - 1] ?? [];
    const isLast = game.currentDecisionIndex + 1 >= decisions.length;
    navigate(isLast ? '/ledger' : '/chapter', { state: { gameId } });
  }

  if (loading || !game || !decision) {
    return <div className="screen-center"><div className="loading-dots"><span /><span /><span /></div></div>;
  }

  const era = isAr ? (decision.eraAr ?? decision.era) : decision.era;
  const situation = isAr ? (decision.situationAr ?? decision.situation) : decision.situation;

  return (
    <div className="page decision-page">
      {!selectedOption && (
        <button className="back-btn" onClick={() => navigate("/chapter", { state: { gameId } })}>{t("back")}</button>
      )}
      <GenerationHeader
        era={era}
        generation={game.currentGeneration}
        familyName={game.familyName}
        characterName={game.currentGeneration === 1 ? game.characterNames.gen1 : game.characterNames.gen2}
      />

      <div className="situation-text">
        <p>{situation}</p>
      </div>

      <div className="options-list">
        {availableOptions.map((opt) => (
          <DecisionCard
            key={opt.id}
            choice={isAr ? (opt.choiceAr ?? opt.choice) : opt.choice}
            onSelect={() => handleSelect(opt)}
            disabled={!!selectedOption}
            selected={selectedOption?.id === opt.id}
          />
        ))}
      </div>

      {(narration || narrationLoading) && (
        <div className="narration-section">
          <NarrationBlock text={narration} loading={narrationLoading} />
        </div>
      )}

      {canContinue && bonusEvent && (
        <div className="bonus-event-card">
          <p className="bonus-event-label">{isAr ? 'في غضون ذلك' : 'Meanwhile'}</p>
          <p className="bonus-event-text">
            {isAr ? bonusEvent.textAr : bonusEvent.text}
          </p>
        </div>
      )}

      {canContinue && !narrationLoading && (
        <button className="btn-primary continue-btn" onClick={handleContinue}>
          {isAr ? 'متابعة' : 'Continue'}
        </button>
      )}
    </div>
  );
}
