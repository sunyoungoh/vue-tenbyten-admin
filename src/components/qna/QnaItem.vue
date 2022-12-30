<template>
  <div class="qna-item">
    <div class="qna-item_title">
      [{{ item.kind }}] {{ item.itemId | itemName }}
      <QnaLabel :isAnwser="isAnwser" />
    </div>
    <div class="question-info">
      <span v-if="item.username"> {{ item.username }} | </span>
      <span v-if="secretUserId"> {{ secretUserId }} | </span>
      <span> {{ item.orderId }}</span>
      <span> {{ item.qnaDate | timeFormat }}</span>
      <div v-html="questionContents" class="question-contents"></div>
    </div>
    <div>
      <button
        class="btn-anwser"
        :class="item.isAnwser ? 'btn-outline' : ''"
        @click="toggle = !toggle"
      >
        <span v-if="!item.isAnwser">답변하기</span>
        <span v-else>
          답변보기
          <BtnAngle :toggle="toggle" />
        </span>
      </button>
    </div>
    <div class="anwser-info" v-if="toggle">
      <div class="anwser-top">
        <div class="anwser-date">
          <span class="emoji">👩🏻‍💻</span> {{ replyUser }}
          <span v-if="isAnwser"> | {{ replyDate | timeFormat }}</span>
        </div>
        <QnaSubmitBtn
          v-if="!item.isAnwser"
          :loading="loading"
          class="btn-write"
          :class="anwserResult"
          @click.native="anwserQna"
        >
          <span v-if="anwserResult == 'success'">등록완료</span>
          <span v-else-if="anwserResult == 'error'">등록실패</span>
          <span v-else>등록하기</span>
        </QnaSubmitBtn>
      </div>
      <div
        v-if="item.replyContents !== ''"
        v-html="replyContents"
        class="reply-contents"
      ></div>
      <textarea
        v-else
        ref="textarea"
        v-model="inputReplyContents"
        @input="input($event.target.value)"
        class="reply-contents"
        :disabled="loading || anwserResult == 'success'"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { secretId } from '@/utils/filters';
import { anwserQna } from '@/api/order';
import QnaLabel from '@/components/qna/QnaLabel.vue';
import BtnAngle from '@/components/BtnAngle.vue';
import QnaSubmitBtn from '@/components/qna/QnaSubmitBtn.vue';

export default {
  components: {
    QnaLabel,
    BtnAngle,
    QnaSubmitBtn,
  },
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      toggle: false,
      loading: false,
      anwserResult: '',
      inputReplyContents: '',
    };
  },
  computed: {
    replyContents() {
      return this.item.replyContents.replaceAll(
        /(?:\\[rn]|[\r\n]+)+/g,
        '<br/>',
      );
    },
    questionContents() {
      return this.item.contents.replaceAll(/(?:\\[rn]|[\r\n]+)+/g, '<br/>');
    },
    replyDate: {
      get() {
        return this.anwserResult == '' ? this.item.replyDate : new Date();
      },
      set() {},
    },
    isAnwser: {
      get() {
        return this.anwserResult == '' ? this.item.isAnwser : true;
      },
      set() {},
    },
    replyUser() {
      return this.item.replyUser
        ? this.item.replyUser
        : this.$store.state.user.brandId;
    },
    secretUserId() {
      const userId = this.item.userId;
      return secretId(userId);
    },

    anwserData() {
      return {
        qnaid: this.item.qnaId,
        replyeuser: this.replyUser,
        replyecontent: this.inputReplyContents,
      };
    },
  },
  methods: {
    input(value) {
      this.inputReplyContents = value;
      const { textarea } = this.$refs;
      textarea.style.height = '20px';
      textarea.style.height = textarea.scrollHeight - 16 + 'px';
    },
    async anwserQna() {
      this.loading = true;
      try {
        const { data } = await anwserQna(this.anwserData);
        console.log(data);
        this.anwserResult = 'success';
        this.isAnwser = true;
      } catch (error) {
        this.anwserResult = 'error';
        console.log(error);
      }
      this.loading = false;
    },
  },
};
</script>
<style></style>
