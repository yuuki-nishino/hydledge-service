import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6bdc692e = () => interopDefault(import('../pages/charge/index.vue' /* webpackChunkName: "pages/charge/index" */))
const _1a2f6312 = () => interopDefault(import('../pages/hardness/index.vue' /* webpackChunkName: "pages/hardness/index" */))
const _5c3fe8a6 = () => interopDefault(import('../pages/charge/data/index.vue' /* webpackChunkName: "pages/charge/data/index" */))
const _2831c350 = () => interopDefault(import('../pages/hardness/data/index.vue' /* webpackChunkName: "pages/hardness/data/index" */))
const _e355e502 = () => interopDefault(import('../pages/charge/data/pref.vue' /* webpackChunkName: "pages/charge/data/pref" */))
const _f140e74c = () => interopDefault(import('../pages/charge/data/select_pref.vue' /* webpackChunkName: "pages/charge/data/select_pref" */))
const _da114ce6 = () => interopDefault(import('../pages/hardness/data/pref.vue' /* webpackChunkName: "pages/hardness/data/pref" */))
const _1fbf96e8 = () => interopDefault(import('../pages/hardness/data/select_pref.vue' /* webpackChunkName: "pages/hardness/data/select_pref" */))
const _413ee910 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/charge",
    component: _6bdc692e,
    name: "charge"
  }, {
    path: "/hardness",
    component: _1a2f6312,
    name: "hardness"
  }, {
    path: "/charge/data",
    component: _5c3fe8a6,
    name: "charge-data"
  }, {
    path: "/hardness/data",
    component: _2831c350,
    name: "hardness-data"
  }, {
    path: "/charge/data/pref",
    component: _e355e502,
    name: "charge-data-pref"
  }, {
    path: "/charge/data/select_pref",
    component: _f140e74c,
    name: "charge-data-select_pref"
  }, {
    path: "/hardness/data/pref",
    component: _da114ce6,
    name: "hardness-data-pref"
  }, {
    path: "/hardness/data/select_pref",
    component: _1fbf96e8,
    name: "hardness-data-select_pref"
  }, {
    path: "/",
    component: _413ee910,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
