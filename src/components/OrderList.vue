<template>
  <div class="order-list-container">
    <table v-if="orderList.length !== 0">
      <tr>
        <!-- <th>주문번호</th> -->
        <!-- <th>주문상세번호</th> -->
        <!-- <th>주문자ID</th> -->
        <th>주문일</th>
        <th>주문자</th>
        <th>상품명</th>
        <th>옵션</th>
        <th>주문메모</th>
        <th v-if="this.$store.state.clickedBtn == 'ready'">발송상태</th>
      </tr>
      <OrderItem v-for="(item, i) in orderList" :key="i" :item="item" />
    </table>
    <p>{{ this.$store.state.resultMsg }}</p>
  </div>
</template>

<script>
import OrderItem from '@/components/OrderItem.vue';

export default {
  components: {
    OrderItem,
  },
  data() {
    return {
      orderList: this.$store.state.orderList,
    };
  },
};
</script>

<style></style>
