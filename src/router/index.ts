import { createRouter, createWebHistory } from 'vue-router';

import Bonus from '@/pages/Bonus/Bonus.vue';
import Todo from '@/pages/Todo/Todo.vue';

const index = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: { name: 'Todo' }
    },
    {
      name: 'Todo',
      path: '/todo',
      component: Todo
    },
    {
      name: 'Bonus',
      path: '/bonus',
      component: Bonus
    }
  ]
})

export default index
