import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GuessView from '../views/GuessView.vue'
import BuilderView from '../views/BuilderView.vue'
import FlagsView from '../views/FlagsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/raten', name: 'guess', component: GuessView },
    { path: '/bauen', name: 'builder', component: BuilderView },
    { path: '/flaggen', name: 'flags', component: FlagsView },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
