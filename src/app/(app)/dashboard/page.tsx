
'use client';

import { useUser } from "@/firebase";
import { Loader2 } from "lucide-react";
import GeneralDashboard from "@/components/dashboard/general-dashboard";
import JudgeDashboard from "@/components/dashboard/judge-dashboard";
import LawyerDashboard from "@/components/dashboard/lawyer-dashboard";
import ClerkDashboard from "@/components/dashboard/clerk-dashboard";

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // This is a placeholder for role-based logic.
  // In a real app, you would fetch user roles from Firestore.
  const isJudge = user?.email?.includes('judge');
  const isLawyer = user?.email?.includes('lawyer');
  const isClerk = user?.email?.includes('clerk');

  if (isJudge) {
    return <JudgeDashboard user={user} />;
  }

  if (isLawyer) {
    return <LawyerDashboard user={user} />;
  }

  if (isClerk) {
    return <ClerkDashboard user={user} />;
  }

  return <GeneralDashboard />;
}
