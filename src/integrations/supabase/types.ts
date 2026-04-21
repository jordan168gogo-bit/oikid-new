export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          achievement_id: string
          id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          id?: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: []
      }
      check_ins: {
        Row: {
          calendar: Json
          cycle_start: string
          id: string
          user_id: string
        }
        Insert: {
          calendar?: Json
          cycle_start?: string
          id?: string
          user_id: string
        }
        Update: {
          calendar?: Json
          cycle_start?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_missions: {
        Row: {
          date: string
          id: string
          missions: Json
          user_id: string
        }
        Insert: {
          date?: string
          id?: string
          missions?: Json
          user_id: string
        }
        Update: {
          date?: string
          id?: string
          missions?: Json
          user_id?: string
        }
        Relationships: []
      }
      farm_plots: {
        Row: {
          growth: number
          id: string
          item_id: string
          item_type: string
          max_growth: number
          planted_at: string
          plot_index: number
          user_id: string
        }
        Insert: {
          growth?: number
          id?: string
          item_id: string
          item_type?: string
          max_growth?: number
          planted_at?: string
          plot_index: number
          user_id: string
        }
        Update: {
          growth?: number
          id?: string
          item_id?: string
          item_type?: string
          max_growth?: number
          planted_at?: string
          plot_index?: number
          user_id?: string
        }
        Relationships: []
      }
      learning_stats: {
        Row: {
          date: string
          id: string
          quiz_correct: number
          quiz_total: number
          user_id: string
          words_studied: number
        }
        Insert: {
          date?: string
          id?: string
          quiz_correct?: number
          quiz_total?: number
          user_id: string
          words_studied?: number
        }
        Update: {
          date?: string
          id?: string
          quiz_correct?: number
          quiz_total?: number
          user_id?: string
          words_studied?: number
        }
        Relationships: []
      }
      login_dates: {
        Row: {
          id: string
          login_date: string
          user_id: string
        }
        Insert: {
          id?: string
          login_date?: string
          user_id: string
        }
        Update: {
          id?: string
          login_date?: string
          user_id?: string
        }
        Relationships: []
      }
      pets: {
        Row: {
          created_at: string
          hearts: number
          id: string
          pet_name: string | null
          pet_type: string
          rarity: string
          stage: string
          user_id: string
        }
        Insert: {
          created_at?: string
          hearts?: number
          id?: string
          pet_name?: string | null
          pet_type: string
          rarity?: string
          stage?: string
          user_id: string
        }
        Update: {
          created_at?: string
          hearts?: number
          id?: string
          pet_name?: string | null
          pet_type?: string
          rarity?: string
          stage?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          app_mode: string
          child_name: string
          created_at: string
          id: string
          stars: number
          updated_at: string
        }
        Insert: {
          app_mode?: string
          child_name?: string
          created_at?: string
          id: string
          stars?: number
          updated_at?: string
        }
        Update: {
          app_mode?: string
          child_name?: string
          created_at?: string
          id?: string
          stars?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
