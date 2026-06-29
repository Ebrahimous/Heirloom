import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadGame, advanceGeneration } from '../lib/gameState';
import { summariseLedger, getInheritanceProse } from '../lib/ledgerEngine';
import { generateTransition } from '../lib/claudeApi';
import type { GameState } from '../constants/ledgerTypes';
import { useLanguage } from '../contexts/LanguageContext';

export default function Transition() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, isAr, lang } = useLanguage();
  const gameId = (location.state as { gameId?: string })?.gameId;

  const [game, setGame] = useState<GameState | null>(null);
  const [narration, setNarration] = useState('');
  const [loading, setLoading] = useState(true);
  const [advancing, setAdvancing] = useState(false);

  useEffect(() => {
    if (!gameId) { navigate('/'); return; }
    loadGame(gameId).then(async (g) => {
      if (!g) { navigate('/'); return; }
      setGame(g);

      const gen = g.currentGeneration;
      if (gen >= 3) { navigate('/legacy', { state: { gameId } }); return; }

      const deceasedName = gen === 1 ? g.characterNames.gen1 : g.characterNames.gen2;

      try {
        const text = await generateTransition({
          familyName: g.familyName,
          deceasedName,
          generation: gen,
          ledgerSummary: summariseLedger(g.ledger, g.familyName),
        });
        setNarration(text);
      } catch {
        setNarration(
          isAr
            ? `رحل ${deceasedName} كما عاش — يحمل ثقل اختياراته خلفه واسم الأسرة سليمًا. ما بناه، وما تركه ناقصًا، انتقل الآن إلى الجيل التالي.`
            : `${deceasedName} died as he had lived — with the weight of his choices behind him and the family name intact. What he built, and what he left unfinished, passed now to the next generation.`
        );
      }

      setLoading(false);
    });
  }, [gameId, navigate, lang, isAr]);

  async function handleAdvance() {
    if (!game) return;
    setAdvancing(true);
    const updated = await advanceGeneration(game);
    setGame(updated);
    navigate('/chapter', { state: { gameId } });
  }

  if (loading || !game) {
    return <div className="screen-center"><div className="loading-dots"><span /><span /><span /></div></div>;
  }

  const gen = game.currentGeneration;
  const deceasedName = gen === 1 ? game.characterNames.gen1 : game.characterNames.gen2;
  const nextName = gen === 1 ? game.characterNames.gen2 : game.characterNames.gen3 || '—';
  const inheritanceProse = getInheritanceProse(game.ledger, game.familyName, lang);

  return (
    <div className="page transition-page">
      <button className="back-btn" onClick={() => navigate("/")}>{t("back")}</button>
      <div className="transition-death">
        <div className="death-label">{t('generationPasses')}</div>
        <div className="death-name">{deceasedName}</div>
      </div>

      <div className="transition-narration">
        <p>{narration}</p>
      </div>

      <div className="transition-inheritance">
        <div className="inheritance-label">{t('whatPasses')}</div>
        <p className="inheritance-prose">{inheritanceProse}</p>
      </div>

      {nextName && nextName !== '—' && (
        <div className="next-gen-intro">
          <div className="next-label">{t('nextLabel')}</div>
          <div className="next-name">{nextName}</div>
        </div>
      )}

      <button className="btn-primary" onClick={handleAdvance} disabled={advancing}>
        {advancing ? `${t('beginning')}` : `${t('beginChapter')} ${nextName}`}
      </button>
    </div>
  );
}
