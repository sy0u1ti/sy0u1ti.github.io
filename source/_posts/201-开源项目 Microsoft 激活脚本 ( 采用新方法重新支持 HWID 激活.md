---
categories:
- - 科技&产品
cover: null
date: '2023-10-04T00:07:49.567179+08:00'
description: '微软正式关闭 Win 7/8 免费升级通道后，原 HWID 数字权利激活随之失效。知名开源项目 MAS (Microsoft Activation Scripts) 团队近期研发出全新的 HWID 2 方案，重新实现了 Windows 10/11 系统的终身正版数字许可证激活。'
tags:
- Microsoft
- Windows
- PowerShell
- HWID
- 激活工具
- 开源项目
title: Win 7/8 升级通道关闭后，MAS 采用全新方法重新支持 Windows HWID 永久激活
updated: '2023-10-04T00:14:15.118+08:00'
---
2023 年 9 月下旬，微软官方正式关闭了自 2015 年沿用至今的 Windows 7 / 8 免费升级到 Windows 10 / 11 的服务器验证通道。这意味着此前依托旧系统票证兑换数字许可证的传统 **HWID（硬件哈希数字权利）** 激活方式全部失效。

然而，知名开源工具 **MAS（Microsoft Activation Scripts）** 的核心开发者 asdcorp 及其团队迅速发现了微软激活服务的新机制，并推出了全新的 **HWID 2** 激活方法，让 Windows 10/11 的永久正版数字权利激活重获新生。

---

## HWID 2 原理简析

在旧版机制中，生成激活票证时只需伪造 Win 7/8 的通用升级密钥即可被微软云端接受。通道关闭后，微软服务器增加了对票证中密钥来源有效性的强校验。

而在新版 **HWID 2** 机制中，团队通过提取系统内置合法通用零售/批量密钥的**安装 ID（Installation ID）**生成合法请求凭据。该凭据被微软激活服务器完整信任并签发永久数字许可证（Digital License）。激活信息绑定主板硬件哈希，后续即使重装系统，联网后也能自动重连激活。

---

## 一键激活指令

以管理员权限打开 Windows 自带的 **PowerShell** 窗口，复制并执行以下官方一键指令：

```powershell
irm https://massgrave.dev/get | iex
```

脚本运行后会弹出交互式命令行菜单：
- 按键盘 **`1`**：选择 **HWID** 永久数字权利激活（推荐，一次性永久绑定）。
- 按键盘 **`2`**：选择 Ohook 模式激活 Office。

---

## 开源与安全声明

MAS 是目前全球公认最透明、最干净的开源激活工具，完全由批处理与原生 PowerShell 脚本构成，不携带任何二进制后门或驱动注入。

- **官方 GitHub 仓库**：[https://github.com/massgravel/Microsoft-Activation-Scripts](https://github.com/massgravel/Microsoft-Activation-Scripts)
- **官方文档主页**：[https://massgrave.dev/](https://massgrave.dev/)
