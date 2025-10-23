<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { MicrogameProps } from '$lib/engine/types';

  export let level: MicrogameProps['level'];
  export let seed: MicrogameProps['seed']; // niet gebruikt, maar behouden voor consistentie
  export let end: MicrogameProps['end'];

  // Instelbare moeilijkheid
  const speed = 0.9 + level * 0.2;                          // snelheid van de dot
  const targetStart = Math.max(0, 0.4 - Math.min(0.2, level * 0.03));
  const widthBase = 0.2 - Math.min(0.1, level * 0.02);
  const targetEnd = Math.min(1, targetStart + widthBase);

  let t = 0;             // 0..1 positie van de dot
  let raf = 0;           // requestAnimationFrame id
  let holding = false;
  let animating = false;

  function loop(ts: number) {
    // ts is high-res timestamp van rAF
    t = (Math.sin(ts * 0.002 * speed) + 1) / 2; // 0..1..0
    raf = requestAnimationFrame(loop);
  }

  // Optie A: animatie altijd laten lopen (simpel)
  // onMount(() => { startLoop(); return stopLoop; });

  // Optie B: animatie alleen tijdens vasthouden (zuiniger)
  function startLoop() {
    if (animating) return;
    animating = true;
    raf = requestAnimationFrame(loop);
  }
  function stopLoop() {
    if (!animating) return;
    cancelAnimationFrame(raf);
    animating = false;
  }

  function down() {
    holding = true;
    startLoop();
  }

  function up() {
    holding = false;
    // Bepaal hit exact op het loslaten
    const hit = t >= targetStart && t <= targetEnd;
    end(hit ? 'win' : 'lose');
    stopLoop();
  }

  function cancel() {
    holding = false;
    stopLoop();
    end('lose');
  }

  onMount(() => {
    // Fallback: als je liever altijd animatie hebt, zet hier startLoop();
    return () => stopLoop();
  });
  onDestroy(stopLoop);
</script>

<div class="wrap" role="application" aria-label="Laat los in de groene zone">
  <div class="bar" aria-hidden="true">
    <div class="zone" style={`left:${targetStart * 100}%; width:${(targetEnd - targetStart) * 100}%`}></div>
    <div class="dot" style={`left:${t * 100}%`}></div>
  </div>

  <button
    class="hold"
    on:pointerdown|passive={down}
    on:pointerup|passive={up}
    on:pointercancel|passive={cancel}
    on:keydown={(e) => (e.key === ' ' ? down() : null)}
    on:keyup={(e) => (e.key === ' ' ? up() : null)}
    aria-label="Houd ingedrukt en laat los in de groene zone"
  >
    Houd ingedrukt & laat los
  </button>
</div>

<style>
  .wrap { display:grid; gap:1rem; place-items:center; height:100%; }
  .bar { position:relative; width:min(700px,90vw); height:12px; background:#eee; border-radius:999px; overflow:hidden; }
  .zone { position:absolute; top:0; bottom:0; background:#86efac; border-radius:999px; }
  .dot  { position:absolute; top:-6px; width:24px; height:24px; border-radius:999px; background:#64748b; transform:translateX(-50%); }
  .hold { padding:.7rem 1rem; border-radius:12px; border:1px solid #ddd; box-shadow:0 2px 8px rgba(0,0,0,.06); }
  @media (prefers-reduced-motion: reduce) {
    .dot { transition:none; } /* geen extra animaties */
  }
</style>