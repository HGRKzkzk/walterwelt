// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
	 interface Locals {
      supabase: ReturnType<typeof import('$lib/server/supabase').supabaseServerClient>;
      user: import('@supabase/supabase-js').User | null;
    }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
