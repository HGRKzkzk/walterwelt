import type { Actions } from './$types';

export const actions: Actions = {
  login: async ({ request, locals }) => {
    const form = await request.formData();
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');
    const { error } = await locals.supabase.auth.signInWithPassword({ email, password });

    return error ? { success: false, message: error.message } : { success: true };
  },
  logout: async ({ locals }) => {
    await locals.supabase.auth.signOut();
    return { success: true };
  }
};