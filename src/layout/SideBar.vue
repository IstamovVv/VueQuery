<template>
  <el-menu class="main-sidebar">
    <router-link :to="{ name: 'Analytics' }">
      <el-menu-item>
        Analytics
      </el-menu-item>
    </router-link>

    <router-link :to="{ name: 'Broadcasts' }">
      <el-menu-item>
        Broadcasts
      </el-menu-item>
    </router-link>

    <router-link :to="{ name: 'Segments' }">
      <el-menu-item>
        Segments
      </el-menu-item>
    </router-link>

    <router-link :to="{ name: 'Experimental' }">
      <el-menu-item>
        Experimental
      </el-menu-item>
    </router-link>

    <router-link :to="{ name: 'VueQuery' }">
      <el-menu-item>
        VueQuery
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<style scoped lang="sass">
.main-sidebar
  background-color: var(--el-color-primary-light-8)
  color: var(--el-text-color-primary)
  text-align: center
</style>