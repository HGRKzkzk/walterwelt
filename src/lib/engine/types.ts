export type MicrogameResult = 'win' | 'lose';


export interface MicrogameProps {
level: number;
seed: number;
end: (result: MicrogameResult) => void;
}


export interface MicrogameMeta {
id: string;
title: string;
description?: string;
// optioneel eigen duratie; als unset gebruikt engine de level-based duratie
durationMs?: number;
// dynamic import van de Svelte component
load: () => Promise<{ default: any }>; // any = SvelteComponentType
}