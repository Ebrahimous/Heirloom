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

export interface NarrationRequest {
  situation: string;
  choiceText: string;
  ledgerSummary: string;
  narrativeFlags: string[];
  familyName: string;
  characterName: string;
  decisionHistory: { situation: string; choice: string }[];
}

export async function generateNarration(req: NarrationRequest): Promise<string> {
  const flagsText = req.narrativeFlags.length > 0
    ? `أحداث سابقة: ${req.narrativeFlags.join('، ')}.`
    : '';

  const historyText = req.decisionHistory.length > 0
    ? `قرارات سابقة:\n${req.decisionHistory.map((h) => `- ${h.situation} ← ${h.choice}`).join('\n')}`
    : '';

  const userMessage =
`اسم العائلة: ${req.familyName}
اسم الشخصية: ${req.characterName}

الموقف: ${req.situation}

القرار المتّخذ: ${req.choiceText}

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
