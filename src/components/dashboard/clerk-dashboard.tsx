
'use client';

import type { User } from 'firebase/auth';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar, CheckSquare, FilePlus, Gavel, Users } from 'lucide-react';
import { CaseTable } from '../cases/case-table';
import TodaysHearings from './todays-hearings';

export default function ClerkDashboard({ user }: { user: User }) {
  // In a real app, these would be filtered based on clerk's court/role
  const newFilings = ['CIV-2024-101', 'FAM-2024-203', 'CRIM-2024-055'];

  return (
    <div className="grid gap-6">
      <h1 className="font-headline text-3xl font-bold text-primary">Welcome, {user.displayName || 'Clerk'}!</h1>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><FilePlus /> Case Intake</CardTitle>
                    <CardDescription>Review new filings, validate documents, and assign case numbers.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {newFilings.map(caseId => (
                            <li key={caseId} className="flex items-center justify-between p-2 bg-muted rounded-md text-sm">
                                <span>New filing received: <strong>{caseId}</strong></span>
                                <Button size="sm" variant="outline">Review Filing</Button>
                            </li>
                        ))}
                    </ul>
                     <Button className="w-full mt-4">
                        View All New Filings
                    </Button>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><Gavel /> Hearings Management</CardTitle>
                    <CardDescription>Create, update hearings, and issue e-summons.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        <Button>Create New Hearing</Button>
                        <Button variant="secondary">Update Hearing Schedule</Button>
                        <Button variant="outline">Issue e-Summons</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><Users /> Court Admin Panel</CardTitle>
                    <CardDescription>Manage daily court roster, rooms, and judge availability.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="flex flex-col gap-4">
                        <Button variant="outline">Manage Daily Roster</Button>
                        <Button variant="outline">Assign Courtrooms</Button>
                        <Button variant="outline">Set Judge Availability</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
