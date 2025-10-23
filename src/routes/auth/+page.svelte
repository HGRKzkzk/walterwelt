<script lang="ts">
  export let form; // van SvelteKit form actions
</script>
einloggen!! 
<form method="POST" action="?/login">
  <input name="email" type="email" placeholder="E-mail" required />
  <input name="password" type="password" placeholder="Wachtwoord" required />
  <button name="login" value="1">Inloggen</button>
</form>
{#if form && form.message}<p>{form.message}</p>{/if}

<a href="/auth/register">Nog geen account? Registreer hier.</a>

<hr />
