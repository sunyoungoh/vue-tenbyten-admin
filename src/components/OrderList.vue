<template>
  <div class="order-list-container">
    <h1 v-if="titleInfo" :class="titleInfo.css">
      {{ titleInfo.msg }}
    </h1>
    <div class="table-container" id="no-more-tables">
      <table v-if="orderListCount !== 0">
        <thead>
          <tr>
            <th>주문일</th>
            <th>주문자ID</th>
            <th class="orderer-name">주문자</th>
            <th class="item-name">상품명</th>
            <th class="item-option">옵션</th>
            <th>주문메모</th>
            <th v-if="clickedBtn == 'ready'">발송상태</th>
          </tr>
        </thead>
        <tbody>
          <OrderItem v-for="(item, i) in orderList" :key="i" :item="item" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import OrderItem from '@/components/OrderItem.vue';

export default {
  components: {
    OrderItem,
  },
  computed: {
    orderList() {
      return this.$store.state.order.orderList;
    },
    orderListCount() {
      return this.$store.getters.orderListCount;
    },
    clickedBtn() {
      return this.$store.state.order.clickedBtn;
    },
    titleInfo() {
      return this.$store.state.order.titleInfo;
    },
  },
};
</script>

<style></style>
