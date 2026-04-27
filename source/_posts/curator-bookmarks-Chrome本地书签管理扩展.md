---
abbrlink: ''
categories:
- - 开源项目
cover: null
date: '2026-04-21T14:00:00.000000+08:00'
tags:
- chrome
- 扩展
- 书签
- typescript
- vite
- 开源
title: 'Curator（策书）：一个纯本地的 Chrome 书签管理扩展'
---

书签存得多了，Chrome 自带的书签管理器就开始力不从心 —— 搜索弱、没法批量处理、死链躺在那没人管、导入别人的书签一堆重复。我干脆写了一个扩展来解决自己的这些问题：**Curator（策书）**。

项目地址：<https://github.com/sy0u1ti/curator-bookmarks>

## 它能做什么

- **本地书签浏览**：弹窗里直接搜索、筛选、编辑、移动、删除书签，支持键盘导航，不用再点开 Chrome 的书签管理页。
- **可用性检测**：批量扫 http/https 书签，区分「可用 / 跳转 / 失败」三种状态。存了几年的收藏夹跑一遍就知道哪些已经死了。
- **重定向 URL 同步**：检测到跳转后，可以一键把新的 URL 写回书签，不用手动改。
- **重复书签清理**：按 URL 归类，一次性删掉重复项。
- **AI 智能命名**：支持任意 OpenAI 兼容接口，批量给书签生成更合适的标题。那种写着 `GitHub - xxx/yyy: ...` 的默认标题可以全洗成人话。

## 隐私

所有数据都只在本地。访问网站的权限仅在你主动发起可用性检测 / 调用 AI 接口时按需申请，不会在后台偷偷跑。

## 技术栈

比较简单直白的现代扩展开发组合：

- **TypeScript** 主力语言
- **Vite + @crxjs/vite-plugin** 构建，Manifest V3
- 无运行时框架依赖，纯原生 DOM + CSS

源码以 TypeScript 为主（约 70%），其余是样式和 HTML。

## 安装和使用

目前没上 Chrome 应用商店，走开发者模式加载就行。

### 1. 克隆或下载源码

在仓库页点 **Code → Download ZIP**，或者：

```bash
git clone https://github.com/sy0u1ti/curator-bookmarks.git
cd curator-bookmarks
```

### 2. 装依赖并构建

需要 Node.js 18+。

```bash
npm install
npm run build
```

构建完会生成 `dist/` 目录。

### 3. 加载到 Chrome

1. 打开 `chrome://extensions/`
2. 右上角打开 **开发者模式**
3. 点 **加载已解压的扩展程序**
4. 选项目里的 `dist/` 文件夹

开发时可以用：

```bash
npm run dev
```

## 后续计划

- 更细的筛选器（按域名、按文件夹深度、按最后访问时间）
- 导出 / 导入配置
- AI 分类建议（不止改标题，也建议归到哪个文件夹）

有 bug 或者想法欢迎提 issue，也欢迎直接 PR。
