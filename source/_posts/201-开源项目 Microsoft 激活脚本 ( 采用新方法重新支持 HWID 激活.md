---
abbrlink: ''
categories:
- - 科技&产品
cover: null
date: '2023-10-04T00:07:49.567179+08:00'
tags:
- 微软
- hwid
title: Microsoft 激活脚本 (MAS) HWID 激活指南
updated: 2023-10-4T0:14:15.118+8:0
---由于微软结束 Win 7/8 免费升级到 Win 10/11 的通道，原 HWID 激活方式已经失效。但 asdcorp 和其团队的新发现，使重新支持 HWID 激活成为了可能。MAS 称这种新方法为 HWID 2 。

当微软停止免费升级时，它开始要求票证中的正版有效密钥来授权数字许可证。在新方法中，我们仅使用真实有效密钥的安装 ID。这被服务器接受并允许我们免费获得数字许可证。

PowerShell输入
irm https://massgrave.dev/get | iex

项目地址: https://github.com/massgravel/Microsoft-Activation-Scripts
