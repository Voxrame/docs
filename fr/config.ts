import { defineAdditionalConfig } from 'vitepress'
import { lordTeamUrl } from '../.vitepress/constants'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: 'Fait avec ❤️ pour la communauté Luanti',
      copyright: `© 2026 <a href="${lordTeamUrl}" target="_blank">Lord Team</a>`,
    },
    sidebar: [
      {
        text: 'Utilitaires',
        items: [
          { text: 'Aides', link: '/fr/utils/helpers' }
        ]
      }
    ]
  }
})
