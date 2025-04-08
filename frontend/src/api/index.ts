import axios from 'axios';

import { useAuthStore } from '@/store/auth/auth.ts';

const BASE_URL = 'http://localhost:8000'

export const api = axios.create({
  baseURL: BASE_URL,
})

const { token } = useAuthStore()

api.interceptors.request.use(request => {
  request.headers.set('Authorization', token.value)

  return request
})

api.interceptors.response.use(r => r, error => {
  if (error.status === 401) {
    token.value = undefined;
  }

  return Promise.reject(error)
})