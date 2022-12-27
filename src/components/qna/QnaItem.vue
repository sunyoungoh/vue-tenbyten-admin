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
      <div v-html="contents" class="contents"></div>
    </div>
    <div>
      <button
        class="btn-anwser"
        @click="toggle = !toggle"
        :class="item.isAnwser ? 'btn-outline' : ''"
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
          v-if="!item.isAnwser && anwserResult == ''"
          :loading="loading"
          @click.native="anwserQna"
        >
          <span v-if="anwserResult == 'succeess'">등록완료</span>
          <span v-else>등록하기</span>
        </QnaSubmitBtn>
      </div>
      <textarea
        v-model="inputReplyContents"
        @input="inputReplyContents = $event.target.value"
        class="reply-contents"
        ref="textarea"
        :rows="textareaRow"
        :disabled="
          item.replyContents !== '' || loading || anwserResult == 'success'
        "
      ></textarea>
    </div>
  </div>
</template>

<script>
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
      inputReplyContents: this.item.replyContents || '',
    };
  },
  computed: {
    textareaRow() {
      return this.isAnwser ? this.inputReplyContents.split('\r\n').length : 4;
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
      let secretId =
        userId.length == 0
          ? ''
          : userId.length > 9
          ? `${userId.slice(0, 5)}*****`
          : userId.length > 6
          ? `${userId.slice(0, 3)}*****`
          : `${userId.slice(0, 2)}****`;
      return secretId;
    },
    contents() {
      return this.item.contents.replaceAll('\r\n', '<br/>');
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
    clickEdit() {
      this.edit = !this.edit;
      if (!this.edit) this.anwserQna();
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
