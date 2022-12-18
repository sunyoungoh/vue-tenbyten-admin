<template>
  <section>
    <LoadingSpinner v-if="loading" />
    <template v-else>
      <TitleMonth @fetch-data="fetchData" />
      <div class="order-list-container">
        <div>
          <h1 :class="title.css">{{ title.text }}</h1>
        </div>
        <div class="input-wrap search-wrap">
          <i class="uil uil-search search-icon"></i>
          <input
            type="text"
            class="input-search"
            v-model="searchInput"
            placeholder="이름을 입력하세요"
            @keyup.enter="searchList"
          />
          <button class="btn-search" @click="searchList">검색하기</button>
        </div>
        <DeliveryList v-if="orderListCount > 0" :items="orderList" />
      </div>
    </template>
  </section>
</template>

<script>
import TitleMonth from '@/components/TitleMonth.vue';
import DeliveryList from '@/components/DeliveryList.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { getDispatchOrderHistory } from '@/api/order';

export default {
  components: {
    TitleMonth,
    DeliveryList,
    LoadingSpinner,
  },
  async mounted() {
    const { data } = await getDispatchOrderHistory();
    this.loading = false;
    this.originOrderList = data;
    this.fetchData();
  },
  data() {
    return {
      loading: true,
      originOrderList: [],
      orderList: [],
      title: [],
      searchInput: '',
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
    showMonth() {
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
          ? `${this.showMonth}엔 ${this.orderListCount}건의 메일을 전송했습니다! 💌`
          : `${this.showMonth}엔 전송한 메일이 없습니다 🥲 `;
    },
    searchList() {
      this.fetchOrderList();
      this.orderList = this.orderList.filter(item =>
        item.ordererName.includes(this.searchInput),
      );
      if (this.searchInput) {
        this.title.text =
          this.orderListCount > 0
            ? `${this.searchInput}님에게 ${this.orderList.length}건의 메일을 전송했습니다! 💌`
            : `${this.searchInput}님에게 전송한 메일이 없습니다. 🥲`;
      } else {
        this.fetchTitle();
      }
    },
  },
};
</script>
<style scoped></style>
