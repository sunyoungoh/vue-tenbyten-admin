<template>
  <header>
    <div class="logo"><img src="@/assets/logo.png" alt="logo" /></div>
    <div class="logout" v-if="isLogin" @click="logout">
      <i class="uil uil-sign-out-alt"></i>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.state.user.isLogin;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>

<style></style>
