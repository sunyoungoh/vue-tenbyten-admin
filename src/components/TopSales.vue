<template>
  <div class="top3-sales">
    <div class="sales-item top1">
      <div class="pop-num">1</div>
      <p v-for="(item, i) in topOne.items" :key="i" class="item-name">
        {{ topOne.items[i] | itemName }}
      </p>
      <div class="sales-count">{{ topOne.count }}개</div>
    </div>
    <div class="sales-item top2">
      <div class="pop-num">2</div>
      <p v-for="(item, i) in topTwo.items" :key="i" class="item-name">
        {{ topTwo.items[i] | itemName }}
      </p>
      <div class="sales-count">{{ topTwo.count }}개</div>
    </div>
    <div class="sales-item top3">
      <div class="pop-num">3</div>
      <p v-for="(item, i) in topThree.items" :key="i" class="item-name">
        {{ topThree.items[i] | itemName }}
        <span v-if="topThree.items.length > 2">+1</span>
      </p>
      <div class="sales-count">{{ topThree.count }}개</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    topOne: {
      type: Object,
    },
    topTwo: {
      type: Object,
    },
    topThree: {
      type: Object,
    },
  },
};
</script>

<style></style>
