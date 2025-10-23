<script lang="ts">
import type { MicrogameProps } from '$lib/engine/types';
export let level: MicrogameProps['level'];
export let seed: MicrogameProps['seed'];
export let end: MicrogameProps['end'];


const arrows = ['ArrowUp','ArrowRight','ArrowDown','ArrowLeft'] as const;
const target = arrows[Math.floor(((Math.sin(seed*123)+1)/2)*arrows.length)];


let pressed = '';
function onKey(e: KeyboardEvent) {
if (arrows.includes(e.key as any)) {
pressed = e.key;
if (pressed === target) end('win');
else end('lose');
}
}


// Touch UI voor mobiel
function press(k: string) {
pressed = k;
if (pressed === target) end('win');
else end('lose');
}
</script>


<svelte:window on:keydown={onKey} />


<div class="wrap" role="application" aria-label="Druk de juiste pijl">
<div class="target">{target.replace('Arrow','')}</div>
<div class="pad">
<button on:click={() => press('ArrowUp')} aria-label="Omhoog">▲</button>
<div class="mid">
<button on:click={() => press('ArrowLeft')} aria-label="Links">◀</button>
<div class="spacer"></div>
<button on:click={() => press('ArrowRight')} aria-label="Rechts">▶</button>
</div>
<button on:click={() => press('ArrowDown')} aria-label="Omlaag">▼</button>
</div>
</div>


<style>
.wrap { display:grid; place-items:center; width:100%; height:100%; gap:1rem; }
.target { font-size: clamp(2rem, 6vw, 4rem); font-weight: 800; letter-spacing:.04em; }
.pad { display:grid; gap:.5rem; user-select:none; }
.mid { display:flex; gap:.5rem; align-items:center; justify-content:center; }
button { font-size:2rem; padding:.6rem 1rem; border-radius:12px; border:1px solid #ddd; box-shadow:0 2px 8px rgba(0,0,0,.08); }
</style>