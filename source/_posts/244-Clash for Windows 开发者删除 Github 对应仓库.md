---
categories:
- - 杂文快报
cover: null
date: '2023-11-02T22:30:54.551701+08:00'
description: '2023 年 11 月初代理生态标志性剧变回顾：从 CFW 开发者清空 Releases，到 Clash 原生核心、Meta 核心与各大平台 GUI 客户端相继删库与归档的来龙去脉、受影响项目盘点及后续演进。'
tags:
- Clash
- 科学上网
- 代理工具
- 开源项目
- 网络资讯
title: Clash for Windows 删库停更事件全记录与受波及项目盘点
updated: '2023-11-03T18:20:47.517+08:00'
---
2023 年 11 月 2 日夜间，在 Windows 平台拥有最大用户基数的代理图形客户端 **Clash for Windows（CFW）** 开发者 Fndroid 清空了其 GitHub 仓库的所有 Releases 发布包，并随后将仓库归档。

![开发者 Telegram 频道声明截图](https://cdn.jsdelivr.net/gh/sy0u1ti/picx-images-hosting@master/image.1xalojqf7hs0.webp)

---

## 澄清：交互界面与底座内核的关系

事件发生初期，社区内一度流传许多不实传言。理解此次变动的关键在于理清 **GUI 操作界面** 与 **底层网络内核** 的技术解耦关系：

- **Clash for Windows（CFW）**：是由 Fndroid 独立基于 Electron 框架编写的**跨平台图形交互界面**。它负责用户配置管理、策略组切换与托盘控制，其核心网络流量处理依赖嵌入的后台内核。
- **Clash Core / Clash.Meta**：是由独立开源团队维护的 Golang 命令行代理核心。

界面的停止维护并不等同于网络协议本身的失效，已下载的本地客户端仍可继续正常启动运行。

---

## 多米诺骨牌：受波及的开源项目全盘点

随后数日内，由于连锁安全考量与维护者压力，开源代理生态引发了罕见的“多米诺骨牌效应”。截至 2023 年 11 月 3 日，受到波及的各大项目状态汇总如下：

### 1. 底层核心与通信协议
- **Clash Core（官方原版内核）**：Dreamacro 删除了核心仓库，官方生态正式停滞。
- **Clash.Meta**：由社区分支团队接盘维护的增强版内核，主仓库暂时归档（后续重组为 **Mihomo** 独立继续迭代）。
- **TUIC 协议**：基于 QUIC 协议的高性能代理库宣布关闭开源仓库。

### 2. 桌面与移动端图形客户端
- **Clash for Windows (CFW)**：全平台已删库 / 停止更新。
- **Clash For Android (CFA)**：官方安卓主流客户端仓库删除。
- **ClashMetaForAndroid (CMFA)**：转为只读归档状态。
- **Clash Verge (原版)**：原仓库归档（后续由社区团队分叉出 **Clash Verge Rev** 继续维护）。
- **Fclash (Linux GUI)**：仓库归档。
- **Gui.For.Clash**：仓库删除。

### 3. 固件与路由器插件
- **Homeproxy**：ImmortalWrt / OpenWrt 下的 Meta 路由插件暂时归档。
- **Helloworld**：经典第三方路由器插件仓库删除。

---

## 后续生态演进与替代方案

这场震荡直接加速了社区的技术分化与新老交替：
1. **内核层面**：原 Clash.Meta 核心重组为 **Mihomo（虚空终端）**，成为目前最活跃、全协议支持最完备的开源内核；**sing-box** 则作为更轻量、功耗更低的新一代通用平台迅速崛起。
2. **客户端层面**：桌面端主流已全面迁移至 **Clash Verge Rev**、**FlClash** 或 **Hiddify**；移动端则由 **Karing**、**sing-box 官方版** 等新一代工具平稳接替。
