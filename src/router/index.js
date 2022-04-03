import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Stream from '@/components/Stream'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/loadstream',
      name: 'loadstream',
      component: Stream,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('authtoken') === null) {
          if (!to.query.code) {
            location.replace('https://id.twitch.tv/oauth2/authorize?client_id=1hzse3axp1jz580x3eqa0ohmew7rwr&redirect_uri=http://localhost:8080/loadstream&response_type=code&scope=viewing_activity_read%20user:read:follows')
          } else {
            next()
          }
        } else {
          next()
        }
      }
    }
  ]
})
