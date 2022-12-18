<template>
  <nav>
    <ul class="nav-list">
      <li><router-link to="/">홈</router-link></li>
      <li><router-link to="/order">신규 주문</router-link></li>
      <li><router-link to="/ready">배송 준비 중</router-link></li>
      <li @click="$store.commit('initDate')">
        <router-link to="/delivery">발송 내역</router-link>
      </li>
      <li @click="$store.commit('initDate')">
        <router-link to="/sales">판매 내역</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style></style>
