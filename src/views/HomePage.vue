<template>
  <section class="home container">
    <LoadingSpinner v-if="loading" />
    <template v-else>
      <div class="welcome">
        ❤️ <b> {{ brandNameKor }}</b
        >님 환영합니다! ❤️
      </div>
      <div class="sales-info">
        <h1 class="highlighter highlighter__yellow">
          이번달엔 {{ salesCount }}건이 판매되었습니다! 🎉
        </h1>
        <LineChart class="chart" :options="options" :chartData="chartData" />
      </div>
    </template>
  </section>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import LineChart from '@/utils/LineChart';

export default {
  components: {
    LoadingSpinner,
    LineChart,
  },
  async mounted() {
    if (this.isLogin) {
      await this.$store.dispatch('fetchOrderList', 'home');
      this.fetchChartData();
    }
  },
  data() {
    return {
      chartData: {},
      options: {},
    };
  },
  computed: {
    loading() {
      return this.$store.state.order.loading;
    },
    isLogin() {
      return this.$store.state.user.isLogin;
    },
    brandNameKor() {
      return this.$store.state.user.brandNameKor;
    },
    salesCount() {
      return this.$store.getters.monthlyOrderList.length;
    },
    orderList() {
      return this.$store.state.order.orderList;
    },
    monthlySales() {
      let arr = [];
      for (let i = 5; i >= 0; i--) {
        let orderList;
        const today = new Date();
        const aFewMonthAgo = new Date(today.setMonth(today.getMonth() - i));
        orderList = this.orderList.filter(
          item =>
            new Date(item.orderDate).getMonth() == aFewMonthAgo.getMonth() &&
            new Date(item.orderDate).getFullYear() ==
              aFewMonthAgo.getFullYear(),
        );
        if (orderList.length > 0) {
          let year = new Date(orderList[0].orderDate).getFullYear();
          let month = new Date(orderList[0].orderDate).getMonth() + 1;
          let date = `${year.toString().substring(2)}/${month}`;
          arr.push({
            date: date,
            amount: orderList
              .map(item => item.price)
              .reduce((prev, curr) => prev + curr),
          });
        } else {
          let year = aFewMonthAgo.getFullYear();
          let month = aFewMonthAgo.getMonth() + 1;
          let date = `${year.toString().substring(2)}/${month}`;
          arr.push({ date: date, amount: '' });
        }
      }
      return arr;
    },
  },
  watch: {
    orderList() {
      this.fetchChartData();
    },
  },
  methods: {
    fetchChartData() {
      this.chartData = {
        labels: this.monthlySales.map(item => item.date),
        datasets: [
          {
            borderWidth: 2, // 라인 넓이
            hoverBorderWidth: 2,
            fill: true, // 채우기
            tension: 0.1,
            backgroundColor: 'rgba(255, 211, 34, 0.25)',
            pointBackgroundColor: '#ffcd1a',
            hoverBackgroundColor: 'rgba(255, 211, 34, 0.25)',
            pointHoverBackgroundColor: '#ffcd1a',
            pointHoverBorderWidth: 3,
            borderColor: '#ffcd1a',
            hoverBorderColor: '#ffcd1a',
            pointBorderColor: '#ffcd1a',
            data: this.monthlySales.map(item => item.amount),
          },
        ],
      };
      const rawStepSize =
        Math.max(...this.monthlySales.map(item => item.amount)) / 6;
      const stepSize = Math.ceil(rawStepSize / 10000) * 10000;
      this.options = {
        responsive: true,
        legend: false,
        maintainAspectRatio: false,
        hover: {
          mode: 'dataset',
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              console.log(data);
              //그래프 콤마
              return (
                tooltipItem.yLabel
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
              );
            },
          },
        },
        scales: {
          xAxes: [
            {
              stacked: false, // 쌓임
              display: true, // x 축 show
              scaleLabel: {
                display: false,
              },
              gridLines: {
                display: false,
              },
              ticks: {
                maxRotation: 0,
                minRotation: 0,
                fontSize: 10,
              },
            },
          ],
          // y축 옵션
          yAxes: [
            {
              stacked: false, // 쌓임
              display: true, // y 축 show
              ticks: {
                stepSize: stepSize, // 증가범위
                beginAtZero: true,
                min: 0, // 최소범위
                padding: 10, // 오른쪽 간격
                fontSize: 10,
                userCallback: function (value) {
                  value = value.toString();
                  let endIndex = value.length - 4;
                  value = value.slice(0, endIndex);
                  return value ? `${value}만` : '';
                },
              },
              gridLines: {
                drawBorder: false,
                color: '#eee',
                lineWidth: 1,
              },
            },
          ],
        },
      };
    },
  },
};
</script>
<style scoped></style>
