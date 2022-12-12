import { getBrandInfo } from '@/api/order';

const user = {
  state: {
    apiKey: '',
    brandId: '',
    brandNameKor: '',
    isLogin: false,
  },
  mutations: {
    setApiKey(state, apiKey) {
      state.apiKey = apiKey;
    },
    clearApiKey(state) {
      state.apiKey = '';
    },
    setBrandId(state, brandId) {
      state.brandId = brandId;
    },
    clearBrandId(state) {
      state.brandId = '';
    },
    setBrandNameKor(state, brandNameKor) {
      state.brandNameKor = brandNameKor;
    },
    clearBrandNameKor(state) {
      state.brandNameKor = '';
    },
    login(state, login) {
      state.isLogin = login;
    },
  },
  actions: {
    async getBrandInfo({ commit }, brandId) {
      commit('clearBrandNameKor');
      commit('clearResultStatusCode', null, { root: true });
      commit('clearOrderList', null, { root: true });

      let { data } = await getBrandInfo();
      console.log(data);
      if (data.code == 'SUCCESS') {
        if (brandId == data.outPutValue[0].brandid) {
          commit('setBrandNameKor', data.outPutValue[0].BrandNameKor);
          commit('setResultStatusCode', 200, { root: true });
          commit('login', true);
        }
      } else if (data.status == 401) {
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
      commit('login', false);
      commit('clearApiKey');
      commit('clearBrandId');
      commit('clearBrandNameKor');
      commit('clearResultStatusCode', null, { root: true });
      commit('clearOrderList', null, { root: true });
      commit('clearTitleInfo', null, { root: true });
    },
  },
};

export default user;
