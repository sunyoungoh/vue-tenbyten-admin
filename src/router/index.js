import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/views/LoginPage.vue'),
  },

  {
    path: '/order',
    name: 'OrderPage',
    component: () => import('@/views/OrderPage.vue'),
  },
  {
    path: '/ready',
    name: 'ReadyPage',
    component: () => import('@/views/ReadyPage.vue'),
  },
  {
    path: '/delivery',
    name: 'DeliveryPage',
    component: () => import('@/views/DeliveryPage.vue'),
  },
  {
    path: '/sales',
    name: 'SalesPage',
    component: () => import('@/views/SalesPage.vue'),
  },
  {
    path: '/qna',
    name: 'QnaPage',
    component: () => import('@/views/QnaPage.vue'),
  },
  {
    path: '*',
    component: () => import('@/views/HomePage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!store.state.user.isLogin && to.path !== '/login') {
    next({ name: 'LoginPage' });
  } else next();
});
export default router;
