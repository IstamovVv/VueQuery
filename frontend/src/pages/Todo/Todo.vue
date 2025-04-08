<template>
  <TodoQuery />

  <el-divider />

  <TodoMutation />
</template>

<script setup lang="ts">
import TodoMutation from '@/pages/Todo/TodoMutation/TodoMutation.vue';
import TodoQuery from '@/pages/Todo/TodoQuery/TodoQuery.vue';
</script>