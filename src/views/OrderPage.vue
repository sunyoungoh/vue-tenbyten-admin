<template>
  <section class="container order">
    <LoadingSpinner v-if="loading" />
    <template v-else>
      <h1 :class="title.css">{{ title.text }}</h1>
      <OrderList class="content" v-if="orderListCount > 0" :items="orderList" />
    </template>
  </section>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import OrderList from '@/components/order/OrderList.vue';

export default {
  components: {
    LoadingSpinner,
    OrderList,
  },
  async mounted() {
    await this.$store.dispatch('fetchOrderList', 'order');
    this.title =
      this.orderListCount > 0
        ? {
            text: `신규 주문이 ${this.orderListCount}건 있습니다! 🥳`,
            css: 'highlighter highlighter__yellow',
          }
        : {
            text: `신규 주문이 없습니다 🥲 `,
            css: 'highlighter highlighter__grey',
          };
  },
  data() {
    return {
      title: [],
    };
  },
  computed: {
    loading() {
      return this.$store.state.order.loading;
    },
    orderList() {
      return this.$store.state.order.orderList;
    },
    orderListCount() {
      return this.orderList.length;
    },
  },
};
</script>
<style scoped></style>
