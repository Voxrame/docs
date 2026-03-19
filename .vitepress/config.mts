import docs from '../package.json'

import { defineConfig } from 'vitepress'
import { withAnsiRender } from './plugins/ansi-renderer'

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
  cleanUrls: true, // no `.html` at the end of urls

  appearance: 'dark',

  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    // Header:
    search: {
      provider: 'local'
    },
    nav: [
      { component: 'VPButton', props: { type: 'secondary', text: '❤️ donate', href: 'https://boosty.to/lord-server' } },
      { text: ' ', link: '' }, // spacer/divider
      { text: 'Home', link: '/' },
      { component: 'NavBadge', props: { type: 'tip', text: docs.voxrame.version } },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Voxrame' },
      { icon: 'discord', link: 'https://discord.gg/voxrame' },
    ],

    // Sidebar for other languages is described in their configs (es/config.ts, ru/config.ts, etc.)
    sidebar: [
      {
        text: 'Utilities',
        items: [
          { text: 'Helpers', link: '/utils/helpers' },
        ]
      }
    ],

    // Footer (for other languages in their configs):
    footer: {
      message: 'Made with ❤️ for the Luanti community',
      copyright: '© 2026 Lord Team',
    }

  },

  // -- withAnsiRender(): --
  // Preprocess ANSI codes, convert them to HTML and wrap with `div.language-ansi > pre.shiki`.
  // It makes code blocks nicer.
  // Also we make links clickable as of ANSI OSC 8 escape sequences.
  // -- /withAnsiRender --
  markdown: withAnsiRender({}),

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
