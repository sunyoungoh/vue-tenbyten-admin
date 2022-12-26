<template>
  <section class="container order">
    <LoadingSpinner v-if="loading" />
    <template v-else>
      <h1 :class="highlighter">{{ title }}</h1>
      <div v-if="qnaListCount > 0" class="content">
        <QnaTab @click-tab="clickTab" :activeTab="activeTab" />
        <QnaList :items="filteredQnaList" />
      </div>
    </template>
  </section>
</template>

<script>
import { getQna } from '@/api/order';
import QnaTab from '@/components/qna/QnaTab.vue';
import QnaList from '@/components/qna/QnaList.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
  components: {
    LoadingSpinner,
    QnaTab,
    QnaList,
  },
  async mounted() {
    this.loading = true;
    const { data } = await getQna();
    const qnaList = data.outPutValue.map(item => {
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
      this.qnaList = qnaList.reverse();
      this.clickTab('noAnwser');
    }
    this.loading = false;
  },
  data() {
    return {
      loading: false,
      qnaList: [],
      filteredQnaList: [],
      activeTab: 'noAnwser',
    };
  },
  computed: {
    qnaListCount() {
      return this.qnaList.length;
    },
    filteredQnaListCount() {
      return this.filteredQnaList.length;
    },
    title() {
      let str;
      str =
        this.filteredQnaListCount == 0
          ? `최근 일주일간 문의가 없었습니다. 😊 `
          : this.activeTab == 'noAnwser'
          ? `미답변 문의가 ${this.filteredQnaListCount}건 있습니다! 🤔`
          : this.activeTab == 'yesAnwser'
          ? (str = `답변완료 문의가 ${this.filteredQnaListCount}건 있습니다! 😊`)
          : `일주일간 총 ${this.qnaListCount}건의 문의가 있었습니다! 😊`;
      return str;
    },
    highlighter() {
      return this.filteredQnaListCount > 0
        ? 'highlighter highlighter__yellow'
        : 'highlighter highlighter__grey';
    },
  },
  methods: {
    clickTab(tab) {
      this.activeTab = tab;
      this.filteredQnaList = this.qnaList.filter(item => {
        return this.activeTab == 'noAnwser'
          ? !item.isAnwser
          : this.activeTab == 'yesAnwser'
          ? item.isAnwser
          : item;
      });
    },
  },
};
</script>

<style></style>
