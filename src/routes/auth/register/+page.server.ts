console.log('✅ +page.server.ts is loaded');
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  signup: async ({ request, locals }) => {
    const form = await request.formData();
    const email = String(form.get('email') ?? '').trim();
    const password = String(form.get('password') ?? '');
    const accepted = form.get('accept_terms');

    if (!email || !password || !accepted) {
      return fail(400, { message: 'Vul alle velden in.' });
    }

    const { data, error } = await locals.supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: 'http://localhost:5173/auth/confirm' }
    });

    if (error) {
      return fail(400, { message: error.message });
    }

    if (data.session) {
      throw redirect(303, '/private');
    }
    return { success: true, message: 'Check je e-mail om te bevestigen.' };
  }
};