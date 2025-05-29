import { createBrowserClient } from '@supabase/ssr';
import { type SupabaseClient } from '@supabase/supabase-js';
import { type Database } from './type';

export const createClient = (): SupabaseClient<Database> => {
  return createBrowserClient(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    process.env['NEXT_PUBLIC_SUPABASE_URL']!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']!,
  );
};
