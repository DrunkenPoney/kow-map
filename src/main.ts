import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.scss'

createApp(App)
  .use(PrimeVue, { ripple: true })
  .mount('#app')