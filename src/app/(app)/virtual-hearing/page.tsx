
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { hearings, findCase } from "@/lib/data";
import { format } from 'date-fns';
import { Video } from "lucide-react";

export default function VirtualHearingPage() {
    const virtualHearings = hearings.filter(h => h.mode === 'virtual' || h.mode === 'hybrid');

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-headline text-3xl font-bold text-primary">Virtual Hearings</h1>
                <p className="text-muted-foreground">
                    Join and manage your scheduled virtual and hybrid court hearings.
                </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {virtualHearings.length > 0 ? (
                    virtualHearings.map(hearing => {
                        const caseDetails = findCase(hearing.caseId);
                        return (
                            <Card key={hearing.hearingId}>
                                <CardHeader>
                                    <CardTitle className="font-headline text-xl flex items-center gap-2">
                                        <Video className="w-5 h-5 text-accent" />
                                        {caseDetails?.title || 'Unknown Case'}
                                    </CardTitle>
                                    <CardDescription>Case ID: {hearing.caseId}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-semibold">
                                        {format(new Date(hearing.startTime), "PPP 'at' p")}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Room: {hearing.room}</p>
                                    <p className="text-sm text-muted-foreground capitalize">Mode: {hearing.mode}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full">Join Hearing</Button>
                                </CardFooter>
                            </Card>
                        )
                    })
                ) : (
                    <p>No virtual hearings scheduled.</p>
                )}
            </div>
        </div>
    )
}
