<script lang="ts">
  import type { MicrogameProps } from '$lib/engine/types';
  export let level: MicrogameProps['level']; export let seed: MicrogameProps['seed']; export let end: MicrogameProps['end'];
  const rng = (n:number)=> (Math.abs(Math.sin(seed*n*1.2345))*10000)%1;
  const a = Math.floor(rng(1)* (10+level*5)) + 1;
  const b = Math.floor(rng(2)* (10+level*5)) + 1;
  const op = rng(3) > 0.5 ? '+' : '−';
  const correct = op==='+' ? a+b : a-b;
  const wrong1 = correct + (Math.floor(rng(4)*3)+1) * (rng(5)>0.5?1:-1);
  const wrong2 = correct + (Math.floor(rng(6)*5)+2) * (rng(7)>0.5?1:-1);
  let choices = [correct, wrong1, wrong2].sort(()=> rng(8)-0.5);
  function pick(v:number){ end(v===correct?'win':'lose'); }
</script>
<div class="q" role="application" aria-label="Kies het juiste antwoord">
  <h2 class="expr">{a} {op} {b} = ?</h2>
  <div class="choices">
    {#each choices as c}<button on:click={() => pick(c)}>{c}</button>{/each}
  </div>
</div>
<style>.q{display:grid;gap:1rem;place-items:center;height:100%}.expr{font-size:clamp(2rem,6vw,3rem);margin:0}.choices{display:flex;gap:.6rem}button{padding:.6rem 1rem;border-radius:12px;border:1px solid #ddd;box-shadow:0 2px 8px rgba(0,0,0,.08)}</style>