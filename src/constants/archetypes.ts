import type { FamilyLedger } from './ledgerTypes';

export interface Archetype {
  id: string;
  label: string;
  description: string;
  startingLedger: FamilyLedger;
}

export const ARCHETYPES: Archetype[] = [
  {
    id: 'merchant',
    label: 'Merchant',
    description: 'Your grandfather traded goods along the Gulf coast. Comfortable, connected, pragmatic.',
    startingLedger: {
      wealth: { liquid: 30, land: 20, business: 25, debt: 5 },
      reputation: { tribal: 40, religious: 30, social: 35 },
      education: { level: 20, foreign: false, secular: false },
      rootedness: 50,
      trauma: 10,
      relationships: { allies: [], tensions: [] },
    },
  },
  {
    id: 'diver',
    label: 'Pearl Diver',
    description: 'Your grandfather worked the sea. Land-poor but deeply respected in the community.',
    startingLedger: {
      wealth: { liquid: 10, land: 10, business: 5, debt: 15 },
      reputation: { tribal: 55, religious: 45, social: 30 },
      education: { level: 10, foreign: false, secular: false },
      rootedness: 70,
      trauma: 20,
      relationships: { allies: [], tensions: [] },
    },
  },
  {
    id: 'clerk',
    label: 'Government Clerk',
    description: 'Your grandfather worked for the early municipality. Educated, modest, and forward-looking.',
    startingLedger: {
      wealth: { liquid: 20, land: 15, business: 5, debt: 0 },
      reputation: { tribal: 25, religious: 30, social: 40 },
      education: { level: 35, foreign: false, secular: true },
      rootedness: 40,
      trauma: 5,
      relationships: { allies: [], tensions: [] },
    },
  },
];
