<template>
  <div class="top3-sales">
    <div
      class="sales-item"
      v-for="(items, i) in topSales"
      :key="i"
      :class="i == 'topOne' ? 'top1' : ''"
    >
      <div class="pop-num">{{ items.index }}</div>
      <p v-for="(product, j) in items.products" :key="j" class="item-name">
        {{ product | itemName }}
      </p>
      <div class="sales-count">{{ items.count }}개</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    orderList() {
      return this.$store.getters.monthlyOrderList;
    },
    topSales() {
      let itemIdArr = this.orderList.map(item => item.itemId);
      let countById = {};
      itemIdArr.forEach(itemId => {
        countById[itemId] = (countById[itemId] || 0) + 1;
      });
      let sortedArr = Object.entries(countById).sort((a, b) => b[1] - a[1]);
      let countArr = [...new Set(sortedArr.map(item => item[1]))];
      let list = {
        topOne: {
          index: 1,
          products: sortedArr
            .filter(item => countArr[0] == item[1])
            .map(item => item[0]),
          count: countArr[0],
        },
        topTwo: {
          index: 2,
          products: sortedArr
            .filter(item => countArr[1] == item[1])
            .map(item => item[0]),
          count: countArr[1],
        },
        topThree: {
          index: 3,
          products: sortedArr
            .filter(item => countArr[2] == item[1])
            .map(item => item[0]),
          count: countArr[2],
        },
      };
      return list;
    },
  },
};
</script>

<style></style>
