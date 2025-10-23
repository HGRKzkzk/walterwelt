<script lang="ts">
  import type { MicrogameProps } from '$lib/engine/types';
  import { onMount } from 'svelte';
  export let level: MicrogameProps['level']; export let seed: MicrogameProps['seed']; export let end: MicrogameProps['end'];
  let raf=0, t=0; const bpm = 60 + level*20; const period = 60000/bpm;
  let base=0;
  function loop(ts:number){ if(!base) base=ts; t = (ts-base) % period; raf=requestAnimationFrame(loop); }
  function tap(){ const delta = Math.min(t, period - t); const window = Math.max(60, 180 - level*20); end(delta <= window ? 'win' : 'lose'); }
  onMount(()=>{ raf=requestAnimationFrame(loop); return ()=> cancelAnimationFrame(raf); });
</script>
<div class="wrap" role="application" aria-label="Tik op de tel">
  <div class="beat" style={`transform:scale(${1 + 0.2*Math.cos((t/period)*Math.PI*2)})`}></div>
  <button class="btn" on:click={tap}>TAP</button>
</div>
<style>.wrap{display:grid;gap:1rem;place-items:center;height:100%}.beat{width:90px;height:90px;border-radius:999px;background:#a78bfa;transition:transform .05s linear}.btn{padding:.8rem 1.2rem;border:1px solid #ddd;border-radius:12px;font-weight:700}</style>