<template>
  <section class="container sales">
    <LoadingSpinner v-if="loading" />
    <template v-else>
      <TitleMonth />
      <h1 :class="highlighter">{{ title }}</h1>
      <div class="content" v-if="orderListCount > 0">
        <TopSales />
        <SalesList />
      </div>
    </template>
  </section>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import TitleMonth from '@/components/TitleMonth.vue';
import TopSales from '@/components/TopSales.vue';
import SalesList from '@/components/SalesList.vue';
import { comma } from '@/utils/filters';

export default {
  components: {
    LoadingSpinner,
    TitleMonth,
    TopSales,
    SalesList,
  },
  async mounted() {
    await this.$store.dispatch('fetchOrderList', 'sales');
  },
  computed: {
    loading() {
      return this.$store.state.order.loading;
    },
    year() {
      return this.$store.state.order.year;
    },
    month() {
      return this.$store.state.order.month;
    },
    monthText() {
      return this.$store.getters.monthText;
    },
    orderList() {
      return this.$store.getters.monthlyOrderList;
    },
    orderListCount() {
      return this.orderList.length;
    },
    orderAmount() {
      let amount = this.orderList
        .map(item => item.price)
        .reduce((prev, curr) => prev + curr);
      return amount;
    },
    highlighter() {
      return this.orderList.length > 0
        ? 'highlighter highlighter__yellow'
        : 'highlighter highlighter__grey';
    },
    title() {
      return this.orderListCount > 0
        ? `${this.monthText} 매출은 ${comma(this.orderAmount)}원입니다! 💰`
        : `${this.monthText} 매출은 0원입니다. 🥲 `;
    },
  },
};
</script>
<style scoped></style>
