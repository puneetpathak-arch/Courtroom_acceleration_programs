// This file implements the Genkit flow for the CitizenAssistanceChatbot story.
// It provides a chatbot interface for citizens to file cases, check their status, and find legal aid resources.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the chatbot
const CitizenAssistanceChatbotInputSchema = z.object({
  message: z.string().describe('The message from the citizen.'),
  userId: z.string().optional().describe('The ID of the user sending the message.'),
});

export type CitizenAssistanceChatbotInput = z.infer<typeof CitizenAssistanceChatbotInputSchema>;

// Define the output schema for the chatbot
const CitizenAssistanceChatbotOutputSchema = z.object({
  response: z.string().describe('The response from the chatbot.'),
  intent: z.string().optional().describe('The detected intent of the user message.'),
  prefilledForm: z.record(z.any()).optional().describe('Prefilled form data based on the user message.'),
});

export type CitizenAssistanceChatbotOutput = z.infer<typeof CitizenAssistanceChatbotOutputSchema>;

// Exported function to interact with the chatbot
export async function citizenAssistanceChatbot(input: CitizenAssistanceChatbotInput): Promise<CitizenAssistanceChatbotOutput> {
  return citizenAssistanceChatbotFlow(input);
}

// Define the prompt for the chatbot
const citizenAssistanceChatbotPrompt = ai.definePrompt({
  name: 'citizenAssistanceChatbotPrompt',
  input: {schema: CitizenAssistanceChatbotInputSchema},
  output: {schema: CitizenAssistanceChatbotOutputSchema},
  prompt: `You are a helpful chatbot assisting citizens with legal processes.

  Your goal is to:
  1.  Detect the intent of the user message (e.g., filing a case, checking case status, finding legal aid).
  2.  Provide a helpful and informative response.
  3.  If possible, pre-fill relevant form data based on the user message.

  Here are some example intents:
  - filing_case: The user wants to file a new case.
  - check_case_status: The user wants to check the status of an existing case.
  - find_legal_aid: The user wants to find legal aid resources.

  User Message: {{{message}}}

  Response:`,
});

// Define the Genkit flow for the chatbot
const citizenAssistanceChatbotFlow = ai.defineFlow(
  {
    name: 'citizenAssistanceChatbotFlow',
    inputSchema: CitizenAssistanceChatbotInputSchema,
    outputSchema: CitizenAssistanceChatbotOutputSchema,
  },
  async input => {
    const {output} = await citizenAssistanceChatbotPrompt(input);
    return output!;
  }
);
