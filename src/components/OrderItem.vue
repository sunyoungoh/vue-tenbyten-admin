<template>
  <tr>
    <td data-title="주문일" class="order-date">{{ orderDate }}</td>
    <td data-title="아이디">{{ item['UserId'] | emptyValue }}</td>
    <td data-title="이름">{{ item.ordererName }}</td>
    <td data-title="휴대폰">{{ item.ordererCellPhone }}</td>
    <td data-title="이메일">{{ item.ordererEmail }}</td>
    <td data-title="상품명" class="item-name">
      {{ this.item['details'][0]['itemId'] | itemName }}
    </td>
    <td data-title="옵션" class="item-option">
      {{ itemOptionName | emptyValue }}
    </td>
    <td data-title="주문메모">{{ itemRequireMemo | emptyValue }}</td>
    <td data-title="발송상태" class="btns_post" v-if="$route.path == '/ready'">
      <template>
        <button
          @click="sendMailAndPostOrder"
          v-if="postResult == 'none' && loading == false"
          class="btn_post-default"
        >
          발송하기
        </button>
        <button v-if="loading == true" class="btn_post-loading">
          발송 중..
        </button>
        <template v-else>
          <button v-if="postResult == 'complete'" class="btn_post-complete">
            발송완료
          </button>
          <button v-else-if="postResult == 'fail'" class="btn_post-fail">
            발송실패
          </button>
        </template>
      </template>
    </td>
  </tr>
</template>

<script>
import { sendMail, dispatchOrder } from '@/api/order';

export default {
  props: {
    item: {
      type: Object,
    },
    sendAll: {
      type: Boolean,
    },
  },
  data() {
    return {
      postResult: 'none',
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
      return reg.test(this.item['details'][0]['RequireMemo']);
    },
    orderDate() {
      let splitDate = this.item['orderDate'].split('-');
      return splitDate[0].substr(2) + '/' + splitDate[1] + '/' + splitDate[2];
    },
    itemOptionName() {
      let str = this.item['details'][0]['itemOptionName'];
      if (str !== '') {
        let endIndex = this.item['details'][0]['itemOptionName'].indexOf('꼭');
        if (endIndex !== -1) {
          str = this.item['details'][0]['itemOptionName'].substring(
            0,
            endIndex - 1,
          );
        }
      }
      return str;
    },
    itemRequireMemo() {
      return this.item['details'][0]['RequireMemo'].trim();
    },
    mailData() {
      let email = this.validateEmail
        ? this.item['details'][0]['RequireMemo']
        : this.item.ordererEmail;
      return {
        store: '텐바이텐/영로그',
        items: [
          {
            itemId: this.item['details'][0]['itemId'],
            itemOptionName: this.itemOptionName,
          },
        ],
        toEmail: email,
      };
    },
    dispatchData() {
      return {
        orderSerial: this.item['OrderSerial'],
        detailIdx: this.item['details'][0]['DetailIdx'],
        details: {
          ordererId: this.item['UserId'],
          ordererName: this.item.ordererName,
          toEmail: this.mailData.toEmail,
          itemId: this.item['details'][0]['itemId'],
          itemOption: this.itemOptionName,
          requireMemo: this.itemRequireMemo,
          ordererPhone: this.item.ordererCellPhone,
          ordererEmail: this.item.ordererEmail,
          orderDate: new Date(this.item['orderDate']),
          price: Number(this.item['details'][0]['NotCouponPrice']),
        },
      };
    },
  },
  methods: {
    async postOrder() {
      const { data } = await dispatchOrder(this.dispatchData);
      if (data.code == 'SUCCESS') {
        this.loading = false;
        this.postResult = 'complete';
      } else {
        this.postResult = 'fail';
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
        if (error.response.status == 400) this.postResult = 'fail';
      }
      if (sendResult?.status == 200) {
        this.postOrder();
      }
    },
  },
};
</script>

<style></style>
