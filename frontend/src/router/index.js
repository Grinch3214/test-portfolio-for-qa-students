import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import BlogView from '@/views/BlogView.vue';
import CreatePostView from '@/views/CreatePostView.vue';
import NotFound from '@/components/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView,
    },
    {
      path: '/blog/new-post',
      name: 'new-post',
      component: CreatePostView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});

export default router;
