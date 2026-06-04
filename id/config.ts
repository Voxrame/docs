import { defineAdditionalConfig } from 'vitepress'
import { lordTeamUrl } from '../.vitepress/constants'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: 'Dibuat dengan ❤️ untuk komunitas Luanti',
      copyright: `© 2026 <a href="${lordTeamUrl}" target="_blank">Lord Team</a>`,
    },
    sidebar: [
      {
        text: 'Utilitas',
        items: [
          { text: 'Pembantu', link: '/id/utils/helpers' }
        ]
      }
    ]
  }
})
