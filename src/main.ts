import { createApp, reactive } from 'vue'
import { History, IHistory } from '@/modules/history/History'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.scss'

import 'tippy.js/dist/tippy.css'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $hist: IHistory;
  }
}

const app = createApp(App)
app.use(PrimeVue, { ripple: true })
app.config.globalProperties.$hist = History.instance()
app.mount('#app')