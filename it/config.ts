import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: 'Fatto con ❤️ per la comunità Luanti',
      copyright: '© 2026 Lord Team',
    },
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
