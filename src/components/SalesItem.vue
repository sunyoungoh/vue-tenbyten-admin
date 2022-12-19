<template>
  <tr>
    <td
      v-for="(title, i) in titles"
      :key="i"
      :class="clickField == title.key ? 'filter-tab' : ''"
    >
      {{ item[title.key] | emptyValue }}
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
