export type Lang = 'ar' | 'en';

export const strings = {
  ar: {
    // App
    appNameAr: 'الورث',
    appNameEn: 'Heirloom',
    tagline: 'أربعة أجيال. عائلة واحدة. كل اختيار يرث ما قبله.',
    footerEra: 'الكويت، ١٩٥٨ — الحاضر',

    // Auth / Home
    signInGoogle: 'تسجيل الدخول بـ Google',
    playAsGuest: 'العب كضيف',
    signingIn: '...جارٍ التسجيل',
    continueStory: 'أكمل قصة آل',
    beginNewFamily: 'ابدأ عائلة جديدة',

    // New Game
    newFamilyTitle: 'عائلة جديدة',
    newFamilySub: 'تبدأ القصة في الكويت عام ١٩٥٨.',
    familyNameLabel: 'اسم العائلة',
    familyNamePlaceholder: 'مثال: الحاجري',
    gen1NameLabel: 'اسم الجدّ',
    gen1NamePlaceholder: 'مثال: حسن',
    gen2NameLabel: 'اسم الابن (الجيل الثاني)',
    gen2NamePlaceholder: 'مثال: يوسف',
    archetypeLabel: 'كان جدّك',
    beginBtn: 'ابدأ',
    beginning: '...جارٍ البدء',
    back: '→ رجوع',

    // Archetypes
    merchantLabel: 'التاجر',
    merchantDesc: 'كان جدّك يتاجر في البضائع على امتداد سواحل الخليج. مرتاح الحال، واسع العلاقات، براغماتي.',
    diverLabel: 'غوّاص اللؤلؤ',
    diverDesc: 'عاش جدّك على البحر. شحيح الأرض لكنه محلّ احترام عميق في المجتمع.',
    clerkLabel: 'موظف الحكومة',
    clerkDesc: 'خدم جدّك في البلدية منذ نشأتها. متعلّم، قنوع، يتطلّع إلى الأمام.',

    // Chapter / Decision
    continueBtn: 'متابعة',
    historicalNote: 'سياق تاريخي',

    // Generation labels
    gen1Label: 'الجيل الأول',
    gen2Label: 'الجيل الثاني',
    gen3Label: 'الجيل الثالث',
    gen4Label: 'الجيل الرابع',

    // Ledger
    endOfGen: 'نهاية الجيل',

    // Transition
    generationPasses: 'رحل جيل',
    whatPasses: 'ما يورثه',
    nextLabel: 'التالي',
    beginChapter: 'ابدأ فصل',

    // Legacy
    legacyLabel: 'الإرث',
    legacySpan: '١٩٥٨ — الحاضر',
    playAgain: 'العب مجددًا',

    // Premium
    premiumTitle: 'الجيل',
    premiumText: 'تتواصل القصة — لكن هذا الفصل جزء من تجربة الورث الكاملة. افتح الأجيال الأربعة لترى ما ستصبح عليه العائلة.',
    premiumBtn: 'افتح القصة كاملة',
    comingSoon: 'قريبًا',

    // The story continues
    storyContinues: 'القصة تتواصل',

    // Guest notice
    guestNotice: 'تلعب كضيف — تقدّمك محفوظ على هذا الجهاز فقط',
  },

  en: {
    appNameAr: 'الورث',
    appNameEn: 'Heirloom',
    tagline: 'Four generations. One family. Every choice inherits the last.',
    footerEra: 'Kuwait, 1958 — Present',

    signInGoogle: 'Sign in with Google',
    playAsGuest: 'Play as Guest',
    signingIn: 'Signing in…',
    continueStory: 'Continue the',
    beginNewFamily: 'Begin a New Family',

    newFamilyTitle: 'A New Family',
    newFamilySub: 'Begin in Kuwait, 1958.',
    familyNameLabel: 'Family Name',
    familyNamePlaceholder: 'e.g. Al-Hajery',
    gen1NameLabel: 'Grandfather\'s Name',
    gen1NamePlaceholder: 'e.g. Hassan',
    gen2NameLabel: 'Son\'s Name (2nd Generation)',
    gen2NamePlaceholder: 'e.g. Yousef',
    archetypeLabel: 'Your Grandfather Was',
    beginBtn: 'Begin',
    beginning: 'Beginning…',
    back: '← Back',

    merchantLabel: 'Merchant',
    merchantDesc: 'Your grandfather traded goods along the Gulf coast. Comfortable, connected, pragmatic.',
    diverLabel: 'Pearl Diver',
    diverDesc: 'Your grandfather worked the sea. Land-poor but deeply respected in the community.',
    clerkLabel: 'Government Clerk',
    clerkDesc: 'Your grandfather worked for the early municipality. Educated, modest, and forward-looking.',

    continueBtn: 'Continue',
    historicalNote: 'Historical context',

    gen1Label: 'First Generation',
    gen2Label: 'Second Generation',
    gen3Label: 'Third Generation',
    gen4Label: 'Fourth Generation',

    endOfGen: 'End of Generation',

    generationPasses: 'A Generation Passes',
    whatPasses: 'What Passes',
    nextLabel: 'Next',
    beginChapter: 'Begin',

    legacyLabel: 'Legacy',
    legacySpan: '1958 — Present',
    playAgain: 'Play Again',

    premiumTitle: 'Generation',
    premiumText: 'The story continues — but this chapter is part of the full Heirloom experience. Unlock all four generations to see what the family becomes.',
    premiumBtn: 'Unlock Full Story',
    comingSoon: 'Coming soon',

    storyContinues: 'The story continues',

    guestNotice: 'Playing as guest — progress saved on this device only',
  },
} as const;

export type StringKey = keyof typeof strings.en;
