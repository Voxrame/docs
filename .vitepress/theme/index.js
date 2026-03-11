import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.pcss'

import { NolebaseHighlightTargetedHeading } from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'

import NavBadge from './components/NavBadge.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('NavBadge', NavBadge)
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // other configurations...
      'layout-top': () => [
        h(NolebaseHighlightTargetedHeading),
      ],
    })
  },
}