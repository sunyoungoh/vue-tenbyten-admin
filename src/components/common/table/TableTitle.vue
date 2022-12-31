<template>
  <tr>
    <th
      v-for="(title, i) in titles"
      :key="i"
      :class="[clickField == title.key ? 'filter-tab' : '', title.key]"
    >
      {{ title.value }}
      <BtnAngle
        v-if="title.key !== 'itemOption'"
        :toggle="orderBy == 'desc' ? false : true"
        @click.native="$emit('sort-list', title.key)"
      />
    </th>
    <th v-if="$route.path == '/ready'">발송상태</th>
    <th v-if="$route.path == '/ready'">송장등록</th>
  </tr>
</template>

<script>
import BtnAngle from '@/components/common/BtnAngle.vue';

export default {
  components: {
    BtnAngle,
  },
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
