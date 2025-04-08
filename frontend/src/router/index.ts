import { createRouter, createWebHistory } from 'vue-router';

import Bonus from '@/pages/Bonus/Bonus.vue';
import Configuration from '@/pages/Configuration/Configuration.vue';
import Table from '@/pages/Table/Table.vue'
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
    },
    {
      name: 'Table',
      path: '/table',
      component: Table
    },
    {
      name: 'Configuration',
      path: '/configuration',
      component: Configuration
    }
  ]
})

export default index
