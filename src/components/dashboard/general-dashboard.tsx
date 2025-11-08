
import { Activity, DollarSign, Gavel, Scale } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CaseStatusChart } from "@/components/dashboard/case-status-chart";
import { UpcomingHearings } from "@/components/dashboard/upcoming-hearings";
import { cases } from "@/lib/data";

export default function GeneralDashboard() {
  const activeCases = cases.filter(c => c.status !== 'closed' && c.status !== 'judgment').length;
  const closedCases = cases.length - activeCases;

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Cases
                  </CardTitle>
                  <Scale className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{cases.length}</div>
                  <p className="text-xs text-muted-foreground">
                    All registered cases in the system
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Cases
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeCases}</div>
                  <p className="text-xs text-muted-foreground">
                    Cases currently in progress
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cases Adjudicated</CardTitle>
                  <Gavel className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{closedCases}</div>
                  <p className="text-xs text-muted-foreground">
                    Cases with judgment or closed
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Penalties Collected</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$4,523</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            <CaseStatusChart />
        </div>
        <div className="row-start-1 lg:row-start-auto xl:col-span-1">
            <UpcomingHearings />
        </div>
    </div>
  );
}
