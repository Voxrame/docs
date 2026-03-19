import Convert from 'ansi-to-html'

const convert = new Convert()

export const withAnsiRender = (markdownConfig: any = {}) => {
  return {
    ...markdownConfig,
    config: (md: any) => {
      // Original config call (if exists)
      markdownConfig.config?.(md)
      
      const fence = md.renderer.rules.fence
      md.renderer.rules.fence = (...args: any[]) => {
        const [tokens, idx] = args
        const token = tokens[idx]
        
        if (token.info === 'ansi') {
          const ansi_code = token.content
            .replace(
              // not valid escape sequences, but for our comfort we use double backslash.
              //   `ESC\\` instead of `ESC\`  ==>  `\\27\\\\` instead of `\\27\\`
              // its just for easy copy-paste dumps from terminal.
              /\\27]8;;(.+)\\27\\\\(.+)\\27]8;;\\27\\\\/g,
              (match: string, url: string, text: string) => {
                const clean_text = text.replace(/\x1b\[[0-9;]*m/g, '')
                return `<a href="${url}" class="osc8-link">${clean_text}</a>`
              }
            )
            .replaceAll('\\27', '\x1b')
          ;
          
          return `<div class="language-ansi">
            <pre class="shiki"><code>${convert.toHtml(ansi_code)}</code></pre>
          </div>`
        }

        return '' + (fence?.(...args) ?? '')
      }
    }
  }
}
