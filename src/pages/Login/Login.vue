<template>
  <el-container :class="$style.container">
    <el-card>
      <template #header>
        Login
      </template>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="auto"
      >
        <el-form-item
          label="Login"
          prop="login"
        >
          <el-input
            v-model="form.login"
            :loading="isPending"
          />
        </el-form-item>

        <el-form-item
          label="Password"
          prop="password"
        >
          <el-input
            v-model="form.password"
            :loading="isPending"
            type="password"
          />
        </el-form-item>

        <el-button
          :class="$style.loginButton"
          :loading="isPending"
          @click="login"
        >
          Login
        </el-button>
      </el-form>
    </el-card>
  </el-container>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { useTemplateRef } from 'vue';

import { useLoginPage } from '@/pages/Login/Login.composables.ts';

const formRef = useTemplateRef<FormInstance>('formRef')

const {
  form,
  rules,
  login,
  isPending
} = useLoginPage(formRef);
</script>

<style module lang="sass">
.container
  height: 100vh
  align-items: center
  justify-content: center

.loginButton
  width: 100%
</style>