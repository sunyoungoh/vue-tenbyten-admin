import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import user from './modules/user';
import order from './modules/order';
import qna from './modules/qna';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['user'],
    }),
  ],
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    user,
    order,
    qna,
  },
});
