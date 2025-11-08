"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { FileText, BrainCircuit, CalendarOff, Download } from 'lucide-react';
import { automateCaseTagging, generateCaseSummary } from "@/ai/flows"; // Assuming flows are exported from a central point
import type { Case } from "@/lib/types";

// This is a placeholder for the actual AI flow calls.
const automateCaseTaggingAction = async (caseData: Case) => {
    try {
        const result = await automateCaseTagging({
            caseId: caseData.caseId,
            caseTitle: caseData.title,
            caseDescription: `Case filed by ${caseData.parties.join(', ')} against ${caseData.respondents.join(', ')}.`,
        });
        console.log("Automated Tagging Result:", result);
        return `Tags suggested: ${result.tags.join(', ')}. Complexity: ${result.complexity}.`;
    } catch(e: any) {
        console.error("Tagging Error:", e);
        return `Error during tagging: ${e.message}`;
    }
}

const generateCaseSummaryAction = async (caseData: Case) => {
    try {
        const result = await generateCaseSummary({
            caseId: caseData.caseId,
            filings: caseData.filings.map(f => f.url),
        });
        console.log("Case Summary Result:", result);
        return `Summary generated: ${result.summaryText.substring(0, 100)}...`;
    } catch(e: any) {
        console.error("Summary Error:", e);
        return `Error during summary generation: ${e.message}`;
    }
}

export function CaseActions({ caseData }: { caseData: Case }) {
    const { toast } = useToast();

    const handleTagging = async () => {
        toast({ title: "🤖 AI Processing", description: "Automating case tagging..." });
        const result = await automateCaseTaggingAction(caseData);
        toast({ title: "🤖 AI Task Complete", description: result });
    }

    const handleSummarize = async () => {
        toast({ title: "🤖 AI Processing", description: "Generating case summary..." });
        const result = await generateCaseSummaryAction(caseData);
        toast({ title: "🤖 AI Task Complete", description: result });
    }

    return (
        <div className="flex flex-wrap gap-2">
            <Button onClick={handleSummarize}>
                <FileText className="mr-2 h-4 w-4" /> Generate Summary
            </Button>
            <Button variant="secondary" onClick={handleTagging}>
                <BrainCircuit className="mr-2 h-4 w-4" /> Automate Tags
            </Button>
            <Button variant="secondary" onClick={() => toast({ title: "Action", description: "Adjournment requested." })}>
                <CalendarOff className="mr-2 h-4 w-4" /> Request Adjournment
            </Button>
             <Button variant="outline" onClick={() => toast({ title: "Action", description: "Downloading case bundle..." })}>
                <Download className="mr-2 h-4 w-4" /> Download Bundle
            </Button>
        </div>
    )
}
