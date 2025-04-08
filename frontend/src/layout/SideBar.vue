<template>
  <el-menu :class="$style.menu">
    <router-link :to="{ name: 'Todo' }">
      <el-menu-item>
        Todo
      </el-menu-item>
    </router-link>

    <router-link :to="{ name: 'Bonus' }">
      <el-menu-item>
        Bonus
      </el-menu-item>
    </router-link>

    <router-link :to="{ name: 'Table' }">
      <el-menu-item>
        Table
      </el-menu-item>
    </router-link>

    <router-link :to="{ name: 'Configuration' }">
      <el-menu-item>
        Configuration
      </el-menu-item>
    </router-link>

    <el-menu-item @click="logout">
      Logout
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth/auth.ts';

const { token } = useAuthStore()

const logout = (): void => {
  token.value = 0
}
</script>

<style module lang="sass">
.menu
  text-align: center
  color: var(--el-text-color-primary)
  background-color: var(--el-color-primary-light-8)
</style>