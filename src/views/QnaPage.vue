<template>
  <section class="container order">
    <LoadingSpinner v-if="loading" />
    <template v-else>
      <h1 :class="highlighter">{{ title }}</h1>
      <div v-if="qnaListCount > 0" class="content">
        <QnaList :items="qnaList" />
      </div>
    </template>
  </section>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import QnaList from '@/components/qna/QnaList.vue';
import { getQna } from '@/api/order';
import { sortDate } from '@/utils/sortArr';

export default {
  components: {
    LoadingSpinner,
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
      this.qnaList = sortDate(qnaList, 'qnaDate', 'desc');
    }
    this.loading = false;
  },
  data() {
    return {
      loading: false,
      qnaList: [],
    };
  },
  computed: {
    qnaListCount() {
      return this.qnaList.length;
    },
    noAnwserList() {
      return this.qnaList.filter(item => !item.isAnwser);
    },
    title() {
      let str;
      str =
        this.qnaListCount == 0
          ? `최근 일주일간 문의가 없었습니다. 😊 `
          : this.noAnwserList.length
          ? `미답변 문의가 ${this.noAnwserList.length}건 있습니다! 🤔`
          : `일주일간 총 ${this.qnaListCount}건의 문의가 있었습니다! 😊`;
      return str;
    },
    highlighter() {
      return this.qnaListCount > 0
        ? 'highlighter highlighter__yellow'
        : 'highlighter highlighter__grey';
    },
  },
};
</script>

<style></style>
