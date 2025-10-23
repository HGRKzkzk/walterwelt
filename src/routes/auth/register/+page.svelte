<script>
  let { form } = $props();
</script>
<form method="POST" action="?/signup">
  <input type="email" name="email" placeholder="E-mail" required />
  <input type="password" name="password" placeholder="Wachtwoord" minlength="8" required />
  <input type="checkbox" name="accept_terms" required />
  <button name="signup" value="">Account aanmaken</button>
</form>
{#if form?.message}
  <p style="margin-top:8px; color:{form.success ? 'green' : 'crimson'}">
    {form.message}
  </p>
{/if}