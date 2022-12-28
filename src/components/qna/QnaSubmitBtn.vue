<template>
  <button class="btn-outline">
    <span class="spinner" v-if="loading"></span>
    <template v-else>
      <slot />
    </template>
  </button>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.spinner {
  position: relative;
  top: 2px;
  width: 10px;
  height: 10px;
  display: inline-block;
  border-width: 2px;
  border-color: #ebebeb;
  border-top-color: #212121;
  animation: spin 1s infinite linear;
  border-radius: 100%;
  border-style: solid;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
@media screen and (max-width: 576px) {
  .spinner {
    position: relative;
    width: 10px;
    height: 10px;
  }
}
</style>
