import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import { Lazyload } from 'vant';
import 'vant/lib/vant-css/index.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://211.149.160.35'
Vue.use(Lazyload);
Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
