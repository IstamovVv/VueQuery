<template>
  <el-menu :class="$style.menu">
    <router-link :to="{ name: 'Todo' }">
      <el-menu-item>
        Todo
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<style module lang="sass">
.menu
  text-align: center
  color: var(--el-text-color-primary)
  background-color: var(--el-color-primary-light-8)
</style>