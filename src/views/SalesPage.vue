<template>
  <section>
    <LoadingSpinner v-if="loading" />
    <template v-else>
      <TitleMonth @fetch-data="fetchData" />
      <div class="sales-list-container">
        <div>
          <h1 :class="title.css">{{ title.text }}</h1>
        </div>
        <div class="top3-sales">
          <div class="sales-item top1">
            <div class="pop-num">1</div>
            <p v-for="(item, i) in topOne.items" :key="i" class="item-name">
              {{ topOne.items[i] | itemName }}
            </p>
            <div class="sales-count">{{ topOne.count }}개</div>
          </div>
          <div class="sales-item top2">
            <div class="pop-num">2</div>
            <p v-for="(item, i) in topTwo.items" :key="i" class="item-name">
              {{ topTwo.items[i] | itemName }}
            </p>
            <div class="sales-count">{{ topTwo.count }}개</div>
          </div>
          <div class="sales-item top3">
            <div class="pop-num">3</div>
            <p v-for="(item, i) in topThree.items" :key="i" class="item-name">
              {{ topThree.items[i] | itemName }}
              <span v-if="topThree.items.length > 2">+1</span>
            </p>
            <div class="sales-count">{{ topThree.count }}개</div>
          </div>
        </div>
        <!-- <SalesList
          v-if="orderListCount > 0"
          :items="orderList"
          :month="month"
          :search="search"
        /> -->
      </div>
    </template>
  </section>
</template>

<script>
import TitleMonth from '@/components/TitleMonth.vue';
// import SalesList from '@/components/SalesList.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { getDispatchOrderHistory } from '@/api/order';

export default {
  components: {
    TitleMonth,
    // SalesList,
    LoadingSpinner,
  },
  async mounted() {
    const { data } = await getDispatchOrderHistory();
    this.loading = false;
    this.originOrderList = data;
    this.fetchData();
    this.fetchTopSales();
  },
  data() {
    return {
      loading: true,
      originOrderList: [],
      orderList: [],
      title: [],
      searchInput: '',
      search: false,
      topOne: {},
      topTwo: {},
      topThree: {},
    };
  },
  computed: {
    month() {
      return this.$store.state.order.month;
    },
    year() {
      return this.$store.state.order.year;
    },
    orderListCount() {
      return this.orderList.length;
    },
    todayMonth() {
      return new Date().getMonth();
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
  },
  watch: {
    orderList() {
      this.orderListCount > 0
        ? (this.title.css = 'highlighter highlighter__yellow')
        : (this.title.css = 'highlighter highlighter__grey');
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
      console.log(countArr[0]);
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
    fetchData() {
      this.fetchOrderList();
      this.fetchTitle();
    },
    fetchOrderList() {
      this.orderList = this.originOrderList.filter(
        item =>
          new Date(item.orderDate).getMonth() == this.month &&
          new Date(item.orderDate).getFullYear() == this.year,
      );
    },
    fetchTitle() {
      this.title.text =
        this.orderListCount > 0
          ? // ? `${this.monthText} 매출은 ${this.orderListCount}원입니다! 💰`
            `${this.monthText} 매출은 999,000원입니다! 💰`
          : `${this.monthText} 매출은 0원입니다. 🥲 `;
    },
  },
  filters: {
    itemName(itemId) {
      if (typeof itemId == 'string') {
        itemId = Number(itemId);
      }
      switch (itemId) {
        case 5033569:
          return '2023 심플 플래너';
        case 5033568:
          return '2023 모던 플래너';
        case 5033567:
          return '2023 타임라인 플래너';
        case 5033566:
          return '2023 먼슬리&데일리 플래너';
        case 5033565:
          return '31DAYS 플래너';
        case 5033562:
          return '3년 5년 다이어리';
        case 5033564:
          return '세로형 인덱스 노트';
        case 5033563:
          return '가로형 인덱스 노트';
        case 5033560:
          return '독서노트';
        case 5033558:
          return '드라마노트';
        case 5033557:
          return '먼슬리 트래커북';
        case 5033561:
          return '180 베이직 노트';
        case 5033559:
          return '180 체커보드 노트';
        case 5068583:
          return '레시피북';
        default:
          return '';
      }
    },
  },
};
</script>
<style scoped></style>
