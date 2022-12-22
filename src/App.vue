<template>
  <div id="app">
    <AppHeader v-if="isLogin" />
    <AppNav v-if="isLogin" />
    <main id="main">
      <LoginForm v-if="!isLogin" />

      <router-view />
    </main>
    <!-- <footer>© 2022 SunYoungOh. All right reserved.</footer> -->
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppNav from '@/components/AppNav.vue';
import LoginForm from '@/components/LoginForm.vue';

export default {
  components: {
    AppHeader,
    AppNav,
    LoginForm,
  },
  computed: {
    isLogin() {
      return this.$store.state.user.isLogin;
    },
  },
};
</script>
<style>
@import './assets/style.css';
</style>
