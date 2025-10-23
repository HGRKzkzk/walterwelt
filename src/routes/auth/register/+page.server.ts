export const actions = {
  test: async ({ request }) => {
    const data = await request.formData();
    console.log('✅ Action reached! email=', data.get('email'));
    return { success: true };
  }
};