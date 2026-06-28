# Heirloom — Handoff

## What This Is

A mobile-first narrative strategy game set in Kuwait, 1958–present. The player guides a family bloodline across 4 generations, making decisions that compound forward in time. AI (Claude Sonnet) generates literary consequence narration after each choice. Game logic and decision data are fully hardcoded. AI is narration only.

---

## Current State

**Built and compiling with zero TypeScript errors.**

### What works
- Full React + Vite + TypeScript + Tailwind scaffold
- All TypeScript interfaces (`FamilyLedger`, `GameState`, `DecisionPoint`, etc.)
- All 3 starting archetypes (Merchant, Pearl Diver, Government Clerk)
- Gen 1: 5 fully authored decision points (1958–1974)
- Gen 2: 4 fully authored decision points (1978–1991)
- Gen 3 & 4: placeholder structure (premium gated in UI)
- Ledger engine: `applyEffect`, `summariseLedger`, `getLedgerProse` — all values clamped 0–100
- Decision gating: filters options by ledger requirements, always shows minimum 2
- Claude API calls proxied through a Firebase Cloud Function — API key never exposed to client
- Firebase: Firestore save/load, Auth setup, community path tracking, Cloud Functions
- All 7 pages: Home, NewGame, Chapter, Decision, Ledger, Transition, Legacy
- All 5 components: DecisionCard, NarrationBlock, GenerationHeader, FamilyTree, PremiumGate
- Full CSS: dark warm aesthetic, mobile-first, portrait-optimised, 480px max-width
- Firebase hosting + functions config, Firestore security rules and indexes, `.env.example`

### What's not wired yet
- `vite-plugin-pwa` is in `package.json` but not configured in `vite.config.ts` — PWA manifest and service worker need to be added
- Firebase project ID in `.firebaserc` is a placeholder (`heirloom-app`) — needs to match your real project
- Gen 3 and Gen 4 decisions are placeholder stubs — full decision writing pending
- Legacy page is premium-gated (`IS_PREMIUM = false` flag in `Legacy.tsx`) — no payment logic yet
- No favicon or PWA icons

---

## Setup

### 1. Install dependencies

```bash
# Frontend
npm install

# Cloud Functions
cd functions && npm install && cd ..
```

### 2. Firebase project

- Create a project at [console.firebase.google.com](https://console.firebase.google.com)
- Enable **Firestore** (production mode)
- Enable **Authentication** → Google sign-in
- Upgrade to **Blaze plan** (required for Cloud Functions + outbound HTTP)
- Update `.firebaserc` with your real project ID

### 3. Store the Anthropic API key as a Firebase Secret

The key lives server-side only — it is never in the client bundle.

```bash
firebase functions:secrets:set ANTHROPIC_API_KEY
# Paste your key when prompted
```

### 4. Environment variables (client only)

Copy `.env.example` to `.env` and fill in Firebase values only:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### 5. Deploy Firebase resources

```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
firebase deploy --only functions
```

### 6. Run locally

```bash
npm run dev
```

For local function testing, use the Firebase emulator:
```bash
firebase emulators:start --only functions
```

### 7. Deploy to production

```bash
npm run build
firebase deploy --only hosting
```

---

## File Structure

```
functions/                     Firebase Cloud Functions (Node 20, TypeScript)
  src/index.ts                 callClaude — authenticated HTTPS callable, calls Anthropic server-side
  package.json
  tsconfig.json

src/
  constants/
    ledgerTypes.ts             TypeScript interfaces for everything
    archetypes.ts              3 starting archetypes with ledger values
    narrationPrompt.ts         System prompts for narration, transition, legacy
  data/
    gen1Decisions.ts           5 decisions: 1958–1974
    gen2Decisions.ts           4 decisions: 1978–1991
    gen3Decisions.ts           Placeholder (premium)
    gen4Decisions.ts           Placeholder (premium)
    historicalEvents.ts        Gulf historical context by year
  lib/
    ledgerEngine.ts            applyEffect, summariseLedger, getLedgerProse
    decisionGating.ts          filterOptions — enforces ledger requirements
    claudeApi.ts               Calls Firebase Function (not Anthropic directly)
    firebase.ts                Firebase app init
    gameState.ts               Firestore CRUD — createGame, saveGame, loadGame, recordDecision
  pages/
    Home.tsx                   Auth check, continue game or start new
    NewGame.tsx                Family name + archetype picker → Firestore create
    Chapter.tsx                Era + situation display → routes to Decision
    Decision.tsx               Options, AI narration, ledger update, Firestore save
    Ledger.tsx                 Between-generation prose summary + family tree
    Transition.tsx             Death narration + next generation intro
    Legacy.tsx                 Premium-gated end-of-run summary
  components/
    DecisionCard.tsx
    NarrationBlock.tsx         Fade-in, loading state, fallback to shortNarration
    GenerationHeader.tsx
    FamilyTree.tsx
    PremiumGate.tsx
  styles/
    global.css                 All styles — CSS variables, dark warm aesthetic
  App.tsx                      Router
  main.tsx                     Entry point
```

---

## Key Design Decisions

**Narration fallback.** If the Claude API call fails, `Decision.tsx` shows the `shortNarration` field from the decision data. Every option has one. The game never blocks on AI.

**Immediate ledger update.** The ledger is updated and saved to Firestore the moment the player taps a choice — before AI narration returns. No progress is lost if the user closes the tab mid-narration.

**Ledger numbers never shown.** `summariseLedger()` translates numeric values into natural language prose before passing anything to the AI or showing it in the UI.

**Decision gating minimum.** `filterOptions()` always returns at least 2 options even if ledger requirements would reduce it further. The next-best unavailable option is added back.

**Community paths.** Every decision records the chosen option to `communityPaths/{decisionId}/{optionId}` as an increment. Non-critical — failures are silently swallowed.

**API key security.** The Anthropic key is stored as a Firebase Secret and accessed only inside the `callClaude` Cloud Function. The client never sees it — `claudeApi.ts` calls the function via `httpsCallable`, which requires the user to be authenticated. An unauthenticated caller gets `unauthenticated` error back, not a key.

---

## Next Steps (priority order)

1. **Firebase Blaze plan** — upgrade the project (required for Functions + outbound HTTP)
2. **Store the Anthropic key**: `firebase functions:secrets:set ANTHROPIC_API_KEY`
3. **Add `.env` values** (Firebase client config only) and verify the app runs locally
4. **Deploy the function**: `cd functions && npm install && firebase deploy --only functions`
5. **Enable Firebase Google Auth** in the Firebase console
6. **Write Gen 3 decisions** — `src/data/gen3Decisions.ts` (placeholder structure is there)
7. **Write Gen 4 decisions** — `src/data/gen4Decisions.ts`
8. **PWA config** — add `vite-plugin-pwa` to `vite.config.ts`, create manifest and icons
9. **Payment integration** — flip `IS_PREMIUM` flag in `Legacy.tsx`, wire Stripe or similar
10. **Custom domain** — set up in Firebase Hosting console
11. **Favicon + PWA icons** — add to `/public`
