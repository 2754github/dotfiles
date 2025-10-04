import { type SupabaseClient, type User } from '@supabase/supabase-js';
import 'server-only';
import { type Database } from '../supabase/type';

export type Context = EmptyContext | SupabaseContext | UserContext;

export const emptyContext = {} as const;

export type EmptyContext = typeof emptyContext;

export type SupabaseContext = {
  supabase: SupabaseClient<Database>;
};

export type UserContext = SupabaseContext & {
  user: User;
};
