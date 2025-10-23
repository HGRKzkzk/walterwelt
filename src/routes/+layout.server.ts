export const load = async ({ locals }) => {
  return { user: locals.user }; // beschikbaar als data.user in alle pagina's
};