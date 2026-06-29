# الموروث (Heirloom) — Handoff

## What This Is

A mobile-first narrative strategy game set in Kuwait, 1958–present. The player guides a family bloodline across 4 generations, making decisions that compound forward in time. AI (Claude Sonnet) generates literary consequence narration after each choice. Game logic and decision data are fully hardcoded. AI is narration only.

---

## Current State

**Fully deployed and live at [heirloom-48ead.web.app](https://heirloom-48ead.web.app)**

### What works
- Full React + Vite + TypeScript + Tailwind scaffold
- Firebase project: `heirloom-48ead` (Blaze plan, active)
- Firebase Auth: Google sign-in + Anonymous (guest play)
- Firebase Firestore: game state saved after every decision
- Firebase Cloud Functions: `callClaude` — proxies all Anthropic API calls server-side
- Anthropic API key stored as Firebase Secret — never in client bundle
- Full bilingual support: Arabic (default, RTL) and English toggle
- All UI text right-aligned in Arabic, left-aligned in English
- Arabic ledger prose (`getLedgerProse`, `getInheritanceProse`) — no English text shown to Arabic users
- Player-input character names (grandfather + son) collected at game start
- All 3 starting archetypes (Merchant, Pearl Diver, Government Clerk)
- Gen 1: 5 fully authored decision points with Arabic translations (1958–1974)
- Gen 2: 4 fully authored decision points with Arabic translations (1978–1991)
- Gen 3 & 4: placeholder structure (premium gated in UI)
- Ledger engine: `applyEffect`, `summariseLedger`, `getLedgerProse`, `getInheritanceProse`
- Decision gating: filters options by ledger requirements, always shows minimum 2
- All 7 pages: Home, NewGame, Chapter, Decision, Ledger, Transition, Legacy
- All 5 components: DecisionCard, NarrationBlock, GenerationHeader, FamilyTree, PremiumGate
- GitHub Actions CI/CD: push to `main` → auto build + deploy to Firebase


### What's not done yet
- Gen 3 and Gen 4 decisions need full authoring (placeholder stubs exist)
- Legacy page is premium-gated (`IS_PREMIUM = false` in `Legacy.tsx`) — no payment logic
- `vite-plugin-pwa` in `package.json` but not configured — PWA manifest pending
- No favicon or PWA icons
- Custom domain not set up

---

## GitHub & Deployment

**Repo:** https://github.com/Ebrahimous/Heirloom

**Auto-deploy:** Push to `main` → GitHub Actions builds frontend + functions → Firebase deploys.

**GitHub secret required:** `FIREBASE_TOKEN` — obtained via `firebase login:ci`

**Autonomous push workflow (for Claude):**
```bash
PAT=$(grep '^PAT=' /path/to/secret.txt | sed 's/^PAT=//' | tr -d '\r')
NAME=$(grep '^NAME=' /path/to/secret.txt | sed 's/^NAME=//' | tr -d '\r')
EMAIL=$(grep '^EMAIL=' /path/to/secret.txt | sed 's/^EMAIL=//' | tr -d '\r')

cd /tmp && rm -rf heirloom_push
git clone "https://${PAT}@github.com/Ebrahimous/Heirloom.git" heirloom_push
cd heirloom_push
git config user.name "$NAME"
git config user.email "$EMAIL"

rsync -av \
  --exclude='node_modules' --exclude='dist' --exclude='secret.txt' \
  --exclude='.env' --exclude='functions/lib/' --exclude='.firebase/' --exclude='.git' \
  /path/to/Heirloom/ .

git add -A
git commit -m "your message"
git push origin main
```

**PAT file:** `C:\Users\EB\Claude\Projects\Heirloom\secret.txt` — gitignored, never pushed.

---

## Firebase Setup (already done)

- Project ID: `heirloom-48ead`
- Firestore: production mode, active
- Auth: Google + Anonymous enabled
- Blaze plan: active
- Anthropic key stored as Firebase Secret: `firebase functions:secrets:set ANTHROPIC_API_KEY`
- Firebase config values embedded as fallbacks in `src/lib/firebase.ts` (client config is public by design)

---

## File Structure

```
.github/workflows/deploy.yml   GitHub Actions — build + firebase deploy on push to main
functions/                     Firebase Cloud Functions (Node 20, TypeScript)
  src/index.ts                 callClaude — authenticated HTTPS callable, calls Anthropic server-side
  package.json
  tsconfig.json

src/
  constants/
    ledgerTypes.ts             TypeScript interfaces — FamilyLedger, GameState, DecisionPoint, CharacterNames
    archetypes.ts              3 starting archetypes with ledger values
    narrationPrompt.ts         System prompts for narration, transition, legacy
  data/
    gen1Decisions.ts           5 decisions: 1958–1974 (Arabic + English)
    gen2Decisions.ts           4 decisions: 1978–1991 (Arabic + English)
    gen3Decisions.ts           Placeholder (premium)
    gen4Decisions.ts           Placeholder (premium)
    historicalEvents.ts        Gulf historical context by year
  i18n/
    strings.ts                 All UI strings in Arabic and English
  contexts/
    LanguageContext.tsx        Lang toggle (ar/en), default Arabic, persists to localStorage, sets dir/lang
  lib/
    ledgerEngine.ts            applyEffect, summariseLedger (EN, for AI), getLedgerProse, getInheritanceProse (bilingual)
    decisionGating.ts          filterOptions — enforces ledger requirements, min 2 always shown
    claudeApi.ts               Calls Firebase Function (not Anthropic directly), passes language param
    firebase.ts                Firebase app init with fallback config values
    gameState.ts               Firestore CRUD — createGame, saveGame, loadGame, recordDecision, advanceGeneration
  pages/
    Home.tsx                   Auth check (Google or guest), continue or start new
    NewGame.tsx                Family name + character names + archetype picker → Firestore create
    Chapter.tsx                Era + situation display → routes to Decision
    Decision.tsx               Options, AI narration (bilingual), ledger update, Firestore save
    Ledger.tsx                 Between-generation prose summary (bilingual) + family tree
    Transition.tsx             Death narration + inheritance prose (bilingual) + next gen intro
    Legacy.tsx                 Premium-gated end-of-run summary
  components/
    DecisionCard.tsx
    NarrationBlock.tsx         Fade-in, loading state, fallback to shortNarration/shortNarrationAr
    GenerationHeader.tsx       Shows era + character name + family name
    FamilyTree.tsx             Shows all 4 generations, active/past/future states
    PremiumGate.tsx            Locked UI for Gen 3/4 and Legacy
  styles/
    global.css                 All styles — CSS variables, dark warm aesthetic, RTL overrides
  App.tsx                      Router + LanguageToggle (fixed, inset-inline-end)
  main.tsx                     Entry point
```

---

## Key Design Decisions

**Narration fallback.** If the Claude API call fails, `Decision.tsx` shows `shortNarrationAr` (Arabic) or `shortNarration` (English) from the decision data. The game never blocks on AI.

**Immediate ledger update.** Ledger is updated and saved to Firestore the moment the player taps a choice — before AI narration returns. No progress lost on browser close.

**Ledger numbers never shown.** `summariseLedger()` (always English) is passed to the AI as context. `getLedgerProse()` and `getInheritanceProse()` (bilingual) are shown in the UI.

**Language in AI calls.** The `callClaude` function appends an Arabic instruction suffix to the system prompt when `language === 'ar'`, forcing literary MSA output from the model.

**Decision gating minimum.** `filterOptions()` always returns at least 2 options. The next-best unavailable option is added back if gating reduces below 2.

**Guest play.** Anonymous Firebase Auth — games save to Firestore with the anonymous UID. Guest users can sign in with Google later (account merge not implemented).

**API key security.** Anthropic key is a Firebase Secret accessed only inside `callClaude`. The client calls `httpsCallable` — unauthenticated callers get an error, not the key.

---

## Next Steps (priority order)

1. **Write Gen 3 decisions** — `src/data/gen3Decisions.ts` (stub structure exists, needs full authoring with soft Arabic + variants + variance)
2. **Write Gen 4 decisions** — `src/data/gen4Decisions.ts` (same)
3. **Add Gen 3/4 bonus events** — `src/data/bonusEvents.ts` currently only has gen 1 and gen 2 events
4. **PWA config** — add `vite-plugin-pwa` to `vite.config.ts`, create manifest, add icons to `/public`
5. **Payment integration** — flip `IS_PREMIUM` in `Legacy.tsx`, wire Stripe or similar
6. **Custom domain** — set up in Firebase Hosting console
7. **Favicon + PWA icons** — add to `/public`
8. **Home page redesign** — current layout is functional but not final
