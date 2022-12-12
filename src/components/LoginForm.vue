<template>
  <div class="login-container">
    <div class="logout" v-if="isLogin" @click="logout">로그아웃</div>
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
            type="password"
            @click="resetError($event)"
            v-model="apiKey"
          />
        </div>
        <div>
          <p class="error">{{ apiKeyError }}</p>
        </div>
      </div>
    </div>
    <div class="btns_order">
      <button @click="getOrdersData('new-orders')" class="btn-new-orders">
        신규 주문 조회
      </button>
      <button @click="getOrdersData('ready')" class="btn-outline">
        배송 준비 중 조회
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
    async getOrdersData(clickedBtn) {
      this.inputEmptyCheck();
      this.$store.commit('setApiKey', this.apiKey);
      this.$store.commit('setBrandId', this.brandId);
      if (this.apiKey !== '' && this.brandId !== '') {
        if (!this.isLogin)
          await this.$store.dispatch('getBrandInfo', this.brandId);
        if (this.statusCode !== 401) {
          this.$store.commit('setClickedBtn', clickedBtn);
          await this.$store.dispatch('getOrdersData');
        }
      }
    },
    logout() {
      this.brandId = '';
      this.apiKey = '';
      this.$store.dispatch('logout');
    },
  },
};
</script>

<style></style>
