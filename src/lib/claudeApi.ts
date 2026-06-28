import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './firebase';
import { NARRATION_SYSTEM_PROMPT, LEGACY_SYSTEM_PROMPT, TRANSITION_SYSTEM_PROMPT } from '../constants/narrationPrompt';
import type { Lang } from '../i18n/strings';

const functions = getFunctions(app);

interface ClaudeCallPayload {
  type: 'narration' | 'transition' | 'legacy';
  systemPrompt: string;
  userMessage: string;
  language: Lang;
}

interface ClaudeCallResult {
  text: string;
}

async function callClaude(
  type: ClaudeCallPayload['type'],
  systemPrompt: string,
  userMessage: string,
  language: Lang
): Promise<string> {
  const fn = httpsCallable<ClaudeCallPayload, ClaudeCallResult>(functions, 'callClaude');
  const result = await fn({ type, systemPrompt, userMessage, language });
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
  language: Lang;
}

export async function generateNarration(req: NarrationRequest): Promise<string> {
  const flagsText = req.narrativeFlags.length > 0
    ? (req.language === 'ar'
        ? `أحداث سابقة: ${req.narrativeFlags.join('، ')}.`
        : `Key prior events: ${req.narrativeFlags.join(', ')}.`)
    : '';

  const historyText = req.decisionHistory.length > 0
    ? (req.language === 'ar'
        ? `قرارات سابقة:\n${req.decisionHistory.map((h) => `- ${h.situation} ← ${h.choice}`).join('\n')}`
        : `Prior decisions:\n${req.decisionHistory.map((h) => `- ${h.situation} → ${h.choice}`).join('\n')}`)
    : '';

  const userMessage = req.language === 'ar'
    ? `اسم العائلة: ${req.familyName}
اسم الشخصية: ${req.characterName}

الموقف: ${req.situation}

القرار المتّخذ: ${req.choiceText}

وضع الأسرة الحالي: ${req.ledgerSummary}

${flagsText}
${historyText}

اكتب نص العواقب.`
    : `Family name: ${req.familyName}
Character name: ${req.characterName}

Situation: ${req.situation}

Choice made: ${req.choiceText}

Family's current standing: ${req.ledgerSummary}

${flagsText}
${historyText}

Write the consequence narration.`;

  return callClaude('narration', NARRATION_SYSTEM_PROMPT, userMessage, req.language);
}

export interface LegacyRequest {
  familyName: string;
  ledgerSummary: string;
  narrativeFlags: string[];
  decisionHistory: { situation: string; choice: string; generation: number }[];
  language: Lang;
}

export async function generateLegacy(req: LegacyRequest): Promise<string> {
  const userMessage = req.language === 'ar'
    ? `اسم العائلة: ${req.familyName}

ما أصبحت عليه الأسرة: ${req.ledgerSummary}

أحداث مفصلية عبر الأجيال:
${req.decisionHistory.map((h) => `- الجيل ${h.generation}: ${h.situation} ← ${h.choice}`).join('\n')}

اكتب ملخّص الإرث.`
    : `Family name: ${req.familyName}

What the family became: ${req.ledgerSummary}

Key events across generations:
${req.decisionHistory.map((h) => `- Generation ${h.generation}: ${h.situation} → ${h.choice}`).join('\n')}

Write the legacy summary.`;

  return callClaude('legacy', LEGACY_SYSTEM_PROMPT, userMessage, req.language);
}

export interface TransitionRequest {
  familyName: string;
  deceasedName: string;
  generation: number;
  ledgerSummary: string;
  language: Lang;
}

export async function generateTransition(req: TransitionRequest): Promise<string> {
  const userMessage = req.language === 'ar'
    ? `اسم العائلة: ${req.familyName}
المتوفّى: ${req.deceasedName} (الجيل ${req.generation})
ما يتركه: ${req.ledgerSummary}

اكتب نص الوفاة والانتقال.`
    : `Family name: ${req.familyName}
Deceased: ${req.deceasedName} (Generation ${req.generation})
What they leave behind: ${req.ledgerSummary}

Write the death and transition narration.`;

  return callClaude('transition', TRANSITION_SYSTEM_PROMPT, userMessage, req.language);
}
