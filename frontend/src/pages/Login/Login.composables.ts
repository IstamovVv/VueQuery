import type { DefaultError } from '@tanstack/query-core';
import { useMutation } from '@tanstack/vue-query';
import type { FormInstance, FormRules } from 'element-plus';
import { reactive, type Ref, type ShallowRef } from 'vue';

import { api } from '@/api';
import type {
  AuthRequest,
  AuthResponse,
  LoginForm,
  UseLoginFormReturnType, UseLoginMutationReturnType,
  UseLoginReturnType
} from '@/pages/Login/Login.types.ts';
import { useAuthStore } from '@/store/auth/auth.ts';
import { showErrorMessage, showWarningMessage } from '@/utils/popup';

export const useLoginPage = (formRef: Readonly<ShallowRef<FormInstance | null>>): UseLoginReturnType => {
  const { token } = useAuthStore()
  const { mutate, isPending } = useLoginMutation(token)
  const { form, rules } = useLoginForm()

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
      showWarningMessage('invalid form')
    }
  }

  return {
    form,
    rules,
    login,
    isPending
  }
}

export const useLoginForm = (): UseLoginFormReturnType => {
  const form = reactive<LoginForm>({
    login: 'admin',
    password: 'admin',
  })

  const rules = reactive<FormRules<LoginForm>>({
    login: [
      { required: true, message: 'login required', trigger: 'blur' },
    ],
    password: [
      { required: true, message: 'password required', trigger: 'blur' },
    ]
  })

  return { form, rules }
}

export const useLoginMutation = (token: Ref<number | undefined>): UseLoginMutationReturnType => {
  return useMutation<AuthResponse, DefaultError, AuthRequest>({
    mutationFn: async (request: AuthRequest) => {
      const response = await api.post<AuthResponse>('/api/v1/auth', request)

      return response.data
    },
    onSuccess: (data) => {
      token.value = Number(data.token);
    },
    onError: () => {
      showErrorMessage('failed to auth')
    }
  })
}