import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: 'Dibuat dengan ❤️ untuk komunitas Luanti',
      copyright: '© 2026 Lord Team',
    },
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
