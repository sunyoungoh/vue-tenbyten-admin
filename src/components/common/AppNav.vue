<template>
  <nav>
    <ul class="nav-list" @click="fetchBadge">
      <li><router-link to="/">홈</router-link></li>
      <li><router-link to="/order">신규주문</router-link></li>
      <li><router-link to="/ready">배송준비 </router-link></li>
      <li @click="$store.commit('initDate')">
        <router-link to="/delivery">발송내역</router-link>
      </li>
      <li @click="$store.commit('initDate')">
        <router-link to="/sales">판매내역</router-link>
      </li>
      <li>
        <router-link to="/qna">
          고객문의
          <div class="badge" v-if="noAnwserQnaListCount"></div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  async mounted() {
    if (this.isLogin) {
      await this.$store.dispatch('fetchQnaList');
    }
  },
  computed: {
    noAnwserQnaListCount() {
      return this.$store.getters.noAnwserQnaList.length;
    },
  },
  methods: {
    async fetchBadge() {
      await this.$store.dispatch('fetchQnaList');
    },
  },
};
</script>

<style></style>
