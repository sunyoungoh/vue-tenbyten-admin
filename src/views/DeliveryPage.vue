<template>
  <section>
    <LoadingSpinner v-if="loading" />
    <template v-else>
      <TitleMonth @fetch-data="fetchData" />
      <div class="order-list-container">
        <div>
          <h1 :class="highlighter">{{ title }}</h1>
        </div>
        <template v-if="orderListCount > 0">
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
          <DeliveryList :items="orderList" :search="search" />
        </template>
      </div>
    </template>
  </section>
</template>

<script>
import TitleMonth from '@/components/TitleMonth.vue';
import DeliveryList from '@/components/DeliveryList.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
  components: {
    TitleMonth,
    DeliveryList,
    LoadingSpinner,
  },
  async mounted() {
    await this.$store.dispatch('fetchOrderList');
    this.fetchData();
  },
  data() {
    return {
      searchInput: '',
      search: false,
      title: '',
      orderList: [],
    };
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
    originOrderList() {
      return this.$store.getters.monthlyOrderList;
    },
    orderListCount() {
      return this.orderList.length;
    },
    highlighter() {
      return this.orderList.length > 0
        ? 'highlighter highlighter__yellow'
        : 'highlighter highlighter__grey';
    },
  },
  methods: {
    fetchData() {
      this.fetchOrderList();
      this.fetchTitle();
    },
    fetchOrderList() {
      this.orderList = this.originOrderList;
    },
    fetchTitle() {
      this.title =
        this.orderListCount > 0
          ? `${this.monthText}엔 ${this.orderListCount}건의 메일을 전송했습니다! 💌`
          : `${this.monthText}엔 전송한 메일이 없습니다 🥲 `;
    },
    searchList() {
      this.fetchOrderList();
      this.orderList = this.orderList.filter(item =>
        item.ordererName.includes(this.searchInput),
      );
      if (this.searchInput) {
        this.search = true;
        this.title =
          this.orderListCount > 0
            ? `${this.searchInput}님께 ${this.orderList.length}건의 메일을 전송했습니다! 💌`
            : `${this.searchInput}님께 전송한 메일이 없습니다. 🥲`;
      } else {
        this.search = false;
        this.fetchTitle();
      }
    },
  },
};
</script>
<style scoped></style>
