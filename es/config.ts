import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
    sidebar: [
      {
        text: 'Utilidades',
        items: [
          { text: 'Auxiliares', link: '/es/utils/helpers' }
        ]
      }
    ]
  }
})
