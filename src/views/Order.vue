<template>
  <section>
    <LoadingSpinner v-if="loading" />
    <OrderList v-else />
  </section>
</template>

<script>
import OrderList from '@/components/OrderList.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
  components: {
    OrderList,
    LoadingSpinner,
  },
  async mounted() {
    this.$store.commit('setClickedBtn', 'new-orders');
    await this.$store.dispatch('getOrdersData');
  },
  computed: {
    loading() {
      return this.$store.state.order.loading;
    },
  },
};
</script>
<style scoped>
.btns_order {
  padding-top: 0;
}
</style>
