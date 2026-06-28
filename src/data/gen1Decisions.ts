import type { DecisionPoint } from '../constants/ledgerTypes';

export const GEN1_DECISIONS: DecisionPoint[] = [
  {
    id: 'gen1_d1',
    era: '1958, Kuwait City',
    eraAr: '١٩٥٨، مدينة الكويت',
    situation:
      'The government has approached your grandfather Hassan with an offer to purchase the family\'s plot near the old suq. The payment is generous — more money than the family has seen at once. His brother says sell. His father, before he died, said the land is the family.',
    situationAr:
      'تقدّم المسؤولون الحكوميون من جدّك بعرضٍ لشراء قطعة الأرض العائلية القريبة من السوق القديم. العرضُ سخيٌّ — أكثر مما رأته الأسرة دفعةً واحدة. أخوه يقول: بِع. وأبوه، قبل رحيله، قال: الأرض هي الأسرة.',
    options: [
      {
        id: 'gen1_sell_land',
        choice: 'Sell the land',
        choiceAr: 'بيع الأرض',
        shortNarration:
          'Hassan signed the papers in the municipality office. The money arrived three days later, more than he had ever held at once.',
        shortNarrationAr:
          'وقّع على الأوراق في مكتب البلدية. وصل المال بعد ثلاثة أيام — أكثر مما حمل في حياته.',
        ledgerEffect: {
          'wealth.liquid': 40,
          'wealth.land': -60,
          rootedness: -25,
          'reputation.tribal': -15,
        },
        narrativeFlags: ['sold_ancestral_land'],
      },
      {
        id: 'gen1_keep_land',
        choice: 'Refuse. Keep the land.',
        choiceAr: 'الرفض. الإبقاء على الأرض.',
        shortNarration:
          'Hassan thanked the official and showed him to the door. That evening he walked the boundary of the plot as his father had taught him to do.',
        shortNarrationAr:
          'شكر المسؤول وأوصله إلى الباب. في المساء، مشى على حدود القطعة كما علّمه والده.',
        ledgerEffect: {
          'wealth.land': 20,
          rootedness: 20,
          'reputation.tribal': 15,
          'wealth.liquid': -10,
        },
        narrativeFlags: ['kept_ancestral_land'],
      },
    ],
  },
  {
    id: 'gen1_d2',
    era: '1962, Kuwait',
    eraAr: '١٩٦٢، الكويت',
    situation:
      "Hassan's eldest son Yousef shows unusual intelligence. A scholarship opportunity has emerged to study in Cairo. He would be gone four years. The family would feel his absence. But the world is changing.",
    situationAr:
      'أبدى نجل جدّك الأكبر ذكاءً لافتًا. ظهرت فرصة منحة دراسية للذهاب إلى القاهرة. سيغيب أربع سنوات. ستشعر الأسرة بغيابه. لكن العالم يتغيّر.',
    options: [
      {
        id: 'gen1_send_cairo',
        choice: 'Send him to Cairo',
        choiceAr: 'إرساله إلى القاهرة',
        shortNarration:
          'He left on a Tuesday morning. Hassan stood at the gate until the car was out of sight, then went inside without speaking.',
        shortNarrationAr:
          'غادر صباح يوم الثلاثاء. وقف جدّك عند البوابة حتى اختفت السيارة، ثم دخل صامتًا.',
        ledgerEffect: {
          'education.level': 40,
          'education.foreign': true,
          rootedness: -15,
        },
        narrativeFlags: ['yousef_educated_abroad'],
      },
      {
        id: 'gen1_study_local',
        choice: 'Enroll him locally. Keep him close.',
        choiceAr: 'تسجيله محليًا. إبقاؤه قريبًا.',
        shortNarration:
          'He enrolled at the local school that autumn. He was the best student in his class, and Hassan made sure everyone knew it.',
        shortNarrationAr:
          'التحق بالمدرسة المحلية في ذلك الخريف. كان أفضل طالب في صفّه، وحرص جدّك أن يعلم الجميع ذلك.',
        ledgerEffect: {
          'education.level': 15,
          rootedness: 10,
          'reputation.tribal': 10,
        },
        narrativeFlags: ['yousef_educated_locally'],
      },
    ],
  },
  {
    id: 'gen1_d3',
    era: '1967, Kuwait',
    eraAr: '١٩٦٧، الكويت',
    situation:
      "A merchant from outside the tribe has approached Hassan with a profitable import partnership. The numbers are good. But the man's reputation in the community is unknown, and Hassan's cousin has warned against it.",
    situationAr:
      'تقدّم تاجرٌ من خارج القبيلة إلى جدّك بشراكةٍ استيرادية مربحة. الأرقام مغرية. لكن سمعة الرجل في المجتمع مجهولة، وقد حذّر ابن العمّ منه.',
    options: [
      {
        id: 'gen1_accept_partner',
        choice: 'Accept the partnership',
        choiceAr: 'قبول الشراكة',
        shortNarration:
          'They shook hands over coffee in Hassan\'s sitting room. The first shipment arrived six weeks later, and the margins were everything the man had promised.',
        shortNarrationAr:
          'تصافحا على القهوة في ديوانية جدّك. وصلت الشحنة الأولى بعد ستة أسابيع، والهامش كان كما وعد الرجل تمامًا.',
        ledgerEffect: {
          'wealth.business': 35,
          'reputation.social': 10,
          'reputation.tribal': -10,
          'wealth.debt': 15,
        },
        narrativeFlags: ['outside_business_partner'],
      },
      {
        id: 'gen1_decline_partner',
        choice: 'Decline. Stay independent.',
        choiceAr: 'الرفض. البقاء مستقلًا.',
        shortNarration:
          'Hassan declined politely and did not explain his reasons. His cousin nodded when he heard, and said nothing more about it.',
        shortNarrationAr:
          'رفض جدّك بأدب ولم يفسّر أسبابه. أومأ ابن العمّ حين علم، ولم يزد على ذلك.',
        ledgerEffect: {
          'wealth.business': 10,
          'reputation.tribal': 15,
        },
        narrativeFlags: ['declined_outside_partner'],
      },
    ],
  },
  {
    id: 'gen1_d4',
    era: '1971, Kuwait',
    eraAr: '١٩٧١، الكويت',
    situation:
      'A public dispute has erupted between two prominent families. Hassan is well-known enough that people are watching to see where he stands. Siding with the stronger family is safer. Siding with the weaker one is riskier but might mean more to the community. Silence is also a choice — but it carries its own reputation.',
    situationAr:
      'اندلع نزاعٌ علني بين عائلتين بارزتين. جدّك معروفٌ بما يكفي ليلاحظ الناس موقفه. الانحياز للأقوى أكثر أمانًا. الانحياز للأضعف أكثر خطورة لكنه قد يُعلي من شأنه في المجتمع. الصمت خيارٌ أيضًا — غير أنه يحمل سمعته الخاصة.',
    options: [
      {
        id: 'gen1_side_strong',
        choice: 'Side with the stronger family',
        choiceAr: 'الانحياز للعائلة الأقوى',
        shortNarration:
          'Hassan spoke his position in the majlis and the room received it without surprise. The stronger family acknowledged him with a nod that would be remembered.',
        shortNarrationAr:
          'أعلن جدّك موقفه في المجلس فتلقّاه الحاضرون دون استغراب. أقرّت العائلة الأقوى بذلك بإيماءةٍ ستُحفظ في الذاكرة.',
        ledgerEffect: {
          'reputation.tribal': 20,
          'reputation.social': 5,
          trauma: 5,
        },
        narrativeFlags: ['sided_with_strong'],
      },
      {
        id: 'gen1_side_weak',
        choice: 'Side with the weaker family',
        choiceAr: 'الانحياز للعائلة الأضعف',
        shortNarration:
          'Hassan spoke in defence of the weaker family. Several men looked at their hands. Outside, one of their elders pressed Hassan\'s arm and said only: we will remember.',
        shortNarrationAr:
          'تكلّم جدّك دفاعًا عن العائلة الأضعف. نظر بعض الرجال إلى أيديهم. في الخارج، أمسك أحد كبارهم بذراعه وقال فقط: سنذكر.',
        ledgerEffect: {
          'reputation.tribal': -10,
          'reputation.social': 20,
          rootedness: 15,
        },
        narrativeFlags: ['sided_with_weak'],
      },
      {
        id: 'gen1_stay_silent',
        choice: 'Say nothing',
        choiceAr: 'الصمت',
        shortNarration:
          'Hassan did not attend the gathering. Afterwards, men noticed his absence in the way they notice everything.',
        shortNarrationAr:
          'لم يحضر جدّك التجمّع. لاحظ الرجال غيابه كما يلاحظون كل شيء.',
        ledgerEffect: {
          'reputation.tribal': -15,
          'reputation.social': -5,
        },
        narrativeFlags: ['stayed_silent_dispute'],
      },
    ],
  },
  {
    id: 'gen1_d5',
    era: '1974, Kuwait — the oil boom',
    eraAr: '١٩٧٤، الكويت — طفرة النفط',
    situation:
      'Money is moving differently now. A neighbour has made real money investing in a new residential district being built. Hassan has savings. He could invest, start something, or simply hold his position and live within what he knows.',
    situationAr:
      'يتدفق المال بصورةٍ مختلفة الآن. جنى جارٌ ثروةً حقيقية من الاستثمار في حيٍّ سكني جديد قيد الإنشاء. لدى جدّك مدخرات. بإمكانه الاستثمار، أو البدء بشيء جديد، أو البقاء في حدود ما يعرفه.',
    options: [
      {
        id: 'gen1_invest_real_estate',
        choice: 'Invest in the new district',
        choiceAr: 'الاستثمار في الحي الجديد',
        shortNarration:
          'Hassan committed his savings to two plots in the new district. Construction began that spring, and within a year the value had climbed in a way that made him quiet at meals.',
        shortNarrationAr:
          'أودع مدخراته في قطعتين في الحي الجديد. بدأ البناء ذلك الربيع، وخلال عام ارتفعت القيمة ارتفاعًا جعله صامتًا على المائدة.',
        ledgerEffect: {
          'wealth.land': 30,
          'wealth.liquid': -30,
          'wealth.business': 10,
        },
        narrativeFlags: ['invested_boom_land'],
      },
      {
        id: 'gen1_save',
        choice: 'Save conservatively. Trust what you have.',
        choiceAr: 'الادخار بحذر. الاكتفاء بما لديك.',
        shortNarration:
          'Hassan kept his savings where they were. When neighbours spoke of their gains, he listened without envy and without regret.',
        shortNarrationAr:
          'أبقى مدخراته في مكانها. حين تحدّث الجيران عن مكاسبهم، استمع دون حسدٍ ودون ندم.',
        ledgerEffect: {
          'wealth.liquid': 20,
          rootedness: 10,
        },
        narrativeFlags: ['conservative_during_boom'],
      },
      {
        id: 'gen1_start_business',
        choice: 'Start a small trading business',
        choiceAr: 'تأسيس مشروع تجاري صغير',
        shortNarration:
          'Hassan rented a small shop near the port and began moving goods on his own terms. The first months were slow. By the third year, he had two employees.',
        shortNarrationAr:
          'استأجر دكانًا صغيرًا قرب الميناء وبدأ يتاجر بشروطه. الأشهر الأولى كانت بطيئة. في السنة الثالثة، صار لديه موظّفان.',
        ledgerEffect: {
          'wealth.business': 25,
          'wealth.liquid': -20,
          'wealth.debt': 10,
        },
        narrativeFlags: ['started_own_business'],
      },
    ],
  },
];
