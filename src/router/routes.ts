import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/products' },
      { path: '/products', component: () => import('pages/ProductPage.vue') },
      { path: '/clients', component: () => import('pages/ClientPage.vue') },
      { path: '/proposals', component: () => import('pages/ProposalPage.vue') },
    ],
  },
  {
    path: '/login',
    component: () => import('src/pages/LoginPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
