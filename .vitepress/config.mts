import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    ssr: {
      noExternal: ['@nolebase/vitepress-plugin-highlight-targeted-heading']
    }
  },

  title: "Voxrame",
  description: "Game Agnostic Tools For Developing Mods and Games for Luanti Engine.",

  appearance: 'dark',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          // { text: 'Markdown Examples', link: '/markdown-examples' },
          // { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Voxrame' }
    ]
  },

  rewrites: {
    'en/:rest*': ':rest*'
  },
  locales: {
    root: { label: 'English', lang: 'en-US', },
    ru:   { label: 'Русский', lang: 'ru-RU', },
  },
})
