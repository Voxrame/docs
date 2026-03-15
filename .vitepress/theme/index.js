import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.pcss'

import { NolebaseHighlightTargetedHeading } from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'

import NavBadge from './components/NavBadge.vue'
import { VPButton } from 'vitepress/theme'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('NavBadge', NavBadge)
    app.component('VPButton', VPButton)
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // other configurations...
      'layout-top': () => [
        h(NolebaseHighlightTargetedHeading),
      ],
      'nav-bar-content-before': () => [
        h('div', { class: 'mobile-fund-button' }, [
          h('a', {
            href: 'https://boosty.to/lord-server',
            class: 'VPButton secondary',
            target: '_blank',
            rel: 'noopener noreferrer'
          }, '❤️ donate')
        ])
      ],
    })
  },
}