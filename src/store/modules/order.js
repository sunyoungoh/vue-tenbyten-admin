import { getOrders, getOrderHistory } from '@/api/order';

const order = {
  state: {
    clickedBtn: '',
    orderList: [],
    resultStatusCode: '',
    titleInfo: [],
  },
  getters: {
    orderListCount(state) {
      return state.orderList.length;
    },
  },
  mutations: {
    setTitleInfo(state, titleInfo) {
      state.titleInfo = titleInfo;
    },
    clearTitleInfo(state) {
      state.titleInfo = [];
    },
    setClickedBtn(state, clickedBtn) {
      state.clickedBtn = clickedBtn;
    },
    setOrderList(state, orderList) {
      state.orderList = orderList;
    },
    setOrderListTest(state, orderList) {
      state.orderList = orderList;
    },
    clearOrderList(state) {
      state.orderList = [];
    },
    setResultStatusCode(state, statusCode) {
      state.resultStatusCode = statusCode;
    },
    clearResultStatusCode(state) {
      state.resultStatusCode == '';
    },
  },
  actions: {
    async getOrdersData({ commit, state, dispatch }) {
      commit('clearResultStatusCode');
      commit('clearOrderList');
      let response = [];
      if (state.clickedBtn == 'new-orders') {
        response = await getOrders();
        console.log('orders');
      } else if (state.clickedBtn == 'ready') {
        response = await getOrderHistory();
        console.log('ready');
      }
      if (response.data.code == 'SUCCESS') {
        commit('setResultStatusCode', 200);
        if (response.data.totalCount !== 0) {
          commit('setOrderList', response.data.outPutValue);
        }
      } else {
        console.log('error');
        commit('clearOrderList');
        commit('setResultStatusCode', response.status);
      }
      dispatch('fetchTitleInfo');
    },
    fetchTitleInfo({ commit, state, getters }) {
      commit('clearTitleInfo');
      let titleInfo = {};
      if (state.resultStatusCode == 200) {
        titleInfo =
          state.clickedBtn == 'new-orders'
            ? { clickedBtn: '신규 주문', emoji: '🥳' }
            : { clickedBtn: '배송 준비 중인 주문', emoji: '📦' };
        if (getters.orderListCount !== 0) {
          titleInfo.msg = `${titleInfo.clickedBtn}이 ${getters.orderListCount}건 있습니다! ${titleInfo.emoji}`;
          titleInfo.css = 'highlighter highlighter__yellow';
        } else {
          titleInfo.msg = `${titleInfo.clickedBtn}이 없습니다 🥲 `;
          titleInfo.css = 'highlighter highlighter__grey';
        }
      } else {
        titleInfo.css = 'highlighter highlighter__red';
        if (state.statusCode == 404) {
          titleInfo.msg = '🚨 요청이 잘못되었습니다.';
        } else {
          titleInfo.msg = `${state.resultStatusCode} 에러가 발생하였습니다.`;
        }
      }
      commit('setTitleInfo', titleInfo);
    },
  },
};

export default order;
