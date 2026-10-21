type Owned = { id: string; user_id: string; created_at: string };
export type SubjectRow = Owned & {
  name: string;
  category: string;
  color: string;
  goal_minutes: number;
};
export type TaskRow = Owned & {
  subject_id: string;
  title: string;
  scheduled_date: string;
  minutes: number;
  done: boolean;
  kind: string;
};
export type SessionRow = Owned & {
  subject_id: string;
  study_date: string;
  minutes: number;
};
export type ExamRow = Owned & {
  subject_id: string;
  title: string;
  exam_date: string;
  confirmed: boolean;
};
type PreferenceRow = {
  user_id: string;
  daily_goal: number;
  reminder_time: string;
  timezone: string;
  email_requested: boolean;
  push_requested: boolean;
};
type Table<Row, Insert> = {
  Row: Row;
  Insert: Insert;
  Update: Partial<Row>;
  Relationships: [];
};
export type Database = {
  public: {
    Tables: {
      profiles: Table<
        { id: string; display_name: string; created_at: string },
        { id: string; display_name?: string }
      >;
      subjects: Table<
        SubjectRow,
        Pick<SubjectRow, "name" | "category" | "color"> &
          Partial<Owned & { goal_minutes: number }>
      >;
      study_tasks: Table<
        TaskRow,
        Omit<TaskRow, "id" | "user_id" | "created_at"> & Partial<Owned>
      >;
      study_sessions: Table<
        SessionRow,
        Omit<SessionRow, "id" | "user_id" | "created_at"> & Partial<Owned>
      >;
      exam_dates: Table<
        ExamRow,
        Omit<ExamRow, "id" | "user_id" | "created_at"> & Partial<Owned>
      >;
      notification_preferences: Table<
        PreferenceRow,
        Pick<PreferenceRow, "user_id"> & Partial<PreferenceRow>
      >;
    };
    Views: Record<string, never>;
    Functions: {
      delete_study_data: { Args: Record<string, never>; Returns: undefined };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
