---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Voxrame
  text: Narzędzia Agnostyczne Gry do Rozwoju Modów i Gier dla Silnika Luanti
  tagline: Tworząc Wciągające Przygody Voxelowe
  image:
    src: /Voxrame.v1.no-word.transparent.png

features:
  - title: 🛠️ Luanti IDE Helper
    details:
      Pakiet pomocniczy do rozwoju modów/gier dla Luanti (Minetest), dostarczający autouzupełnianie i dokumentację zintegrowaną z Twoim IDE.
      <div class="SubFeatures">
        <a class="SubFeature" href="https://marketplace.visualstudio.com/items?itemName=Voxrame.luanti-ide-helper" target="_blank">
          <img src="/vscode.svg" alt="💻"/> VS Code Extension
        </a>
        <a class="SubFeature" href="https://github.com/Voxrame/luanti-ide-helper?tab=readme-ov-file#luanti-ide-helper" target="_blank">
          Inne IDE
        </a>
      </div>
    link: https://github.com/Voxrame/luanti-ide-helper?tab=readme-ov-file#luanti-ide-helper
  - title: ⚡ Lua Helpers
    details:
      Kolekcja przydatnych funkcji Lua do rozwoju gier.<br/>
      <br/>
      Rozszerza standardową bibliotekę Lua o dodatkowe narzędzia.
      <div class="SubFeatures">
        <a class="SubFeature" href="utils/helpers#string">string.</a>
        <a class="SubFeature" href="utils/helpers#table">table.</a>
        <a class="SubFeature" href="utils/helpers#math">math.</a>
        <a class="SubFeature" href="utils/helpers#debug">debug.</a>
        <a class="SubFeature" href="utils/helpers#io">io.</a>
      </div>
    link: ./utils/helpers
  - title: 🗺️ Panorama [wip]
    details:
      Interaktywne mapy internetowe dla światów Luanti.
      Z izometrycznymi widokami 3D, widokami z góry 2D,
      niestandardowymi znacznikami i najłatwiejszą instalacją i integracją.
      <div class="SubFeatures">
        <a class="SubFeature" href="https://map.lord-server.ru/" target="_blank">
          📍 Demo na żywo [wip]
        </a>
      </div>
    link: https://github.com/Voxrame/panorama?tab=readme-ov-file#panorama
---
