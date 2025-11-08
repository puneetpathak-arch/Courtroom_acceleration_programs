'use server';

/**
 * @fileOverview Automatically tags new cases with relevant keywords and categories using NLP.
 *
 * - automateCaseTagging - A function that initiates the case tagging process.
 * - AutomateCaseTaggingInput - The input type for the automateCaseTagging function.
 * - AutomateCaseTaggingOutput - The return type for the automateCaseTagging function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomateCaseTaggingInputSchema = z.object({
  caseId: z.string().describe('The ID of the case to tag.'),
  caseTitle: z.string().describe('The title of the case.'),
  caseDescription: z.string().describe('The description of the case.'),
});
export type AutomateCaseTaggingInput = z.infer<typeof AutomateCaseTaggingInputSchema>;

const AutomateCaseTaggingOutputSchema = z.object({
  issues: z.array(z.string()).describe('List of legal issues identified in the case.'),
  tags: z.array(z.string()).describe('List of tags or keywords associated with the case.'),
  complexity: z.enum(['low', 'medium', 'high']).describe('The complexity level of the case.'),
  estimatedTrialDays: z.number().describe('Estimated number of trial days required for the case.'),
  extractedDates: z.array(z.string()).describe('List of important dates extracted from the case description.'),
});
export type AutomateCaseTaggingOutput = z.infer<typeof AutomateCaseTaggingOutputSchema>;

export async function automateCaseTagging(input: AutomateCaseTaggingInput): Promise<AutomateCaseTaggingOutput> {
  return automateCaseTaggingFlow(input);
}

const automateCaseTaggingPrompt = ai.definePrompt({
  name: 'automateCaseTaggingPrompt',
  input: {schema: AutomateCaseTaggingInputSchema},
  output: {schema: AutomateCaseTaggingOutputSchema},
  prompt: `You are an AI assistant that automatically tags new cases with relevant keywords and categories.

  Analyze the case information provided below and extract the following information:

  - Identify the legal issues involved in the case.
  - Generate relevant tags or keywords for the case.
  - Determine the complexity level of the case (low, medium, or high).
  - Estimate the number of trial days required for the case.
  - Extract any important dates from the case description.

  Case Title: {{{caseTitle}}}
  Case Description: {{{caseDescription}}}

  Return the output in JSON format.
  `,
});

const automateCaseTaggingFlow = ai.defineFlow(
  {
    name: 'automateCaseTaggingFlow',
    inputSchema: AutomateCaseTaggingInputSchema,
    outputSchema: AutomateCaseTaggingOutputSchema,
  },
  async input => {
    const {output} = await automateCaseTaggingPrompt(input);
    return output!;
  }
);
