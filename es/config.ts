import { defineAdditionalConfig } from 'vitepress'
import { lordTeamUrl } from '../.vitepress/constants'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: 'Hecho con ❤️ para la comunidad Luanti',
      copyright: `© 2026 <a href="${lordTeamUrl}" target="_blank">Lord Team</a>`,
    },
    sidebar: [
      {
        text: 'Utilidades',
        items: [
          { text: 'Auxiliares', link: '/es/utils/helpers' }
        ]
      }
    ]
  }
})
