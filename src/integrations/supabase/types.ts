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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string | null
          category: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          is_published: boolean
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      company_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: string | null
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      contact_inquiries: {
        Row: {
          admin_notes: string | null
          city: string | null
          created_at: string
          first_campaign: string | null
          first_content: string | null
          first_gbraid: string | null
          first_gclid: string | null
          first_landing_page: string | null
          first_medium: string | null
          first_referrer: string | null
          first_source: string | null
          first_term: string | null
          first_wbraid: string | null
          form_type: string | null
          from_neighborhood: string | null
          id: string
          is_read: boolean
          last_campaign: string | null
          last_content: string | null
          last_gbraid: string | null
          last_gclid: string | null
          last_landing_page: string | null
          last_medium: string | null
          last_referrer: string | null
          last_source: string | null
          last_term: string | null
          last_wbraid: string | null
          lead_status: string
          message: string | null
          moving_date: string | null
          name: string
          phone: string
          quoted_value: number | null
          reference_code: string | null
          sale_value: number | null
          service_type: string | null
          session_id: string | null
          to_neighborhood: string | null
          unqualified_reason: string | null
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          city?: string | null
          created_at?: string
          first_campaign?: string | null
          first_content?: string | null
          first_gbraid?: string | null
          first_gclid?: string | null
          first_landing_page?: string | null
          first_medium?: string | null
          first_referrer?: string | null
          first_source?: string | null
          first_term?: string | null
          first_wbraid?: string | null
          form_type?: string | null
          from_neighborhood?: string | null
          id?: string
          is_read?: boolean
          last_campaign?: string | null
          last_content?: string | null
          last_gbraid?: string | null
          last_gclid?: string | null
          last_landing_page?: string | null
          last_medium?: string | null
          last_referrer?: string | null
          last_source?: string | null
          last_term?: string | null
          last_wbraid?: string | null
          lead_status?: string
          message?: string | null
          moving_date?: string | null
          name: string
          phone: string
          quoted_value?: number | null
          reference_code?: string | null
          sale_value?: number | null
          service_type?: string | null
          session_id?: string | null
          to_neighborhood?: string | null
          unqualified_reason?: string | null
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          city?: string | null
          created_at?: string
          first_campaign?: string | null
          first_content?: string | null
          first_gbraid?: string | null
          first_gclid?: string | null
          first_landing_page?: string | null
          first_medium?: string | null
          first_referrer?: string | null
          first_source?: string | null
          first_term?: string | null
          first_wbraid?: string | null
          form_type?: string | null
          from_neighborhood?: string | null
          id?: string
          is_read?: boolean
          last_campaign?: string | null
          last_content?: string | null
          last_gbraid?: string | null
          last_gclid?: string | null
          last_landing_page?: string | null
          last_medium?: string | null
          last_referrer?: string | null
          last_source?: string | null
          last_term?: string | null
          last_wbraid?: string | null
          lead_status?: string
          message?: string | null
          moving_date?: string | null
          name?: string
          phone?: string
          quoted_value?: number | null
          reference_code?: string | null
          sale_value?: number | null
          service_type?: string | null
          session_id?: string | null
          to_neighborhood?: string | null
          unqualified_reason?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      faq_items: {
        Row: {
          answer: string
          created_at: string
          id: string
          is_visible: boolean
          question: string
          sort_order: number | null
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          is_visible?: boolean
          question: string
          sort_order?: number | null
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          is_visible?: boolean
          question?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          alt_text: string | null
          category: string | null
          created_at: string
          id: string
          image_url: string
          is_visible: boolean
          sort_order: number | null
          title: string | null
        }
        Insert: {
          alt_text?: string | null
          category?: string | null
          created_at?: string
          id?: string
          image_url: string
          is_visible?: boolean
          sort_order?: number | null
          title?: string | null
        }
        Update: {
          alt_text?: string | null
          category?: string | null
          created_at?: string
          id?: string
          image_url?: string
          is_visible?: boolean
          sort_order?: number | null
          title?: string | null
        }
        Relationships: []
      }
      lead_interactions: {
        Row: {
          created_at: string
          current_page: string | null
          event_type: string
          first_campaign: string | null
          first_content: string | null
          first_gbraid: string | null
          first_gclid: string | null
          first_landing_page: string | null
          first_medium: string | null
          first_referrer: string | null
          first_source: string | null
          first_term: string | null
          first_wbraid: string | null
          form_type: string | null
          id: string
          last_campaign: string | null
          last_content: string | null
          last_gbraid: string | null
          last_gclid: string | null
          last_landing_page: string | null
          last_medium: string | null
          last_referrer: string | null
          last_source: string | null
          last_term: string | null
          last_wbraid: string | null
          reference_code: string | null
          session_id: string | null
        }
        Insert: {
          created_at?: string
          current_page?: string | null
          event_type: string
          first_campaign?: string | null
          first_content?: string | null
          first_gbraid?: string | null
          first_gclid?: string | null
          first_landing_page?: string | null
          first_medium?: string | null
          first_referrer?: string | null
          first_source?: string | null
          first_term?: string | null
          first_wbraid?: string | null
          form_type?: string | null
          id?: string
          last_campaign?: string | null
          last_content?: string | null
          last_gbraid?: string | null
          last_gclid?: string | null
          last_landing_page?: string | null
          last_medium?: string | null
          last_referrer?: string | null
          last_source?: string | null
          last_term?: string | null
          last_wbraid?: string | null
          reference_code?: string | null
          session_id?: string | null
        }
        Update: {
          created_at?: string
          current_page?: string | null
          event_type?: string
          first_campaign?: string | null
          first_content?: string | null
          first_gbraid?: string | null
          first_gclid?: string | null
          first_landing_page?: string | null
          first_medium?: string | null
          first_referrer?: string | null
          first_source?: string | null
          first_term?: string | null
          first_wbraid?: string | null
          form_type?: string | null
          id?: string
          last_campaign?: string | null
          last_content?: string | null
          last_gbraid?: string | null
          last_gclid?: string | null
          last_landing_page?: string | null
          last_medium?: string | null
          last_referrer?: string | null
          last_source?: string | null
          last_term?: string | null
          last_wbraid?: string | null
          reference_code?: string | null
          session_id?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          city: string | null
          created_at: string
          id: string
          is_visible: boolean
          name: string
          rating: number
          sort_order: number | null
          text: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          id?: string
          is_visible?: boolean
          name: string
          rating?: number
          sort_order?: number | null
          text: string
        }
        Update: {
          city?: string | null
          created_at?: string
          id?: string
          is_visible?: boolean
          name?: string
          rating?: number
          sort_order?: number | null
          text?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
