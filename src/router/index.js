import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/OrderPage.vue'),
  },
  {
    path: '/ready',
    name: 'Ready',
    component: () => import('@/views/ReadyPage.vue'),
  },
  {
    path: '/delivery',
    name: 'Delivery',
    component: () => import('@/views/DeliveryPage.vue'),
  },
  {
    path: '/sales',
    name: 'Sales',
    component: () => import('@/views/SalesPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
