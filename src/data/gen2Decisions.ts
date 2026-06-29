import type { DecisionPoint } from '../constants/ledgerTypes';

export const GEN2_DECISIONS: DecisionPoint[] = [
  {
    id: 'gen2_d1',
    era: '1978, Kuwait',
    eraAr: '١٩٧٨، الكويت',
    situation:
      "Yousef has come of age. Three paths are before him — a stable government position, which his uncle recommends. A private business venture, which his father's partner has offered. Or the military, which carries honour but demands much.",
    situationAr:
      'يوسف كبر وصار عليه يختار. عمّه يوصيه بالحكومة — راتب ثابت وأمان. شريك أبوه عنده عرض في العمل الخاص. أو الجيش — فيه شرف، لكنه يطلب ثمنًا.',
    situationVariants: [
      "Three men came to the house in the same month, each with a different offer for Yousef. His uncle from the government. His father's old business partner. And a recruitment officer from the military who had heard Yousef's name somewhere.",
      "Yousef had been putting off the decision for months. His mother stopped asking. His father stopped mentioning it. Then all three paths converged at once and the waiting was over.",
    ],
    situationVariantsAr: [
      'ثلاثة رجال جاؤوا للبيت في نفس الشهر — كل واحد بعرض. عمّه من الحكومة. شريك أبوه القديم من العمل الخاص. وضابط تجنيد من الجيش سمع باسم يوسف من مكان ما.',
      'يوسف كان يأجّل القرار من أشهر. أمّه وقفت عن السؤال. أبوه وقف عن الإشارة. ثم تجمّعت الطرق الثلاثة دفعة واحدة وانتهى وقت الانتظار.',
    ],
    options: [
      {
        id: 'gen2_government',
        choice: 'Government position',
        choiceAr: 'العمل في الحكومة',
        shortNarration:
          'He reported to the ministry on a Sunday morning in a white dishdasha his mother had pressed the night before. The work was steady and the office was cool.',
        shortNarrationAr:
          'راح للوزارة صباح الأحد بدشداشة بيضاء كوتها أمّه الليلة اللي قبل. الشغل ثابت والمكتب بارد.',
        ledgerEffect: {
          'wealth.liquid': 15,
          'reputation.social': 20,
          'wealth.business': -5,
        },
        variance: 10,
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
          'قبل العرض. كان عمره اثنين وعشرين يتحرّك بسرعة — ربما أكثر مما ينبغي. لكن المال بدأ يجي وقال لنفسه: وقت الحذر يجي لاحقًا.',
        ledgerEffect: {
          'wealth.business': 30,
          'wealth.liquid': -10,
          'wealth.debt': 10,
        },
        variance: 20,
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
          'التحق بالجيش وبعثوه جنوبًا للتدريب. ما قال حسن الكثير لما علم. طوى يديه ونظر من النافذة وقتًا طويلًا.',
        ledgerEffect: {
          'reputation.tribal': 25,
          'reputation.social': 10,
          trauma: 10,
        },
        variance: 12,
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
      'حان وقت الزواج. عندهم خيارين: بنت من عائلة قبلية محترمة، الزواج منها يقوّي العلاقات — أو فتاة يوسف التقاها بنفسه، متعلّمة من عائلة أقل شهرة، لكن بينهم شيء حقيقي.',
    situationVariants: [
      "The family had been looking for a year. Then, in the same week, two names came forward: one through the tribe, one through Yousef himself. His mother knew about both. She did not tell his father about the second one until he asked.",
      "Yousef told his father about her quietly, one evening after dinner. Hassan listened without interrupting. Then he was quiet for a long time. Outside, his wife had already heard through other channels and was waiting to see what Hassan would do.",
    ],
    situationVariantsAr: [
      'العائلة كانت تدور من سنة. ثم في نفس الأسبوع جاءين اسمين — واحدة عن طريق القبيلة، والثانية من يوسف نفسه. أمّه عرفت بالاثنتين. ما أخبرت أباه عن الثانية حتى سأل.',
      'قال يوسف لأبوه عنها بهدوء، مساء بعد العشاء. حسن سمع بدون ما يقاطع. ثم صكت طويلًا. في الخارج، زوجته كانت عرفت من طرق ثانية وتنتظر ترى ماذا سيقرّر حسن.',
    ],
    options: [
      {
        id: 'gen2_arranged',
        choice: 'The arranged match',
        choiceAr: 'الزواج المرتّب',
        shortNarration:
          'The wedding was held over three nights. Both families spoke well of the other throughout, and the match was recorded in the way these things are recorded — as a fact, and a foundation.',
        shortNarrationAr:
          'أقيم العرس على مدى ثلاث ليالٍ. تكلّم كل جانب بخير عن الثاني طوال الوقت، وسُجّل الزواج كما تُسجَّل هذي الأمور — حقيقة وأساس.',
        ledgerEffect: {
          'reputation.tribal': 20,
          'reputation.social': 10,
          rootedness: 10,
          trauma: 5,
        },
        variance: 10,
        narrativeFlags: ['arranged_marriage'],
      },
      {
        id: 'gen2_own_choice',
        choice: 'His own choice',
        choiceAr: 'اختياره هو',
        shortNarration:
          'He told his father first, then his uncles. There were difficult evenings. But the wedding happened, and his wife arrived in the house with her books already arranged on a shelf.',
        shortNarrationAr:
          'أخبر أبوه أوّل، ثم أعمامه. كانت في أمسيات صعبة. لكن العرس صار، وجاءت زوجته للبيت وكتبها مرتّبة بالفعل على الرف.',
        ledgerEffect: {
          'reputation.tribal': -10,
          'education.level': 10,
          rootedness: -5,
          trauma: -10,
        },
        variance: 12,
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
      'غزا العراق الكويت. تغيّر كل شيء في ليلة واحدة. على الأسرة أن تقرّر — الخروج ما دام الوقت مناسبًا، أو البقاء ومواجهة ما يجي. البقاء يعني حماية البيت وما بُني. الخروج يعني النجاة، لكن الطريق مجهول.',
    situationVariants: [
      "The sound of the tanks woke them before dawn. By morning the radio had stopped playing normal programming. Yousef's neighbours were loading cars in the street. His wife was looking at him and not saying anything.",
      "They had one day's warning — a cousin called from outside the country. Yousef spent the morning moving money and papers. By afternoon the roads south were crowded. By evening there were soldiers at the end of the street.",
    ],
    situationVariantsAr: [
      'صوت الدبابات صحّاهم قبل الفجر. بالصبح المذياع قطع البرامج العادية. جيران يوسف كانوا يحمّلون السيارات في الشارع. زوجته كانت تنظر إليه ولا تقول شيئًا.',
      'كان عندهم يوم تحذير — ابن عمّ اتصل من خارج البلد. يوسف قضى الصبح ينقل الفلوس والأوراق. بالعصر الطرق جنوبًا كانت مزحومة. بالمساء كان في جنود في آخر الشارع.',
    ],
    historicalContext:
      'On 2 August 1990, Iraqi forces crossed into Kuwait. Within hours the capital was occupied. Hundreds of thousands of Kuwaitis fled in the weeks that followed.',
    historicalContextAr:
      'في الثاني من أغسطس ١٩٩٠، دخلت القوات العراقية الكويت. في ساعات احتُلّت العاصمة. فرّ مئات الآلاف من الكويتيين في الأسابيع اللي تلت.',
    options: [
      {
        id: 'gen2_evacuate',
        choice: 'Evacuate the family',
        choiceAr: 'إخراج الأسرة',
        shortNarration:
          'They left before dawn with what fit in the car. He drove south without stopping. His youngest son slept across the back seat. The house was still standing when they left it.',
        shortNarrationAr:
          'غادروا قبل الفجر بما يسع السيارة. قاد جنوبًا بدون توقف. ابنه الأصغر نايم في المقعد الخلفي. البيت كان ما زال واقفًا لما تركوه.',
        ledgerEffect: {
          'wealth.liquid': -20,
          trauma: 20,
          rootedness: -20,
        },
        variance: 15,
        narrativeFlags: ['evacuated_invasion'],
      },
      {
        id: 'gen2_stay',
        choice: 'Stay. Protect what is yours.',
        choiceAr: 'البقاء. حماية ما بنيت.',
        shortNarration:
          'He locked the outer gate and did not leave for seven months. What happened in those months he did not speak about in detail afterward — not to his wife, not to his sons.',
        shortNarrationAr:
          'أغلق البوابة الخارجية وما غادر سبعة أشهر. اللي صار في تلك الأشهر ما تكلّم عنه بتفصيل بعدها — لا لزوجته، ولا لأولاده.',
        ledgerEffect: {
          trauma: 35,
          rootedness: 15,
          'reputation.tribal': 10,
        },
        variance: 10,
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
      'الكويت تُعيد بناء نفسها. يوسف نجا. الآن السؤال — يطالب بالتعويض ويعيد ما ضاع، يشارك في الإعمار بدور عام، أو يرجع بهدوء لحياته ويطلب لا شيء.',
    situationVariants: [
      "The city came back to life faster than anyone expected. Yousef stood in what remained of what he had built and counted what was salvageable. Three people that week asked him what he planned to do. He did not yet know.",
      "The reconstruction committees were forming and names were being chosen. A friend in the government told Yousef his name had been mentioned. At the same time, a lawyer was calling about the compensation claims. And at home, his wife just wanted things to be normal again.",
    ],
    situationVariantsAr: [
      'المدينة رجعت للحياة أسرع مما توقّع أحد. يوسف وقف على ما تبقّى مما بنى وعدّ ما يمكن إنقاذه. ثلاثة أشخاص في ذلك الأسبوع سألوه ماذا ينوي يسوي. ما كان يعرف بعد.',
      'لجان الإعمار كانت تتشكّل والأسماء تُختار. صديق في الحكومة قال ليوسف إن اسمه انذكر. في نفس الوقت محامٍ يتصل بخصوص مطالبات التعويض. وفي البيت، زوجته تريد فقط أن تعود الأمور لطبيعتها.',
    ],
    options: [
      {
        id: 'gen2_pursue_compensation',
        choice: 'Pursue what the family lost',
        choiceAr: 'المطالبة بما خسرته الأسرة',
        shortNarration:
          'He filed the claims and attended the hearings. The process took years and cost him something he could not name. In the end, some of it came back.',
        shortNarrationAr:
          'قدّم المطالبات وحضر الجلسات. العملية أخذت سنوات وكلّفته شيئًا ما قدر يسمّيه. في النهاية رجع بعضه.',
        ledgerEffect: {
          'wealth.liquid': 25,
          'reputation.social': -5,
          trauma: 10,
        },
        variance: 20,
        narrativeFlags: ['pursued_compensation'],
      },
      {
        id: 'gen2_public_role',
        choice: 'Take a role in reconstruction',
        choiceAr: 'دور في الإعمار',
        shortNarration:
          'He joined the committee and worked long hours for two years. His name appeared in the newspaper once. He kept the clipping but never showed it to anyone.',
        shortNarrationAr:
          'انضمّ للجنة وشتغل ساعات طويلة لمدة سنتين. اسمه ظهر في الجريدة مرة واحدة. حفظ المقطع وما أراه لأحد.',
        ledgerEffect: {
          'reputation.social': 25,
          'reputation.tribal': 10,
          'wealth.liquid': 10,
        },
        variance: 12,
        narrativeFlags: ['reconstruction_role'],
      },
      {
        id: 'gen2_return_quietly',
        choice: 'Return quietly. Ask for nothing.',
        choiceAr: 'العودة بهدوء. بدون مطالب.',
        shortNarration:
          'He came home and reopened what could be reopened. He did not speak about what the family was owed. His neighbours noticed this and respected it.',
        shortNarrationAr:
          'رجع للبيت وفتح ما يمكن فتحه. ما تكلّم عمّا تستحقّه الأسرة. الجيران لاحظوا ذلك واحترموه.',
        ledgerEffect: {
          rootedness: 20,
          trauma: -15,
          'reputation.social': -10,
        },
        variance: 8,
        narrativeFlags: ['returned_quietly'],
      },
    ],
  },
];
