
'use client';

import type { User } from 'firebase/auth';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { FilePlus, Gavel, Users, CalendarPlus } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import { users } from '@/lib/data';

export default function ClerkDashboard({ user }: { user: User }) {
  // In a real app, these would be filtered based on clerk's court/role
  const newFilings = ['CIV-2024-101', 'FAM-2024-203', 'CRIM-2024-055'];
  const judges = users.filter(u => u.roles.includes('judge'));

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
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><Gavel /> Hearings Management Console</CardTitle>
                    <CardDescription>Create and update hearings, and issue e-summons.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="font-semibold mb-4 flex items-center gap-2"><CalendarPlus /> Schedule New Hearing</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                             <div className="space-y-2">
                                <Label htmlFor="case-id">Case ID</Label>
                                <Input id="case-id" placeholder="e.g., CIV-2024-101" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="hearing-date">Date & Time</Label>
                                <Input id="hearing-date" type="datetime-local" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="judge-assign">Assign Judge</Label>
                                <Select>
                                    <SelectTrigger id="judge-assign">
                                        <SelectValue placeholder="Select Judge" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {judges.map(j => <SelectItem key={j.uid} value={j.uid}>{j.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="hearing-mode">Mode</Label>
                                <Select>
                                    <SelectTrigger id="hearing-mode">
                                        <SelectValue placeholder="Select Mode" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="physical">Physical</SelectItem>
                                        <SelectItem value="virtual">Virtual</SelectItem>
                                        <SelectItem value="hybrid">Hybrid</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="court-room">Court Room</Label>
                                <Input id="court-room" placeholder="e.g., Courtroom 5" />
                            </div>
                             <div className="space-y-2">
                                <Button className="w-full">Schedule Hearing</Button>
                            </div>
                        </div>
                    </div>
                     <div className="border-t pt-6">
                        <h3 className="font-semibold mb-4">Other Actions</h3>
                         <div className="flex flex-wrap gap-2">
                            <Button variant="secondary">Update Existing Hearing</Button>
                            <Button variant="outline">Issue e-Summons</Button>
                        </div>
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
