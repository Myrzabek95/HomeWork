import { createRouter, createWebHistory } from 'vue-router'
import Settings from '../views/Settings.vue'
import Game from '../views/Game.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    }
  ]
})

export default router
