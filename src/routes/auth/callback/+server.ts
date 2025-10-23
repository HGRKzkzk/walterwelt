// src/routes/auth/callback/+server.ts
import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals }) => {
  const code = url.searchParams.get('code');
  if (code) {
    const { error } = await locals.supabase.auth.exchangeCodeForSession(code);
    if (error) throw redirect(303, '/auth?error=callback');
  }
  throw redirect(303, '/private');
};