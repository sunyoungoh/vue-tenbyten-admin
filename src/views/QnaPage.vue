<template>
  <section class="container qna">
    <div class="chips">
      <button
        v-for="(chip, i) in chips"
        :key="i"
        :class="clickedVal == chip.value ? 'active' : ''"
        @click="fetchQnaList(chip.value)"
      >
        {{ chip.text }}
      </button>
    </div>
    <LoadingSpinner v-if="loading" />
    <template v-else>
      <div>
        <h1 :class="highlighter">{{ title }}</h1>
        <div v-if="filteredQnaListCount > 0" class="content">
          <QnaList :items="filteredQnaList" />
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import QnaList from '@/components/qna/QnaList.vue';

export default {
  components: {
    LoadingSpinner,
    QnaList,
  },
  async mounted() {
    this.fetchQnaList('noAnwser');
  },
  data() {
    return {
      clickedVal: 'noAnwser',
      componentKey: 0,
      filteredQnaList: [],
      chips: [
        { text: '전체', value: 'all' },
        { text: '미답변', value: 'noAnwser' },
        { text: '답변완료', value: 'yesAnwser' },
      ],
    };
  },
  computed: {
    loading() {
      return this.$store.state.qna.loading;
    },
    filteredQnaListCount() {
      return this.filteredQnaList.length;
    },
    qnaList() {
      return this.$store.state.qna.qnaList;
    },
    noAnwserQnaList() {
      return this.$store.getters.noAnwserQnaList;
    },
    yesAnwserQnaList() {
      return this.$store.getters.yesAnwserQnaList;
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
    async fetchQnaList(val) {
      await this.$store.dispatch('fetchQnaList');
      this.clickedVal = val;
      if (this.clickedVal == 'noAnwser') {
        this.filteredQnaList = this.noAnwserQnaList;
      } else if (this.clickedVal == 'yesAnwser') {
        this.filteredQnaList = this.yesAnwserQnaList;
      } else {
        this.filteredQnaList = this.qnaList;
      }
    },
  },
};
</script>

<style></style>
