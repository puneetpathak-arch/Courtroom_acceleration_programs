import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { findCase, findHearing, findUser } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { format, formatDistanceToNow } from 'date-fns';
import { User, Gavel, Scale, FileText, Calendar, Clock, Tag, Video, Users, Building } from 'lucide-react';
import { CaseActions } from "@/components/cases/case-actions";
import { statusColors } from "@/components/cases/case-table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CaseDetailPage({ params }: { params: { caseId: string } }) {
  const caseData = findCase(params.caseId);

  if (!caseData) {
    notFound();
  }

  const judge = findUser(caseData.assignedJudgeId);
  const nextHearing = findHearing(caseData.nextHearingId);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="font-headline text-3xl font-bold text-primary">{caseData.title}</h1>
            <p className="text-muted-foreground">Case ID: {caseData.caseId}</p>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Badge className={cn("text-sm", statusColors[caseData.status])}>{caseData.status}</Badge>
        </div>
      </div>

       <Card>
            <CardHeader>
                <CardTitle className="font-headline text-xl">Actions</CardTitle>
            </CardHeader>
            <CardContent>
                <CaseActions caseData={caseData} />
            </CardContent>
        </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Case Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold text-muted-foreground flex items-center gap-2"><Scale className="w-4 h-4" /> Parties</h3>
                    <p>{caseData.parties.join(', ')}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-muted-foreground flex items-center gap-2"><Scale className="w-4 h-4 -scale-x-100" /> Respondents</h3>
                    <p>{caseData.respondents.join(', ')}</p>
                </div>
             </div>
             <Separator />
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold text-muted-foreground flex items-center gap-2"><Gavel className="w-4 h-4" /> Assigned Judge</h3>
                    <p>{judge?.name || 'Not Assigned'}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-muted-foreground flex items-center gap-2"><Building className="w-4 h-4" /> Court</h3>
                    <p>Court ID: {caseData.courtId}</p>
                </div>
             </div>
             <Separator />
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4" /> Date Filed</h3>
                    <p>{format(new Date(caseData.createdAt), "PPP")}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-muted-foreground flex items-center gap-2"><Clock className="w-4 h-4" /> Last Updated</h3>
                    <p>{formatDistanceToNow(new Date(caseData.updatedAt), { addSuffix: true })}</p>
                </div>
             </div>
             <Separator />
             <div>
                <h3 className="font-semibold text-muted-foreground flex items-center gap-2"><Tag className="w-4 h-4" /> Tags & Complexity</h3>
                <div className="flex gap-2 pt-2">
                    {caseData.tags.map(tag => <Badge variant="secondary" key={tag}>{tag}</Badge>)}
                    <Badge variant="outline">{caseData.complexity.toUpperCase()}</Badge>
                </div>
             </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Next Hearing</CardTitle>
                </CardHeader>
                <CardContent>
                    {nextHearing ? (
                        <div className="space-y-2">
                            <p className="flex items-center gap-2">
                                {nextHearing.mode === 'virtual' && <Video className="w-4 h-4 text-accent" />}
                                {nextHearing.mode === 'hybrid' && <Users className="w-4 h-4 text-accent" />}
                                {nextHearing.mode === 'physical' && <Gavel className="w-4 h-4 text-accent" />}
                                <strong>{format(new Date(nextHearing.startTime), "EEE, MMM d, yyyy 'at' h:mm a")}</strong>
                            </p>
                            <p className="text-sm text-muted-foreground">in {nextHearing.room}</p>
                            <p className="text-sm text-muted-foreground">Mode: <Badge variant="outline">{nextHearing.mode}</Badge></p>
                            <Button className="w-full mt-2" size="sm">Join Hearing</Button>
                        </div>
                    ) : (
                        <p className="text-muted-foreground">No upcoming hearing scheduled.</p>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Filings</CardTitle>
                </CardHeader>
                <CardContent>
                    {caseData.filings.length > 0 ? (
                    <ul className="space-y-2">
                        {caseData.filings.map((file, index) => (
                        <li key={index} className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-muted-foreground" /> {file.name}
                            </span>
                            <a href={file.url} className="text-primary hover:underline">Download</a>
                        </li>
                        ))}
                    </ul>
                    ) : (
                        <p className="text-muted-foreground">No documents filed yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
