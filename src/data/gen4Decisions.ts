import type { DecisionPoint } from '../constants/ledgerTypes';

// Gen 4 decisions — premium content
// Placeholder structure; full decisions to be authored
export const GEN4_DECISIONS: DecisionPoint[] = [
  {
    id: 'gen4_d1',
    era: '2024, Kuwait',
    situation:
      'The fourth generation inherits everything the family has built and broken over seven decades. The ledger is full. What they do with it will be the last entry.',
    options: [
      {
        id: 'gen4_return',
        choice: 'Return to roots',
        shortNarration:
          'She chose to stay. In a generation that moved freely, staying was its own kind of decision.',
        ledgerEffect: {
          rootedness: 30,
          'reputation.tribal': 10,
        },
        narrativeFlags: ['gen4_return'],
      },
      {
        id: 'gen4_leave',
        choice: 'Leave and build abroad',
        shortNarration:
          'She left with the family name and everything it carried, and set it down somewhere entirely new.',
        ledgerEffect: {
          rootedness: -30,
          'education.foreign': true,
          'wealth.business': 20,
        },
        narrativeFlags: ['gen4_diaspora'],
      },
    ],
  },
];
