'use server';
/**
 * @fileOverview Fetches and returns a random famous quote.
 *
 * - getRandomQuote - A function that retrieves a random quote.
 * - RandomQuoteOutput - The return type for the getRandomQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RandomQuoteOutputSchema = z.object({
  quote: z.string().describe('The famous quote.'),
  author: z.string().describe('The author of the quote.'),
});
export type RandomQuoteOutput = z.infer<typeof RandomQuoteOutputSchema>;

export async function getRandomQuote(): Promise<RandomQuoteOutput> {
  return getRandomQuoteFlow();
}

const prompt = ai.definePrompt({
  name: 'famousQuotePrompt',
  output: {schema: RandomQuoteOutputSchema},
  prompt: `You are a quote generator. Generate a random famous quote and the author of the quote.

  Format the output as JSON with the fields 'quote' and 'author'.`,
});

const getRandomQuoteFlow = ai.defineFlow({
  name: 'getRandomQuoteFlow',
  outputSchema: RandomQuoteOutputSchema,
}, async () => {
  const {output} = await prompt({});
  return output!;
});
