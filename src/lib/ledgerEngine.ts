import type { FamilyLedger, LedgerEffect } from '../constants/ledgerTypes';

function clamp(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export function applyEffect(ledger: FamilyLedger, effect: LedgerEffect): FamilyLedger {
  const next: FamilyLedger = {
    wealth: { ...ledger.wealth },
    reputation: { ...ledger.reputation },
    education: { ...ledger.education },
    rootedness: ledger.rootedness,
    trauma: ledger.trauma,
    relationships: {
      allies: [...ledger.relationships.allies],
      tensions: [...ledger.relationships.tensions],
    },
  };

  if (effect['wealth.liquid'] !== undefined) next.wealth.liquid = clamp(next.wealth.liquid + effect['wealth.liquid']);
  if (effect['wealth.land'] !== undefined) next.wealth.land = clamp(next.wealth.land + effect['wealth.land']);
  if (effect['wealth.business'] !== undefined) next.wealth.business = clamp(next.wealth.business + effect['wealth.business']);
  if (effect['wealth.debt'] !== undefined) next.wealth.debt = clamp(next.wealth.debt + effect['wealth.debt']);
  if (effect['reputation.tribal'] !== undefined) next.reputation.tribal = clamp(next.reputation.tribal + effect['reputation.tribal']);
  if (effect['reputation.religious'] !== undefined) next.reputation.religious = clamp(next.reputation.religious + effect['reputation.religious']);
  if (effect['reputation.social'] !== undefined) next.reputation.social = clamp(next.reputation.social + effect['reputation.social']);
  if (effect['education.level'] !== undefined) next.education.level = clamp(next.education.level + effect['education.level']);
  if (effect['education.foreign'] !== undefined) next.education.foreign = effect['education.foreign'];
  if (effect['education.secular'] !== undefined) next.education.secular = effect['education.secular'];
  if (effect.rootedness !== undefined) next.rootedness = clamp(next.rootedness + effect.rootedness);
  if (effect.trauma !== undefined) next.trauma = clamp(next.trauma + effect.trauma);

  return next;
}

function describeLevel(value: number, low: string, mid: string, high: string): string {
  if (value >= 65) return high;
  if (value >= 35) return mid;
  return low;
}

export function summariseLedger(ledger: FamilyLedger, familyName: string): string {
  const parts: string[] = [];

  // Wealth
  const liquid = describeLevel(ledger.wealth.liquid, 'cash-poor', 'comfortable in liquid assets', 'wealthy in liquid assets');
  const land = describeLevel(ledger.wealth.land, 'with little land to their name', 'holding modest land', 'with significant land holdings');
  const business = describeLevel(ledger.wealth.business, 'without established business', 'with some business activity', 'with a strong business presence');
  const debt = ledger.wealth.debt > 50 ? 'carrying significant debt' : ledger.wealth.debt > 25 ? 'carrying some debt' : 'with little debt';

  parts.push(`The ${familyName} family is ${liquid}, ${land}, and ${business}, ${debt}.`);

  // Reputation
  const tribal = describeLevel(ledger.reputation.tribal, 'Their standing within the tribe is uncertain.', 'They are known and respected within the tribe.', 'They are a prominent name in the tribal community.');
  const social = describeLevel(ledger.reputation.social, 'Their broader social reputation is modest.', 'They are well regarded in society.', 'They carry considerable social influence.');
  parts.push(`${tribal} ${social}`);

  // Education
  if (ledger.education.level >= 60) {
    parts.push(
      ledger.education.foreign
        ? 'The family has invested heavily in education, including study abroad.'
        : 'The family has invested heavily in education within Kuwait.'
    );
  } else if (ledger.education.level >= 30) {
    parts.push('The family has some education behind them, though not exceptional.');
  } else {
    parts.push('The family has had little formal education.');
  }

  // Rootedness
  const rootedness = describeLevel(
    ledger.rootedness,
    'They have become somewhat displaced from their origins.',
    'They remain connected to their roots.',
    'They are deeply rooted in the community and the land they come from.'
  );
  parts.push(rootedness);

  // Trauma
  if (ledger.trauma >= 60) {
    parts.push('There is a heavy thread of unresolved loss running through the family\'s recent history.');
  } else if (ledger.trauma >= 35) {
    parts.push('There is some unresolved tension in the family\'s recent past.');
  }

  return parts.join(' ');
}

export function getLedgerProse(ledger: FamilyLedger): string {
  const lines: string[] = [];

  // Wealth narrative
  const totalWealth = (ledger.wealth.liquid + ledger.wealth.land + ledger.wealth.business) / 3;
  if (totalWealth >= 60) lines.push('Prosperity — the family has built something real.');
  else if (totalWealth >= 35) lines.push('Modest means — enough to stand on.');
  else lines.push('Lean years — the family lives carefully.');

  if (ledger.wealth.debt > 50) lines.push('Significant debts weigh on what was built.');

  // Reputation
  const rep = (ledger.reputation.tribal + ledger.reputation.social) / 2;
  if (rep >= 65) lines.push('The name carries weight in the community.');
  else if (rep >= 35) lines.push('A respected, if unremarkable, family name.');
  else lines.push('The family\'s reputation has suffered.');

  // Rootedness vs trauma
  if (ledger.rootedness >= 65) lines.push('Deep roots. The family knows where it comes from.');
  else if (ledger.rootedness < 35) lines.push('Something has loosened the family from its ground.');

  if (ledger.trauma >= 60) lines.push('Much has been survived. Not all of it has been healed.');
  else if (ledger.trauma < 20) lines.push('The family has been spared the worst of what this era could give.');

  return lines.join(' ');
}
