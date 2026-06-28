import { useLanguage } from '../contexts/LanguageContext';

interface PremiumGateProps {
  generation: number;
}

export default function PremiumGate({ generation }: PremiumGateProps) {
  const { t } = useLanguage();
  return (
    <div className="premium-gate">
      <div className="gate-icon">⬡</div>
      <h2 className="gate-title">{t('premiumTitle')} {generation}</h2>
      <p className="gate-text">{t('premiumText')}</p>
      <button className="btn-premium" type="button" disabled>{t('premiumBtn')}</button>
      <p className="gate-note">{t('comingSoon')}</p>
    </div>
  );
}
