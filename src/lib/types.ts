export interface Degree {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  checklist: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Certificate {
  id: string;
  userId: string;
  userName: string;
  degreeId: string;
  degreeTitle: string;
  certificateCode: string;
  gpa: number;
  issueDate: string;
  createdAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  userName: string;
  degreeTitle: string;
  earnedAt: string;
}
