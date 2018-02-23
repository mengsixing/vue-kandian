import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "./components/Home.vue";
import Detail from "./components/Detail.vue";
import My from "./components/My.vue";

const routes = [
  { path: '/home', component: Home },
  { path: '/detail/:id', component: Detail },
  { path: '/my', component: My }
]

const router = new VueRouter({
  routes 
})

Vue.use(VueRouter);

export default router;
