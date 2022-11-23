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
    <p>{{ resultMsg }}</p>
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
  computed: {
    resultMsg() {
      let message = '';
      if (this.orderList == '') {
        if (this.$store.state.clickedBtn == 'new-orders')
          message = '신규 주문이 없습니다.';
        if (this.$store.state.clickedBtn == 'ready')
          message = '배송 준비 중인 주문이 없습니다.';
      }
      return message;
    },
  },
};
</script>

<style></style>
