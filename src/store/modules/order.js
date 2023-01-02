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
    loading: false,
  },
  getters: {
    monthlyOrderList(state) {
      return state.orderList.filter(
        item =>
          new Date(item.orderDate).getMonth() == state.month &&
          new Date(item.orderDate).getFullYear() == state.year,
      );
    },
    monthText(state) {
      let month;
      const today = new Date();
      const aMonthAgo = new Date(new Date().setMonth(today.getMonth() - 1));
      if (
        state.month == today.getMonth() &&
        state.year == today.getFullYear()
      ) {
        month = '이번달';
      } else if (
        state.month == aMonthAgo.getMonth() &&
        state.year == aMonthAgo.getFullYear()
      ) {
        month = '지난달';
      } else {
        month = `${state.year}.${state.month + 1}월`;
      }
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
    setPrevMonth(state) {
      if (state.month == 0) {
        state.year = state.year - 1;
        state.month = 11;
      } else {
        state.month -= 1;
      }
    },
    setNextMonth(state) {
      if (state.month == 11) {
        state.year = state.year + 1;
        state.month = 0;
      } else {
        state.month += 1;
      }
    },
    setOrderList(state, orderList) {
      state.orderList = orderList;
    },
    clearOrderList(state) {
      state.orderList = [];
    },
    setLoading(state, value) {
      state.loading = value;
    },
  },
  actions: {
    async fetchOrderList({ commit }, tab) {
      commit('setLoading', true);
      commit('clearOrderList');
      let orderList = [];
      if (tab == 'order' || tab == 'ready') {
        const { data } =
          tab == 'order' ? await getNewOrders() : await getReadyOrders();
        data.outPutValue.map(item => {
          item.details.map(detail => {
            let itemOption = detail.itemOptionName;
            // 이메일 기재옵션 삭제
            if (itemOption !== '') {
              let endIndex = itemOption.indexOf('꼭');
              if (endIndex !== -1) {
                itemOption = itemOption.substring(0, endIndex - 1);
              }
            }
            orderList.push({
              orderSerial: item.OrderSerial,
              detailIdx: detail.DetailIdx,
              orderDate: new Date(item.orderDate),
              ordererId: item.UserId,
              ordererName: item.ordererName,
              ordererCellPhone: item.ordererCellPhone,
              ordererEmail: item.ordererEmail,
              itemId: detail.itemId,
              itemOption: itemOption,
              itemRequireMemo: detail.RequireMemo.trim(),
              price: detail.NotCouponPrice,
            });
          });
        });
      }
      if (tab == 'home' || tab == 'delivery' || tab == 'sales') {
        const { data } = await getDispatchOrderHistory();
        orderList = data;
      }
      commit('setOrderList', orderList);
      commit('setLoading', false);
    },
  },
};

export default order;
