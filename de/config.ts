import { defineAdditionalConfig } from 'vitepress'
import { lordTeamUrl } from '../.vitepress/constants'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: 'Gemacht mit ❤️ für die Luanti-Community',
      copyright: `© 2026 <a href="${lordTeamUrl}" target="_blank">Lord Team</a>`,
    },
    sidebar: [
      {
        text: 'Dienstprogramme',
        items: [
          { text: 'Helfer', link: '/de/utils/helpers' }
        ]
      }
    ]
  }
})
