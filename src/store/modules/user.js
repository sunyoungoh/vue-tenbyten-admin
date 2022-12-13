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
    // setBrandId(state, brandId) {},
    // setBrandNameKor(state, brandNameKor) {},
    setIsLogin(state, login) {
      state.isLogin = login;
    },
  },
  actions: {
    async login({ commit }, loginData) {
      commit('setTitleInfo', {}, { root: true });
      commit('clearUserData');
      commit('clearResultStatusCode', null, { root: true });
      commit('clearOrderList', null, { root: true });
      let { data } = await getBrandInfo(loginData.apiKey);
      if (loginData.brandId == data.brandid) {
        commit('setResultStatusCode', 200, { root: true });
        commit('setUserData', {
          apiKey: loginData.apiKey,
          brandId: loginData.brandId,
          brandNameKor: data.BrandNameKor,
        });
        commit('setIsLogin', true);
      } else {
        commit('setResultStatusCode', 401, { root: true });
        commit(
          'setTitleInfo',
          {
            css: 'highlighter highlighter__red',
            msg: '🚨 권한이 없습니다.',
          },
          { root: true },
        );
      }
    },
    logout({ commit }) {
      commit('setIsLogin', false);
      commit('clearUserData');
      commit('clearResultStatusCode', null, { root: true });
      commit('clearOrderList', null, { root: true });
      commit('clearTitleInfo', null, { root: true });
    },
  },
};

export default user;
