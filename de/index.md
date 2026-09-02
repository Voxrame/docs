---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Voxrame
  text: Spielagnostische Werkzeuge für die Entwicklung von Mods und Spielen für die Luanti Engine
  tagline: Erstellung immersiver voxel-abenteuer
  image:
    src: /Voxrame.v1.no-word.transparent.png

features:
  - title: 🛠️ Luanti IDE Helper
    details:
      Ein Hilfspaket für die Entwicklung von Mods/Spielen für Luanti (Minetest), das Autovervollständigung und Dokumentation bereitstellt, die in Ihre IDE integriert sind.
      <div class="SubFeatures">
        <a class="SubFeature" href="https://marketplace.visualstudio.com/items?itemName=Voxrame.luanti-ide-helper" target="_blank">
          <img src="/vscode.svg" alt="💻"/> VS Code Extension
        </a>
        <a class="SubFeature" href="https://github.com/Voxrame/luanti-ide-helper?tab=readme-ov-file#luanti-ide-helper" target="_blank">
          Andere IDEs
        </a>
      </div>
    link: https://github.com/Voxrame/luanti-ide-helper?tab=readme-ov-file#luanti-ide-helper
  - title: ⚡ Lua Helpers
    details:
      Eine Sammlung nützlicher Lua-Funktionen für die Spielentwicklung.<br/>
      Erweitert die Standard-Lua-Bibliothek um zusätzliche Hilfsfunktionen.
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
      Interaktive Webkarten für Luanti-Welten.<br/>
      Mit isometrischen 3D-, Draufsicht-2D-Ansichten,<br/>
      benutzerdefinierten Markern und einfachster Installation & Integration.
      <div class="SubFeatures">
        <a class="SubFeature" href="https://map.lord-server.ru/" target="_blank">
          📍 Live-Vorschau [wip]
        </a>
      </div>
    link: https://github.com/Voxrame/panorama?tab=readme-ov-file#panorama
---
