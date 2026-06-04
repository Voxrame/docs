import { defineAdditionalConfig } from 'vitepress'
import { lordTeamUrl } from '../.vitepress/constants'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: 'Сделано с ❤️ для Luanti сообщества',
      copyright: `© 2026 <a href="${lordTeamUrl}" target="_blank">Lord Team</a>`,
    },
    sidebar: [
      {
        text: 'Утилиты',
        items: [
          { text: 'Хелперы', link: '/ru/utils/helpers' }
        ]
      }
    ]
  }
})
