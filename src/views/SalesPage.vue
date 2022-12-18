<template>
  <section>
    <TitleMonth @fetch-data="fetchData" />
  </section>
</template>

<script>
import TitleMonth from '@/components/TitleMonth.vue';
export default {
  components: {
    TitleMonth,
  },
};
</script>

<style></style>
