import { defineAdditionalConfig } from 'vitepress'
import { lordTeamUrl } from '../.vitepress/constants'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: 'Feito com ❤️ para a comunidade Luanti',
      copyright: `© 2026 <a href="${lordTeamUrl}" target="_blank">Lord Team</a>`,
    },
    sidebar: [
      {
        text: 'Utilitários',
        items: [
          { text: 'Auxiliares', link: '/br/utils/helpers' }
        ]
      }
    ]
  }
})
