<template>
  <div id="app">
    <template v-if="$route.path !== '/login'">
      <AppHeader />
      <AppNav />
    </template>
    <main id="main">
      <router-view />
    </main>
    <footer>© 2022 SunYoungOh. All right reserved.</footer>
  </div>
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue';
import AppNav from '@/components/common/AppNav.vue';

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
