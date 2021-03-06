import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue'; // equivalent to '../views/Home.vue'
import Thread from '@/views/Thread.vue';
import { authGuard } from '@/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: authGuard,
  },
  {
    path: '/thread/:eventId',
    name: 'Thread',
    component: Thread,
    props: true,
    beforeEnter: authGuard,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
