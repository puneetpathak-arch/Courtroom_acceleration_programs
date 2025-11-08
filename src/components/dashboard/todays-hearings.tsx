
import { format, isToday } from "date-fns";
import { Gavel, Video, Users, CalendarCheck2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { hearings, findCase, findUser } from "@/lib/data";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function TodaysHearings({ judgeId }: { judgeId: string }) {
  const todaysHearings = hearings
    .filter(h => h.judgeId === judgeId && isToday(new Date(h.startTime)))
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2"><CalendarCheck2 />Today's Schedule</CardTitle>
        <CardDescription>
          Your hearings for {format(new Date(), 'PPP')}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {todaysHearings.length > 0 ? (
          <ul className="space-y-4">
            {todaysHearings.map((hearing) => {
              const caseInfo = findCase(hearing.caseId);
              
              return (
                <li key={hearing.hearingId} className="flex flex-col gap-2 p-3 rounded-lg border bg-card">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {hearing.mode === 'virtual' && <Video className="h-5 w-5" />}
                        {hearing.mode === 'hybrid' && <Users className="h-5 w-5" />}
                        {hearing.mode === 'physical' && <Gavel className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{caseInfo?.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(hearing.startTime), "h:mm a")} - {format(new Date(hearing.endTime), "h:mm a")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Room: {hearing.room}
                      </p>
                    </div>
                    <Badge variant={hearing.mode === 'virtual' ? 'secondary' : 'outline'} className={cn(hearing.mode === 'virtual' && 'bg-accent/20 text-accent-foreground border-accent')}>{hearing.mode}</Badge>
                  </div>
                  {(hearing.mode === 'virtual' || hearing.mode === 'hybrid') && (
                    <Button size="sm" className="w-full">
                      <Video className="mr-2 h-4 w-4" /> Join Virtual Hearing
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-muted-foreground text-center py-4">No hearings scheduled for today.</p>
        )}
      </CardContent>
    </Card>
  );
}
