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
  </el-menu>
</template>

<script setup lang="ts">
</script>
<style module lang="sass">
.menu
  text-align: center
  color: var(--el-text-color-primary)
  background-color: var(--el-color-primary-light-8)
</style>