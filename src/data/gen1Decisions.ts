import type { DecisionPoint } from '../constants/ledgerTypes';

export const GEN1_DECISIONS: DecisionPoint[] = [
  {
    id: 'gen1_d1',
    era: '1958, Kuwait City',
    eraAr: '١٩٥٨، مدينة الكويت',
    situation:
      "The government has approached your grandfather Hassan with an offer to purchase the family's plot near the old suq. The payment is generous — more money than the family has seen at once. His brother says sell. His father, before he died, said the land is the family.",
    situationAr:
      'جاء مسؤولون من الحكومة يطرقون باب جدّك حسن — يريدون شراء الأرض القريبة من السوق القديم. المبلغ كبير، أكثر مما رأته العائلة مجتمعًا. أخوه يقول: بِع. لكن أباه، الله يرحمه، كان يردّد دائمًا: الأرض هي العائلة.',
    situationVariants: [
      "Word has reached Hassan through his uncle: the government wants the family's land near the old suq and is willing to pay well. The offer is real money — more than the family earns in years. His brother has already decided. Hassan has not.",
      "The municipality sent a letter. They want the plot near the suq — part of a new road plan. The compensation offered is more than fair. Hassan's brother calls it a gift. Hassan thinks of his father, who never sold anything.",
    ],
    situationVariantsAr: [
      'وصل الخبر لجدّك حسن عن طريق عمّه: الحكومة تريد أرض العائلة بجانب السوق القديم، والمبلغ مغرٍ. أخوه حسم أمره. حسن لم يحسم بعد.',
      'وصل من البلدية كتاب يطلبون فيه الأرض — جزء من مشروع طريق جديد. التعويض أكثر من عادل. أخوه يقول هذا رزق. وحسن يتذكّر أباه الذي ما باع شيئًا في حياته.',
    ],
    options: [
      {
        id: 'gen1_sell_land',
        choice: 'Sell the land',
        choiceAr: 'بيع الأرض',
        shortNarration:
          'Hassan signed the papers in the municipality office. The money arrived three days later, more than he had ever held at once.',
        shortNarrationAr:
          'وقّع حسن على الأوراق في مكتب البلدية. المال وصل بعد ثلاثة أيام — أكثر مما لمست يده في حياته.',
        ledgerEffect: {
          'wealth.liquid': 40,
          'wealth.land': -60,
          rootedness: -25,
          'reputation.tribal': -15,
        },
        variance: 12,
        narrativeFlags: ['sold_ancestral_land'],
      },
      {
        id: 'gen1_keep_land',
        choice: 'Refuse. Keep the land.',
        choiceAr: 'الرفض. الإبقاء على الأرض.',
        shortNarration:
          'Hassan thanked the official and showed him to the door. That evening he walked the boundary of the plot as his father had taught him to do.',
        shortNarrationAr:
          'شكر حسن المسؤول وأوصله للباب. في المساء مشى على حدود الأرض، كما كان أبوه يعلّمه.',
        ledgerEffect: {
          'wealth.land': 20,
          rootedness: 20,
          'reputation.tribal': 15,
          'wealth.liquid': -10,
        },
        variance: 10,
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
      'ولد حسن الأكبر يوسف — ذكاؤه لافت، كلّ من يجالسه يلاحظ ذلك. ظهرت منحة دراسية للقاهرة. أربع سنوات بعيدًا. ستفتقده الأسرة. لكن الدنيا تتغيّر.',
    situationVariants: [
      "Yousef's teacher came to the house. He sat with Hassan for an hour and said: this boy should not stay here. There is a scholarship to Cairo — full funded, four years. It would cost the family nothing but his presence.",
      "A neighbour's son returned from Cairo last month, changed in ways people noticed. Now the same scholarship is being offered to Yousef. Four years is a long time. But Hassan can see what that trip did for the neighbour's family.",
    ],
    situationVariantsAr: [
      'جاء معلّم يوسف إلى البيت وجلس مع حسن ساعة كاملة. قال له: هذا الولد ما يصير يقعد هنا. في منحة للقاهرة — مجانًا، أربع سنوات. ما تكلّف العائلة إلا غيابه.',
      'ابن الجيران رجع من القاهرة الشهر الماضي، تغيّر بطريقة يلاحظها الناس. الآن جاءت نفس المنحة ليوسف. أربع سنوات وقت طويل. لكن حسن شايف اللي صار لعائلة الجيران.',
    ],
    options: [
      {
        id: 'gen1_send_cairo',
        choice: 'Send him to Cairo',
        choiceAr: 'إرساله إلى القاهرة',
        shortNarration:
          'He left on a Tuesday morning. Hassan stood at the gate until the car was out of sight, then went inside without speaking.',
        shortNarrationAr:
          'غادر صباح الثلاثاء. وقف حسن عند البوابة حتى اختفت السيارة، ثم دخل البيت بدون ما يتكلّم.',
        ledgerEffect: {
          'education.level': 40,
          'education.foreign': true,
          rootedness: -15,
        },
        variance: 15,
        narrativeFlags: ['yousef_educated_abroad'],
      },
      {
        id: 'gen1_study_local',
        choice: 'Enroll him locally. Keep him close.',
        choiceAr: 'تسجيله محليًا. إبقاؤه قريبًا.',
        shortNarration:
          'He enrolled at the local school that autumn. He was the best student in his class, and Hassan made sure everyone knew it.',
        shortNarrationAr:
          'التحق بالمدرسة المحلية في ذلك الخريف. كان أحسن طالب في صفّه، وحسن كان يحرص أن يعلم الجميع.',
        ledgerEffect: {
          'education.level': 15,
          rootedness: 10,
          'reputation.tribal': 10,
        },
        variance: 8,
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
      'تاجر من خارج القبيلة جاء على حسن بعرض شراكة في الاستيراد — الأرقام مغرية. بس سمعة الرجل في المجتمع ما هي معروفة، وابن العمّ حذّر منه.',
    situationVariants: [
      "The man found Hassan at the coffee shop near the port. He laid out the numbers on a piece of paper — import margins Hassan had not seen before. He left the paper behind when he went. Hassan's cousin tore it in half.",
      "The partnership offer came through a mutual acquaintance, which made it harder to dismiss. The man is from the north — no tribal connections here, but the deal is structured well. Hassan's cousin says: we don't know who his people are.",
    ],
    situationVariantsAr: [
      'لقي الرجل حسن في المقهى بجانب الميناء. فرد أمامه ورقة بأرقام ما شافها حسن من قبل — هوامش استيراد ما يصدّق. ترك الورقة وراح. ابن العمّ مزّقها نصّين.',
      'جاء العرض عن طريق معارف مشتركة، وهذا صعّب الرفض. الرجل من الشمال — ما عنده روابط قبلية هنا، لكن الصفقة مبنية بشكل محكم. ابن العمّ يقول: ما نعرف من هم أهله.',
    ],
    options: [
      {
        id: 'gen1_accept_partner',
        choice: 'Accept the partnership',
        choiceAr: 'قبول الشراكة',
        shortNarration:
          "They shook hands over coffee in Hassan's sitting room. The first shipment arrived six weeks later, and the margins were everything the man had promised.",
        shortNarrationAr:
          'تصافحا على القهوة في ديوانية حسن. وصلت الشحنة الأولى بعد ستة أسابيع — والهامش كان تمامًا كما وعد الرجل.',
        ledgerEffect: {
          'wealth.business': 35,
          'reputation.social': 10,
          'reputation.tribal': -10,
          'wealth.debt': 15,
        },
        variance: 20,
        narrativeFlags: ['outside_business_partner'],
      },
      {
        id: 'gen1_decline_partner',
        choice: 'Decline. Stay independent.',
        choiceAr: 'الرفض. البقاء مستقلًا.',
        shortNarration:
          'Hassan declined politely and did not explain his reasons. His cousin nodded when he heard, and said nothing more about it.',
        shortNarrationAr:
          'رفض حسن بأدب ما شرح أسبابه. أومأ ابن العمّ حين علم، وما زاد على ذلك.',
        ledgerEffect: {
          'wealth.business': 10,
          'reputation.tribal': 15,
        },
        variance: 8,
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
      'نزاع علني اشتعل بين عائلتين كبيرتين. حسن صار معروفًا بما يكفي — الناس ينظرون ليروا أين يقف. الوقوف مع الأقوى أضمن. الوقوف مع الأضعف فيه مخاطرة، لكنه يعني أكثر. والصمت خيار أيضًا — لكن له سمعته.',
    situationVariants: [
      "The dispute spilled into the Friday gathering. Men who had been friends for years were no longer speaking. Hassan was asked directly, in front of others, which family he stood with. He had not decided yet.",
      "Both families sent someone to Hassan's house within the same week — each asking for his public support. The stronger family sent a senior man. The weaker family sent the father himself, who looked tired.",
    ],
    situationVariantsAr: [
      'النزاع وصل لتجمّع الجمعة. رجال كانوا أصدقاء من سنوات صاروا ما يكلّمون بعض. سألوا حسن مباشرة — أمام الناس — مع أي عائلة هو. ما كان قرّر بعد.',
      'كلتا العائلتين بعثت شخصًا لبيت حسن في نفس الأسبوع، كل واحدة تطلب وقوفه معها. الأقوى بعثت رجلًا كبيرًا. الأضعف جاء أبوها بنفسه — كان يبدو متعبًا.',
    ],
    options: [
      {
        id: 'gen1_side_strong',
        choice: 'Side with the stronger family',
        choiceAr: 'الوقوف مع الأقوى',
        shortNarration:
          'Hassan spoke his position in the majlis and the room received it without surprise. The stronger family acknowledged him with a nod that would be remembered.',
        shortNarrationAr:
          'أعلن حسن موقفه في المجلس. الحاضرون ما استغربوا. العائلة الأقوى أقرّت بذلك بإيماءة ستبقى في الذاكرة.',
        ledgerEffect: {
          'reputation.tribal': 20,
          'reputation.social': 5,
          trauma: 5,
        },
        variance: 10,
        narrativeFlags: ['sided_with_strong'],
      },
      {
        id: 'gen1_side_weak',
        choice: 'Side with the weaker family',
        choiceAr: 'الوقوف مع الأضعف',
        shortNarration:
          "Hassan spoke in defence of the weaker family. Several men looked at their hands. Outside, one of their elders pressed Hassan's arm and said only: we will remember.",
        shortNarrationAr:
          'تكلّم حسن دفاعًا عن العائلة الأضعف. بعض الرجال نظروا لأيديهم. في الخارج، أمسك أحد كبارهم بذراع حسن وقال فقط: سنذكر.',
        ledgerEffect: {
          'reputation.tribal': -10,
          'reputation.social': 20,
          rootedness: 15,
        },
        variance: 12,
        narrativeFlags: ['sided_with_weak'],
      },
      {
        id: 'gen1_stay_silent',
        choice: 'Say nothing',
        choiceAr: 'الصمت',
        shortNarration:
          'Hassan did not attend the gathering. Afterwards, men noticed his absence in the way they notice everything.',
        shortNarrationAr:
          'ما حضر حسن التجمّع. بعدها لاحظ الرجال غيابه، كما يلاحظون كل شيء.',
        ledgerEffect: {
          'reputation.tribal': -15,
          'reputation.social': -5,
        },
        variance: 8,
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
      'الفلوس تتحرّك بشكل مختلف هذي الأيام. الجار جنى مال حقيقي من الاستثمار في حي سكني جديد قيد الإنشاء. عند حسن مدخرات. ممكن يستثمر، أو يبدأ شيء جديد، أو يبقى في حدود ما يعرفه.',
    situationVariants: [
      "The oil money changed everything fast. Hassan watched neighbours he had known as careful men take risks he would never have expected and win. He has savings sitting idle. His brother-in-law has been pushing him to move.",
      "A man from the municipality told Hassan privately: the new district north of the city will be worth three times this price in five years. Hassan has the money. He just does not know if he has the stomach for it.",
    ],
    situationVariantsAr: [
      'فلوس النفط غيّرت كل شيء بسرعة. حسن شاف جيران يعرفهم محافظين يجازفون بطرق ما توقّعها — وينجحون. عنده مدخرات قاعدة. صهره يضغط عليه يتحرّك.',
      'مسؤول في البلدية قال لحسن بالسر: الحي الجديد شمال المدينة راح يصير ثلاثة أضعاف سعره في خمس سنوات. الفلوس موجودة. بس ما يعرف إذا قادر على المجازفة.',
    ],
    options: [
      {
        id: 'gen1_invest_real_estate',
        choice: 'Invest in the new district',
        choiceAr: 'الاستثمار في الحي الجديد',
        shortNarration:
          'Hassan committed his savings to two plots in the new district. Construction began that spring, and within a year the value had climbed in a way that made him quiet at meals.',
        shortNarrationAr:
          'حطّ حسن مدخراته في قطعتين بالحي الجديد. البناء بدأ ذلك الربيع، وخلال سنة ارتفعت القيمة بطريقة خلّته صامتًا على السفرة.',
        ledgerEffect: {
          'wealth.land': 30,
          'wealth.liquid': -30,
          'wealth.business': 10,
        },
        variance: 25,
        narrativeFlags: ['invested_boom_land'],
      },
      {
        id: 'gen1_save',
        choice: 'Save conservatively. Trust what you have.',
        choiceAr: 'الادخار. الاكتفاء بما عندك.',
        shortNarration:
          'Hassan kept his savings where they were. When neighbours spoke of their gains, he listened without envy and without regret.',
        shortNarrationAr:
          'أبقى حسن مدخراته في مكانها. لما تكلّم الجيران عن مكاسبهم، سمع بدون حسد وبدون ندم.',
        ledgerEffect: {
          'wealth.liquid': 20,
          rootedness: 10,
        },
        variance: 8,
        narrativeFlags: ['conservative_during_boom'],
      },
      {
        id: 'gen1_start_business',
        choice: 'Start a small trading business',
        choiceAr: 'فتح مشروع تجاري صغير',
        shortNarration:
          'Hassan rented a small shop near the port and began moving goods on his own terms. The first months were slow. By the third year, he had two employees.',
        shortNarrationAr:
          'استأجر حسن دكانًا صغيرًا قرب الميناء وبدأ يتاجر بشروطه. الأشهر الأولى كانت بطيئة. في السنة الثالثة صار عنده موظّفان.',
        ledgerEffect: {
          'wealth.business': 25,
          'wealth.liquid': -20,
          'wealth.debt': 10,
        },
        variance: 18,
        narrativeFlags: ['started_own_business'],
      },
    ],
  },
];
