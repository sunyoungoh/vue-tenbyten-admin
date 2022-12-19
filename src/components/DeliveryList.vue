<template>
  <div class="table-container" id="no-more-tables">
    <table>
      <thead>
        <tr>
          <th
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
              <i class="uil uil-angle-down" v-if="orderBy == 'desc'"></i>
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
    month: {
      type: Number,
    },
    search: {
      type: Boolean,
    },
  },
  data() {
    return {
      itemTitles: [
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
      this.orderBy = this.orderBy == 'desc' ? 'asc' : 'desc';
      this.orderList =
        title == 'orderDate' || title == 'createdAt'
          ? sortDate(this.orderList, title, this.orderBy)
          : title == 'itemId'
          ? sortItemId(this.orderList, title, this.orderBy)
          : sortStr(this.orderList, title, this.orderBy);
    },
  },
};
</script>

<style></style>
