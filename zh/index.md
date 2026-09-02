---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Voxrame
  text: 用于 Luanti引擎开发模组和游戏的通用工具
  tagline: 创造令人兴奋的体素冒险
  image:
    src: /Voxrame.v1.no-word.transparent.png

features:
  - title: 🛠️ Luanti IDE Helper
    details:
      用于 Luanti (Minetest) 模组/游戏开发的辅助包，提供集成到 IDE 中的自动补全和文档。
      <div class="SubFeatures">
        <a class="SubFeature" href="https://marketplace.visualstudio.com/items?itemName=Voxrame.luanti-ide-helper" target="_blank">
          <img src="/vscode.svg" alt="💻"/> VS Code Extension
        </a>
        <a class="SubFeature" href="https://github.com/Voxrame/luanti-ide-helper?tab=readme-ov-file#luanti-ide-helper" target="_blank">
          其他 IDE
        </a>
      </div>
    link: https://github.com/Voxrame/luanti-ide-helper?tab=readme-ov-file#luanti-ide-helper
  - title: ⚡ Lua Helpers
    details:
      用于游戏开发的有用 Lua 函数集合。<br/>
      扩展标准 Lua 库，添加额外实用工具。
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
      用于 Luanti 世界的交互式网络地图。具有等距 3D、俯视 2D 视图、自定义标记和最简单的安装和集成。
      <div class="SubFeatures">
        <a class="SubFeature" href="https://map.lord-server.ru/" target="_blank">
          📍 在线演示 [wip]
        </a>
      </div>
    link: https://github.com/Voxrame/panorama?tab=readme-ov-file#panorama
---
