import { defineAdditionalConfig } from 'vitepress'
import { lordTeamUrl } from '../.vitepress/constants'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: 'Zrobione z ❤️ dla społeczności Luanti',
      copyright: `© 2026 <a href="${lordTeamUrl}" target="_blank">Lord Team</a>`,
    },
    sidebar: [
      {
        text: 'Narzędzia',
        items: [
          { text: 'Pomocnicy', link: '/pl/utils/helpers' }
        ]
      }
    ]
  }
})
