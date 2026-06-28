import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { createGame } from '../lib/gameState';
import { ARCHETYPES } from '../constants/archetypes';
import { useLanguage } from '../contexts/LanguageContext';

export default function NewGame() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [familyName, setFamilyName] = useState('');
  const [gen1Name, setGen1Name] = useState('');
  const [gen2Name, setGen2Name] = useState('');
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const archetypeLabels: Record<string, { label: string; desc: string }> = {
    merchant: { label: t('merchantLabel'), desc: t('merchantDesc') },
    diver:    { label: t('diverLabel'),    desc: t('diverDesc') },
    clerk:    { label: t('clerkLabel'),    desc: t('clerkDesc') },
  };

  async function handleBegin() {
    if (!familyName.trim() || !gen1Name.trim() || !gen2Name.trim() || !selectedArchetype) return;
    const user = auth.currentUser;
    if (!user) { navigate('/'); return; }

    setLoading(true);
    setError('');
    try {
      const archetype = ARCHETYPES.find((a) => a.id === selectedArchetype)!;
      const game = await createGame(
        user.uid,
        familyName.trim(),
        selectedArchetype,
        archetype.startingLedger,
        {
          gen1: gen1Name.trim(),
          gen2: gen2Name.trim(),
          gen3: '',
          gen4: '',
        }
      );
      navigate('/chapter', { state: { gameId: game.gameId } });
    } catch (e) {
      console.error(e);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  const canBegin = familyName.trim() && gen1Name.trim() && gen2Name.trim() && selectedArchetype && !loading;

  return (
    <div className="page new-game-page">
      <button className="back-btn" onClick={() => navigate('/')}>{t('back')}</button>

      <h2 className="page-title">{t('newFamilyTitle')}</h2>
      <p className="page-sub">{t('newFamilySub')}</p>

      <section className="form-section">
        <label className="form-label" htmlFor="family-name">{t('familyNameLabel')}</label>
        <input
          id="family-name"
          className="form-input"
          type="text"
          dir="auto"
          placeholder={t('familyNamePlaceholder')}
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
          maxLength={40}
        />
      </section>

      <section className="form-section">
        <label className="form-label" htmlFor="gen1-name">{t('gen1NameLabel')}</label>
        <input
          id="gen1-name"
          className="form-input"
          type="text"
          dir="auto"
          placeholder={t('gen1NamePlaceholder')}
          value={gen1Name}
          onChange={(e) => setGen1Name(e.target.value)}
          maxLength={30}
        />
      </section>

      <section className="form-section">
        <label className="form-label" htmlFor="gen2-name">{t('gen2NameLabel')}</label>
        <input
          id="gen2-name"
          className="form-input"
          type="text"
          dir="auto"
          placeholder={t('gen2NamePlaceholder')}
          value={gen2Name}
          onChange={(e) => setGen2Name(e.target.value)}
          maxLength={30}
        />
      </section>

      <section className="form-section">
        <label className="form-label">{t('archetypeLabel')}</label>
        <div className="archetype-list">
          {ARCHETYPES.map((a) => (
            <button
              key={a.id}
              type="button"
              className={`archetype-card ${selectedArchetype === a.id ? 'selected' : ''}`}
              onClick={() => setSelectedArchetype(a.id)}
            >
              <div className="archetype-label">{archetypeLabels[a.id]?.label ?? a.label}</div>
              <div className="archetype-desc">{archetypeLabels[a.id]?.desc ?? a.description}</div>
            </button>
          ))}
        </div>
      </section>

      {error && <p className="form-error">{error}</p>}

      <button className="btn-primary" onClick={handleBegin} disabled={!canBegin}>
        {loading ? t('beginning') : t('beginBtn')}
      </button>
    </div>
  );
}
