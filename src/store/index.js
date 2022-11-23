import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
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
  },
  actions: {},
});
