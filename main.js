import Vue from 'vue'
import App from './App'
import api from './utils/http.js'
Vue.config.productionTip = false
Vue.prototype.$HTTP = api;
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
