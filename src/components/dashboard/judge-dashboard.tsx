
'use client';

import type { User } from 'firebase/auth';
import { CaseTable } from '@/components/cases/case-table';
import TodaysHearings from '@/components/dashboard/todays-hearings';

export default function JudgeDashboard({ user }: { user: User }) {
  return (
    <div className="grid gap-6">
      <h1 className="font-headline text-3xl font-bold text-primary">Welcome, {user.displayName || 'Judge'}!</h1>
      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">Judge Inbox</h2>
          <CaseTable judgeId={user.uid} />
        </div>
        <div>
           <h2 className="font-headline text-2xl font-bold text-primary mb-4">Today's Hearings</h2>
           <TodaysHearings judgeId={user.uid} />
        </div>
      </div>
    </div>
  );
}
