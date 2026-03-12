import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
    sidebar: [
      {
        text: 'الأدوات',
        items: [
          { text: 'المساعدات', link: '/ar/utils/helpers' }
        ]
      }
    ]
  }
})
