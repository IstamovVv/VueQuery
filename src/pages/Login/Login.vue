<template>
  <el-container :class="$style.container">
    <el-card>
      <template #header>
        Login
      </template>

      <el-form
        ref="formRef"
        :model="form"
        :rules="formRules"
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
import type { DefaultError } from '@tanstack/query-core';
import { useMutation } from '@tanstack/vue-query';
import type { FormInstance, FormRules } from 'element-plus';
import { reactive, useTemplateRef } from 'vue';

import { api } from '@/api';
import type { AuthRequest, AuthResponse } from '@/pages/Login/Login.types.ts';
import { useAuthStore } from '@/store/auth/auth.ts';
import { showNotification } from '@/utils';

interface Form {
  login: string
  password: string
}

const form = reactive<Form>({
  login: 'admin',
  password: 'admin',
})

const formRef = useTemplateRef<FormInstance>('formRef')

const formRules = reactive<FormRules<Form>>({
  login: [
    { required: true, message: 'login required', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'password required', trigger: 'blur' },
  ]
})

const { token } = useAuthStore()

const { mutate, isPending } = useMutation<AuthResponse, DefaultError, AuthRequest>({
  mutationFn: async (request: AuthRequest) => {
    const response = await api.post<AuthResponse>('/api/v1/auth', request)

    return response.data
  },
  onSuccess: (data) => {
    token.value = Number(data.token);
  },
  onError: () => {
    showNotification('failed to auth')
  }
})

const login = async (): Promise<void> => {
  if (!formRef.value) {
    return
  }

  try {
    if (await formRef.value.validate()) {
      mutate({
        login: form.login,
        password: form.password,
      })
    }
  } catch {
    showNotification('invalid form')
  }
}
</script>

<style module lang="sass">
.container
  height: 100vh
  align-items: center
  justify-content: center

.loginButton
  width: 100%
</style>