export interface FamilyLedger {
  wealth: {
    liquid: number;
    land: number;
    business: number;
    debt: number;
  };
  reputation: {
    tribal: number;
    religious: number;
    social: number;
  };
  education: {
    level: number;
    foreign: boolean;
    secular: boolean;
  };
  rootedness: number;
  trauma: number;
  relationships: {
    allies: string[];
    tensions: string[];
  };
}

export interface LedgerEffect {
  'wealth.liquid'?: number;
  'wealth.land'?: number;
  'wealth.business'?: number;
  'wealth.debt'?: number;
  'reputation.tribal'?: number;
  'reputation.religious'?: number;
  'reputation.social'?: number;
  'education.level'?: number;
  'education.foreign'?: boolean;
  'education.secular'?: boolean;
  rootedness?: number;
  trauma?: number;
}

export interface LedgerRequirement {
  [key: string]: { min?: number; max?: number } | boolean;
}

export interface DecisionOption {
  id: string;
  choice: string;
  choiceAr?: string;
  shortNarration: string;
  shortNarrationAr?: string;
  ledgerEffect: LedgerEffect;
  variance?: number; // ±% randomness applied to numeric ledger effects (e.g. 15 = ±15%)
  requires?: LedgerRequirement;
  narrativeFlags?: string[];
}

export interface DecisionPoint {
  id: string;
  era: string;
  eraAr?: string;
  situation: string;
  situationAr?: string;
  situationVariants?: string[];   // extra EN framings — same decision, different setup text
  situationVariantsAr?: string[]; // extra AR framings
  historicalContext?: string;
  historicalContextAr?: string;
  options: DecisionOption[];
}

export interface BonusEvent {
  id: string;
  generation?: number; // which gen this fits — omit for any gen
  text: string;
  textAr: string;
  ledgerEffect: LedgerEffect;
}

export interface CharacterNames {
  gen1: string;
  gen2: string;
  gen3: string;
  gen4: string;
}

export interface GameState {
  gameId: string;
  userId: string;
  familyName: string;
  archetype: string;
  characterNames: CharacterNames;
  currentGeneration: number;
  currentDecisionIndex: number;
  ledger: FamilyLedger;
  narrativeFlags: string[];
  decisionHistory: DecisionRecord[];
  status: 'active' | 'complete';
  createdAt: number;
  completedAt?: number;
}

export interface DecisionRecord {
  decisionId: string;
  optionId: string;
  narration: string;
}
