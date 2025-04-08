import './style.css'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { VueQueryPlugin } from '@tanstack/vue-query';
import ElementPlus from 'element-plus';
import { createApp } from 'vue'

import { useStaleTime } from '@/composables/useStaleTime/useStaleTime.ts';

import App from './App.vue'
import router from './router';

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const { staleTime } = useStaleTime()

app.use(router)
app.use(ElementPlus)
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: { queries: { staleTime: () => staleTime.value } },
  },
})
app.mount('#app')
