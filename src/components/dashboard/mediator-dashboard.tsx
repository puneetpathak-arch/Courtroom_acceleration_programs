'use client';

import type { User } from 'firebase/auth';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Calendar, CheckCircle, Clock, Languages, MessageSquare, Star, Tags, Video } from 'lucide-react';

const assignedCases = [
    { id: 'MED-001', case: 'CIV-2024-001', status: 'Requested' },
    { id: 'MED-002', case: 'FAM-2024-002', status: 'Scheduled' },
    { id: 'MED-003', case: 'TEN-2024-005', status: 'Settled' },
    { id: 'MED-004', case: 'CORP-2023-112', status: 'In-Progress' },
];

export default function MediatorDashboard({ user }: { user: User }) {
  // Placeholder data for the profile
  const profile = {
    rating: 4.8,
    tags: ['Family Law', 'Contract Disputes', 'Real Estate'],
    languages: ['English', 'Spanish'],
    avatarUrl: `https://picsum.photos/seed/${user.uid}/400/400`
  };

  return (
    <div className="grid gap-6">
      <h1 className="font-headline text-3xl font-bold text-primary">Welcome, {user.displayName || 'Mediator'}!</h1>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><CheckCircle /> Assigned Mediation Cases</CardTitle>
                    <CardDescription>Manage cases assigned to you for mediation.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {assignedCases.map(c => (
                            <li key={c.id} className="flex items-center justify-between p-3 bg-muted rounded-md text-sm">
                                <div>
                                    <span className="font-semibold">{c.case}</span>
                                    <span className="ml-2 text-muted-foreground">({c.status})</span>
                                </div>
                                <div className="flex gap-2">
                                     <Button size="sm" variant="outline">View Details</Button>
                                     <Button size="sm">Manage</Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><Video /> Mediation Tools</CardTitle>
                    <CardDescription>Generate links and communicate securely with parties.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        <Button><Video className="mr-2"/> Generate Mediation Link</Button>
                        <Button variant="secondary"><MessageSquare className="mr-2" /> Open Secure Chat</Button>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader className="items-center text-center">
                    <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                        <AvatarImage src={profile.avatarUrl} alt={user.displayName || 'Mediator'} data-ai-hint="professional portrait" />
                        <AvatarFallback>{user.displayName?.charAt(0) || 'M'}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-headline text-2xl">{user.displayName || 'Mediator Name'}</CardTitle>
                    <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="font-bold text-lg text-foreground">{profile.rating}</span>
                        <span className="text-sm text-muted-foreground">/ 5.0</span>
                    </div>
                </CardHeader>
                <CardContent className="text-sm">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold flex items-center gap-2 mb-2"><Tags className="w-4 h-4 text-accent"/> Expertise</h4>
                            <div className="flex flex-wrap gap-2">
                                {profile.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                            </div>
                        </div>
                         <div>
                            <h4 className="font-semibold flex items-center gap-2 mb-2"><Languages className="w-4 h-4 text-accent"/> Languages</h4>
                            <div className="flex flex-wrap gap-2">
                                {profile.languages.map(lang => <Badge key={lang} variant="outline">{lang}</Badge>)}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold flex items-center gap-2 mb-2"><Calendar className="w-4 h-4 text-accent"/> Availability</h4>
                            <p className="text-muted-foreground">Your calendar is not yet synced.</p>
                             <Button variant="outline" className="w-full mt-2">Sync Calendar</Button>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Edit Profile</Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
