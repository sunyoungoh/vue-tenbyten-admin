<template>
  <div id="app">
    <AppHeader />
    <AppNav />
    <router-view id="main" />
    <footer>© 2022 SunYoungOh. All right reserved.</footer>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppNav from '@/components/AppNav.vue';

export default {
  components: {
    AppHeader,
    AppNav,
  },
};
</script>
<style>
@import './assets/style.css';
</style>
