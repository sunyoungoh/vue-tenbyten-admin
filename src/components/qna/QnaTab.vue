<template>
  <ul class="qna-tab">
    <li
      v-for="(item, i) in tabList"
      :key="i"
      class="tab-item"
      @click="$emit('click-tab', item.value)"
      :class="activeTab == item.value ? 'active' : ''"
    >
      {{ item.label }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    activeTab: {
      type: String,
      default: 'noAnwser',
    },
  },
  data() {
    return {
      tabList: [
        { label: '모두 보기', value: 'all' },
        { label: '미답변 문의', value: 'noAnwser' },
        { label: '답변완료 문의', value: 'yesAnwser' },
      ],
    };
  },
};
</script>

<style></style>
