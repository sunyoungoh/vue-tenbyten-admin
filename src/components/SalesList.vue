<template>
  <div class="table-container sales">
    <table>
      <thead>
        <tr>
          <th
            v-for="(title, i) in itemTitles"
            :key="i"
            :class="[clickField == title.key ? 'filter-tab' : '', title.key]"
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
        <SalesItem
          v-for="(item, i) in orderListByCount"
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
import { getItemName } from '@/utils/getItemName';
// import { sortDate, sortStr, sortItemId } from '@/utils/sortArr';
import SalesItem from '@/components/SalesItem.vue';

export default {
  components: { SalesItem },
  props: {
    items: {
      type: Array,
    },
    month: {
      type: Number,
    },
  },
  data() {
    return {
      itemTitles: [
        // { key: 'orderDate', value: '주문일' },
        // { key: 'createdAt', value: '발송일' },
        // { key: 'ordererId', value: '아이디' },
        // { key: 'ordererName', value: '이름' },
        // { key: 'toEmail', value: ' 수신 이메일' },
        { key: 'item', value: '상품명(옵션)' },
        { key: 'count', value: '판매수' },
        // { key: 'requireMemo', value: '주문메모' },
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
      set(sortList) {
        return sortList;
      },
    },
    // orderListByCount() {
    //   let originList = this.orderList;
    //   let newList = {};
    //   originList.forEach(item => {
    //     let itemStr = item.itemOption
    //       ? `${getItemName(item.itemId)} (${item.itemOption})`
    //       : `${getItemName(item.itemId)}`;
    //     newList[itemStr] = (newList[itemStr] || 0) + 1;
    //   });
    //   let sortedArr = Object.entries(newList).sort((a, b) => b[1] - a[1]);
    //   let result = sortedArr.map(item => {
    //     return { item: item[0], count: item[1] };
    //   });
    //   result.sort((a, b) => {
    //     // 판매개수 내림차순 상품명 오름차순
    //     if (a.count > b.count) return -1;
    //     if (a.count < b.count) return 1;
    //     if (a.item < b.item) return -1;
    //     if (a.item > b.item) return 1;
    //   });
    //   return result;
    // },
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
