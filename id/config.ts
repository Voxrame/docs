import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
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
