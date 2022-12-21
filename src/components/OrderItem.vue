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
      <span v-else-if="title.key == 'itemId'">
        {{ item[title.key] | itemName }}
      </span>
      <span v-else>
        {{ item[title.key] | emptyValue }}
      </span>
    </td>
    <td data-title="발송상태" class="btns_post" v-if="$route.path == '/ready'">
      <button
        @click="sendMailAndPostOrder"
        :class="postResult.css"
        :disabled="postResult.status !== 'none'"
      >
        {{ postResult.text }}
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
        status: 'none',
        text: '발송하기',
        css: 'btn_post-default',
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
    validateEmail() {
      const reg = /.+@.+\..+/;
      return reg.test(this.item.itemRequireMemo);
    },
    mailData() {
      let email = this.validateEmail
        ? this.item.itemRequireMemo
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
          ordererId: this.item.userId,
          ordererName: this.item.ordererName,
          toEmail: this.mailData.toEmail,
          itemId: this.item.itemId,
          itemOption: this.itemOption,
          requireMemo: this.itemRequireMemo,
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
      this.postResult = {
        status: 'wait',
        text: '발송중...',
        css: 'btn_post-loading',
      };
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

<style></style>
