import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useUserStore } from '@/stores';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginSignup/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/LoginSignup/SignUpView.vue')
    },
    {
      path: '/todos',
      name: 'todos',
      component: () => import('../views/TodoList/TodoListView.vue')
    },
    {
      path: '/todosAPi',
      name: 'todosapi',
      component: () => import('../views/TodoListAsync/TodoListView.vue')
    }
  ]
});

router.beforeEach(() => {
  const { getToken } = useUserStore();
  getToken();
});

export default router;
