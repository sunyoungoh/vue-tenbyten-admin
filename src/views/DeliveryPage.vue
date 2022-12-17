<template>
  <section>
    <LoadingSpinner v-if="loading" />
    <template v-else>
      <h1 class="sales-title">
        <i class="uil uil-angle-left-b"></i>
        <span> {{ nowMonth }}</span>
        <i class="uil uil-angle-right-b"></i>
      </h1>
      <div class="order-list-container">
        <h1 :class="title.css">{{ title.text }}</h1>
        <OrderHistoryList v-if="orderListCount > 0" :items="orderList" />
      </div>
    </template>
  </section>
</template>

<script>
import OrderHistoryList from '@/components/OrderHistoryList.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { getDispatchOrderHistory } from '@/api/order';

export default {
  components: {
    OrderHistoryList,
    LoadingSpinner,
  },
  async mounted() {
    const { data } = await getDispatchOrderHistory();
    this.loading = false;
    this.orderList = data;
    this.title =
      this.orderListCount > 0
        ? {
            text: `메일 발송이 완료된 주문은 ${this.orderListCount}건입니다! 💌`,
            css: 'highlighter highlighter__yellow',
          }
        : {
            text: `메일 발송이 완료된 주문이 없습니다 🥲 `,
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
    nowMonth() {
      return `${new Date().getFullYear()}.${new Date().getMonth() + 1}`;
    },
  },
};
</script>
<style scoped></style>
