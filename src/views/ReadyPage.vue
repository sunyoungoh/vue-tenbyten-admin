<template>
  <section>
    <LoadingSpinner v-if="loading" />
    <div class="order-list-container">
      <h1 :class="title.css">{{ title.text }}</h1>
      <OrderList v-if="orderListCount > 0" :items="orderList" />
    </div>
  </section>
</template>

<script>
import OrderList from '@/components/OrderList.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { getReadyOrders } from '@/api/order';

export default {
  components: {
    OrderList,
    LoadingSpinner,
  },
  async mounted() {
    const { data } = await getReadyOrders();
    this.orderList = data.outPutValue;
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
      orderList: [],
      title: [],
    };
  },
  computed: {
    loading() {
      return this.$store.state.order.loading;
    },
    orderListCount() {
      return this.orderList.length;
    },
  },
};
</script>
<style scoped></style>
