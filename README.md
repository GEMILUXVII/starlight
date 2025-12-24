<a href="https://space.bilibili.com/401315430" target="_blank">
  <img width="100%" src="public/bg.png" alt="Starlight Banner" />
</a>

# <div align="center">Starlight</div>

<div align="center">
  <strong>星星的星 闪耀双瞳的瞳</strong>
</div>

## 功能特性

- **倒计时** - 生日、出道纪念日等重要日期倒计时
- **时间线** - 星瞳重要事件时间线
- **音乐播放器** - 翻唱歌曲在线播放
  - 单曲循环 / 随机播放
  - 音量记忆 / 静音切换
  - 键盘快捷键支持
  - 分享歌曲链接
- **留言板** - Artalk 评论系统集成
- **交互式粒子背景**

## 技术栈

- **框架**: Vue 3 + Vite
- **样式**: TailwindCSS
- **路由**: Vue Router (Hash Mode)
- **存储**: Cloudflare R2 (音乐资源)
- **评论**: Artalk

## 键盘快捷键

| 按键 | 功能 |
|------|------|
| `Space` | 播放/暂停 |
| `←` | 上一首 |
| `→` | 下一首 |
| `↑` | 音量增加 |
| `↓` | 音量减少 |

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 环境变量

参考 `.env.example` 配置：

```env
VITE_ARTALK_SERVER=你的Artalk服务地址
VITE_STORAGE_BASE_URL=你的云存储地址
```

## 项目结构

```
src/
├── assets/          # 静态资源和全局样式
├── components/      # 可复用组件
│   └── MusicPlayer/ # 音乐播放器组件
├── composables/     # Vue Composables
├── data/            # 数据文件 (events, songs)
├── router/          # 路由配置
└── views/           # 页面视图
```

## 许可证

[![](https://www.gnu.org/graphics/agplv3-155x51.png "AGPL v3 logo")](https://www.gnu.org/licenses/agpl-3.0.txt)

Copyright (C) 2025 GEMILUXVII

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
