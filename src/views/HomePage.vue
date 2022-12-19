<template>
  <section class="home">
    <div class="welcome" v-if="isLogin">
      ❤️ <b> {{ brandNameKor }}</b
      >님 환영합니다! ❤️
    </div>
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
  },
  data() {
    return {
      chartData: {
        labels: [
          // '22/01',
          // '22/02',
          // '22/03',
          // '22/04',
          // '22/05',
          '22/06',
          '22/07',
          '22/08',
          '22/09',
          '22/10',
          '22/11',
          '22/12',
        ],
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
            data: [
              // 100000, 600000, 1100000, 700000,
              // 800000, 200000,
              380000, 740000, 504000, 900000, 1800000, 1200000, 1200000,
            ],
          },
        ],
      },
      options: {
        responsive: true,
        legend: false,
        scales: {
          xAxes: [
            {
              stacked: false, // 쌓임
              display: true, // x 축 show
              scaleLabel: {
                display: false,
                labelString: '날짜',
              },
              grid: {
                drawBorder: false,
                color: '#323232',
                lineWidth: 1,
              },
              ticks: {
                beginAtZero: true, // 0부터 시작
                padding: 0,
              },
            },
          ],
          // y축 옵션
          yAxes: [
            {
              stacked: false, // 쌓임
              display: true, // y 축 show
              ticks: {
                stepSize: 20, // 증가범위
                beginAtZero: true,
                max: 100, // 최대범위
                min: 0, // 최소범위
                padding: 10, // 오른쪽 간격
              },
              grid: {
                drawBorder: false,
                color: '#323232',
                lineWidth: 1,
              },
            },
          ],
        },
      },
    };
  },
};
</script>
<style scoped>
.chart {
  margin: 0 auto;
  width: 400px;
}
</style>
