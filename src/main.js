import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import './assets/css/main.scss'
import VueTheMask from 'vue-the-mask'
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false
Vue.use(VueTheMask);

const axios = require('axios');
Vue.prototype.$http = axios;


const moment = require('moment-timezone');
Vue.prototype.$moment = moment;
Vue.use(moment)

const numberFormats = {
  'en': {
      currency: {
          style: 'currency',
          currency: 'USD'
      }
  },
  'pt': {
      currency: {
          style: 'currency',
          currency: 'BRL'
      }
  }
}
Vue.use(VueI18n)
var i18n = new VueI18n({
    locale: 'pt',
    fallbackLocale: 'pt',
    // messages,
     numberFormats
})

new Vue({
  vuetify,
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')