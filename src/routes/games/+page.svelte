<script lang="ts">
  import { MICROGAMES } from '$lib/registry';
  import type { MicrogameMeta, MicrogameResult } from '$lib/engine/types';
  import { onDestroy } from 'svelte';
  let state: 'menu'|'ready'|'playing'|'result'|'gameover' = 'menu';
  let score = 0; let lives = 4; let level = 0; let round = 0;
  let current: { meta: MicrogameMeta; Comp: any; seed: number; duration: number }|null=null;
  let timeLeftMs = 0; let timer: any;
  const BASE_MS=3500, STEP_MS=300, MIN_MS=1200;
  const durationForLevel=(lvl:number)=>Math.max(MIN_MS,BASE_MS-lvl*STEP_MS);
  const randSeed=()=>Math.floor(Math.random()*1e9);
  async function pickGame(){const meta=MICROGAMES[Math.floor(Math.random()*MICROGAMES.length)];const mod=await meta.load();return {meta,Comp:mod.default,seed:randSeed(),duration:meta.durationMs??durationForLevel(level)};}
  function runTimer(total:number,onExpire:()=>void){clearInterval(timer);timeLeftMs=total;const start=performance.now();timer=setInterval(()=>{const e=performance.now()-start;timeLeftMs=Math.max(0,total-e);if(e>=total){clearInterval(timer);onExpire();}},16);}
  async function nextRound(){if(lives<=0)return state='gameover';round++;state='ready';current=await pickGame();setTimeout(()=>startRound(),900);}
  function startRound(){if(!current)return;state='playing';runTimer(current.duration,()=>endRound('lose'));}
  function endRound(r:MicrogameResult){clearInterval(timer);state='result';if(r==='win'){score+=100+Math.max(0,Math.floor(timeLeftMs/10));if(score>0&&(round%3===0))level++;}else{lives--;if(lives<=0)return state='gameover';}setTimeout(()=>nextRound(),900);}
  function startRun(){score=0;lives=4;level=0;round=0;nextRound();}
  function reset(){score=0;lives=4;level=0;round=0;state='menu';}
  onDestroy(()=>clearInterval(timer));
</script>
 {score}
<div class="shell">
  {#if state==='menu'}
    <button on:click={startRun}>Start</button>
  {:else if state==='playing'}
    {#if current}
      <svelte:component this={current.Comp} level={level} seed={current.seed} end={endRound}/>
    {/if}
  {:else if state==='gameover'}
    <div>Game Over - Score: {score}</div>
  {/if}
</div>

<style>
  .shell{display:grid;place-items:center;height:100vh;font-family:sans-serif;}
</style>
