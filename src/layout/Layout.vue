<template>
  <el-icon
    v-if="isFetching"
    :class="$style.loading"
  >
    <Loading />
  </el-icon>

  <div :class="$style.layout">
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

import Header from '@/layout/Header.vue'
import SideBar from '@/layout/SideBar.vue';

const isFetching = useIsFetching()
</script>

<style module lang="sass">
.layout
  & > :global(.el-container)
    height: 100vh
    display: flex
    flex-direction: column

  :global(.el-aside)
    text-align: center
    color: var(--el-text-color-primary)
    background-color: var(--el-color-primary-light-8)

.loading
  top: 10px
  left: 10px
  font-size: 40px
  position: absolute
  animation: animation 3s linear infinite

@keyframes animation
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
</style>