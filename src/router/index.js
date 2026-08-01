import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GuessView from '../views/GuessView.vue'
import BuilderView from '../views/BuilderView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/raten', name: 'guess', component: GuessView },
    { path: '/bauen', name: 'builder', component: BuilderView },
  ],
})

export default router
