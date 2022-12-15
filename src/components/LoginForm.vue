<template>
  <div class="login-container">
    <!-- <div class="logout" v-if="isLogin" @click="logout">로그아웃</div> -->
    <div class="welcome" v-if="isLogin">
      ❤️ <b> {{ brandNameKor }}</b
      >님 환영합니다! ❤️
    </div>
    <div v-else class="login-form">
      <div class="input-item">
        <div class="input-wrap">
          <label for="brandId">brandId</label>
          <input
            id="brandId"
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
          <label for="apiKey">apiKey</label>
          <input
            id="apiKey"
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
    </div>
    <div class="btns_order">
      <button
        v-if="!isLogin"
        :disabled="loading"
        @click="login"
        class="btn-login"
      >
        <span v-if="!loading">로그인</span>
        <span v-else class="spinner"></span>
      </button>
    </div>
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
        await this.$store.dispatch('login', {
          brandId: this.brandId,
          apiKey: this.apiKey,
        });
      }
      this.loading = false;
    },
    logout() {
      this.brandId = '';
      this.apiKey = '';
      this.$store.dispatch('logout');
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
