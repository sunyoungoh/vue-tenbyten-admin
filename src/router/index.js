import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/Order.vue'),
  },
  {
    path: '/ready',
    name: 'Ready',
    component: () => import('@/views/Ready.vue'),
  },
  {
    path: '/sales',
    name: 'Sales',
    component: () => import('@/views/Sales.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
