import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Detalles from '../views/Detalles.vue'
import Registro from '../views/Registro.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/detalles',
    name: 'Detalles',
    component: Detalles,
    props: true
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro,
    props: true
  },
  
  
]
//Esta linea es indispensable para que Jale el enrutamiento
const router = new VueRouter({
  mode: "history",
  routes
});

export default router
