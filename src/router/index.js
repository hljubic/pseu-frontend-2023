import Vue from 'vue'
import VueRouter from 'vue-router'
import GradView from "@/views/GradView";
import HomeView from "@/views/HomeView";
import UcenikView from "@/views/UcenikView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/grad',
    name: 'grad',
    component: GradView
  },
  {
    path: '/ucenik',
    name: 'ucenik',
    component: UcenikView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
