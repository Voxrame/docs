import { defineAdditionalConfig } from 'vitepress'
import { lordTeamUrl } from '../.vitepress/constants'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: 'صُنع بـ ❤️ لمجتمع Luanti',
      copyright: `© 2026 <a href="${lordTeamUrl}" target="_blank">Lord Team</a>`,
    },
    sidebar: [
      {
        text: 'الأدوات',
        items: [
          { text: 'المساعدات', link: '/ar/utils/helpers' }
        ]
      }
    ]
  }
})
