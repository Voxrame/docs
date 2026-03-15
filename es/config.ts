import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: 'Hecho con ❤️ para la comunidad Luanti',
      copyright: '© 2026 Lord Team',
    },
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
