import type { DecisionPoint } from '../constants/ledgerTypes';

// Gen 3 decisions — premium content
// Placeholder structure; full decisions to be authored
export const GEN3_DECISIONS: DecisionPoint[] = [
  {
    id: 'gen3_d1',
    era: '2003, Kuwait',
    situation:
      'The third generation comes of age in a Kuwait transformed. The question is no longer survival — it is identity. What does the family name mean now?',
    options: [
      {
        id: 'gen3_tradition',
        choice: 'Honour the old ways',
        shortNarration:
          'He chose the path his grandfather would have recognised, even if the world around it had changed beyond recognition.',
        ledgerEffect: {
          'reputation.tribal': 15,
          rootedness: 20,
          'education.secular': false,
        },
        narrativeFlags: ['gen3_traditional'],
      },
      {
        id: 'gen3_modern',
        choice: 'Build something new',
        shortNarration:
          'He looked at what his father had built and decided to build differently — not against it, but beyond it.',
        ledgerEffect: {
          'wealth.business': 20,
          'reputation.social': 15,
          rootedness: -10,
          'education.secular': true,
        },
        narrativeFlags: ['gen3_modern'],
      },
    ],
  },
];
