---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Voxrame
  text: Игро-независимые инструменты для разработки модов и игр для движка Luanti
  tagline: Создание захватывающих воксельных приключений
  image:
    src: /Voxrame.v1.no-word.transparent.png

features:
  - title: 🛠️ Luanti IDE Helper
    details:
      Вспомогательный пакет для разработки модов/игр для Luanti (Minetest), который предоставляет автодополнение и документацию, интегрированные в вашу IDE.
      <div class="SubFeatures">
        <a class="SubFeature" href="https://marketplace.visualstudio.com/items?itemName=Voxrame.luanti-ide-helper" target="_blank">
          <img src="/vscode.svg" alt="💻"/> VS Code Extension
        </a>
        <a class="SubFeature" href="https://github.com/Voxrame/luanti-ide-helper?tab=readme-ov-file#luanti-ide-helper" target="_blank">
          Другие IDE
        </a>
      </div>
    link: https://github.com/Voxrame/luanti-ide-helper?tab=readme-ov-file#luanti-ide-helper
  - title: ⚡ Lua Helpers
    details:
      Коллекция полезных Lua функций для разработки игр.<br/>
      Расширяет стандартную библиотеку Lua дополнительными утилитами.
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
      Интерактивные веб-карты для миров Luanti.<br/>
      С изометрическими 3D-изображениями, видами сверху 2D,
      маркерами и простой установкой и интеграцией.
      <div class="SubFeatures">
        <a class="SubFeature" href="https://map.lord-server.ru/" target="_blank">
          📍 Онлайн демо [wip]
        </a>
      </div>
    link: https://github.com/Voxrame/panorama?tab=readme-ov-file#panorama
---
