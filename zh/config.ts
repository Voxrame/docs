import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: '用 ❤️ 为 Luanti 社区制作',
      copyright: '© 2026 Lord Team',
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
