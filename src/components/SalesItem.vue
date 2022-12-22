<template>
  <tr>
    <td
      v-for="(title, i) in titles"
      :key="i"
      :class="clickField == title.key ? 'filter-tab' : ''"
    >
      <span v-if="title.key == 'orderDate' || title.key == 'createdAt'">
        {{ item[title.key] | timeFormat }}
      </span>
      <span v-else-if="title.key == 'itemId'">
        {{ item[title.key] | itemName }}
      </span>
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
};
</script>

<style></style>
