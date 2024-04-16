import { createApp } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';

import './assets/css/main.css';

import 'highlight.js/styles/default.css';
import 'highlight.js/styles/a11y-light.css';

import App from './App.vue';

import Home from './pages/Home.vue';
import Documentation from './pages/Documentation.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/docs', component: Documentation },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
