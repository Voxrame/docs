import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
    sidebar: [
      {
        text: 'Utilità',
        items: [
          { text: 'Helper', link: '/it/utils/helpers' }
        ]
      }
    ]
  }
})
