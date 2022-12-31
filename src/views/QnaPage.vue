<template>
  <section class="container qna">
    <LoadingSpinner v-if="loading" />
    <template v-else>
      <h1 :class="highlighter">{{ title }}</h1>
      <div v-if="filteredQnaListCount > 0" class="content">
        <div class="chips">
          <button
            v-for="(chip, i) in chips"
            :key="i"
            :class="clickedVal !== chip.value ? ' btn-outline' : ''"
            @click="filterList(chip.value)"
          >
            {{ chip.text }}
          </button>
        </div>
        <QnaList :items="filteredQnaList" />
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
      this.filterList('noAnwser');
    }
    this.loading = false;
  },
  data() {
    return {
      clickedVal: 'noAnwser',
      componentKey: 0,
      loading: false,
      qnaList: [],
      filteredQnaList: [],
      chips: [
        { text: '전체', value: 'all' },
        { text: '미답변', value: 'noAnwser' },
        { text: '답변완료', value: 'yesAnwser' },
      ],
    };
  },
  computed: {
    filteredQnaListCount() {
      return this.filteredQnaList.length;
    },
    noAnwserList() {
      return this.qnaList.filter(item => !item.isAnwser) || [];
    },
    yesAnwserList() {
      return this.qnaList.filter(item => item.isAnwser) || [];
    },
    title() {
      let str;
      if (this.clickedVal == 'all') {
        str =
          this.filteredQnaListCount == 0
            ? `일주일간 문의가 없었습니다. 😊`
            : `일주일간 문의가 ${this.filteredQnaListCount}건 있었습니다! 🤔`;
      } else {
        const selectedList =
          this.clickedVal == 'noAnwser' ? '미답변' : '답변완료';
        str =
          this.filteredQnaListCount == 0
            ? `${selectedList} 문의가 없습니다. 😊`
            : `${selectedList} 문의가 ${this.filteredQnaListCount}건 있습니다! 🤔`;
      }

      return str;
    },
    highlighter() {
      return this.filteredQnaListCount > 0
        ? 'highlighter highlighter__yellow'
        : 'highlighter highlighter__grey';
    },
  },
  methods: {
    filterList(val) {
      this.clickedVal = val;
      if (val == 'noAnwser') {
        this.filteredQnaList = this.noAnwserList;
      } else if (val == 'yesAnwser') {
        this.filteredQnaList = this.yesAnwserList;
      } else {
        this.filteredQnaList = this.qnaList;
      }
    },
  },
};
</script>

<style></style>
