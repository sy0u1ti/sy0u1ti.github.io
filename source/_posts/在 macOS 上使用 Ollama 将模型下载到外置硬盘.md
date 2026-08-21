---
abbrlink: ''
author: null
banner: null
breadcrumb: null
categories:
- - 站主的瞎话
comments: null
cover: null
date: '2024-11-16T19:11:56.592158+08:00'
description: null
h1: null
indexing: null
katex: null
leftbar: null
mathjax: null
mermaid: null
poster:
  caption: null
  color: null
  headline: null
  topic: null
references: null
rightbar: null
sticky: null
tags:
- ai
- ollama
- mac
title: macOS 下使用 Ollama 将模型迁移至外置硬盘
topic: null
type: null
updated: '2024-11-24T16:30:33.335+08:00'
---
*前言：Ollama 默认将模型下载到其内部数据目录`~/.ollama/models`，但mac的存储空间又十分金贵，网上找了很久也没找到在mac上改ollama默认模型下载目录的办法，摸索了一个方法在 macOS 上使用 Ollama 将模型下载到外置硬盘*

![image](https://cdn.jsdelivr.net/gh/sy0u1ti/picx-images-hosting@master/image.491atwtfvd.webp)

### 使用符号链接 (Symbolic Link)

* **步骤 1：将 Ollama 默认模型目录移动到外置硬盘**

  1. 找到 Ollama 的默认模型目录。通常位于 `~/.ollama/models`。
  2. 将 `models` 目录复制或移动到你的外置硬盘上。例如，假设你的外置硬盘挂载在 `/Volumes/ExternalDrive`，你可以将 `models` 目录移动到 `/Volumes/ExternalDrive/ollama_models`。
* **步骤 2：创建符号链接**

  1. 打开终端。
  2. 使用 `ln -s` 命令创建符号链接。命令格式如下：

     ```bash
     ln -s <目标路径> <链接路径>
     ```
  3. 在你的例子中，命令应该是：

     ```bash
     ln -s /Volumes/ExternalDrive/ollama_models ~/.ollama/models
     ```

  这会在 `~/.ollama` 目录下创建一个名为 `models` 的符号链接，指向外置硬盘上的 `ollama_models` 目录。
* **步骤 3：验证**

  现在，当你使用 Ollama 下载模型时，它会认为模型被下载到了 `~/.ollama/models`，但实际上文件会被保存到外置硬盘上的 `/Volumes/ExternalDrive/ollama_models`。
