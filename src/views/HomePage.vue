<template>
  <section class="home container">
    <div class="welcome" v-if="isLogin">
      ❤️ <b> {{ brandNameKor }}</b
      >님 환영합니다! ❤️
    </div>
    <div>이번달엔 {{ salesCount }}건이 판매되었어요!</div>
    {{ monthlySales }}
    <LoginForm v-if="!isLogin" />
    <BarChart
      v-if="isLogin"
      class="chart"
      :options="options"
      :chartData="chartData"
    />
  </section>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import BarChart from '@/utils/BarChart';
export default {
  async mounted() {
    await this.$store.dispatch('fetchOrderList');
    this.fetchChartData();
  },
  components: {
    LoginForm,
    BarChart,
  },
  computed: {
    isLogin() {
      return this.$store.state.user.isLogin;
    },
    brandNameKor() {
      return this.$store.state.user.brandNameKor;
    },
    salesCount() {
      return this.$store.getters.monthlyOrderList.length;
    },
    monthlySales() {
      return this.$store.getters.monthlySales;
    },
  },
  data() {
    return {
      chartData: {},
      options: {
        responsive: true,
        legend: false,
        //그래프에 데이터 직접 표시 (마우스 올렸을때가 아니라 그래프 자체에 데이터표시)
        hoverBorderWidth: 20,
        maintainAspectRatio: false,
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
                labelString: '날짜',
              },
              gridLines: {
                display: false,
                // drawBorder: false,
                // color: '#323232',
                // lineWidth: 1,
              },
              ticks: {
                beginAtZero: true, // 0부터 시작
                maxRotation: 0,
                minRotation: 0,
                // autoSkip: true,
                maxTicksLimit: 6,
              },
            },
          ],
          // y축 옵션
          yAxes: [
            {
              stacked: false, // 쌓임
              display: true, // y 축 show
              ticks: {
                stepSize: 50000, // 증가범위
                beginAtZero: true,
                min: 0, // 최소범위
                padding: 10, // 오른쪽 간격
                fontSize: 14,
              },
              gridLines: {
                // display: false,
                drawBorder: false,
                color: '#eee',
                lineWidth: 1,
              },
            },
          ],
        },
      },
    };
  },
  methods: {
    fetchChartData() {
      this.chartData = {
        labels: ['22/07', '22/08', '22/09', '22/10', '22/11', '22/12'],
        datasets: [
          {
            borderWidth: 1, // 라인 넓이
            label: '월별 매출', // 데이터 라벨
            backgroundColor: '#ffb4c3',
            pointBackgroundColor: '#ffb4c3',
            fill: true, // 채우기
            // barPercentage: 1, 바 안쪽 넓이
            // categoryPercentage: 0.5, 바 외부 넓이
            barPercentage: 0.7,
            // barThickness: 6,
            // maxBarThickness: 8,
            // minBarLength: 2,
            tension: 0.1,
            borderColor: '#ffb4c3',
            pointBorderColor: '#ffb4c3',
            data: this.$store.getters.monthlySales,
            // 100000, 600000, 1100000, 700000,
            // 800000, 200000,
            // 1200, 60, 20, 30, 40, 50, 60,
            // ,
            // ],
          },
        ],
      };
    },
  },
};
</script>
<style scoped></style>
