'use client';

import type { User } from 'firebase/auth';
import { CaseTable } from '@/components/cases/case-table';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Calendar, FileText, FolderOpen } from 'lucide-react';

export default function LawyerDashboard({ user }: { user: User }) {
  return (
    <div className="grid gap-6">
      <h1 className="font-headline text-3xl font-bold text-primary">Welcome, {user.displayName || 'Advocate'}!</h1>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <h2 className="font-headline text-2xl font-bold text-primary mb-4">My Cases</h2>
            {/* For now, this shows all cases. It can be filtered later. */}
            <CaseTable />
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><Calendar /> Calendar</CardTitle>
                    <CardDescription>Hearings and court availability.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">Calendar view coming soon.</p>
                    <Button variant="outline" className="w-full mt-4">View Full Calendar</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><FolderOpen /> Document Manager</CardTitle>
                    <CardDescription>Client documents and templates.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">Document templates coming soon.</p>
                     <Button variant="outline" className="w-full mt-4">
                        <FileText className="mr-2 h-4 w-4" /> Go to Template Library
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
