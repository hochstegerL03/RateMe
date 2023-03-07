import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import OverviewView from '../views/OverviewView.vue';
import CardView from '../views/CardView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/overview',
      name: 'overview',
      component: OverviewView,
    },
    {
      path: '/card',
      name: 'card',
      component: CardView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'home',
      component: HomeView,
    },
  ],
});

export default router;
