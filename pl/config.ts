import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
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
