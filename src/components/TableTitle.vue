<template>
  <tr>
    <th
      v-for="(title, i) in titles"
      :key="i"
      :class="[clickField == title.key ? 'filter-tab' : '', title.key]"
    >
      {{ title.value }}
      <div
        class="btn-angle"
        v-if="title.key !== 'itemOption'"
        @click="$emit('sort-list', title.key)"
      >
        <i class="uil uil-angle-down" v-if="orderBy == 'desc'"></i>
        <i class="uil uil-angle-up" v-else></i>
      </div>
    </th>
  </tr>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
    },
    orderBy: {
      type: String,
    },
    clickField: {
      type: String,
    },
  },
};
</script>

<style></style>
