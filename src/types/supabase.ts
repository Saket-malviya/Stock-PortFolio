export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      stocks: {
        Row: {
          id: string
          name: string
          ticker: string
          quantity: number
          buy_price: number
          current_price: number | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['stocks']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['stocks']['Insert']>
      }
    }
  }
}