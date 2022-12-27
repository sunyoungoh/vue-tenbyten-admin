<template>
  <div class="label" :class="color">
    <span v-if="isAnwser">답변완료</span>
    <span v-else>미답변</span>
  </div>
</template>

<script>
export default {
  props: {
    isAnwser: {
      Boolean,
    },
  },
  computed: {
    color() {
      return this.isAnwser ? 'label-success' : 'label-danger';
    },
  },
};
</script>

<style></style>
