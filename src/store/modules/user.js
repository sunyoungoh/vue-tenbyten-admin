import { getBrandInfo } from '@/api/order';

const user = {
  state: {
    apiKey: '',
    brandId: '',
    brandNameKor: '',
    isLogin: false,
  },
  mutations: {
    setUserData(state, userData) {
      state.apiKey = userData.apiKey;
      state.brandId = userData.brandId;
      state.brandNameKor = userData.brandNameKor;
    },
    clearUserData(state) {
      state.apiKey = '';
      state.brandId = '';
      state.brandNameKor = '';
    },
    setIsLogin(state, login) {
      state.isLogin = login;
    },
  },
  actions: {
    async login({ commit }, loginData) {
      commit('clearUserData');
      commit('clearOrderList', null, { root: true });
      let { data } = await getBrandInfo(loginData.apiKey);
      if (loginData.brandId == data.brandid) {
        commit('setUserData', {
          apiKey: loginData.apiKey,
          brandId: loginData.brandId,
          brandNameKor: data.BrandNameKor,
        });
        commit('setIsLogin', true);
        return 'success';
      } else {
        return 'fail';
      }
    },
    logout({ commit }) {
      commit('setIsLogin', false);
      commit('clearUserData');
      commit('clearOrderList', null, { root: true });
    },
  },
};

export default user;
