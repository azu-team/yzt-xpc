import Vue from 'vue'
import App from './App'
import api from './utils/http.js'
import linkArea from './components/w-picker/w-picker.vue'
import tabs from './components/ms-tabs/ms-tabs.vue';
import uTag from './components/uni-tag/uni-tag.vue'
import './utils/format.js'
import './static/mp-weixin/iconfont/iconfont.css';

Vue.component('link-area',linkArea)
Vue.component('tabs',tabs)
Vue.component('uni-tag',uTag)


Vue.config.productionTip = false
Vue.prototype.$HTTP = api;
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
