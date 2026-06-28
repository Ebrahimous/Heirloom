"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callClaude = void 0;
const https_1 = require("firebase-functions/v2/https");
const params_1 = require("firebase-functions/params");
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const anthropicKey = (0, params_1.defineSecret)('ANTHROPIC_API_KEY');
const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 400;
const ARABIC_SUFFIX = `

IMPORTANT: Write your response entirely in Arabic. Use literary Modern Standard Arabic (الفصحى). Maintain the same restrained, specific literary style — simply in Arabic.`;
exports.callClaude = (0, https_1.onCall)({
    secrets: [anthropicKey],
    enforceAppCheck: false,
    cors: true,
}, async (request) => {
    if (!request.auth) {
        throw new https_1.HttpsError('unauthenticated', 'You must be signed in to play.');
    }
    const { type, systemPrompt, userMessage, language } = request.data;
    if (!type || !systemPrompt || !userMessage) {
        throw new https_1.HttpsError('invalid-argument', 'Missing required fields.');
    }
    const validTypes = ['narration', 'transition', 'legacy'];
    if (!validTypes.includes(type)) {
        throw new https_1.HttpsError('invalid-argument', 'Invalid call type.');
    }
    const finalSystemPrompt = language === 'ar'
        ? systemPrompt + ARABIC_SUFFIX
        : systemPrompt;
    const client = new sdk_1.default({ apiKey: anthropicKey.value() });
    try {
        const message = await client.messages.create({
            model: MODEL,
            max_tokens: MAX_TOKENS,
            system: finalSystemPrompt,
            messages: [{ role: 'user', content: userMessage }],
        });
        const text = message.content[0]?.type === 'text' ? message.content[0].text.trim() : '';
        if (!text)
            throw new E