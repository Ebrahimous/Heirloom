import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './firebase';
import { NARRATION_SYSTEM_PROMPT, LEGACY_SYSTEM_PROMPT, TRANSITION_SYSTEM_PROMPT } from '../constants/narrationPrompt';

const functions = getFunctions(app);

interface ClaudeCallPayload {
  type: 'narration' | 'transition' | 'legacy';
  systemPrompt: string;
  userMessage: string;
}

interface ClaudeCallResult {
  text: string;
}

async function callClaude(
  type: ClaudeCallPayload['type'],
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  const fn = httpsCallable<ClaudeCallPayload, ClaudeCallResult>(functions, 'callClaude');
  const result = await fn({ type, systemPrompt, userMessage });
  return result.data.text;
}

// Hardcoded names in decision data that should be swapped for player-chosen names
const HARDCODED_NAME_MAP: [string, string][] = [
  ['Hassan', 'gen1'],
  ['حسن', 'gen1'],
  ['Yousef', 'gen2'],
  ['يوسف', 'gen2'],
];

function replaceHardcodedNames(text: string, names: { gen1: string; gen2: string }): string {
  let result = text;
  for (const [hardcoded, key] of HARDCODED_NAME_MAP) {
    const replacement = names[key as keyof typeof names];
    if (replacement) result = result.split(hardcoded).join(replacement);
  }
  return result;
}

export interface NarrationRequest {
  situation: string;
  choiceText: string;
  ledgerSummary: string;
  narrativeFlags: string[];
  familyName: string;
  characterName: string;
  characterNames: { gen1: string; gen2: string };
  decisionHistory: { situation: string; choice: string }[];
}

export async function generateNarration(req: NarrationRequest): Promise<string> {
  const situation = replaceHardcodedNames(req.situation, req.characterNames);
  const choiceText = replaceHardcodedNames(req.choiceText, req.characterNames);

  const flagsText = req.narrativeFlags.length > 0
    ? `أحداث سابقة: ${req.narrativeFlags.join('، ')}.`
    : '';

  const historyText = req.decisionHistory.length > 0
    ? `قرارات سابقة:\n${req.decisionHistory.map((h) => `- ${replaceHardcodedNames(h.situation, req.characterNames)} ← ${replaceHardcodedNames(h.choice, req.characterNames)}`).join('\n')}`
    : '';

  const userMessage =
`اسم العائلة: ${req.familyName}
اسم الشخصية الرئيسية: ${req.characterName} — استخدم هذا الاسم فقط. الشخصيات الأخرى تُذكر بصلتهم (الأخ، العمّ، الجار...) بلا أسماء.

الموقف: ${situation}

القرار المتّخذ: ${choiceText}

وضع الأسرة الحالي: ${req.ledgerSummary}

${flagsText}
${historyText}

اكتب نص العواقب.`;

  return callClaude('narration', NARRATION_SYSTEM_PROMPT, userMessage);
}

export interface LegacyRequest {
  familyName: string;
  ledgerSummary: string;
  narrativeFlags: string[];
  decisionHistory: { situation: string; choice: string; generation: number }[];
}

export async function generateLegacy(req: LegacyRequest): Promise<string> {
  const userMessage =
`اسم العائلة: ${req.familyName}

ما أصبحت عليه الأسرة: ${req.ledgerSummary}

أحداث مفصلية عبر الأجيال:
${req.decisionHistory.map((h) => `- الجيل ${h.generation}: ${h.situation} ← ${h.choice}`).join('\n')}

اكتب ملخّص الإرث.`;

  return callClaude('legacy', LEGACY_SYSTEM_PROMPT, userMessage);
}

export interface TransitionRequest {
  familyName: string;
  deceasedName: string;
  generation: number;
  ledgerSummary: string;
}

export async function generateTransition(req: TransitionRequest): Promise<string> {
  const userMessage =
`اسم العائلة: ${req.familyName}
المتوفّى: ${req.deceasedName} (الجيل ${req.generation})
ما يتركه: ${req.ledgerSummary}

اكتب نص الوفاة والانتقال.`;

  return callClaude('transition', TRANSITION_SYSTEM_PROMPT, userMessage);
}
