import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/pages/LandingPage.vue';
import TablePage from '@/pages/TablePage.vue';
import FormPage from '@/pages/FormPage.vue';
import ChartPage from '@/pages/ChartPage.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/table', component: TablePage },
  { path: '/form', component: FormPage },
  { path: '/chart', component: ChartPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
