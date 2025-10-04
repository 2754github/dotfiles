import { createServerClient } from '@supabase/ssr';
import { type SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import 'server-only';
import { type Database } from './type';

export const createClient = async (): Promise<SupabaseClient<Database>> => {
  const cookieStore = await cookies();

  return createServerClient(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    process.env['NEXT_PUBLIC_SUPABASE_URL']!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    process.env['SUPABASE_SECRET_KEY']!,
    {
      cookies: {
        getAll: () => {
          return cookieStore.getAll();
        },
        setAll: (cookiesToSet) => {
          try {
            for (const { name, options, value } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};

// eslint-disable-next-line max-lines-per-function
export const updateSession = async (
  request: NextRequest,
): Promise<NextResponse> => {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    process.env['NEXT_PUBLIC_SUPABASE_URL']!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    process.env['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY']!,
    {
      cookies: {
        getAll: () => {
          return request.cookies.getAll();
        },
        setAll: (cookiesToSet) => {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }

          supabaseResponse = NextResponse.next({
            request,
          });
          for (const { name, options, value } of cookiesToSet) {
            supabaseResponse.cookies.set(name, value, {
              ...options,
              // https://github.com/orgs/supabase/discussions/12303#discussioncomment-13556098
              httpOnly: true,
              sameSite: 'lax',
              secure: process.env.NODE_ENV !== 'development',
            });
          }
        },
      },
    },
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    user === null &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth') &&
    !request.nextUrl.pathname.startsWith('/error')
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = '/login';

    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
};
