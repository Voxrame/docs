import { defineAdditionalConfig } from 'vitepress'
import { lordTeamUrl } from '../.vitepress/constants'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: 'Fatto con ❤️ per la comunità Luanti',
      copyright: `© 2026 <a href="${lordTeamUrl}" target="_blank">Lord Team</a>`,
    },
    sidebar: [
      {
        text: 'Utilità',
        items: [
          { text: 'Helper', link: '/it/utils/helpers' }
        ]
      }
    ]
  }
})
