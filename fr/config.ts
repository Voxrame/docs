import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
    sidebar: [
      {
        text: 'Utilitaires',
        items: [
          { text: 'Aides', link: '/fr/utils/helpers' }
        ]
      }
    ]
  }
})
