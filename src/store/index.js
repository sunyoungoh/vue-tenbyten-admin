import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { getOrders, getOrderHistory } from '@/api/order';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['apiKey', 'brandId'],
    }),
  ],
  state: {
    apiKey: '',
    brandId: '',
    clickedBtn: '',
    orderList: [],
    resultMsg: '',
  },
  mutations: {
    setApiKey(state, apiKey) {
      state.apiKey = apiKey;
    },
    setBrandId(state, brandId) {
      state.brandId = brandId;
    },
    setClickedBtn(state, clickedBtn) {
      state.clickedBtn = clickedBtn;
    },
    setOrderList(state, orderList) {
      state.orderList = orderList;
    },
    clearOrderList(state) {
      state.orderList = [];
    },
    setResultMsg(state, msg) {
      state.resultMsg = msg;
    },
    clearResultMsg(state) {
      state.resultMsg == '';
    },
  },
  actions: {
    async getOrdersData({ commit, state }) {
      commit('clearOrderList');
      commit('clearResultMsg');
      let response = [];
      let resultMsg = '';
      try {
        if (state.clickedBtn == 'new-orders') {
          response = await getOrders();
        }
        if (state.clickedBtn == 'ready') {
          response = await getOrderHistory();
        }
        if (response.data.totalCount !== 0) {
          console.log(response.data.outPutValue);
          commit('setOrderList', response.data.outPutValue);
        } else {
          resultMsg =
            state.clickedBtn == 'new-orders'
              ? '신규 주문이 없습니다.'
              : '배송 준비 중인 주문이 없습니다.';
        }
      } catch ({ response }) {
        resultMsg =
          response.status == 401 ? '권한이 없습니다.' : '에러가 발생했습니다.';
      } finally {
        commit('setResultMsg', resultMsg);
      }
    },
  },
});
