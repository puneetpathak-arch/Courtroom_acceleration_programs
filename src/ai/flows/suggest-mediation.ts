// src/ai/flows/suggest-mediation.ts
'use server';
/**
 * @fileOverview A flow that suggests mediation for a given case based on its complexity and other factors.
 *
 * - suggestMediation - A function that initiates the mediation suggestion process.
 * - SuggestMediationInput - The input type for the suggestMediation function.
 * - SuggestMediationOutput - The return type for the suggestMediation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMediationInputSchema = z.object({
  caseId: z.string().describe('The ID of the case to suggest mediation for.'),
  title: z.string().describe('The title of the case.'),
  complexity: z
    .enum(['low', 'medium', 'high'])
    .describe('The complexity of the case.'),
  tags: z.array(z.string()).describe('Tags associated with the case.'),
  hasUrgentRelief: z
    .boolean()
    .describe(
      'Whether the case requires urgent relief (e.g., restraining order).' /* e.g., restraining order */
    ),
});
export type SuggestMediationInput = z.infer<typeof SuggestMediationInputSchema>;

const SuggestMediationOutputSchema = z.object({
  shouldSuggestMediation: z
    .boolean()
    .describe(
      'Whether mediation should be suggested for the case based on its characteristics.'
    ),
  reason: z
    .string()
    .describe(
      'The reason for suggesting or not suggesting mediation for the case.'
    ),
});
export type SuggestMediationOutput = z.infer<typeof SuggestMediationOutputSchema>;

export async function suggestMediation(
  input: SuggestMediationInput
): Promise<SuggestMediationOutput> {
  return suggestMediationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMediationPrompt',
  input: {schema: SuggestMediationInputSchema},
  output: {schema: SuggestMediationOutputSchema},
  prompt: `You are an AI assistant that determines whether mediation should be suggested for a given case.

  Consider the following factors:
  - Case complexity: Cases with low to medium complexity are generally suitable for mediation.
  - Urgent relief: Cases requiring urgent relief (e.g., restraining orders) are typically not suitable for mediation.
  - Case tags: Cases tagged with specific issues (e.g., family law, contract dispute) may be more or less suitable for mediation.

  Given the following case details, determine whether mediation should be suggested:

  Case ID: {{{caseId}}}
  Title: {{{title}}}
  Complexity: {{{complexity}}}
  Tags: {{#each tags}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Requires Urgent Relief: {{{hasUrgentRelief}}}

  Respond with a JSON object indicating whether mediation should be suggested (shouldSuggestMediation) and the reason for your recommendation (reason).
  {
    "shouldSuggestMediation": true|false,
    "reason": "Explanation of why mediation is/isn't suitable"
  }`,
});

const suggestMediationFlow = ai.defineFlow(
  {
    name: 'suggestMediationFlow',
    inputSchema: SuggestMediationInputSchema,
    outputSchema: SuggestMediationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
