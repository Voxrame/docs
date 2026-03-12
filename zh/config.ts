import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
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
