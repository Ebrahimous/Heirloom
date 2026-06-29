import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import Anthropic from '@anthropic-ai/sdk';

const anthropicKey = defineSecret('ANTHROPIC_API_KEY');

const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 400;

type CallType = 'narration' | 'transition' | 'legacy';

interface ClaudeRequest {
  type: CallType;
  systemPrompt: string;
  userMessage: string;
}

interface ClaudeResponse {
  text: string;
}

export const callClaude = onCall<ClaudeRequest, Promise<ClaudeResponse>>(
  {
    secrets: [anthropicKey],
    enforceAppCheck: false,
    cors: true,
  },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'You must be signed in to play.');
    }

    const { type, systemPrompt, userMessage } = request.data;

    if (!type || !systemPrompt || !userMessage) {
      throw new HttpsError('invalid-argument', 'Missing required fields.');
    }

    const validTypes: CallType[] = ['narration', 'transition', 'legacy'];
    if (!validTypes.includes(type)) {
      throw new HttpsError('invalid-argument', 'Invalid call type.');
    }

    const client = new Anthropic({ apiKey: anthropicKey.value() });

    try {
      const message = await client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      });

      const text = message.content[0]?.type === 'text' ? message.content[0].text.trim() : '';
      if (!text) throw new Error('Empty response from Claude');

      return { text };
    } catch (err) {
      console.error('Claude API error:', err);
      throw new HttpsError('internal', 'Narration generation failed.');
    }
  }
);
