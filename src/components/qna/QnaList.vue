<template>
  <div class="qna-list">
    <QnaItem v-for="(item, i) in items" :key="i" :item="item" />
  </div>
</template>

<script>
import QnaItem from '@/components/qna/QnaItem.vue';

export default {
  components: {
    QnaItem,
  },
  props: {
    items: {
      type: [Array, Object],
    },
  },
};
</script>

<style></style>
