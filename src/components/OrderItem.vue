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
  filters: {
    emptyValue(value) {
      return !value ? 'X' : value;
    },
    itemName(itemId) {
      switch (itemId) {
        case 5033569:
          return '2023 심플 플래너';
        case 5033568:
          return '2023 모던 플래너';
        case 5033567:
          return '2023 타임라인 플래너';
        case 5033566:
          return '2023 먼슬리&데일리 플래너';
        case 5033565:
          return '31DAYS 플래너';
        case 5033562:
          return '3년 5년 다이어리';
        case 5033564:
          return '세로형 인덱스 노트';
        case 5033563:
          return '가로형 인덱스 노트';
        case 5033560:
          return '독서노트';
        case 5033558:
          return '드라마노트';
        case 5033557:
          return '먼슬리 트래커북';
        case 5033561:
          return '180 베이직 노트';
        case 5033559:
          return '180 체커보드 노트';
        case 5068583:
          return '레시피북';
        default:
          return '';
      }
    },
  },
};
</script>

<style></style>
