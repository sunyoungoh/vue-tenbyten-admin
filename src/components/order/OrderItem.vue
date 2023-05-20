<template>
  <tr>
    <td
      v-for="(title, i) in titles"
      :key="i"
      :data-title="title.value"
      :class="[
        clickField == title.key ? 'filter-tab' : '',
        title.key == 'itemRequireMemo' || title.key == 'requireMemo'
          ? 'memo'
          : '',
      ]"
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
      <a
        v-else-if="title.key == 'ordererPhone'"
        :href="`sms:${item[title.key]}`"
      >
        {{ item[title.key] | emptyValue }}
      </a>
      <span v-else>
        {{ item[title.key] | emptyValue }}
      </span>
    </td>
    <td data-title="발송상태" v-if="$route.path == '/ready'">
      <TableBtn
        class="btn-send"
        :result="sendResult"
        :send-all="sendAll"
        @click="sendMailAndPostOrder"
      />
    </td>
    <td data-title="송장등록" v-if="$route.path == '/ready'">
      <TableBtn
        class="btn-post btn-outline"
        :result="postResult"
        @click="postOrder('onlyPost')"
      >
        <template #success>등록성공</template>
        <template #error>등록실패</template>
        <template #default>송장만 등록</template>
      </TableBtn>
    </td>
  </tr>
</template>

<script>
import { sendMail, dispatchOrder } from '@/api/order';
import { secretId } from '@/utils/filters';
import TableBtn from '@/components/common/table/TableBtn.vue';

export default {
  components: {
    TableBtn,
  },
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
      sendResult: '',
      postResult: '',
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
      return secretId(ordererId);
    },
    validateEmail() {
      const reg = /.+@.+\..+/;
      return reg.test(this.item.itemRequireMemo);
    },
    mailData() {
      const reg = /\S+@+\S+\.+[a-zA-Z]{2,3}/;
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
          detailIdx: this.item.detailIdx,
          ordererName: this.item.ordererName,
          toEmail: this.mailData.toEmail,
          itemId: this.item.itemId,
          itemOption: this.item.itemOption,
          requireMemo: this.item.itemRequireMemo,
          ordererPhone: this.item.ordererCellPhone,
          ordererEmail: this.item.ordererEmail,
          orderDate: new Date(this.item.orderDate),
          price: this.item.price,
        },
      };
    },
  },
  methods: {
    async postOrder(action) {
      const { data } = await dispatchOrder(this.dispatchData);
      if (data.code == 'SUCCESS') {
        action == 'onlyPost'
          ? (this.postResult = 'success')
          : (this.sendResult = 'success');
      } else {
        this.postResult = 'error';
      }
    },
    async sendMailAndPostOrder() {
      try {
        const { status } = await sendMail(this.mailData);
        if (status == 200) {
          this.postOrder();
        }
      } catch (error) {
        this.sendResult = 'error';
      }
    },
  },
};
</script>
<style scoped>
a {
  color: #000;
}
</style>
