import { createRouter, createWebHistory } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import HomeView from '@/views/HomeView.vue';
import BlogView from '@/views/BlogView.vue';
import CreatePostView from '@/views/CreatePostView.vue';
import EditPostView from '@/views/EditPostView.vue';
import PostView from '@/views/PostView.vue';
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
      path: '/blog/:id',
      name: 'post',
      component: PostView,
    },
    {
      path: '/blog/new-post',
      name: 'new-post',
      component: CreatePostView,
      meta: { requiresAuth: true },
    },
    {
      path: '/blog/:id/edit-post',
      name: 'edit-post',
      component: EditPostView,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const globalStore = useGlobalStore();

  // await globalStore.checkAuth();

  if (to.meta.requiresAuth && !globalStore.isAuthenticated) {
    return next({ name: 'home' });
  }
  next();
});

export default router;
