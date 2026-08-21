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
title: Curator（策书）：本地优先的 Chrome 书签管理与 AI 整理扩展
---

书签存得多了，Chrome 自带的书签管理器就开始力不从心：搜索不够顺手、移动和删除操作偏散、死链没人管、重复收藏越积越多，临时收藏的新页面也经常不知道该放到哪个文件夹。

于是我做了一个 Chrome 扩展：**Curator（策书）**。它的目标很明确，把书签的日常搜索、清理、归类和 AI 辅助整理都放在本地完成，尽量不把一个简单工具做成云服务。

项目地址：<https://github.com/sy0u1ti/curator-bookmarks>

当前最新版本是 **v1.3.1**，已经提供可直接下载的 release zip，不想折腾 Node.js 的话可以直接安装。

## 主要功能

### 弹窗：更快地找到和处理书签

点开扩展弹窗后，可以直接搜索 Chrome 书签，并对结果进行编辑、移动和删除。常见的书签处理不需要再打开 Chrome 自带的书签管理页。

弹窗里还有一个更实用的能力：**为当前网页推荐收藏位置**。当你在一个网页上点开 Curator，它可以根据已有书签结构和当前页面信息，给出更合适的保存文件夹建议，减少“先随便丢进未分类，以后再说”的情况。

### 书签管理：清死链、改跳转、删重复

Curator 的管理页主要解决三类问题：

- **书签可用性检测**：批量检测网页书签是否还能访问。
- **重定向更新**：如果一个旧链接已经跳转到新地址，可以把最终 URL 批量同步回原书签。
- **重复书签清理**：按 URL 找出重复收藏，统一处理。

这部分适合处理用了很多年的收藏夹。老书签里经常会混着失效页面、短链、迁移后的项目地址，以及多个文件夹里重复保存的同一个链接，手动翻基本不现实。

### AI：命名、分类和自动分析

AI 功能支持自定义 OpenAI 兼容接口。你可以填自己的 base URL、模型和 API Key，用熟悉的渠道来跑分析。

目前主要有三类 AI 能力：

- **AI 智能命名**：批量生成更清晰的书签标题建议，把默认标题、SEO 标题、仓库标题整理成更容易读的名字。
- **弹窗智能分类**：根据当前网页内容和现有文件夹结构，推荐应该收藏到哪个文件夹。
- **自动分析**：添加网页书签后，后台自动分析并尝试归类到合适位置。

v1.3.1 里重点完善了自动分析和智能分类流程，也增强了后台队列，减少首次安装后任务被浏览器回收导致丢失的情况。

## 隐私与权限

这个扩展的取向是本地优先，所以数据默认都留在浏览器本地：

- 书签、历史、忽略规则、回收站和 AI 设置保存在 `chrome.storage.local`。
- `API Key` 只保存在当前扩展的本地存储中。
- 只有在主动检测、AI 分析或智能分类时，才会请求访问相关网站或 AI 服务地址。
- 如果启用 Jina Reader 远程解析，目标网页 URL 会发送给 Jina Reader，所以隐私页面不要随便开这个能力。

扩展用到的主要 Chrome 权限包括：

- `bookmarks`：读取、移动、编辑、创建和删除书签。
- `storage`：保存设置、历史、忽略规则和回收站。
- `alarms`：后台自动分析任务被浏览器回收后，唤醒并继续处理。
- `activeTab`：读取当前标签页信息，用于弹窗智能分类。
- `webNavigation` / `webRequest`：执行可用性检测并收集主请求证据。
- `notifications`：自动分析完成后发送 Chrome 通知。
- `optional_host_permissions`：按需请求访问 `http://*/*`、`https://*/*` 或 AI 服务地址。

## 安装方式

目前没有上 Chrome Web Store，可以通过开发者模式加载。

### 方式一：下载发行版

这是最省事的方式，不需要安装 Node.js，也不需要自己构建。

1. 打开 [GitHub Releases](https://github.com/sy0u1ti/curator-bookmarks/releases/latest)
2. 下载最新版本里的 `curator-bookmarks-*.zip`
3. 解压 zip 文件
4. 打开 `chrome://extensions/`
5. 打开右上角的 **开发者模式**
6. 点击 **加载已解压的扩展程序**
7. 选择解压后的 `dist/` 文件夹

### 方式二：从源码构建

适合需要本地开发或修改源码的情况。需要 Node.js 18+。

```bash
git clone https://github.com/sy0u1ti/curator-bookmarks.git
cd curator-bookmarks
npm install
npm run build
```

构建完成后会生成 `dist/` 目录，再到 `chrome://extensions/` 里加载这个目录。

## 开发命令

项目是一个 Manifest V3 扩展，技术栈比较直接：

- TypeScript
- Vite 6
- `@crxjs/vite-plugin`
- Chrome Extensions API
- 原生 DOM + CSS
- Node.js 内置测试工具

常用命令：

```bash
# 启动 Vite 开发模式
npm run dev

# 类型检查
npm run typecheck

# 运行测试
npm test

# 类型检查、测试、版本一致性检查和构建
npm run validate

# 构建并打包 release zip
npm run pack:zip

# 普通构建
npm run build
```

## 适合谁用

如果你的书签只有几十个，Chrome 自带管理器其实够用。Curator 更适合下面这些情况：

- 书签数量很多，靠文件夹手动维护已经很烦。
- 收藏了很多 GitHub、文档、工具站，标题混乱。
- 老链接很多，想批量找出失效和重定向链接。
- 经常临时收藏网页，但不想每次都手动判断该放到哪个文件夹。
- 想用自己的 OpenAI 兼容渠道做本地书签整理。

项目还在继续迭代，有 bug 或者想法可以提 issue，也欢迎直接 PR。
