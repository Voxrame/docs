---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Voxrame
  text: Công cụ Game-Agnostic để phát triển Mod và Game cho Luanti Engine
  tagline: Tạo ra những cuộc phiêu lưu Voxel thú vị
  image:
    src: /Voxrame.v1.no-word.transparent.png

features:
  - title: 🛠️ Luanti IDE Helper
    details:
      Gói trợ giúp phát triển mod/game cho Luanti (Minetest), cung cấp tự động hoàn thành và tài liệu tích hợp vào IDE của bạn.<br/>
      <br/>
      <div class="SubFeatures">
        <a class="SubFeature" href="https://marketplace.visualstudio.com/items?itemName=Voxrame.luanti-ide-helper" target="_blank">
          <img src="/vscode.svg" alt="💻"/> VS Code Extension
        </a>
        <a class="SubFeature" href="https://github.com/Voxrame/luanti-ide-helper?tab=readme-ov-file#luanti-ide-helper" target="_blank">
          IDE Khác
        </a>
      </div>
    link: https://github.com/Voxrame/luanti-ide-helper?tab=readme-ov-file#luanti-ide-helper
  - title: ⚡ Lua Helpers
    details:
      Bộ sưu tập các hàm Lua hữu ích để phát triển game.<br/>
      Mở rộng thư viện Lua tiêu chuẩn với các tiện ích bổ sung.
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
      Bản đồ web tương tác cho các thế giới Luanti.<br/>
      Với hình ảnh 3D đẳng góc, chế độ xem từ trên xuống 2D,
      điểm đánh dấu tùy chỉnh và cài đặt & tích hợp dễ nhất.
      <div class="SubFeatures">
        <a class="SubFeature" href="https://map.lord-server.ru/" target="_blank">
          📍 Demo trực tiếp [wip]
        </a>
      </div>
    link: https://github.com/Voxrame/panorama?tab=readme-ov-file#panorama
---
