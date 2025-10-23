<script lang="ts">
  import type { MicrogameProps } from '$lib/engine/types';
  export let level: MicrogameProps['level']; export let seed: MicrogameProps['seed']; export let end: MicrogameProps['end'];
  const rng = (n:number)=> (Math.abs(Math.sin(seed*n*7.7))*10000)%1;
  const bomb = Math.floor(rng(1)*3);
  const decoys = ['🎁','🍀','⭐'];
  function pick(i:number){ end(i===bomb?'lose':'win'); }
</script>
<div class="wrap" role="application" aria-label="Kies de veilige kist">
  <div class="grid">
    {#each [0,1,2] as i}
      <button class="box" on:click={() => pick(i)}>{i===bomb ? '💣' : decoys[i]}</button>
    {/each}
  </div>
</div>
<style>.wrap{display:grid;place-items:center;height:100%}.grid{display:grid;grid-template-columns:repeat(3, minmax(90px, 1fr));gap:.6rem}.box{font-size:2rem;padding:1rem;border-radius:12px;border:1px solid #ddd;box-shadow:0 2px 8px rgba(0,0,0,.08)}</style>
