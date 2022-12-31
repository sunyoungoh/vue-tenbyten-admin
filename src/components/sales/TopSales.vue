<template>
  <div class="top3-sales">
    <div v-for="(item, i) in topSales" :key="i">
      <div
        v-if="item.products.length"
        class="sales-item"
        :class="item.top == '1' ? 'top1' : ''"
      >
        <div class="pop-num">{{ item.top }}</div>
        <p class="item-name">{{ item.products[0] | itemName }}</p>
        <p v-if="topDupli" class="item-name">
          {{ item.products[1] | itemName }}
        </p>
        <div class="sales-count">{{ item.count }}개</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    orderList() {
      return this.$store.getters.monthlyOrderList;
    },
    topDupli() {
      let result = this.topSales
        .map(item => item.products)
        .some(item => item.length > 1);
      return result;
    },
    topSales() {
      let itemIdArr = this.orderList.map(item => item.itemId);
      let countById = {};
      itemIdArr.forEach(itemId => {
        countById[itemId] = (countById[itemId] || 0) + 1;
      });
      let sortedArr = Object.entries(countById).sort((a, b) => b[1] - a[1]);
      let countArr = [...new Set(sortedArr.map(item => item[1]))];
      let topThree = [...new Array(3)].map(() => []);
      topThree = topThree.map((item, i) => {
        return {
          top: i + 1,
          products: sortedArr
            .filter(item => countArr[i] == item[1])
            .map(item => item[0]),
          count: countArr[i],
        };
      });
      return topThree;
    },
  },
};
</script>

<style></style>
