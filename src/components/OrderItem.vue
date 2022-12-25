<template>
  <tr>
    <td
      v-for="(title, i) in titles"
      :key="i"
      :data-title="title.value"
      :class="clickField == title.key ? 'filter-tab' : ''"
    >
      <span v-if="title.key == 'orderDate' || title.key == 'createdAt'">
        {{ item[title.key] | timeFormat }}
      </span>
      <span v-else-if="title.key == 'ordererId'">
        {{ secretUserId | emptyValue }}
      </span>
      <span v-else-if="title.key == 'itemId'">
        {{ item[title.key] | itemName }}
      </span>
      <span v-else>
        {{ item[title.key] | emptyValue }}
      </span>
    </td>
    <td data-title="발송상태" v-if="$route.path == '/ready'">
      <button
        @click="sendMailAndPostOrder"
        class="btn-post"
        :class="postResult.css"
        :disabled="postResult.status !== '' || loading"
      >
        <span v-if="loading" class="spinner"></span>
        <span v-else> {{ postResult.text }} </span>
      </button>
    </td>
  </tr>
</template>

<script>
import { sendMail, dispatchOrder } from '@/api/order';

export default {
  props: {
    titles: {
      type: Array,
    },
    item: {
      type: Object,
    },
    clickField: {
      type: String,
    },
    sendAll: {
      type: Boolean,
    },
  },
  data() {
    return {
      postResult: {
        status: '',
        text: '발송하기',
        css: '',
      },
      loading: false,
    };
  },
  watch: {
    sendAll(val) {
      if (val == true) {
        this.sendMailAndPostOrder();
      }
    },
  },
  computed: {
    secretUserId() {
      const ordererId = this.item.ordererId;
      let secretId =
        ordererId.length == 0
          ? ''
          : ordererId.length > 9
          ? `${ordererId.slice(0, 5)}*****`
          : ordererId.length > 6
          ? `${ordererId.slice(0, 3)}*****`
          : `${ordererId.slice(0, 2)}****`;

      return secretId;
    },
    validateEmail() {
      const reg = /.+@.+\..+/;
      return reg.test(this.item.itemRequireMemo);
    },
    mailData() {
      const reg = /\S+@+\S+\.+\S+/;
      let email = this.validateEmail
        ? this.item.itemRequireMemo.match(reg)[0]
        : this.item.ordererEmail;
      return {
        store: '텐바이텐/영로그',
        items: [
          {
            itemId: this.item.itemId,
            itemOption: this.item.itemOption,
          },
        ],
        toEmail: email,
      };
    },
    dispatchData() {
      return {
        orderSerial: this.item.orderSerial,
        detailIdx: this.item.detailIdx,
        details: {
          ordererId: this.item.ordererId,
          ordererName: this.item.ordererName,
          toEmail: this.mailData.toEmail,
          itemId: this.item.itemId,
          itemOption: this.item.itemOption,
          requireMemo: this.item.itemRequireMemo,
          ordererPhone: this.item.ordererCellPhone,
          ordererEmail: this.item.ordererEmail,
          orderDate: this.item.orderDate,
          price: this.item.price,
        },
      };
    },
  },
  methods: {
    async postOrder() {
      const { data } = await dispatchOrder(this.dispatchData);
      console.log(data);
      if (data.code == 'SUCCESS') {
        this.loading = false;
        this.postResult = {
          status: 'success',
          text: '발송완료',
          css: 'btn_post-success',
        };
      } else {
        this.postResult = {
          status: 'fail',
          text: '발송실패',
          css: 'btn_post-fail',
        };
      }
    },
    async sendMailAndPostOrder() {
      let sendResult = {};
      this.loading = true;
      try {
        sendResult = await sendMail(this.mailData);
        console.log('메일 전송 완료');
      } catch (error) {
        console.log(error);
        this.loading = false;
        if (error.response.status == 400)
          this.postResult = {
            status: 'fail',
            text: '발송실패',
            css: 'btn_post-fail',
          };
      }
      if (sendResult?.status == 200) {
        this.postOrder();
      }
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
  border-color: #5e5e5e;
  border-top-color: #ffffff;
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
