<template>
  <section class="container ready">
    <LoadingSpinner v-if="loading" />
    <template v-else>
      <h1 :class="title.css">{{ title.text }}</h1>
      <OrderList class="content" v-if="orderListCount > 0" :items="orderList" />
    </template>
  </section>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import OrderList from '@/components/OrderList.vue';

export default {
  components: {
    LoadingSpinner,
    OrderList,
  },
  async mounted() {
    await this.$store.dispatch('fetchOrderList', 'ready');
    this.title =
      this.orderListCount > 0
        ? {
            text: `배송 준비 중인 주문이 ${this.orderListCount}건 있습니다! 📦`,
            css: 'highlighter highlighter__yellow',
          }
        : {
            text: `배송 준비 중인 주문이 없습니다 🥲 `,
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
