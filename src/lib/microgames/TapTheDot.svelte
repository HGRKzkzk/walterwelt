<script lang="ts">
import type { MicrogameProps } from '$lib/engine/types';
export let level: MicrogameProps['level'];
export let seed: MicrogameProps['seed'];
export let end: MicrogameProps['end'];


// Plaats en grootte variëren met level
const size = Math.max(24, 64 - level * 8);
const rng = (n: number) => {
// simpele pseudo-rng op basis van seed
return (Math.sin(seed * 999 + n * 77) + 1) / 2;
};
const x = Math.floor(rng(1) * 80) + 10; // %
const y = Math.floor(rng(2) * 60) + 20; // %


function handleTap() {
end('win');
}
</script>


<div class="game-area" role="application" aria-label="Tik de stip">
<button class="dot" style={`left:${x}%; top:${y}%; width:${size}px; height:${size}px;`} on:click={handleTap} aria-label="Tik de stip"></button>
</div>


<style>
.game-area { position: relative; width: 100%; height: 100%; }
.dot {
position: absolute;
border-radius: 9999px;
border: 0;
background: var(--accent, #6cf);
box-shadow: 0 4px 12px rgba(0,0,0,.2);
cursor: pointer;
}
</style>