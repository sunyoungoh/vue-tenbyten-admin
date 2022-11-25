<template>
  <tr>
    <td>{{ orderDate }}</td>
    <td>{{ item['UserId'] }}</td>
    <td>{{ item['ordererName'] }}</td>
    <td>{{ itemName }}</td>
    <td>{{ itemOptionName }}</td>
    <td>{{ item['details'][0]['RequireMemo'] }}</td>
    <td class="btns_post" v-if="this.$store.state.clickedBtn == 'ready'">
      <button @click="postOrder" v-if="postResult == 'none'">발송하기</button>
      <button v-else-if="postResult == 'complete'" class="btn_post-complete">
        발송완료
      </button>
      <button v-else-if="postResult == 'fail'" class="btn_post-fail">
        발송실패
      </button>
    </td>
  </tr>
</template>

<script>
import { sendMail, postOrder } from '@/api/order';
export default {
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      postResult: 'none',
    };
  },
  computed: {
    orderDate() {
      let splitDate = this.item['orderDate'].split('-');
      return splitDate[0].substr(2) + '/' + splitDate[1] + '/' + splitDate[2];
    },
    itemName() {
      let startIndex = this.item['details'][0]['itemName'].indexOf(']');
      let endIndex = this.item['details'][0]['itemName'].indexOf('굿');
      return this.item['details'][0]['itemName'].substring(
        startIndex + 2,
        endIndex - 1,
      );
    },
    itemOptionName() {
      let str = this.item['details'][0]['itemOptionName'];
      let endIndex = this.item['details'][0]['itemOptionName'].indexOf('꼭');
      if (endIndex !== -1) {
        return this.item['details'][0]['itemOptionName'].substring(
          0,
          endIndex - 1,
        );
      } else {
        return str;
      }
    },
  },
  methods: {
    async postOrder() {
      try {
        const sendResult = await sendMail(
          this.item['details'][0]['itemId'],
          this.itemOptionName,
          this.item['details'][0]['RequireMemo'],
        );
        if (sendResult.status == 200) {
          try {
            await postOrder(
              this.item['OrderSerial'],
              this.item['details'][0]['DetailIdx'],
            );
            this.postResult = 'complete';
          } catch (error) {
            console.log(error.response.data.message);
            this.postResult = 'fail';
          }
        }
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) this.postResult = 'fail';
      }
    },
  },
};
</script>

<style></style>
