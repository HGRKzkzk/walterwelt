import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  if (!locals.user) throw redirect(303, '/auth');

  const { data: profile, error } = await locals.supabase
    .from('profiles')
    .select('display_name, avatar_url, updated_at, created_at')
    .eq('user_id', locals.user.id)
    .single();

  if (error && error.code !== 'PGRST116') { // 116 = no rows
    console.error('Load profile error:', error);
  }

  return { profile };
};