import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Producer from '@/views/Producer';
import Market from '@/views/Market';
import Wallet from '@/views/Wallet';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/wallet',
    },
    {
      path: '/producer',
      name: 'producer',
      component: Producer,
    },
    {
      path: '/market',
      name: 'market',
      component: Market,
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: Wallet,
    },
  ],
});
