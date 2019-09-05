<template>
  <div class="signup container">
    <form class="card-panel">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="text" name="email" id="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" id="password">
      </div>
      <div class="field">
        <label for="alias">Alias:</label>
        <input type="text" name="alias" id="alias">
      </div>
      <div class="field center">
        <button class="btn deep-purple">Sinup</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      
    }
  }
}
</script>

<style>
  .signup{
    max-width: 400px;
    margin-top: 60px;
  }

  .signup h2 {
    font-size: 2.4em;
  }

  .signup .field {
    margin-bottom: 16px;
  }
</style>