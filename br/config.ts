import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
    sidebar: [
      {
        text: 'Utilitários',
        items: [
          { text: 'Auxiliares', link: '/br/utils/helpers' }
        ]
      }
    ]
  }
})
