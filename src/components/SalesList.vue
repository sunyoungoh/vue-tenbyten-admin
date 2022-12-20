<template>
  <div class="table-container sales">
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
        <SalesItem
          v-for="(item, i) in orderListByCount"
          :key="i"
          :item="item"
          :clickField="clickField"
          :titles="tableTitles"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { getItemName } from '@/utils/getItemName';
import TableTitle from '@/components/TableTitle.vue';
import SalesItem from '@/components/SalesItem.vue';

export default {
  components: {
    TableTitle,
    SalesItem,
  },

  data() {
    return {
      tableTitles: [
        { key: 'item', value: '상품명(옵션)' },
        { key: 'count', value: '판매수' },
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
    orderList() {
      return this.$store.getters.monthlyOrderList;
    },
    month() {
      return this.$store.state.order.month;
    },
    orderListByCount: {
      get() {
        let originList = this.orderList;
        let newList = {};
        originList.forEach(item => {
          let itemStr = item.itemOption
            ? `${getItemName(item.itemId)} (${item.itemOption})`
            : `${getItemName(item.itemId)}`;
          newList[itemStr] = (newList[itemStr] || 0) + 1;
        });
        let sortedArr = Object.entries(newList).sort((a, b) => b[1] - a[1]);
        let result = sortedArr.map(item => {
          return { item: item[0], count: item[1] };
        });
        result.sort((a, b) => {
          // 판매개수 내림차순 상품명 오름차순
          if (a.count > b.count) return -1;
          if (a.count < b.count) return 1;
          if (a.item < b.item) return -1;
          if (a.item > b.item) return 1;
        });
        return result;
      },
      set() {},
    },
  },
  methods: {
    fetchList() {
      let originList = this.orderList;
      let newList = {};
      originList.forEach(item => {
        let itemStr = item.itemOption
          ? `${getItemName(item.itemId)} (${item.itemOption})`
          : `${getItemName(item.itemId)}`;
        newList[itemStr] = (newList[itemStr] || 0) + 1;
      });
      let sortedArr = Object.entries(newList).sort((a, b) => b[1] - a[1]);
      let result = sortedArr.map(item => {
        return { item: item[0], count: item[1] };
      });
      result.sort((a, b) => {
        // 판매개수 내림차순 상품명 오름차순
        if (a.count > b.count) return -1;
        if (a.count < b.count) return 1;
        if (a.item < b.item) return -1;
        if (a.item > b.item) return 1;
      });
    },
    sortList(title) {
      this.clickField = title;
      this.orderBy = this.orderBy == 'desc' ? 'asc' : 'desc';
      if (title == 'item') {
        this.orderListByCount = this.orderListByCount.sort((a, b) => {
          if (this.orderBy == 'asc') {
            // 상품명 오름차순
            if (a.item < b.item) return -1;
            if (a.item > b.item) return 1;
          } else {
            // 상품명 내림차순
            if (a.item < b.item) return 1;
            if (a.item > b.item) return -1;
          }
          //  판매개수 내림차순
          if (a.count > b.count) return -1;
          if (a.count < b.count) return 1;
        });
      }
      if (title == 'count') {
        this.orderListByCount = this.orderListByCount.sort((a, b) => {
          if (this.orderBy == 'asc') {
            // 판매개수 오름차순
            if (a.count > b.count) return 1;
            if (a.count < b.count) return -1;
          } else {
            // 판매개수 내림차순
            if (a.count > b.count) return -1;
            if (a.count < b.count) return 1;
          }
          //  상품명 오름차순
          if (a.item < b.item) return -1;
          if (a.item > b.item) return 1;
        });
      }
    },
  },
};
</script>

<style></style>
