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
      <span> {{ item.qnaDate }}</span>
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
          <span v-if="item.isAnwser"> | {{ item.replyDate }}</span>
        </div>
        <button
          class="btn-outline"
          v-if="item.isAnwser || anwserResult == 'success'"
          @click="clickEdit"
        >
          <span v-if="!edit"> 수정하기 </span>
          <span v-else>수정완료 </span>
        </button>
        <button
          class="btn-outline"
          v-if="!item.isAnwser && anwserResult == ''"
          @click="anwserQna"
        >
          등록하기
        </button>
      </div>
      <div class="spinner" v-if="loading"></div>
      <textarea
        v-model="replyContents"
        @input="inputReplyContents = $event.target.value"
        class="reply-contents"
        ref="textarea"
        rows="7"
        :disabled="
          (item.replyContents !== '' && !edit) ||
          loading ||
          (anwserResult == 'success' && !edit)
        "
      ></textarea>
      {{ inputReplyContents }}
    </div>
  </div>
</template>

<script>
// import { anwserQna } from '@/api/order';
import QnaLabel from '@/components/qna/QnaLabel.vue';
import BtnAngle from '@/components/BtnAngle.vue';

export default {
  components: {
    QnaLabel,
    BtnAngle,
  },
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      toggle: false,
      edit: false,
      loading: false,
      anwserResult: '',
      inputReplyContents: '',
    };
  },
  computed: {
    isAnwser: {
      get() {
        return this.anwserResult == '' ? this.item.isAnwser : true;
      },
      set() {},
    },
    replyContents: {
      get() {
        let anwser;
        if (this.item.replyContents !== '') anwser = this.item.replyContents;
        if (this.inputReplyContents !== '') anwser = this.inputReplyContents;
        return anwser;
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
    // async anwserQna() {
    anwserQna() {
      // let anwserResult = {};
      this.loading = true;
      setTimeout(() => {
        this.anwserResult = 'success';
        // this.loading = false;
        this.isAnwser = true;
        console.log(this.isAnwser);
      }, 10000);
      //   try {
      //     anwserResult = await anwserQna(this.anwserData);
      //   } catch (error) {
      //     console.log(error);
      //     this.loading = false;
      //   }
      //   console.log(anwserResult);
    },
  },
};
</script>
<style>
.spinner {
  position: relative;
  top: 2px;
  width: 16px;
  height: 16px;
  display: inline-block;
  border-width: 2px;
  border-color: #ebebeb;
  border-top-color: #212121;
  animation: spin 1s infinite linear;
  border-radius: 100%;
  border-style: solid;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
@media screen and (max-width: 576px) {
  .spinner {
    position: relative;
    width: 12px;
    height: 12px;
  }
}
</style>
