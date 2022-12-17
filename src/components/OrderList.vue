<template>
  <div class="table-container" id="no-more-tables">
    <table>
      <thead>
        <tr>
          <th>주문일</th>
          <th>아이디</th>
          <th>이름</th>
          <th>휴대폰</th>
          <th>이메일</th>
          <th class="item-name">상품명</th>
          <th class="item-option">옵션</th>
          <th>주문메모</th>
          <th v-if="$route.path == '/ready'">발송상태</th>
        </tr>
      </thead>
      <tbody>
        <OrderItem v-for="(item, i) in items" :key="i" :item="item" />
      </tbody>
    </table>
  </div>
</template>

<script>
import OrderItem from '@/components/OrderItem.vue';
export default {
  components: {
    OrderItem,
  },
  props: {
    items: {
      type: Array,
    },
  },
};
</script>

<style></style>
