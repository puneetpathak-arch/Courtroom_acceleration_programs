
import type { Case, Hearing, User, Course, Mediator } from './types';
import { placeholderImages } from './placeholder-images.json';

export const users: (User | Mediator)[] = [
  { uid: 'user-judge-1', name: 'Hon. Judge Smith', email: 'judge.smith@courts.gov', roles: ['judge'], avatarUrl: placeholderImages[0].imageUrl },
  { uid: 'user-lawyer-1', name: 'Adv. Priya Sharma', email: 'priya.sharma@lawfirm.com', roles: ['lawyer'], avatarUrl: placeholderImages[1].imageUrl },
  { uid: 'user-litigant-1', name: 'Rajesh Kumar', email: 'rajesh.k@email.com', roles: ['litigant'], avatarUrl: placeholderImages[2].imageUrl },
  { uid: 'user-clerk-1', name: 'Anjali Desai', email: 'clerk.desai@courts.gov', roles: ['clerk'], avatarUrl: placeholderImages[3].imageUrl },
  { uid: 'user-admin-1', name: 'Admin User', email: 'admin@courts.gov', roles: ['admin'], avatarUrl: placeholderImages[4].imageUrl },
  { 
    uid: 'user-mediator-1', 
    name: 'Samuel Green', 
    email: 'mediator.green@mediation.org', 
    roles: ['mediator'], 
    avatarUrl: 'https://picsum.photos/seed/user-mediator-1/400/400',
    mediatorId: 'med_1',
    languages: ['English', 'French'],
    expertiseTags: ['Corporate', 'Real Estate'],
    availability: [{day: "Mon", slots: ["10:00", "14:00"]}],
    rating: 4.9,
  },
  { uid: 'litigant_1', name: 'Asha Sharma', email: 'asha@example.com', roles: ['litigant'], avatarUrl: placeholderImages[2].imageUrl, registeredAt: '2025-10-01T10:00:00Z' },
];

export const cases: Case[] = [
  {
    caseId: 'CIV-2024-001',
    title: 'InfraCorp vs. GreenScape Builders',
    filerId: 'user-litigant-1',
    parties: ['InfraCorp'],
    respondents: ['GreenScape Builders'],
    assignedJudgeId: 'user-judge-1',
    courtId: 'court-1',
    status: 'hearing',
    tags: ['Contract Dispute', 'Construction'],
    complexity: 'medium',
    counselIds: ['user-lawyer-1'],
    filings: [
      { name: 'Initial Complaint.pdf', url: '#', uploadedAt: '2024-05-01' },
      { name: 'Response to Complaint.pdf', url: '#', uploadedAt: '2024-05-15' },
    ],
    createdAt: '2024-05-01T10:00:00Z',
    updatedAt: '2024-06-10T14:30:00Z',
    nextHearingId: 'HR-2024-001',
  },
  {
    caseId: 'FAM-2024-002',
    title: 'Sharma vs. Sharma',
    filerId: 'user-lawyer-1',
    parties: ['Priya Sharma'],
    respondents: ['Rohan Sharma'],
    assignedJudgeId: 'user-judge-1',
    courtId: 'court-1',
    status: 'filed',
    tags: ['Family Law', 'Custody'],
    complexity: 'high',
    counselIds: ['user-lawyer-1'],
    filings: [
      { name: 'Divorce Petition.pdf', url: '#', uploadedAt: '2024-06-20' }
    ],
    createdAt: '2024-06-20T11:00:00Z',
    updatedAt: '2024-06-20T11:00:00Z',
    nextHearingId: 'HR-2024-003',
  },
  {
    caseId: 'CRIM-2024-003',
    title: 'State vs. John Doe',
    filerId: 'state-prosecutor',
    parties: ['State'],
    respondents: ['John Doe'],
    assignedJudgeId: 'user-judge-1',
    courtId: 'court-2',
    status: 'adjourned',
    tags: ['Theft', 'Criminal'],
    complexity: 'low',
    counselIds: [],
    filings: [],
    createdAt: '2024-04-15T09:00:00Z',
    updatedAt: '2024-06-05T16:00:00Z',
    nextHearingId: 'HR-2024-002'
  },
  {
    caseId: 'CORP-2024-004',
    title: 'Innovatech vs. Patent Office',
    filerId: 'user-lawyer-1',
    parties: ['Innovatech Inc.'],
    respondents: ['National Patent Office'],
    assignedJudgeId: 'user-judge-1',
    courtId: 'court-3',
    status: 'judgment',
    tags: ['Intellectual Property', 'Patent Law'],
    complexity: 'high',
    counselIds: ['user-lawyer-1'],
    filings: [],
    createdAt: '2024-01-10T15:00:00Z',
    updatedAt: '2024-05-30T11:00:00Z',
  },
   {
    caseId: 'TEN-2024-005',
    title: 'Landlord vs. Tenant Dispute',
    filerId: 'user-litigant-1',
    parties: ['Property Owner'],
    respondents: ['Renting Tenant'],
    assignedJudgeId: 'user-judge-1',
    courtId: 'court-1',
    status: 'closed',
    tags: ['Tenancy', 'Eviction'],
    complexity: 'low',
    counselIds: [],
    filings: [],
    createdAt: '2024-03-01T12:00:00Z',
    updatedAt: '2024-04-15T10:00:00Z',
  },
  {
    caseId: 'CASE-L1',
    title: 'Rent Dispute',
    filerId: 'litigant_1',
    parties: ['litigant_1'],
    respondents: ['Landlord ABC'],
    assignedJudgeId: 'user-judge-1',
    courtId: 'court-1',
    status: 'filed',
    tags: ['Tenancy', 'Rent'],
    complexity: 'low',
    counselIds: [],
    filings: [],
    createdAt: '2025-10-01T10:05:00Z',
    updatedAt: '2025-10-01T10:05:00Z',
  },
];

export const hearings: Hearing[] = [
  {
    hearingId: 'HR-2024-001',
    caseId: 'CIV-2024-001',
    judgeId: 'user-judge-1',
    startTime: '2025-11-12T10:00:00.000Z',
    endTime: '2025-11-12T11:00:00.000Z',
    room: 'Courtroom 3',
    mode: 'hybrid',
    participants: ['user-lawyer-1', 'user-litigant-1'],
  },
  {
    hearingId: 'HR-2024-002',
    caseId: 'CRIM-2024-003',
    judgeId: 'user-judge-1',
    startTime: '2025-11-15T14:00:00.000Z',
    endTime: '2025-11-15T14:30:00.000Z',
    room: 'Virtual Hearing Room 1',
    mode: 'virtual',
    participants: ['state-prosecutor-lawyer', 'john-doe-lawyer'],
  },
  {
    hearingId: 'HR-2024-003',
    caseId: 'FAM-2024-002',
    judgeId: 'user-judge-1',
    startTime: '2025-11-18T09:30:00.000Z',
    endTime: '2025-11-18T12:00:00.000Z',
    room: 'Courtroom 1',
    mode: 'physical',
    participants: ['user-lawyer-1'],
  },
];

export const courses: Course[] = [
  {
    id: 'crs-001',
    title: 'Introduction to Civil Procedure',
    description: 'Understand the fundamentals of civil litigation from filing to judgment.',
    imageUrl: placeholderImages[5].imageUrl,
    modules: 12,
  },
  {
    id: 'crs-002',
    title: 'Advanced Evidence Law',
    description: 'A deep dive into the rules of evidence and their application in court.',
    imageUrl: placeholderImages[6].imageUrl,
    modules: 8,
  },
  {
    id: 'crs-003',
    title: 'Mediation and ADR Techniques',
    description: 'Learn effective techniques for alternative dispute resolution.',
    imageUrl: placeholderImages[7].imageUrl,
    modules: 6,
  },
  {
    id: 'crs-004',
    title: 'Digital Courtroom Ethics',
    description: 'Navigating the ethical challenges of virtual and hybrid hearings.',
    imageUrl: placeholderImages[8].imageUrl,
    modules: 5,
  },
];

export function findCase(caseId: string) {
  return cases.find(c => c.caseId === caseId);
}

export function findHearing(hearingId?: string) {
  if (!hearingId) return undefined;
  return hearings.find(h => h.hearingId === hearingId);
}

export function findUser(userId: string) {
    return users.find(u => u.uid === userId);
}
