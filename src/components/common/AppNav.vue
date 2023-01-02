<template>
  <nav>
    <ul class="nav-list">
      <li v-for="item in navList" :key="item.to" @click="fetch(item.to)">
        <router-link :to="item.to">
          {{ item.text }}
          <div
            class="badge"
            v-if="noAnwserQnaListCount && item.to == '/qna'"
          ></div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        { to: '/', text: '홈' },
        { to: '/order', text: '신규주문' },
        { to: '/ready', text: '배송준비' },
        { to: '/delivery', text: '발송내역' },
        { to: '/sales', text: '판매내역' },
        { to: '/qna', text: '고객문의' },
      ],
    };
  },
  async mounted() {
    await this.$store.dispatch('fetchQnaList');
  },
  computed: {
    noAnwserQnaListCount() {
      return this.$store.getters.noAnwserQnaList.length;
    },
  },
  methods: {
    async fetch(to) {
      if (to == '/delivery' || to == '/sales') this.$store.commit('initDate');
      await this.$store.dispatch('fetchQnaList');
    },
  },
};
</script>

<style></style>
