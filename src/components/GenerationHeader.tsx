import { useLanguage } from '../contexts/LanguageContext';

interface GenerationHeaderProps {
  era: string;
  generation: number;
  familyName: string;
  characterName: string;
}

export default function GenerationHeader({ era, generation, familyName, characterName }: GenerationHeaderProps) {
  const { t, isAr } = useLanguage();
  const genLabels = [t('gen1Label'), t('gen2Label'), t('gen3Label'), t('gen4Label')];
  const genLabel = genLabels[generation - 1] ?? `Gen ${generation}`;

  return (
    <div className="generation-header">
      <div className="gen-label">{genLabel} · {characterName} {isAr ? 'آل' : ''} {familyName}</div>
      <div className="gen-era">{era}</div>
    </div>
  );
}
