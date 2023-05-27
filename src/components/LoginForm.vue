<template>
  <div class="login-form">
    <img src="@/assets/logo.png" alt="logo" class="logo" />
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
    <p class="error">{{ loginError }}</p>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js';

export default {
  data() {
    return {
      brandId: '',
      apiKey: '',
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

        // apiKey 암호화
        const encodeKey = CryptoJS.AES.encrypt(
          this.apiKey,
          CryptoJS.enc.Utf8.parse(process.env.VUE_APP_AES_SECRETKEY),
          {
            iv: CryptoJS.enc.Utf8.parse(process.env.VUE_APP_AES_IV),
            padding: CryptoJS.pad.Pkcs7, // default setting(없어도 됨)
            mode: CryptoJS.mode.CBC,
          },
        );

        // 로그인 요청
        const result = await this.$store.dispatch('login', {
          brandId: this.brandId,
          apiKey: encodeKey.toString(),
        });

        if (result == 'success') {
          await this.$store.dispatch('fetchOrderList', 'home');
          this.$router.push('/');
        } else {
          this.loginError = '로그인을 실패하였습니다.';
        }
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.spinner {
  position: relative;
  top: 2px;
  width: 18px;
  height: 18px;
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
