import { createApp } from 'vue';
import {
  createWebHistory,
  createRouter,
  type RouteRecordRaw,
} from 'vue-router';

import './assets/css/main.css';

import App from './App.vue';

import Home from './pages/Home.vue';
import Documentation from './pages/Documentation.vue';
import Playground from './pages/Playground.vue';

export const routes: (RouteRecordRaw & { icon: string })[] = [
  { path: '/', name: 'Home', component: Home, icon: 'home' },
  {
    path: '/docs',
    name: 'Docs',
    component: Documentation,
    icon: 'docs',
  },
  {
    path: '/playground',
    name: 'Playground',
    component: Playground,
    icon: 'brick',
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

createApp(App).use(router).mount('#app');
