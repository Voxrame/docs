import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: 'Gemacht mit ❤️ für die Luanti-Community',
      copyright: '© 2026 Lord Team',
    },
    sidebar: [
      {
        text: 'Dienstprogramme',
        items: [
          { text: 'Helfer', link: '/de/utils/helpers' }
        ]
      }
    ]
  }
})
