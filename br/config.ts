import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: 'Feito com ❤️ para a comunidade Luanti',
      copyright: '© 2026 Lord Team',
    },
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
