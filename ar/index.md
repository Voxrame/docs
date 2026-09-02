---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Voxrame
  text: أدوات اللعب المحايدة لتطوير المود والألعاب لمحرك Luanti
  tagline: بناء مغامرات فوكسيل غامرة
  image:
    src: /Voxrame.v1.no-word.transparent.png

features:
  - title: 🛠️ Luanti IDE Helper
    details:
      حزمة مساعدة لتطوير المود/الألعاب لـ Luanti (Minetest)، توفر إكمالًا تلقائيًا ووثائق مدمجة في IDE الخاص بك.
      <div class="SubFeatures">
        <a class="SubFeature" href="https://marketplace.visualstudio.com/items?itemName=Voxrame.luanti-ide-helper" target="_blank">
          <img src="/vscode.svg" alt="💻"/> VS Code Extension
        </a>
        <a class="SubFeature" href="https://github.com/Voxrame/luanti-ide-helper?tab=readme-ov-file#luanti-ide-helper" target="_blank">
          IDE أخرى
        </a>
      </div>
    link: https://github.com/Voxrame/luanti-ide-helper?tab=readme-ov-file#luanti-ide-helper
  - title: ⚡ Lua Helpers
    details:
      مجموعة من وظائف Lua المفيدة لتطوير الألعاب.<br/>
      تقوم بتمديد مكتبة Lua القياسية بوظائف إضافية.
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
      خرائط ويب تفاعلية لعوالم Luanti.
      مع عروض ثلاثية الأبعاد متساوية القياس، ومنظورات 2D من الأعلى،
      وعلامات مخصصة وأبسط تثبيت وتكامل.
      <div class="SubFeatures">
        <a class="SubFeature" href="https://map.lord-server.ru/" target="_blank">
          📍 عرض مباشر [wip]
        </a>
      </div>
    link: https://github.com/Voxrame/panorama?tab=readme-ov-file#panorama
---
