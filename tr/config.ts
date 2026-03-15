import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: '❤️ ile Luanti topluluğu için yapıldı',
      copyright: '© 2026 Lord Team',
    },
    sidebar: [
      {
        text: 'Yardımcı Programlar',
        items: [
          { text: 'Yardımcılar', link: '/tr/utils/helpers' }
        ]
      }
    ]
  }
})
