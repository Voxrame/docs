import { defineAdditionalConfig } from 'vitepress'
import { lordTeamUrl } from '../.vitepress/constants'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: '用 ❤️ 为 Luanti 社区制作',
      copyright: `© 2026 <a href="${lordTeamUrl}" target="_blank">Lord Team</a>`,
    },
    sidebar: [
      {
        text: '工具',
        items: [
          { text: '辅助函数', link: '/zh/utils/helpers' }
        ]
      }
    ]
  }
})
