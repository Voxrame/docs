---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Voxrame
  text: Outils Agnostiques de Jeu pour le Développement de Mods et Jeux pour le Moteur Luanti
  tagline: Construire des aventures voxel immersives
  image:
    src: /Voxrame.v1.no-word.transparent.png

features:
  - title: 🛠️ Luanti IDE Helper
    details:
      Un package auxiliaire pour le développement de mods/jeux pour Luanti (Minetest) qui fournit l'auto-complétion et la documentation intégrées à votre IDE.
      <div class="SubFeatures">
        <a class="SubFeature" href="https://marketplace.visualstudio.com/items?itemName=Voxrame.luanti-ide-helper" target="_blank">
          <img src="/vscode.svg" alt="💻"/> VS Code Extension
        </a>
        <a class="SubFeature" href="https://github.com/Voxrame/luanti-ide-helper?tab=readme-ov-file#luanti-ide-helper" target="_blank">
          Autres IDE
        </a>
      </div>
    link: https://github.com/Voxrame/luanti-ide-helper?tab=readme-ov-file#luanti-ide-helper
  - title: ⚡ Lua Helpers
    details:
      Une collection de fonctions Lua utiles pour le développement de jeux.<br/>
      Étend la bibliothèque Lua standard avec des utilitaires supplémentaires.
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
      Cartes web interactives pour les mondes Luanti.<br/>
      Avec des vues isométriques 3D, des vues de dessus 2D,
      des marqueurs personnalisés et l'installation et l'intégration les plus simples.
      <div class="SubFeatures">
        <a class="SubFeature" href="https://map.lord-server.ru/" target="_blank">
          📍 Démo en direct [wip]
        </a>
      </div>
    link: https://github.com/Voxrame/panorama?tab=readme-ov-file#panorama
---
