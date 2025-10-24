import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  username: string;
  total_points: number;
  created_at: string;
}

export interface Activity {
  id: string;
  user_id: string;
  activity_type: 'transportation' | 'energy' | 'food';
  transportation_mode?: string;
  // CHANGE 1: Renamed from distance_miles to distance_km
  distance_km?: number; 
  energy_kwh?: number;
  // NOTE: The diet_type field is retained, but the string values it holds 
  // (e.g., 'traditional-vegetarian') now align with the Indian version.
  diet_type?: string; 
  carbon_kg: number;
  points_earned: number;
  activity_date: string;
  created_at: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  achievement_type: string;
  title: string;
  description: string;
  points: number;
  earned_at: string;
}