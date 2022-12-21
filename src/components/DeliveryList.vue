<template>
  <div class="table-container" id="no-more-tables">
    <table>
      <thead>
        <TableTitle
          :titles="tableTitles"
          :click-field="clickField"
          :order-by="orderBy"
          @sort-list="sortList"
        />
      </thead>
      <tbody>
        <OrderItem
          v-for="(item, i) in orderList"
          :key="i"
          :item="item"
          :titles="tableTitles"
          :clickField="clickField"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import TableTitle from '@/components/TableTitle.vue';
import OrderItem from '@/components/OrderItem.vue';
import { sortOrderList } from '@/utils/sortArr';

export default {
  components: {
    TableTitle,
    OrderItem,
  },
  props: {
    items: {
      type: Array,
    },
    search: {
      type: Boolean,
    },
  },
  data() {
    return {
      tableTitles: [
        { key: 'orderDate', value: '주문일' },
        { key: 'createdAt', value: '발송일' },
        { key: 'ordererId', value: '아이디' },
        { key: 'ordererName', value: '이름' },
        { key: 'toEmail', value: ' 수신 이메일' },
        { key: 'itemId', value: '상품명' },
        { key: 'itemOption', value: '옵션' },
        { key: 'requireMemo', value: '주문메모' },
      ],
      orderBy: 'desc',
      clickField: '',
    };
  },
  watch: {
    month() {
      this.clickField = '';
    },
    search(val) {
      this.clickField = val ? 'ordererName' : '';
    },
  },
  computed: {
    month() {
      return this.$store.state.order.month;
    },
    orderList: {
      get() {
        return this.items;
      },
      set() {},
    },
  },
  methods: {
    sortList(title) {
      this.clickField = title;
      this.orderBy = this.orderBy == 'desc' ? 'asc' : 'desc';
      this.orderList = sortOrderList(this.orderList, title, this.orderBy);
    },
  },
};
</script>

<style></style>
