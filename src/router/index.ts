import { createRouter, createWebHistory } from 'vue-router';

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
    }
  ]
})

export default index
