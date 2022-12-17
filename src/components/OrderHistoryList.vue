<template>
  <div class="table-container" id="no-more-tables">
    <div class="input-wrap search-wrap">
      <input
        type="text"
        class="input-search"
        v-model="searchInput"
        placeholder="이름을 입력하세요"
        @keyup.enter="searchList"
      />
      <button class="btn-search" @click="searchList">검색하기</button>
    </div>
    <table>
      <thead>
        <tr>
          <th
            class="order-date"
            v-for="(title, i) in itemTitle"
            :key="i"
            :class="clickFilter == title.key ? 'filter-tab' : ''"
          >
            {{ title.value }}
            <div
              class="btn-angle"
              v-if="title.key !== 'itemOption'"
              @click="sortBy(title.key)"
            >
              <i class="uil uil-angle-down" v-if="sortState == 'desc'"></i>
              <i class="uil uil-angle-up" v-else></i>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in sortItems" :key="i" :item="item">
          <td
            data-title="주문일"
            class="order-date"
            :class="clickFilter == 'orderDate' ? 'filter-tab' : ''"
          >
            {{ item.orderDate | timeFormat }}
          </td>

          <td
            data-title="발송일"
            class="order-date"
            :class="clickFilter == 'createdAt' ? 'filter-tab' : ''"
          >
            {{ item.createdAt | timeFormat }}
          </td>
          <td
            data-title="아이디"
            :class="clickFilter == 'ordererId' ? 'filter-tab' : ''"
          >
            {{ item.ordererId }}
          </td>
          <td
            data-title="이름"
            :class="clickFilter == 'ordererName' ? 'filter-tab' : ''"
          >
            {{ item.ordererName }}
          </td>
          <td
            data-title="받은 이메일"
            :class="clickFilter == 'toEmail' ? 'filter-tab' : ''"
          >
            {{ item.toEmail }}
          </td>
          <td
            data-title="상품명"
            class="item-name"
            :class="clickFilter == 'itemId' ? 'filter-tab' : ''"
          >
            {{ item.itemId | itemName }}
          </td>
          <td data-title="옵션" class="item-option">
            {{ item.itemOption | emptyValue }}
          </td>
          <td
            data-title="주문메모"
            :class="clickFilter == 'requireMemo' ? 'filter-tab' : ''"
          >
            <span v-if="item.requireMemo"> O </span>
            <span v-else> X </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getItemName } from '@/utils/getItemName';

export default {
  components: {},
  props: {
    items: {
      type: Array,
    },
  },
  data() {
    return {
      itemTitle: [
        { key: 'orderDate', value: '주문일' },
        { key: 'createdAt', value: '발송일' },
        { key: 'ordererId', value: '아이디' },
        { key: 'ordererName', value: '이름' },
        { key: 'toEmail', value: ' 받은 이메일' },
        { key: 'itemId', value: '상품명' },
        { key: 'itemOption', value: '옵션' },
        { key: 'requireMemo', value: '주문메모' },
      ],
      sortItems: this.items,
      sortState: 'desc',
      clickFilter: '',
      searchInput: '',
    };
  },
  methods: {
    searchList() {
      const originItems = this.items;
      this.sortItems = originItems.filter(item =>
        item.ordererName.includes(this.searchInput),
      );
    },
    sortBy(filter) {
      this.clickFilter = filter;
      if (this.sortState == 'desc') {
        this.sortState = 'asc';
        if (filter == 'orderDate' || filter == 'createdAt') {
          this.sortItems = this.sortItems.sort(
            (a, b) => new Date(a[filter]) - new Date(b[filter]),
          );
        } else if (filter == 'itemId') {
          this.sortItems = this.sortItems.sort((a, b) =>
            getItemName(a[filter]) < getItemName(b[filter])
              ? -1
              : 1 || new Date(a.orderDate).localeCompare(new Date(b.orderDate)),
          );
        } else {
          this.sortItems = this.sortItems.sort((a, b) =>
            a[filter] < b[filter]
              ? -1
              : 1 || new Date(a.orderDate).localeCompare(new Date(b.orderDate)),
          );
        }
      } else {
        this.sortState = 'desc';
        if (filter == 'orderDate' || filter == 'createdAt') {
          this.sortItems = this.sortItems.sort(
            (a, b) => new Date(b[filter]) - new Date(a[filter]),
          );
        } else if (filter == 'itemId') {
          this.sortItems = this.sortItems.sort((a, b) =>
            getItemName(a[filter]) > getItemName(b[filter])
              ? -1
              : 1 || new Date(b.orderDate).localeCompare(new Date(a.orderDate)),
          );
        } else {
          this.sortItems = this.sortItems.sort((a, b) =>
            a[filter] > b[filter]
              ? -1
              : 1 || new Date(b.orderDate).localeCompare(new Date(a.orderDate)),
          );
        }
      }
    },
  },
  filters: {
    timeFormat(value) {
      const date = new Date(value);
      return date.toLocaleString('ja-JP', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
    emptyValue(value) {
      return !value ? 'X' : value;
    },
    itemName(itemId) {
      switch (itemId) {
        case 5033569:
          return '2023 심플 플래너';
        case 5033568:
          return '2023 모던 플래너';
        case 5033567:
          return '2023 타임라인 플래너';
        case 5033566:
          return '2023 먼슬리&데일리 플래너';
        case 5033565:
          return '31DAYS 플래너';
        case 5033562:
          return '3년 5년 다이어리';
        case 5033564:
          return '세로형 인덱스 노트';
        case 5033563:
          return '가로형 인덱스 노트';
        case 5033560:
          return '독서노트';
        case 5033558:
          return '드라마노트';
        case 5033557:
          return '먼슬리 트래커북';
        case 5033561:
          return '180 베이직 노트';
        case 5033559:
          return '180 체커보드 노트';
        case 5068583:
          return '레시피북';
        default:
          return '';
      }
    },
  },
};
</script>

<style></style>
