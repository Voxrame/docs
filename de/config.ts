import { defineAdditionalConfig } from 'vitepress'

export default defineAdditionalConfig({
  themeConfig: {
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
