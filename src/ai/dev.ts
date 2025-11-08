import { config } from 'dotenv';
config();

import '@/ai/flows/generate-case-summaries.ts';
import '@/ai/flows/citizen-assistance-chatbot.ts';
import '@/ai/flows/automate-case-tagging.ts';
import '@/ai/flows/suggest-mediation.ts';