---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Voxrame
  text: Alat Permainan Agnostik untuk Pengembangan Mod dan Game untuk Mesin Luanti
  tagline: Membangun petualangan voxel yang imersif
  image:
    src: /Voxrame.v1.no-word.transparent.png

features:
  - title: 🛠️ Luanti IDE Helper
    details:
      Paket pembantu untuk pengembangan mod/game untuk Luanti (Minetest) yang menyediakan pelengkapan otomatis dan dokumentasi yang terintegrasi ke IDE Anda.
      <div class="SubFeatures">
        <a class="SubFeature" href="https://marketplace.visualstudio.com/items?itemName=Voxrame.luanti-ide-helper" target="_blank">
          <img src="/vscode.svg" alt="💻"/> VS Code Extension
        </a>
        <a class="SubFeature" href="https://github.com/Voxrame/luanti-ide-helper?tab=readme-ov-file#luanti-ide-helper" target="_blank">
          IDE Lainnya
        </a>
      </div>
    link: https://github.com/Voxrame/luanti-ide-helper?tab=readme-ov-file#luanti-ide-helper
  - title: ⚡ Lua Helpers
    details:
      Koleksi fungsi Lua yang berguna untuk pengembangan game.<br/>
      Memperluas pustaka Lua standar dengan utilitas tambahan.
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
      Peta web interaktif untuk dunia Luanti.<br/>
      Dengan tampilan isometrik 3D, tampilan atas 2D,<br/>
      penanda kustom, dan instalasi serta integrasi paling mudah.
      <div class="SubFeatures">
        <a class="SubFeature" href="https://map.lord-server.ru/" target="_blank">
          📍 Demo Langsung [wip]
        </a>
      </div>
    link: https://github.com/Voxrame/panorama?tab=readme-ov-file#panorama
---
