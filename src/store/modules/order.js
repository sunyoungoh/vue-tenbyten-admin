import {
  getNewOrders,
  getReadyOrders,
  getDispatchOrderHistory,
} from '@/api/order';

const order = {
  state: {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    orderList: [],
    clickedBtn: '',
    loading: false,
  },
  getters: {
    orderListCount(state) {
      return state.orderList.length;
    },
    monthlyOrderList(state) {
      return state.orderList.filter(
        item =>
          new Date(item.orderDate).getMonth() == state.month &&
          new Date(item.orderDate).getFullYear() == state.year,
      );
    },
    monthlySales(state) {
      let arr = [];
      for (let i = 5; i >= 0; i--) {
        let orderList;
        orderList = state.orderList.filter(
          item =>
            new Date(item.orderDate).getMonth() == state.month - i &&
            new Date(item.orderDate).getFullYear() == state.year,
        );
        if (orderList.length > 0) {
          let year = new Date(orderList[0].orderDate).getFullYear();
          let month = new Date(orderList[0].orderDate).getMonth() + 1;
          let date = `${year.toString().substring(2)}/${month}`;
          arr.push({
            date: date,
            amount: orderList
              .map(item => item.price)
              .reduce((prev, curr) => prev + curr),
          });
        } else {
          let now = new Date();
          let date = new Date(now.setMonth(now.getMonth() - i));
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          date = `${year.toString().substring(2)}/${month}`;
          arr.push({ date: date, amount: '' });
        }
      }
      return arr;
    },
    monthText(state) {
      let month;
      state.month == new Date().getMonth()
        ? (month = '이번달')
        : state.month == new Date().getMonth() - 1
        ? (month = '지난달')
        : (month = `${state.month + 1}월`);
      return month;
    },
  },
  mutations: {
    searchOrderList(getters, searchInput) {
      return getters.monthlyOrderList.filter(item =>
        item.ordererName.includes(searchInput),
      );
    },
    initDate(state) {
      state.month = new Date().getMonth();
      state.year = new Date().getFullYear();
    },
    setYear(state, year) {
      state.year = year;
    },
    prevYear(state) {
      state.year -= 1;
    },
    nextYear(state) {
      state.year += 1;
    },
    setMonth(state, month) {
      state.month = month;
    },
    prevMonth(state) {
      state.month -= 1;
    },
    nextMonth(state) {
      state.month += 1;
    },
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
    setLoading(state, value) {
      state.loading = value;
    },
  },
  actions: {
    async fetchOrderList({ commit }) {
      commit('setLoading', true);
      const { data } = await getDispatchOrderHistory();
      commit('setOrderList', data);
      commit('setLoading', false);
    },
    async getOrdersData({ state, commit, dispatch }) {
      commit('setLoading', true);
      commit('clearResultStatusCode');
      commit('clearOrderList');
      let response = [];
      if (state.clickedBtn == 'new-orders') {
        response = await getNewOrders();
      } else if (state.clickedBtn == 'ready') {
        response = await getReadyOrders();
      }
      console.log(response.data.outPutValue);
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
      commit('setLoading', false);
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
