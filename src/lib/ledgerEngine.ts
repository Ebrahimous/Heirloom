import type { FamilyLedger, LedgerEffect } from '../constants/ledgerTypes';
import type { Lang } from '../i18n/strings';

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

// Apply ±variance% randomness to numeric ledger effects for replayability.
// variance: 0–100 representing max % deviation (e.g. 15 = ±15%)
export function applyVariance(effect: LedgerEffect, variance: number): LedgerEffect {
  if (!variance) return effect;
  const result: LedgerEffect = { ...effect };
  const keys = Object.keys(result) as (keyof LedgerEffect)[];
  for (const key of keys) {
    const val = result[key];
    if (typeof val === 'number' && val !== 0) {
      const factor = 1 + (Math.random() * 2 - 1) * (variance / 100);
      (result as Record<string, unknown>)[key] = Math.round(val * factor);
    }
  }
  return result;
}

function describeLevel(value: number, low: string, mid: string, high: string): string {
  if (value >= 65) return high;
  if (value >= 35) return mid;
  return low;
}

// Always English — used as AI context (AI translates via system prompt)
export function summariseLedger(ledger: FamilyLedger, familyName: string): string {
  const parts: string[] = [];

  const liquid = describeLevel(ledger.wealth.liquid, 'cash-poor', 'comfortable in liquid assets', 'wealthy in liquid assets');
  const land = describeLevel(ledger.wealth.land, 'with little land to their name', 'holding modest land', 'with significant land holdings');
  const business = describeLevel(ledger.wealth.business, 'without established business', 'with some business activity', 'with a strong business presence');
  const debt = ledger.wealth.debt > 50 ? 'carrying significant debt' : ledger.wealth.debt > 25 ? 'carrying some debt' : 'with little debt';

  parts.push(`The ${familyName} family is ${liquid}, ${land}, and ${business}, ${debt}.`);

  const tribal = describeLevel(ledger.reputation.tribal, 'Their standing within the tribe is uncertain.', 'They are known and respected within the tribe.', 'They are a prominent name in the tribal community.');
  const social = describeLevel(ledger.reputation.social, 'Their broader social reputation is modest.', 'They are well regarded in society.', 'They carry considerable social influence.');
  parts.push(`${tribal} ${social}`);

  if (ledger.education.level >= 60) {
    parts.push(ledger.education.foreign
      ? 'The family has invested heavily in education, including study abroad.'
      : 'The family has invested heavily in education within Kuwait.');
  } else if (ledger.education.level >= 30) {
    parts.push('The family has some education behind them, though not exceptional.');
  } else {
    parts.push('The family has had little formal education.');
  }

  const rootedness = describeLevel(
    ledger.rootedness,
    'They have become somewhat displaced from their origins.',
    'They remain connected to their roots.',
    'They are deeply rooted in the community and the land they come from.'
  );
  parts.push(rootedness);

  if (ledger.trauma >= 60) {
    parts.push('There is a heavy thread of unresolved loss running through the family\'s recent history.');
  } else if (ledger.trauma >= 35) {
    parts.push('There is some unresolved tension in the family\'s recent past.');
  }

  return parts.join(' ');
}

// UI-facing prose — respects language
export function getLedgerProse(ledger: FamilyLedger, lang: Lang = 'en'): string {
  return lang === 'ar' ? getLedgerProseAr(ledger) : getLedgerProseEn(ledger);
}

function getLedgerProseEn(ledger: FamilyLedger): string {
  const lines: string[] = [];

  const totalWealth = (ledger.wealth.liquid + ledger.wealth.land + ledger.wealth.business) / 3;
  if (totalWealth >= 60) lines.push('Prosperity — the family has built something real.');
  else if (totalWealth >= 35) lines.push('Modest means — enough to stand on.');
  else lines.push('Lean years — the family lives carefully.');

  if (ledger.wealth.debt > 50) lines.push('Significant debts weigh on what was built.');

  const rep = (ledger.reputation.tribal + ledger.reputation.social) / 2;
  if (rep >= 65) lines.push('The name carries weight in the community.');
  else if (rep >= 35) lines.push('A respected, if unremarkable, family name.');
  else lines.push('The family\'s reputation has suffered.');

  if (ledger.rootedness >= 65) lines.push('Deep roots. The family knows where it comes from.');
  else if (ledger.rootedness < 35) lines.push('Something has loosened the family from its ground.');

  if (ledger.trauma >= 60) lines.push('Much has been survived. Not all of it has been healed.');
  else if (ledger.trauma < 20) lines.push('The family has been spared the worst of what this era could give.');

  return lines.join(' ');
}

function getLedgerProseAr(ledger: FamilyLedger): string {
  const lines: string[] = [];

  const totalWealth = (ledger.wealth.liquid + ledger.wealth.land + ledger.wealth.business) / 3;
  if (totalWealth >= 60) lines.push('الرخاء موجود — العائلة بنت شيئًا حقيقيًا.');
  else if (totalWealth >= 35) lines.push('حال متوسط — يكفي للوقوف على أرض صلبة.');
  else lines.push('سنوات صعبة — العائلة تعيش بحذر.');

  if (ledger.wealth.debt > 50) lines.push('ديون ثقيلة تُثقل ما بُني.');

  const rep = (ledger.reputation.tribal + ledger.reputation.social) / 2;
  if (rep >= 65) lines.push('الاسم يحمل ثقلًا في المجتمع.');
  else if (rep >= 35) lines.push('اسم عائلة محترم، وإن كان بلا بريق خاص.');
  else lines.push('سمعة العائلة تراجعت.');

  if (ledger.rootedness >= 65) lines.push('جذور عميقة. العائلة تعرف من أين أتت.');
  else if (ledger.rootedness < 35) lines.push('شيء ما أبعد العائلة عن أرضها الأصلية.');

  if (ledger.trauma >= 60) lines.push('الكثير مما عاشته العائلة ما اندمل بعد.');
  else if (ledger.trauma < 20) lines.push('أبعد الله عن العائلة أقسى ما كانت هذي الحقبة تستطيع تعطيه.');

  return lines.join(' ');
}

// UI-facing inheritance prose — respects language
export function getInheritanceProse(ledger: FamilyLedger, familyName: string, lang: Lang = 'en'): string {
  return lang === 'ar' ? getInheritanceProseAr(ledger, familyName) : getInheritanceProseEn(ledger, familyName);
}

function getInheritanceProseEn(ledger: FamilyLedger, familyName: string): string {
  const parts: string[] = [];

  const totalWealth = (ledger.wealth.liquid + ledger.wealth.land + ledger.wealth.business) / 3;
  if (totalWealth >= 60) parts.push(`The ${familyName} family passes on real prosperity.`);
  else if (totalWealth >= 35) parts.push(`The ${familyName} family passes on modest but solid means.`);
  else parts.push(`The ${familyName} family passes on little material wealth.`);

  const rep = (ledger.reputation.tribal + ledger.reputation.social) / 2;
  if (rep >= 65) parts.push('A name with weight in the community.');
  else if (rep >= 35) parts.push('A respected, if quiet, name.');
  else parts.push('A name that has suffered.');

  if (ledger.rootedness >= 65) parts.push('Deep roots in the land and community.');
  else if (ledger.rootedness < 35) parts.push('A family somewhat adrift from its origins.');

  if (ledger.trauma >= 60) parts.push('And an unhealed wound that travels forward.');

  return parts.join(' ');
}

function getInheritanceProseAr(ledger: FamilyLedger, familyName: string): string {
  const parts: string[] = [];

  const totalWealth = (ledger.wealth.liquid + ledger.wealth.land + ledger.wealth.business) / 3;
  if (totalWealth >= 60) parts.push(`عائلة ${familyName} تورث رخاءً حقيقيًا.`);
  else if (totalWealth >= 35) parts.push(`عائلة ${familyName} تورث إمكانات بسيطة لكن صلبة.`);
  else parts.push(`عائلة ${familyName} تورث قليلًا من الثروة المادية.`);

  const rep = (ledger.reputation.tribal + ledger.reputation.social) / 2;
  if (rep >= 65) parts.push('اسم له ثقل في المجتمع.');
  else if (rep >= 35) parts.push('اسم محترم وإن كان هادئًا.');
  else parts.push('اسم طاله الضرر.');

  if (ledger.rootedness >= 65) parts.push('جذور عميقة في الأرض والمجتمع.');
  else if (ledger.rootedness < 35) parts.push('عائلة انفصلت بعض الشيء عن أصولها.');

  if (ledger.trauma >= 60) parts.push('وجرح ما اندمل يمضي إلى الأمام.');

  return parts.join(' ');
}
