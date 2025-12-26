import { format, formatDistanceToNow } from "date-fns";
import { Gavel, Video, Users } from "lucide-react";

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

export function UpcomingHearings() {
  const sortedHearings = hearings
    .filter(h => new Date(h.startTime) > new Date())
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Upcoming Hearings</CardTitle>
        <CardDescription>
          Your next scheduled hearings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {sortedHearings.map((hearing) => {
            const caseInfo = findCase(hearing.caseId);
            const judgeInfo = findUser(hearing.judgeId);
            const timeToNow = formatDistanceToNow(new Date(hearing.startTime), { addSuffix: true });
            
            return (
              <li key={hearing.hearingId} className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {hearing.mode === 'virtual' && <Video className="h-5 w-5" />}
                    {hearing.mode === 'hybrid' && <Users className="h-5 w-5" />}
                    {hearing.mode === 'physical' && <Gavel className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{caseInfo?.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {judgeInfo?.name} • {hearing.room}
                  </p>
                   <p className="text-sm text-muted-foreground">
                    {format(new Date(hearing.startTime), "EEE, MMM d, yyyy 'at' h:mm a")} ({timeToNow})
                  </p>
                </div>
                <Badge variant={hearing.mode === 'virtual' ? 'secondary' : 'outline'} className={cn(hearing.mode === 'virtual' && 'bg-accent/20 text-accent-foreground border-accent')}>{hearing.mode}</Badge>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
