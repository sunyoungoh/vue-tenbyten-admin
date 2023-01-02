<template>
  <h1 class="month-title">
    <button @click="prevMonth">
      <i class="uil uil-angle-left-b"></i>
    </button>
    <span>{{ nowDate }}</span>
    <template>
      <button v-if="isTodayMonth">
        <i class="uil uil-angle-right-b disabled"></i>
      </button>
      <button v-else @click="nextMonth">
        <i class="uil uil-angle-right-b"></i>
      </button>
    </template>
  </h1>
</template>

<script>
export default {
  computed: {
    month() {
      return this.$store.state.order.month;
    },
    year() {
      return this.$store.state.order.year;
    },
    isTodayMonth() {
      return this.month == new Date().getMonth() &&
        this.year == new Date().getFullYear()
        ? true
        : false;
    },
    nowDate() {
      return `${this.year}.${this.month + 1}`;
    },
  },
  methods: {
    prevMonth() {
      this.$store.commit('setPrevMonth');
      this.$emit('fetch-data');
    },
    nextMonth() {
      this.$store.commit('setNextMonth');
      this.$emit('fetch-data');
    },
  },
};
</script>

<style></style>
