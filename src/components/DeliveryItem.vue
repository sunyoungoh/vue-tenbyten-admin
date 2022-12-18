<template>
  <tr>
    <td
      v-for="(title, i) in titles"
      :key="i"
      :data-title="title.value"
      :ref="title.key"
      :class="clickField == title.key ? 'filter-tab' : ''"
    >
      <span v-if="title.key == 'orderDate' || title.key == 'createdAt'">
        {{ item[title.key] | timeFormat }}
      </span>
      <span v-else-if="title.key == 'itemId'">
        {{ item[title.key] | itemName }}
      </span>
      <template v-else-if="title.key == 'requireMemo'">
        <span v-if="item.requireMemo"> O </span>
        <span v-else> X </span>
      </template>
      <span v-else>
        {{ item[title.key] | emptyValue }}
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
    },
    item: {
      type: Object,
    },
    clickField: {
      type: String,
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
