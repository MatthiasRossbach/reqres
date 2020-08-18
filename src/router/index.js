import Vue from 'vue'
import VueRouter from 'vue-router'
import ContactList from '../views/ContactList'
import ContactForm from '../views/ContactForm'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ContactList',
    component: ContactList
  },
  {
    path: '/add-contact',
    name: 'ContactForm',
    component: ContactForm
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
