export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

export type ExperienceLevel = 'Junior' | 'Mid' | 'Senior' | 'Staff' | 'Principal';

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'reviewing'
  | 'interviewing'
  | 'offered'
  | 'rejected'
  | 'accepted';

export type UserRole = 'user' | 'employer' | 'admin';

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: UserRole;
  company?: string;
  location?: string;
  bio?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  resume_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  company_domain?: string;
  company_logo_url?: string;
  location: string;
  salary_min?: number;
  salary_max?: number;
  salary_currency: string;
  job_type: JobType;
  experience_level: ExperienceLevel;
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  tags?: string[];
  remote: boolean;
  featured: boolean;
  employer_id?: string;
  applicants_count: number;
  views_count: number;
  status: 'active' | 'closed' | 'draft';
  posted_at: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  job_id: string;
  user_id: string;
  status: ApplicationStatus;
  cover_letter?: string;
  resume_url?: string;
  portfolio_url?: string;
  additional_info?: Record<string, any>;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface SavedJob {
  id: string;
  user_id: string;
  job_id: string;
  created_at: string;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'coding' | 'interactive';
  duration: string;
  content?: string;
  videoUrl?: string;
  codeChallenge?: {
    description: string;
    starterCode: string;
    solution: string;
    tests: string[];
  };
}

export interface Course {
  id: string;
  job_id: string;
  title: string;
  description?: string;
  total_lessons: number;
  total_duration_minutes: number;
  price_cents: number;
  modules: CourseModule[];
  created_at: string;
  updated_at: string;
}

export interface CoursePurchase {
  id: string;
  user_id: string;
  course_id: string;
  job_id: string;
  amount_paid_cents: number;
  payment_method?: string;
  payment_intent_id?: string;
  purchased_at: string;
}

export interface CourseProgress {
  id: string;
  user_id: string;
  course_id: string;
  completed_lessons: number[];
  current_lesson: number;
  progress_percentage: number;
  started_at: string;
  last_accessed_at: string;
  completed_at?: string;
}

export interface ActivityLog {
  id: string;
  user_id?: string;
  action: string;
  resource_type?: string;
  resource_id?: string;
  metadata?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

// Helper type for job with employer profile
export interface JobWithEmployer extends Job {
  employer?: Profile;
}

// Helper type for application with job and user
export interface ApplicationWithDetails extends Application {
  job?: Job;
  user?: Profile;
}

// Helper type for course with job
export interface CourseWithJob extends Course {
  job?: Job;
}

// Database schema type
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      jobs: {
        Row: Job;
        Insert: Omit<Job, 'id' | 'applicants_count' | 'views_count' | 'created_at' | 'updated_at' | 'posted_at'>;
        Update: Partial<Omit<Job, 'id' | 'created_at' | 'posted_at'>>;
      };
      applications: {
        Row: Application;
        Insert: Omit<Application, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Application, 'id' | 'created_at'>>;
      };
      saved_jobs: {
        Row: SavedJob;
        Insert: Omit<SavedJob, 'id' | 'created_at'>;
        Update: never;
      };
      courses: {
        Row: Course;
        Insert: Omit<Course, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Course, 'id' | 'created_at'>>;
      };
      course_purchases: {
        Row: CoursePurchase;
        Insert: Omit<CoursePurchase, 'id' | 'purchased_at'>;
        Update: never;
      };
      course_progress: {
        Row: CourseProgress;
        Insert: Omit<CourseProgress, 'id' | 'progress_percentage' | 'started_at' | 'last_accessed_at'>;
        Update: Partial<Omit<CourseProgress, 'id' | 'started_at'>>;
      };
      activity_logs: {
        Row: ActivityLog;
        Insert: Omit<ActivityLog, 'id' | 'created_at'>;
        Update: never;
      };
    };
  };
}
