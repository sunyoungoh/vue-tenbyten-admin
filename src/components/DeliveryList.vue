<template>
  <div class="table-container" id="no-more-tables">
    <table>
      <thead>
        <tr>
          <th
            class="order-date"
            v-for="(title, i) in itemTitles"
            :key="i"
            :class="clickField == title.key ? 'filter-tab' : ''"
          >
            {{ title.value }}
            <div
              class="btn-angle"
              v-if="title.key !== 'itemOption'"
              @click="sortList(title.key)"
            >
              <i class="uil uil-angle-down" v-if="sortState == 'desc'"></i>
              <i class="uil uil-angle-up" v-else></i>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <DeliveryItem
          v-for="(item, i) in orderList"
          :key="i"
          :item="item"
          :clickField="clickField"
          :titles="itemTitles"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { sortDate, sortStr, sortItemId } from '@/utils/sortArr';
import DeliveryItem from '@/components/DeliveryItem.vue';

export default {
  components: { DeliveryItem },
  props: {
    items: {
      type: Array,
    },
  },
  data() {
    return {
      itemTitles: [
        { key: 'orderDate', value: '주문일' },
        { key: 'createdAt', value: '발송일' },
        { key: 'ordererId', value: '아이디' },
        { key: 'ordererName', value: '이름' },
        { key: 'toEmail', value: ' 받은 이메일' },
        { key: 'itemId', value: '상품명' },
        { key: 'itemOption', value: '옵션' },
        { key: 'requireMemo', value: '주문메모' },
      ],
      orderBy: 'desc',
      clickField: '',
      searchInput: '',
    };
  },
  computed: {
    orderList: {
      get() {
        return this.items;
      },
      set(sortList) {
        return sortList;
      },
    },
  },
  methods: {
    sortList(title) {
      this.clickField = title;

      this.orderBy == 'desc' ? (this.orderBy = 'asc') : (this.orderBy = 'desc');

      this.orderList =
        title == 'orderDate' || title == 'createdAt'
          ? (this.orderList = sortDate(this.orderList, title, this.orderBy))
          : title == 'itemId'
          ? (this.orderList = sortItemId(this.orderList, title, this.orderBy))
          : (this.orderList = sortStr(this.orderList, title, this.orderBy));
    },
  },
};
</script>

<style></style>
