<template>
  <h1 class="sales-title">
    <button @click="beforeMonth">
      <i class="uil uil-angle-left-b"></i>
    </button>
    <span>{{ nowDate }}</span>
    <template>
      <button v-if="month == todayMonth">
        <i class="uil uil-angle-right-b disabled"></i>
      </button>
      <button v-else @click="afterMonth">
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
    todayMonth() {
      return new Date().getMonth();
    },
    nowDate() {
      return `${this.year}.${this.month + 1}`;
    },
  },
  methods: {
    beforeMonth() {
      if (this.month == 0) {
        this.$store.commit('prevYear');
        this.$store.commit('setMonth', 11);
      } else {
        this.$store.commit('prevMonth');
      }
      this.$emit('fetch-data');
    },
    afterMonth() {
      if (this.month == 11) {
        this.$store.commit('nextYear');
        this.$store.commit('setMonth', 0);
      } else {
        this.$store.commit('nextMonth');
      }
      this.$emit('fetch-data');
    },
  },
};
</script>

<style></style>
