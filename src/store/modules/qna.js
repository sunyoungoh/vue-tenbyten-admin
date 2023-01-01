import { getQna } from '@/api/order';
import { sortDate } from '@/utils/sortArr';

const qna = {
  state: {
    qnaList: [],
    loading: false,
  },
  getters: {
    noAnwserQnaList(state) {
      return state.qnaList.filter(item => !item.isAnwser) || [];
    },
    yesAnwserQnaList(state) {
      return state.qnaList.filter(item => item.isAnwser) || [];
    },
  },
  mutations: {
    setQnaList(state, qnaList) {
      state.qnaList = qnaList;
    },
    clearQnaList(state) {
      state.qnaList = [];
    },
    setLoading(state, value) {
      state.loading = value;
    },
  },
  actions: {
    async fetchQnaList({ commit }) {
      commit('clearOrderList');
      commit('setLoading', true);
      const { data } = await getQna();
      let qnaList = data.outPutValue.map(item => {
        let isAnwser = item.replycontents ? true : false;
        return {
          qnaId: item.qnaid,
          qnaDate: item.regdate,
          userId: item.userid,
          username: item.고객명,
          orderId: item.주문번호,
          kind: item.kind,
          contents: item.contents,
          itemId: item.itemid,
          isAnwser: isAnwser,
          replyDate: item.replydate,
          replyUser: item.replyuser,
          replyContents: item.replycontents,
        };
      });
      if (qnaList.length > 0) {
        qnaList = sortDate(qnaList, 'qnaDate', 'desc');
      }
      commit('setQnaList', qnaList);
      commit('setLoading', false);
    },
  },
};

export default qna;
