import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: 'Сделано с ❤️ для Luanti сообщества',
      copyright: '© 2026 Lord Team',
    },
    sidebar: [
      {
        text: 'Утилиты',
        items: [
          { text: 'Хелперы', link: '/ru/utils/helpers' }
        ]
      }
    ]
  }
})
