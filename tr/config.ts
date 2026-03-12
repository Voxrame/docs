import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
    sidebar: [
      {
        text: 'Yardımcı Programlar',
        items: [
          { text: 'Yardımcılar', link: '/tr/utils/helpers' }
        ]
      }
    ]
  }
})
