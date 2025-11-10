
export type UserRole = 'judge' | 'lawyer' | 'litigant' | 'clerk' | 'admin' | 'mediator';

export interface User {
  uid: string;
  name: string;
  email: string;
  roles: UserRole[];
  avatarUrl: string;
  registeredAt?: string;
}

export type CaseStatus = 'filed' | 'listed' | 'hearing' | 'adjourned' | 'judgment' | 'closed';

export interface CaseFile {
  name: string;
  url: string;
  uploadedAt: string;
}

export interface Case {
  caseId: string;
  title: string;
  filerId: string;
  parties: string[];
  respondents: string[];
  assignedJudgeId: string;
  courtId: string;
  status: CaseStatus;
  tags: string[];
  complexity: 'low' | 'medium' | 'high';
  filings: CaseFile[];
  createdAt: string;
  updatedAt: string;
  nextHearingId?: string;
}

export type HearingMode = 'virtual' | 'hybrid' | 'physical';

export interface Hearing {
  hearingId: string;
  caseId: string;
  judgeId: string;
  startTime: string;
  endTime: string;
  room: string;
  mode: HearingMode;
  participants: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  modules: number;
}
