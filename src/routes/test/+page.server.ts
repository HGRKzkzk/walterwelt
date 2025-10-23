export const actions = {
  ping: async () => {
    console.log('✅ Test route reached!');
    return { ok: true };
  }
};