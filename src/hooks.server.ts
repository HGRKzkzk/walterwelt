import type { Handle } from '@sveltejs/kit';
import { createServerClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
  const supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get: (key) => event.cookies.get(key),
      set: (key, value, options) =>
        event.cookies.set(key, value, { ...options, path: '/', httpOnly: true }),
      remove: (key, options) => event.cookies.delete(key, { ...options, path: '/' })
    }
  });

  event.locals.supabase = supabase;

  // probeer de user te krijgen, maar vang de "Auth session missing!" netjes op
  const { data, error } = await supabase.auth.getUser();
  if (error && error.message !== 'Auth session missing!') {
    console.warn('Supabase getUser unexpected error:', error.message);
  }

  event.locals.user = data?.user ?? null;

  return resolve(event);
};