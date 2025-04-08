import type { DefaultError } from '@tanstack/query-core';
import type { UseMutationReturnType } from '@tanstack/vue-query';
import type { FormRules } from 'element-plus';
import type { Reactive, Ref } from 'vue';

export interface AuthRequest {
  login: string
  password: string
}

export interface AuthResponse {
  token: string
}

export interface LoginForm {
  login: string
  password: string
}

export interface UseLoginFormReturnType {
  form: Reactive<LoginForm>
  rules: Reactive<FormRules<LoginForm>>
}

export interface UseLoginReturnType extends UseLoginFormReturnType {
  login: () => Promise<void>,
  isPending: Ref<boolean>
}

export type UseLoginMutationReturnType = UseMutationReturnType<AuthResponse, DefaultError, AuthRequest, unknown>