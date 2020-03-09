import Vue from 'vue'
import App from './App'
import api from './utils/http.js'
import linkArea from './components/w-picker/w-picker.vue'
import tabs from './components/ms-tabs/ms-tabs.vue';
Vue.component('link-area',linkArea)
Vue.component('tabs',tabs)
Vue.config.productionTip = false
Vue.prototype.$HTTP = api;
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
