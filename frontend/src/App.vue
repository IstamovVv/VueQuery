<script setup lang="ts">
import Layout from '@/layout/Layout.vue';
import Login from '@/pages/Login/Login.vue';
import { useAuthStore } from '@/store/auth/auth.ts';

const { authorized } = useAuthStore()
</script>

<template>
  <template v-if="authorized">
    <Layout>
      <router-view />
    </Layout>
  </template>

  <template v-else>
    <Login />
  </template>
</template>
