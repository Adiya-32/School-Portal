export type Role = 'student' | 'teacher' | 'parent' | 'admin';
export type Language = 'ru' | 'kz' | 'en';
export type Theme = 'light' | 'dark';

export interface User {
  id: string;
  name: string;
  surname: string;
  role: Role;
  class?: string;
  school: string;
  avatar?: string;
  subject?: string; // For teachers
  isClassTeacher?: boolean; // For teachers
  managedClass?: string; // For teachers
}

export interface SorScore {
  score: number;
  total: number;
}

export interface SochScore {
  score: number;
  total: number;
}

export interface QuarterGrade {
  q: number;
  sor: SorScore[];
  fo: number[];
  sorFoPercent: number;
  soch: SochScore;
  sochPercent: number;
  final: number;
}

export interface SubjectGrade {
  subject: string;
  quarters: QuarterGrade[];
  yearly: number;
  comment?: string;
}

export interface ClassStudent {
  id: string;
  name: string;
  fo: number[];
  sor: SorScore[];
  sorFoPercent: number;
  soch: SochScore;
  sochPercent: number;
  final: number;
  comment: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
}

export interface TeacherClass {
  id: string;
  name: string;
  subject: string;
  studentCount: number;
}

export interface RiskStudent {
  id: string;
  name: string;
  surname: string;
  class: string;
  score: number;
}

export interface ParentFeedItem {
  id: number;
  type: 'grade' | 'event' | 'achievement';
  text: string;
  date: string;
}

export interface SchoolStats {
  averageScoreByGrade: { grade: string; score: number }[];
  totalStudents: number;
  totalTeachers: number;
}
