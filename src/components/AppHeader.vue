<template>
  <header>
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/logo.png" alt="logo" />
      </router-link>
    </div>
    <div class="logout" @click="logout">
      <i class="uil uil-sign-out-alt"></i>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  },
};
</script>

<style></style>
