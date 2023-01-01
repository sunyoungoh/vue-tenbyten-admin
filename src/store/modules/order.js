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
        const today = new Date();
        const aFewMonthAgo = new Date(today.setMonth(today.getMonth() - i));
        orderList = state.orderList.filter(
          item =>
            new Date(item.orderDate).getMonth() == aFewMonthAgo.getMonth() &&
            new Date(item.orderDate).getFullYear() ==
              aFewMonthAgo.getFullYear(),
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
          let year = aFewMonthAgo.getFullYear();
          let month = aFewMonthAgo.getMonth() + 1;
          let date = `${year.toString().substring(2)}/${month}`;
          arr.push({ date: date, amount: '' });
        }
      }
      return arr;
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
    setOrderList(state, orderList) {
      state.orderList = orderList;
    },
    setOrderListTest(state, orderList) {
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
      commit('clearOrderList');
      commit('setLoading', true);
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
