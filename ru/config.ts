import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
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
