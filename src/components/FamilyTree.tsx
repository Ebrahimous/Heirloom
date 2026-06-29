import type { CharacterNames } from '../constants/ledgerTypes';
import { useLanguage } from '../contexts/LanguageContext';

interface FamilyTreeProps {
  generation: number;
  familyName: string;
  characterNames: CharacterNames;
}

export default function FamilyTree({ generation, familyName, characterNames }: FamilyTreeProps) {
  const { isAr } = useLanguage();

  const roles = [
    isAr ? 'الجد' : 'Grandfather',
    isAr ? 'الأب' : 'Father',
    isAr ? 'الابن' : 'Son',
    isAr ? 'الحفيدة' : 'Grandchild',
  ];

  const names = [
    characterNames.gen1 || '—',
    characterNames.gen2 || '—',
    characterNames.gen3 || '—',
    characterNames.gen4 || '—',
  ];

  return (
    <div className="family-tree">
      <div className="tree-title">{isAr ? '' : ''}{familyName}{isAr ? '' : ' Family'}</div>
      <div className="tree-nodes">
        {names.map((name, i) => {
          const isPast = i < generation - 1;
          const isActive = i === generation - 1;
          const isFuture = i >= generation;
          return (
            <div key={i} className={`tree-node ${isActive ? 'active' : isPast ? 'past' : 'future'}`}>
              {i < names.length - 1 && <div className="node-connector" />}
              <div className="node-dot" />
              <div className="node-info">
                <div className="node-name">{isFuture ? '—' : name}</div>
                <div className="node-role">{roles[i]}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
