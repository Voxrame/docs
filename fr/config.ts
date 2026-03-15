import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: 'Fait avec ❤️ pour la communauté Luanti',
      copyright: '© 2026 Lord Team',
    },
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
