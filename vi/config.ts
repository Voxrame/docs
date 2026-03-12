import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
    sidebar: [
      {
        text: 'Tiện ích',
        items: [
          { text: 'Trợ giúp', link: '/vi/utils/helpers' }
        ]
      }
    ]
  }
})
