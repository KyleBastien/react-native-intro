import { GROQ_API_KEY } from '@env';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: GROQ_API_KEY, dangerouslyAllowBrowser: true });

export async function generateTodos(prompt: string): Promise<string[]> {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant that generates actionable to-do items. ' +
          'Given a user\'s goal or task, respond with a JSON array of short, ' +
          'actionable to-do item strings. Return ONLY the JSON array, no other text. ' +
          'Example: ["Review chapter 1 notes","Practice problem set 1","Create flashcards"]',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 1024,
  });

  const content = chatCompletion.choices[0]?.message?.content ?? '[]';

  // Extract JSON array from the response
  const match = content.match(/\[[\s\S]*\]/);
  if (!match) {
    throw new Error('Failed to parse AI response');
  }

  const parsed: unknown = JSON.parse(match[0]);
  if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === 'string')) {
    throw new Error('AI response was not an array of strings');
  }

  return parsed as string[];
}
