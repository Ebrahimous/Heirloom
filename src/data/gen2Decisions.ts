import type { DecisionPoint } from '../constants/ledgerTypes';

export const GEN2_DECISIONS: DecisionPoint[] = [
  {
    id: 'gen2_d1',
    era: '1978, Kuwait',
    eraAr: '١٩٧٨، الكويت',
    situation:
      "Yousef has come of age. Three paths are before him — a stable government position, which his uncle recommends. A private business venture, which his father's partner has offered. Or the military, which carries honour but demands much.",
    situationAr:
      'بلغ الابن سنّ الرشد. ثلاثة مسارات تنتظره: منصبٌ حكومي ثابت يوصي به عمّه، أو مشروع خاص عرضه شريك والده، أو الجيش الذي يحمل شرفًا لكنه يطالب بثمن باهظ.',
    options: [
      {
        id: 'gen2_government',
        choice: 'Government position',
        choiceAr: 'منصب حكومي',
        shortNarration:
          'He reported to the ministry on a Sunday morning in a white dishdasha his mother had pressed the night before. The work was steady and the office was cool.',
        shortNarrationAr:
          'توجّه إلى الوزارة صباح يوم الأحد بدشداشة بيضاء كوتها أمّه ليلة البارحة. العمل ثابت والمكتب بارد.',
        ledgerEffect: {
          'wealth.liquid': 15,
          'reputation.social': 20,
          'wealth.business': -5,
        },
        requires: { 'education.level': { min: 20 } },
        narrativeFlags: ['yousef_government'],
      },
      {
        id: 'gen2_business',
        choice: 'Private business',
        choiceAr: 'العمل الخاص',
        shortNarration:
          'He took the offer. He was twenty-two and moved quickly, perhaps too quickly, but the money began to come and he told himself there was time to be careful later.',
        shortNarrationAr:
          'قبل العرض. كان في الثانية والعشرين ويتحرّك بسرعة، ربما أكثر مما ينبغي، لكن المال بدأ يأتي وقال لنفسه: الحذر له وقته لاحقًا.',
        ledgerEffect: {
          'wealth.business': 30,
          'wealth.liquid': -10,
          'wealth.debt': 10,
        },
        requires: { 'wealth.business': { min: 15 } },
        narrativeFlags: ['yousef_business'],
      },
      {
        id: 'gen2_military',
        choice: 'The military',
        choiceAr: 'الجيش',
        shortNarration:
          'He enlisted and was sent south for training. Hassan did not say much when he heard. He folded his hands and looked out the window for a long time.',
        shortNarrationAr:
          'التحق بالجيش وأُرسل جنوبًا للتدريب. لم يقل جدّه الكثير حين علم. طوى يديه ونظر من النافذة طويلًا.',
        ledgerEffect: {
          'reputation.tribal': 25,
          'reputation.social': 10,
          trauma: 10,
        },
        narrativeFlags: ['yousef_military'],
      },
    ],
  },
  {
    id: 'gen2_d2',
    era: '1981, Kuwait',
    eraAr: '١٩٨١، الكويت',
    situation:
      "Yousef is of marrying age. Two possibilities have emerged. The first is a match arranged by the family — a woman from a respected tribal family, which would strengthen alliances. The second is someone Yousef has met himself — educated, from a less prominent family, but a genuine connection.",
    situationAr:
      'حانَ وقت الزواج. برزت إمكانيتان: زواجٌ مُرتَّب من عائلة قبلية محترمة يُعزّز التحالفات، أو فتاةٌ التقاها الابن بنفسه — متعلّمة، من عائلة أقل شهرة، لكنها ارتباطٌ حقيقي.',
    options: [
      {
        id: 'gen2_arranged',
        choice: 'The arranged match',
        choiceAr: 'الزواج المرتّب',
        shortNarration:
          'The wedding was held over three nights. Both families spoke well of the other throughout, and the match was recorded in the way these things are recorded — as a fact, and a foundation.',
        shortNarrationAr:
          'أُقيمت العرس على مدى ثلاث ليالٍ. تحدّث كلٌّ من الجانبين بخير عن الآخر طوال الوقت، وسُجّل الزواج كما تُسجَّل هذه الأمور — حقيقةً وأساسًا.',
        ledgerEffect: {
          'reputation.tribal': 20,
          'reputation.social': 10,
          rootedness: 10,
          trauma: 5,
        },
        narrativeFlags: ['arranged_marriage'],
      },
      {
        id: 'gen2_own_choice',
        choice: 'His own choice',
        choiceAr: 'اختياره هو',
        shortNarration:
          'He told his father first, then his uncles. There were difficult evenings. But the wedding happened, and his wife arrived in the house with her books already arranged on a shelf.',
        shortNarrationAr:
          'أخبر والده أوّلًا، ثم أعمامه. كانت هناك أمسياتٌ صعبة. لكن العرس جرى، وجاءت زوجته إلى البيت وكتبها مرتّبةٌ بالفعل على رفّ.',
        ledgerEffect: {
          'reputation.tribal': -10,
          'education.level': 10,
          rootedness: -5,
          trauma: -10,
        },
        narrativeFlags: ['love_marriage'],
      },
    ],
  },
  {
    id: 'gen2_d3',
    era: 'August 1990, Kuwait',
    eraAr: 'أغسطس ١٩٩٠، الكويت',
    situation:
      'Iraq has invaded. Everything has changed overnight. The family must decide — evacuate while there is still time, or stay and face what comes. Staying means protecting the home and what was built. Leaving means survival but also an uncertain road.',
    situationAr:
      'غزا العراق الكويت. تغيّر كل شيء في ليلة واحدة. على الأسرة أن تقرر — الإخلاء ما دام الوقت مناسبًا، أو البقاء ومواجهة ما سيأتي. البقاء يعني حماية البيت وما شُيّد. المغادرة تعني النجاة، لكنها طريقٌ مجهول.',
    historicalContext:
      'On 2 August 1990, Iraqi forces crossed into Kuwait. Within hours the capital was occupied. Hundreds of thousands of Kuwaitis fled in the weeks that followed.',
    historicalContextAr:
      'في الثاني من أغسطس ١٩٩٠، اجتازت القوات العراقية الحدود الكويتية. في غضون ساعات احتُلّت العاصمة. فرّ مئات الآلاف من الكويتيين في الأسابيع التالية.',
    options: [
      {
        id: 'gen2_evacuate',
        choice: 'Evacuate the family',
        choiceAr: 'إخلاء الأسرة',
        shortNarration:
          'They left before dawn with what fit in the car. He drove south without stopping. His youngest son slept across the back seat. The house was still standing when they left it.',
        shortNarrationAr:
          'غادروا قبل الفجر بما تحمله السيارة. قاد جنوبًا دون توقف. نام ابنه الأصغر ممدودًا في المقعد الخلفي. البيت كان ما زال واقفًا حين تركوه.',
        ledgerEffect: {
          'wealth.liquid': -20,
          trauma: 20,
          rootedness: -20,
        },
        narrativeFlags: ['evacuated_invasion'],
      },
      {
        id: 'gen2_stay',
        choice: 'Stay. Protect what is yours.',
        choiceAr: 'البقاء. حماية ما بنيت.',
        shortNarration:
          'He locked the outer gate and did not leave for seven months. What happened in those months he did not speak about in detail afterward — not to his wife, not to his sons.',
        shortNarrationAr:
          'أغلق البوابة الخارجية ولم يغادر سبعة أشهر. ما جرى في تلك الأشهر لم يتحدّث عنه بتفصيل بعدها — لا لزوجته، ولا لأبنائه.',
        ledgerEffect: {
          trauma: 35,
          rootedness: 15,
          'reputation.tribal': 10,
        },
        narrativeFlags: ['stayed_through_invasion'],
      },
    ],
  },
  {
    id: 'gen2_d4',
    era: '1991, Kuwait — after liberation',
    eraAr: '١٩٩١، الكويت — بعد التحرير',
    situation:
      'Kuwait is rebuilding. Yousef survived. Now there are choices about what comes next — pursue compensation and rebuild what was lost, join the reconstruction effort in a public role, or quietly return to the life that existed before and ask for nothing.',
    situationAr:
      'تُعيد الكويت بناء نفسها. نجا الابن. الآن ثمة خياراتٌ لما سيأتي: المطالبة بالتعويض وإعادة بناء ما ضاع، أو الانضمام لجهود الإعمار في دورٍ عام، أو العودة بهدوء إلى الحياة التي كانت والطلب بلا شيء.',
    options: [
      {
        id: 'gen2_pursue_compensation',
        choice: 'Pursue what the family lost',
        choiceAr: 'المطالبة بما خسرته الأسرة',
        shortNarration:
          'He filed the claims and attended the hearings. The process took years and cost him something he could not name. In the end, some of it came back.',
        shortNarrationAr:
          'قدّم المطالبات وحضر الجلسات. استغرقت العملية سنوات وكلّفته شيئًا لم يستطع تسميته. في النهاية، عاد بعضه.',
        ledgerEffect: {
          'wealth.liquid': 25,
          'reputation.social': -5,
          trauma: 10,
        },
        narrativeFlags: ['pursued_compensation'],
      },
      {
        id: 'gen2_public_role',
        choice: 'Take a role in reconstruction',
        choiceAr: 'تولّي دور في الإعمار',
        shortNarration:
          'He joined the committee and worked long hours for two years. His name appeared in the newspaper once. He kept the clipping but never showed it to anyone.',
        shortNarrationAr:
          'انضمّ إلى اللجنة وعمل ساعاتٍ طويلة لمدة عامين. ظهر اسمه في الجريدة مرةً واحدة. احتفظ بالمقطع ولم يُرِه أحدًا.',
        ledgerEffect: {
          'reputation.social': 25,
          'reputation.tribal': 10,
          'wealth.liquid': 10,
        },
        narrativeFlags: ['reconstruction_role'],
      },
      {
        id: 'gen2_return_quietly',
        choice: 'Return quietly. Ask for nothing.',
        choiceAr: 'العودة بهدوء. لا مطالب.',
        shortNarration:
          'He came home and reopened what could be reopened. He did not speak about what the family was owed. His neighbours noticed this and respected it.',
        shortNarrationAr:
          'عاد إلى البيت وأعاد فتح ما يمكن فتحه. لم يتحدّث عمّا تستحقّه الأسرة. لاحظ الجيران ذلك واحترموه.',
        ledgerEffect: {
          rootedness: 20,
          trauma: -15,
          'reputation.social': -10,
        },
        narrativeFlags: ['returned_quietly'],
      },
    ],
  },
];
