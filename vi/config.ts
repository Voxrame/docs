import { defineAdditionalConfig } from 'vitepress'
import { lordTeamUrl } from '../.vitepress/constants'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: 'Được làm với ❤️ cho cộng đồng Luanti',
      copyright: `© 2026 <a href="${lordTeamUrl}" target="_blank">Lord Team</a>`,
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
