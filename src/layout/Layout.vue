<template>
  <el-icon
    v-if="isFetching"
    class="global-loading-icon"
  >
    <Loading />
  </el-icon>

  <div class="main-layout">
    <el-container>
      <Header />

      <el-container>
        <el-aside>
          <SideBar />
        </el-aside>

        <el-main>
          <slot />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { Loading } from '@element-plus/icons-vue';
import { useIsFetching } from '@tanstack/vue-query';

import SideBar from '@/layout/SideBar.vue';

const isFetching = useIsFetching()
</script>

<style scoped lang="sass">
.main-layout
  & > .el-container
    height: 100vh
    display: flex
    flex-direction: column

  .el-aside
    background-color: var(--el-color-primary-light-8)
    color: var(--el-text-color-primary)
    text-align: center

  .el-header, .el-footer
    background-color: var(--el-color-primary-light-7)
    color: var(--el-text-color-primary)
    text-align: center

.global-loading-icon
  position: absolute
  top: 10px
  left: 10px
  font-size: 40px
  animation: globalLoadingIconAnimation 3s linear infinite

@keyframes globalLoadingIconAnimation
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
</style>