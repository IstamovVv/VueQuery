<script setup lang="ts">
import { useApp } from '@/composables/useApp/useApp.ts';
import Layout from '@/layout/Layout.vue';
import Login from '@/pages/Login/Login.vue';

const {
  authorized,
  isLoading
} = useApp()
</script>

<template>
  <template v-if="authorized">
    <template v-if="isLoading">
      <div v-loading.fullscreen.lock="true" />
    </template>

    <template v-else>
      <Layout>
        <router-view />
      </Layout>
    </template>
  </template>

  <template v-else>
    <Login />
  </template>
</template>
