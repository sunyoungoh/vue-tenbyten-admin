<template>
  <section class="container">
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
import { getNewOrders } from '@/api/order';

export default {
  components: {
    OrderList,
    LoadingSpinner,
  },
  async mounted() {
    const { data } = await getNewOrders();
    this.loading = false;
    this.orderList = data.outPutValue;
    this.title =
      this.orderListCount > 0
        ? {
            text: `신규 주문이 ${this.orderListCount}건 있습니다! '🥳`,
            css: 'highlighter highlighter__yellow',
          }
        : {
            text: `신규 주문이 없습니다 🥲 `,
            css: 'highlighter highlighter__grey',
          };
  },
  data() {
    return {
      loading: true,
      orderList: [],
      title: [],
    };
  },
  computed: {
    orderListCount() {
      return this.orderList.length;
    },
  },
};
</script>
<style scoped></style>
