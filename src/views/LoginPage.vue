<template>
  <div class="login-container">
    <img src="@/assets/logo.png" alt="logo" class="logo" />
    <div class="login-form">
      <div class="input-item">
        <div class="input-wrap">
          <input
            id="brandId"
            placeholder="brandId"
            type="text"
            v-model="brandId"
            @click="resetError($event)"
            autocomplete="off"
          />
        </div>
        <div>
          <p class="error">{{ brandIdError }}</p>
        </div>
      </div>
      <div class="input-item">
        <div class="input-wrap">
          <input
            id="apiKey"
            placeholder="apiKey"
            v-model="apiKey"
            type="password"
            clearable
            @click="resetError($event)"
          />
        </div>
        <div>
          <p class="error">{{ apiKeyError }}</p>
        </div>
      </div>
      <button :disabled="loading" @click="login" class="btn-login">
        <span v-if="!loading">로그인</span>
        <span v-else class="spinner"></span>
      </button>
    </div>
    <p class="error">{{ loginError }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      brandId: this.$store.state.user.brandId,
      apiKey: this.$store.state.user.apiKey,
      apiKeyError: '',
      brandIdError: '',
      loginError: '',
      loading: false,
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.user.isLogin;
    },
    statusCode() {
      return this.$store.state.order.resultStatusCode;
    },
    brandNameKor() {
      return this.$store.state.user.brandNameKor;
    },
  },
  methods: {
    resetError(event) {
      if (event.currentTarget.id == 'apiKey') this.apiKeyError = '';
      if (event.currentTarget.id == 'brandId') this.brandIdError = '';
    },
    inputEmptyCheck() {
      !this.brandId
        ? (this.brandIdError = 'brandId를 입력해주세요.')
        : (this.brandIdError = '');
      !this.apiKey
        ? (this.apiKeyError = 'apiKey를 입력해주세요.')
        : (this.apiKeyError = '');
    },
    async login() {
      this.inputEmptyCheck();
      if (this.apiKey !== '' && this.brandId !== '') {
        this.loading = true;
        const result = await this.$store.dispatch('login', {
          brandId: this.brandId,
          apiKey: this.apiKey,
        });
        if (result == 'success') {
          this.$router.push('/');
          await this.$store.dispatch('fetchOrderList', 'home');
        } else {
          this.loginError = '로그인을 실패하였습니다.';
        }
      }
      this.loading = false;
    },
    logout() {
      this.brandId = '';
      this.apiKey = '';
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  },
};
</script>

<style>
.spinner {
  position: relative;
  top: 2px;
  width: 16px;
  height: 16px;
  display: inline-block;
  border-width: 2px;
  border-color: #5e5e5e;
  border-top-color: #ffffff;
  animation: spin 1s infinite linear;
  border-radius: 100%;
  border-style: solid;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
