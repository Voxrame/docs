import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: 'Được làm với ❤️ cho cộng đồng Luanti',
      copyright: '© 2026 Lord Team',
    },
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
