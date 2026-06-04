import { defineAdditionalConfig } from 'vitepress'
import { lordTeamUrl } from '../.vitepress/constants'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: '❤️ ile Luanti topluluğu için yapıldı',
      copyright: `© 2026 <a href="${lordTeamUrl}" target="_blank">Lord Team</a>`,
    },
    sidebar: [
      {
        text: 'Yardımcı Programlar',
        items: [
          { text: 'Yardımcılar', link: '/tr/utils/helpers' }
        ]
      }
    ]
  }
})
