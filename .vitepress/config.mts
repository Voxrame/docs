import { defineConfig } from 'vitepress'

import docs from '../package.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    ssr: {
      noExternal: ['@nolebase/vitepress-plugin-highlight-targeted-heading']
    }
  },

  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  title: "Voxrame",
  description: "Game Agnostic Tools For Developing Mods and Games for Luanti Engine.",

  appearance: 'dark',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { component: 'NavBadge', props: { type: 'tip', text: docs.voxrame.version } }
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
    root: { label: 'English',    lang: 'en-US' },
    ru:   { label: 'Русский',    lang: 'ru-RU' },
    de:   { label: 'Deutsch',    lang: 'de-DE' },
    br:   { label: 'Brasileiro', lang: 'pt-BR' },
    zh:   { label: '中文',       lang: 'zh-CN' },
    es:   { label: 'Español',    lang: 'es-ES' },
    fr:   { label: 'Français',   lang: 'fr-FR' },
    it:   { label: 'Italiano',   lang: 'it-IT' },
    pl:   { label: 'Polski',     lang: 'pl-PL' },
    id:   { label: 'Indonesia',  lang: 'id-ID' },
    tr:   { label: 'Türkçe',     lang: 'tr-TR' },
    ar:   { label: 'العربية',       lang: 'ar-SA', dir: 'rtl' },
    vi:   { label: 'Tiếng Việt', lang: 'vi-VN' },
  },

  sitemap: {
    hostname: 'https://voxrame.dev'
  }
})
