<template>
  <section class="home">
    <div class="logo">
      <img src="@/assets/logo.png" />
    </div>
    <h2>텐바이텐 어드민 주문관리</h2>
    <LoginForm />
    <OrderList />
  </section>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import OrderList from '@/components/OrderList.vue';
export default {
  components: {
    LoginForm,
    OrderList,
  },
};
</script>
