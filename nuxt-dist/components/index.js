export const NuxtLogo = () => import('../../components/NuxtLogo.vue' /* webpackChunkName: "components/nuxt-logo" */).then(c => wrapFunctional(c.default || c))
export const Tutorial = () => import('../../components/Tutorial.vue' /* webpackChunkName: "components/tutorial" */).then(c => wrapFunctional(c.default || c))
export const VuetifyLogo = () => import('../../components/VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => wrapFunctional(c.default || c))
export const AtomsBreadCrumb = () => import('../../components/atoms/BreadCrumb.vue' /* webpackChunkName: "components/atoms-bread-crumb" */).then(c => wrapFunctional(c.default || c))
export const LayoutsTheFooter = () => import('../../components/layouts/TheFooter.vue' /* webpackChunkName: "components/layouts-the-footer" */).then(c => wrapFunctional(c.default || c))
export const LayoutsTheHeader = () => import('../../components/layouts/TheHeader.vue' /* webpackChunkName: "components/layouts-the-header" */).then(c => wrapFunctional(c.default || c))
export const PagesAboutSec = () => import('../../components/pages/AboutSec.vue' /* webpackChunkName: "components/pages-about-sec" */).then(c => wrapFunctional(c.default || c))
export const PagesContentsSec = () => import('../../components/pages/ContentsSec.vue' /* webpackChunkName: "components/pages-contents-sec" */).then(c => wrapFunctional(c.default || c))
export const PagesMissionSec = () => import('../../components/pages/MissionSec.vue' /* webpackChunkName: "components/pages-mission-sec" */).then(c => wrapFunctional(c.default || c))
export const PagesNewsSec = () => import('../../components/pages/NewsSec.vue' /* webpackChunkName: "components/pages-news-sec" */).then(c => wrapFunctional(c.default || c))
export const PagesPurposeSec = () => import('../../components/pages/PurposeSec.vue' /* webpackChunkName: "components/pages-purpose-sec" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
