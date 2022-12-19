<template>
  <section>
    <LoadingSpinner v-if="loading" />
    <template v-else>
      <TitleMonth />
      <div class="sales-list-container">
        <div>
          <h1 :class="highlighter">{{ title }}</h1>
        </div>
        <template v-if="orderListCount > 0">
          <TopSales :top-one="topOne" :top-two="topTwo" :top-three="topThree" />
          <SalesList :items="orderList" />
        </template>
      </div>
    </template>
  </section>
</template>

<script>
import TitleMonth from '@/components/TitleMonth.vue';
import TopSales from '@/components/TopSales.vue';
import SalesList from '@/components/SalesList.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { comma } from '@/utils/filters';

export default {
  components: {
    TitleMonth,
    TopSales,
    SalesList,
    LoadingSpinner,
  },
  async mounted() {
    if (this.orderList !== '') {
      await this.$store.dispatch('fetchOrderList');
    }
  },
  data() {
    return {
      topOne: {},
      topTwo: {},
      topThree: {},
    };
  },
  computed: {
    loading() {
      return this.$store.state.order.loading;
    },
    month() {
      return this.$store.state.order.month;
    },
    year() {
      return this.$store.state.order.year;
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
    monthText() {
      let month;
      this.month == new Date().getMonth()
        ? (month = '이번달')
        : this.month == new Date().getMonth() - 1
        ? (month = '지난달')
        : (month = `${this.month + 1}월`);
      return month;
    },
    orderList() {
      return this.$store.getters.getOrderList;
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
  watch: {
    orderList() {
      this.fetchTopSales();
    },
  },
  methods: {
    fetchTopSales() {
      let itemIdArr = this.orderList.map(item => item.itemId);
      let countById = {};
      itemIdArr.forEach(itemId => {
        countById[itemId] = (countById[itemId] || 0) + 1;
      });
      let sortedArr = Object.entries(countById).sort((a, b) => b[1] - a[1]);
      let countArr = [...new Set(sortedArr.map(item => item[1]))];
      this.topOne = {
        items: sortedArr
          .filter(item => countArr[0] == item[1])
          .map(item => item[0]),
        count: countArr[0],
      };
      this.topTwo = {
        items: sortedArr
          .filter(item => countArr[1] == item[1])
          .map(item => item[0]),
        count: countArr[1],
      };
      this.topThree = {
        items: sortedArr
          .filter(item => countArr[2] == item[1])
          .map(item => item[0]),
        count: countArr[2],
      };
    },
  },
};
</script>
<style scoped></style>
