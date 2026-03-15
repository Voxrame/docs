import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: 'Zrobione z ❤️ dla społeczności Luanti',
      copyright: '© 2026 Lord Team',
    },
    sidebar: [
      {
        text: 'Narzędzia',
        items: [
          { text: 'Pomocnicy', link: '/pl/utils/helpers' }
        ]
      }
    ]
  }
})
