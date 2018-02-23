import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from "./components/Home.vue";
import Detail from "./components/Detail.vue";
import My from "./components/My.vue";

import axios from 'axios';

axios.defaults.baseURL = 'http://211.149.160.35'

import 'vant/lib/vant-css/index.css';

import Vant from 'vant'

import { Lazyload } from 'vant';

Vue.use(Lazyload);

Vue.use(Vant)


const routes = [
  { path: '/home', component: Home },
  { path: '/detail/:id', component: Detail },
  { path: '/my', component: My }
]

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

Vue.config.productionTip = false

Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
