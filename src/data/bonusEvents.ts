import type { BonusEvent } from '../constants/ledgerTypes';

export const BONUS_EVENTS: BonusEvent[] = [
  {
    id: 'bonus_good_harvest',
    generation: 1,
    text: 'An unexpected inheritance arrived — a distant relative died without heirs, and a modest sum passed to the family through the tribal network.',
    textAr: 'وصل ميراث غير متوقّع — قريب بعيد مات بدون ورثة، ووصل للعائلة عن طريق شبكة القبيلة مبلغ متواضع.',
    ledgerEffect: { 'wealth.liquid': 12 },
  },
  {
    id: 'bonus_drought_year',
    generation: 1,
    text: 'A dry season hit the trading routes hard. Several debts that were owed to the family quietly disappeared, never to be collected.',
    textAr: 'موسم جاف ضرب طرق التجارة بشدة. عدة ديون كانت مستحقّة للعائلة اختفت بهدوء، ولن تُحصَّل أبدًا.',
    ledgerEffect: { 'wealth.liquid': -10, 'wealth.debt': -8 },
  },
  {
    id: 'bonus_respected_elder',
    generation: 1,
    text: "A respected elder in the community publicly praised the family's conduct at a Friday gathering. It was a small thing said plainly, but people remembered.",
    textAr: 'مدح أحد الوجهاء سلوك العائلة علنًا في تجمّع الجمعة. كان كلامًا بسيطًا وبدون زخرفة، لكن الناس تذكّروه.',
    ledgerEffect: { 'reputation.tribal': 10, 'reputation.social': 8 },
  },
  {
    id: 'bonus_theft',
    generation: 1,
    text: 'A break-in at the family business. The thieves took less than they might have, but the loss was real and the feeling of violation lingered.',
    textAr: 'سطو على محل العائلة التجاري. السرّاق أخذوا أقل مما كان يمكنهم، لكن الخسارة كانت حقيقية والشعور بالانتهاك بقي.',
    ledgerEffect: { 'wealth.liquid': -15, trauma: 8 },
  },
  {
    id: 'bonus_government_contract',
    generation: 1,
    text: 'A minor government contract came through a cousin — small work, but it paid reliably and opened a door the family had not expected.',
    textAr: 'عقد حكومي صغير جاء عن طريق ابن عمّ — شغل بسيط لكنه يدفع بانتظام وفتح بابًا ما كانت العائلة تتوقّعه.',
    ledgerEffect: { 'wealth.liquid': 10, 'wealth.business': 8 },
  },
  {
    id: 'bonus_medical_cost',
    generation: 2,
    text: 'A serious illness in the household. The treatment cost more than expected, and the months of recovery quietly reshaped the family\'s rhythm.',
    textAr: 'مرض خطير في البيت. التكاليف الطبية كانت أكثر مما توقّعوا، وأشهر التعافي غيّرت إيقاع العائلة بهدوء.',
    ledgerEffect: { 'wealth.liquid': -18, trauma: 12 },
  },
  {
    id: 'bonus_business_windfall',
    generation: 2,
    text: "A deal closed better than anyone expected. The margin was double the projection. Yousef did not celebrate publicly, but he slept well that night.",
    textAr: 'صفقة أُغلقت أحسن مما توقّع أحد. الهامش ضعف التوقّعات. يوسف ما احتفل علنًا، لكنه نام بعمق تلك الليلة.',
    ledgerEffect: { 'wealth.business': 15, 'wealth.liquid': 10 },
  },
  {
    id: 'bonus_family_rift',
    generation: 2,
    text: "A dispute over land boundaries with a cousin turned serious. Neither side admitted fault. The relationship cooled into a silence that would last years.",
    textAr: 'خلاف على حدود الأرض مع ابن عمّ تطوّر وصار جديًا. ما أقرّ أحد بالخطأ. العلاقة تحوّلت لصمت مديد سيدوم سنوات.',
    ledgerEffect: { 'reputation.tribal': -12, trauma: 8, rootedness: -5 },
  },
  {
    id: 'bonus_sons_scholarship',
    generation: 2,
    text: "One of Yousef's children showed exceptional aptitude. A teacher lobbied quietly and secured a scholarship. The family's educational standing shifted.",
    textAr: 'أحد أبناء يوسف أظهر تفوّقًا استثنائيًا. معلّم تدخّل بهدوء وأمّن له منحة دراسية. المكانة التعليمية للعائلة ارتفعت.',
    ledgerEffect: { 'education.level': 12, 'reputation.social': 8 },
  },
  {
    id: 'bonus_flood_damage',
    generation: 2,
    text: 'Seasonal flooding damaged the lower floor of the family home. Repairs took months. The insurance paid some of it. The rest came out of savings.',
    textAr: 'أضرار من فيضانات موسمية طالت الطابق الأرضي من البيت. الإصلاحات أخذت أشهرًا. التأمين غطّى بعضها. والباقي جاء من المدخرات.',
    ledgerEffect: { 'wealth.liquid': -12, 'wealth.land': -6 },
  },
  {
    id: 'bonus_community_recognition',
    generation: 2,
    text: "The family was asked to sponsor a neighbourhood event — a small thing, but visible. The cost was modest. The goodwill it generated was not.",
    textAr: 'طُلب من العائلة رعاية فعالية حيّ — شيء صغير لكن ظاهر. التكلفة كانت بسيطة. لكن حسن النية اللي ولّدته لم يكن كذلك.',
    ledgerEffect: { 'wealth.liquid': -8, 'reputation.social': 14, rootedness: 8 },
  },
];

// Pick a random bonus event for a given generation that hasn't been fired yet
export function pickBonusEvent(
  generation: number,
  firedIds: string[]
): BonusEvent | null {
  const eligible = BONUS_EVENTS.filter(
    (e) => (e.generation === undefined || e.generation === generation) && !firedIds.includes(e.id)
  );
  if (eligible.length === 0) return null;
  return eligible[Math.floor(Math.random() * eligible.length)];
}
