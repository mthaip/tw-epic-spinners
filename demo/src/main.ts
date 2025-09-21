import { createApp } from 'vue';
import {
  createWebHistory,
  createRouter,
  type RouteRecordRaw,
} from 'vue-router';
import { createHead } from '@unhead/vue/client';

import './assets/css/main.css';

import App from './App.vue';

import Home from './pages/Home.vue';
import Documentation from './pages/Documentation.vue';
import Playground from './pages/Playground.vue';

export const routes: (RouteRecordRaw & { icon: string })[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    icon: 'home',
    meta: {
      title: 'Tailwind Epic Spinners',
      description:
        'Welcome to Tailwind Epic Spinners – Beautiful, customizable CSS spinners built with Tailwind CSS.',
    },
  },
  {
    path: '/docs',
    name: 'Docs',
    component: Documentation,
    icon: 'docs',
    meta: {
      title: 'Docs · Tailwind Epic Spinners',
      description:
        'Explore the documentation for Tailwind Epic Spinners to learn how to install, customize, and integrate spinners in your project.',
    },
  },
  {
    path: '/playground',
    name: 'Playground',
    component: Playground,
    icon: 'brick',
    meta: {
      title: 'Playground · Tailwind Epic Spinners',
      description:
        'Try out and customize your favorite spinner components in our interactive playground.',
    },
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

const head = createHead();

createApp(App).use(router).use(head).mount('#app');
