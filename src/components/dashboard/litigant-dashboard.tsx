
'use client';

import type { User } from 'firebase/auth';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar, FilePlus, Handshake, MessageCircleQuestion, Scale, ShieldCheck, Video } from 'lucide-react';
import { cases } from '@/lib/data';
import { Badge } from '../ui/badge';
import { statusColors } from '../cases/case-table';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import Link from 'next/link';

export default function LitigantDashboard({ user }: { user: User }) {
  // Filter cases where the current user is the filer
  const myCases = cases.filter(c => c.filerId === user.uid);

  return (
    <div className="grid gap-6">
      <h1 className="font-headline text-3xl font-bold text-primary">Welcome, {user.displayName || user.email}!</h1>
      <p className="text-muted-foreground">This is your personal portal to manage your cases with eCourtConnect.</p>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><Scale /> My Cases</CardTitle>
                    <CardDescription>An overview of your active and past cases.</CardDescription>
                </CardHeader>
                <CardContent>
                    {myCases.length > 0 ? (
                        <div className="space-y-4">
                            {myCases.map(c => (
                                <Card key={c.caseId}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="font-headline text-lg">{c.title}</CardTitle>
                                                <CardDescription>Case ID: {c.caseId}</CardDescription>
                                            </div>
                                            <Badge className={cn("text-sm", statusColors[c.status])}>{c.status}</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-sm text-muted-foreground">
                                            <p>Filed on: {format(new Date(c.createdAt), "PPP")}</p>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex flex-wrap gap-2">
                                        <Button asChild size="sm">
                                            <Link href={`/cases/${c.caseId}`}>View Details</Link>
                                        </Button>
                                        <Button variant="secondary" size="sm"><Video className="mr-2"/> Join Hearing</Button>
                                        <Button variant="outline" size="sm"><Calendar className="mr-2"/> Request Adjournment</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">You have not filed any cases yet.</p>
                            <Button className="mt-4"><FilePlus className="mr-2" /> File a New Case</Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><MessageCircleQuestion /> Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <Button variant="outline" className="w-full justify-start"><FilePlus className="mr-2"/> File a New Case</Button>
                    <Button variant="outline" className="w-full justify-start"><Handshake className="mr-2"/> Request Legal Aid</Button>
                    <Button variant="outline" className="w-full justify-start"><ShieldCheck className="mr-2"/> Suggest Mediation</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

