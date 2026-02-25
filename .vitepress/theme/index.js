import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

import { NolebaseHighlightTargetedHeading } from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // other configurations...
      'layout-top': () => [
        h(NolebaseHighlightTargetedHeading),
      ],
    })
  },
}