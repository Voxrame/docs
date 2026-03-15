import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
    footer: {
      message: 'صُنع بـ ❤️ لمجتمع Luanti',
      copyright: '© 2026 Lord Team',
    },
    sidebar: [
      {
        text: 'الأدوات',
        items: [
          { text: 'المساعدات', link: '/ar/utils/helpers' }
        ]
      }
    ]
  }
})
