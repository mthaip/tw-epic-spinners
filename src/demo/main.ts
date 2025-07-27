import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';

import './assets/css/main.css';

import App from './App.vue';

import Home from './pages/Home.vue';
import Documentation from './pages/Documentation.vue';
// import Playground from './pages/Playground.vue';

export const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/docs', name: 'Documentation', component: Documentation },
  // TODO: Re-enable playground
  // { path: '/playground', component: Playground },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

createApp(App).use(router).mount('#app');
