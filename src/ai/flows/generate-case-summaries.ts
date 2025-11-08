'use server';
/**
 * @fileOverview An AI agent that generates summaries of legal cases.
 *
 * - generateCaseSummary - A function that generates a summary for a given case.
 * - GenerateCaseSummaryInput - The input type for the generateCaseSummary function.
 * - GenerateCaseSummaryOutput - The return type for the generateCaseSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCaseSummaryInputSchema = z.object({
  caseId: z.string().describe('The ID of the case to summarize.'),
  filings: z.array(z.string()).describe('Array of URLs for the case filings (documents).'),
});
export type GenerateCaseSummaryInput = z.infer<typeof GenerateCaseSummaryInputSchema>;

const GenerateCaseSummaryOutputSchema = z.object({
  summaryText: z.string().describe('A summary of the legal case.'),
  issues: z.array(z.string()).describe('List of key issues in the case.'),
  citations: z.array(z.string()).describe('List of suggested legal citations.'),
  generatedBy: z.string().describe('The ID of the user who generated the summary.'),
  generatedAt: z.date().describe('The timestamp when the summary was generated.'),
});
export type GenerateCaseSummaryOutput = z.infer<typeof GenerateCaseSummaryOutputSchema>;

export async function generateCaseSummary(input: GenerateCaseSummaryInput): Promise<GenerateCaseSummaryOutput> {
  return generateCaseSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCaseSummaryPrompt',
  input: {schema: GenerateCaseSummaryInputSchema},
  output: {schema: GenerateCaseSummaryOutputSchema},
  prompt: `You are an expert legal assistant tasked with summarizing legal cases for lawyers.

  Given the following case filings, create a concise summary of the case, identify the key legal issues,
  and suggest relevant legal citations.

  Case ID: {{{caseId}}}
  Filings: {{#each filings}}{{{this}}}\n{{/each}}
  \n
  Summary:
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const generateCaseSummaryFlow = ai.defineFlow(
  {
    name: 'generateCaseSummaryFlow',
    inputSchema: GenerateCaseSummaryInputSchema,
    outputSchema: GenerateCaseSummaryOutputSchema,
  },
  async input => {
    // In a real application, fetch the actual document contents from storage.
    // For this example, we pass in URLs, and assume the LLM can access them.  A real
    // implementation would need to fetch the content.
    const generatedBy = 'system'; // Replace with actual user ID when available
    const generatedAt = new Date();

    const {output} = await prompt({...input, generatedBy, generatedAt});
    return output!;
  }
);
