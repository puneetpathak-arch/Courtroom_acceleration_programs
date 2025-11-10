
'use client';

import type { User } from 'firebase/auth';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Calendar, CheckCircle, Languages, MessageSquare, Star, Tags, Video } from 'lucide-react';
import { users } from '@/lib/data';
import { MediationChat } from '../mediation/mediation-chat';

const assignedCases = [
    { id: 'MED-001', caseId: 'CIV-2024-001', title: 'InfraCorp vs. GreenScape Builders', status: 'Requested' },
    { id: 'MED-002', caseId: 'FAM-2024-002', title: 'Sharma vs. Sharma', status: 'Scheduled' },
    { id: 'MED-003', caseId: 'TEN-2024-005', title: 'Landlord vs. Tenant Dispute', status: 'Settled' },
    { id: 'MED-004', caseId: 'CORP-2024-004', title: 'Innovatech vs. Patent Office', status: 'In-Progress' },
];

const getStatusBadgeColor = (status: string) => {
    switch (status) {
        case 'Requested': return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
        case 'Scheduled': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
        case 'In-Progress': return 'bg-purple-500/10 text-purple-700 border-purple-500/20';
        case 'Settled': return 'bg-green-500/10 text-green-700 border-green-500/20';
        default: return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
    }
}

export default function MediatorDashboard({ user }: { user: User }) {
  // Placeholder data for the profile, find the mediator from the users list
  const profile = users.find(u => u.uid === user.uid) || {
    rating: 4.8,
    tags: ['Family Law', 'Contract Disputes', 'Real Estate'],
    languages: ['English', 'Spanish'],
    avatarUrl: `https://picsum.photos/seed/${user.uid}/400/400`,
    name: user.displayName || 'Mediator Name'
  };

  return (
    <div className="grid gap-6">
      <h1 className="font-headline text-3xl font-bold text-primary">Welcome, {profile.name}!</h1>
      
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
                            <li key={c.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-muted rounded-md text-sm gap-2">
                                <div className="flex-grow">
                                    <span className="font-semibold">{c.title}</span>
                                    <span className="ml-2 text-xs text-muted-foreground">({c.caseId})</span>
                                    <Badge variant="outline" className={`ml-2 ${getStatusBadgeColor(c.status)}`}>{c.status}</Badge>
                                </div>
                                <div className="flex gap-2 self-end sm:self-center">
                                     <Button size="sm" variant="outline">View Details</Button>
                                     <Button size="sm">Manage Session</Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><Video /> Mediation Tools</CardTitle>
                    <CardDescription>Generate links and communicate securely with parties for case 'InfraCorp vs. GreenScape Builders'.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {/* In a real app, this would call a cloud function like `/mediator/acceptRequest` */}
                        <Button><Video className="mr-2"/> Generate Mediation Link</Button>
                         {/* This would open a secure chat interface */}
                        <Button variant="secondary"><MessageSquare className="mr-2" /> Open Secure Chat</Button>
                    </div>
                    <MediationChat />
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader className="items-center text-center">
                    <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                        <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint="professional portrait" />
                        <AvatarFallback>{profile.name?.charAt(0) || 'M'}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-headline text-2xl">{profile.name}</CardTitle>
                    <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-5 h-5 fill-current" />
                        {/* @ts-ignore */}
                        <span className="font-bold text-lg text-foreground">{profile.rating || 'N/A'}</span>
                        <span className="text-sm text-muted-foreground">/ 5.0</span>
                    </div>
                </CardHeader>
                <CardContent className="text-sm">
                    <div className="space-y-4">
                        <div>
                            {/* @ts-ignore */}
                            {profile.expertiseTags && profile.expertiseTags.length > 0 && (
                                <>
                                    <h4 className="font-semibold flex items-center gap-2 mb-2"><Tags className="w-4 h-4 text-accent"/> Expertise</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {/* @ts-ignore */}
                                        {profile.expertiseTags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                    </div>
                                </>
                            )}
                        </div>
                         <div>
                             {/* @ts-ignore */}
                            {profile.languages && profile.languages.length > 0 && (
                                <>
                                    <h4 className="font-semibold flex items-center gap-2 mb-2"><Languages className="w-4 h-4 text-accent"/> Languages</h4>
                                    <div className="flex flex-wrap gap-2">
                                         {/* @ts-ignore */}
                                        {profile.languages.map(lang => <Badge key={lang} variant="outline">{lang}</Badge>)}
                                    </div>
                                </>
                            )}
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
