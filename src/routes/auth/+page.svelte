<script lang="ts">
  export let form; // van SvelteKit form actions
</script>

<h1>Inloggen</h1>
<form method="POST">
  <input name="email" type="email" placeholder="E-mail" required />
  <input name="password" type="password" placeholder="Wachtwoord" required />
  <button name="login" value="1">Inloggen</button>
</form>

{#if form && form.message}<p>{form.message}</p>{/if}

<hr />
