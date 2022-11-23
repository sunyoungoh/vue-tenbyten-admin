<template>
  <div class="login-container">
    <div class="input-item">
      <label for="brandId">brandId</label>
      <div>
        <input type="text" v-model="brandId" />
        <p class="error">{{ brandIdError }}</p>
      </div>
    </div>
    <div class="input-item">
      <label for="apiKey">apiKey</label>
      <div>
        <input type="password" v-model="apiKey" />
        <p class="error">{{ apiKeyError }}</p>
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
import { getOrders, getOrderHistory } from '@/api/order';

export default {
  data() {
    return {
      apiKey: this.$store.state.apiKey,
      brandId: this.$store.state.brandId,
      apiKeyError: '',
      brandIdError: '',
      resultMsg: '',
    };
  },
  methods: {
    inputEmptyCheck() {
      !this.apiKey
        ? (this.apiKeyError = 'apiKey를 입력해주세요.')
        : (this.apiKeyError = '');
      !this.brandId
        ? (this.brandIdError = 'brandId를 입력해주세요.')
        : (this.brandIdError = '');
    },
    async getOrdersData(clickedBtn) {
      this.inputEmptyCheck();
      if (this.apiKey !== '' && this.brandId !== '') {
        this.$store.commit('setApiKey', this.apiKey);
        this.$store.commit('setBrandId', this.brandId);
        this.$store.commit('setClickedBtn', clickedBtn);
        try {
          let response = [];
          if (this.$store.state.clickedBtn == 'new-orders') {
            response = await getOrders(this.brandId);
          }
          if (this.$store.state.clickedBtn == 'ready') {
            response = await getOrderHistory(this.brandId);
          }
          if (response.data.totalCount !== 0) {
            this.$store.commit('setOrderList', response.data.outPutValue);
          } else {
            let resultMsg = '';
            clickedBtn == 'new-orders'
              ? (resultMsg = '신규 주문이 없습니다.')
              : (resultMsg = '배송 준비 중인 주문이 없습니다.');
            this.$store.commit('setResultMsg', resultMsg);
          }
        } catch (error) {
          this.$store.commit('clearOrderList');
          this.$store.commit('setResultMsg', '에러가 발생했습니다.');
          console.log(error);
        }
      }
    },
  },
};
</script>

<style></style>
