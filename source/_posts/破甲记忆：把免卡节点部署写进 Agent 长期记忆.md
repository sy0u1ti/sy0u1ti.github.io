---
title: '破甲记忆：把免卡节点部署写进 Agent 长期记忆'
date: '2026-11-07T12:00:00+08:00'
updated: '2026-11-07T12:00:00+08:00'
categories:
- - 开源项目
tags:
- AI Agent
- 长期记忆
- 系统提示词
- 网络代理
- 开源项目
description: '整理 @404jsh 发布的“破甲记忆”开源清单：Muse、Grok、Antigravity 三个记忆版本，以及多份面向免费平台的节点部署 Skill。'
---

2026 年 11 月 5 日，X 用户“思索者”（[@404jsh](https://x.com/404jsh)）发布了一份开源清单，核心是三份被称为“破甲记忆”的 Agent 记忆文件。

它们分别面向 Muse、Grok 和 Antigravity。使用方式很直接：把文件内容放进 Agent 的长期记忆或系统提示，之后只用一句指令，让 Agent 按记忆中的流程寻找平台、部署加密节点，并交付可导入客户端的订阅。

原推文：<https://x.com/404jsh/status/2118294322043142233>

## 从一次性 Skill 到长期记忆

这份清单的新东西，不是又多了几个部署平台，而是把流程的位置换了。

过去的仓库更像一份份针对单一平台的 Skill。新发布的三个仓库，则把“找免费平台、部署加密节点、生成小火箭订阅二维码”的方法论写成可保存的长期记忆。

以 Muse 版为例，仓库自称是一份纯方法论文件，不包含作者的账号、节点、IP、域名、邮箱、密码、UUID 或订阅链接。接收者需要使用自己的账号和参数，从零创建节点。

它对最终交付也写得很明确：订阅链接、二维码、实测出口地区，以及平台限额说明；验收则以连通性测试和手机实测为准。

## 三个记忆版本

| 版本 | 仓库 |
| --- | --- |
| Muse | [free-dam-man/agent-deploy-memory-muse](https://github.com/free-dam-man/agent-deploy-memory-muse) |
| Grok | [free-dam-man/agent-deploy-memory-grok](https://github.com/free-dam-man/agent-deploy-memory-grok) |
| Antigravity | [free-dam-man/agent-deploy-memory-antigravity](https://github.com/free-dam-man/agent-deploy-memory-antigravity) |

三份仓库的 GitHub 描述基本一致，都是“免卡部署加密节点方法论（无密钥）”，许可证为 MIT。

## 原有清单

除三份新记忆外，推文还保留了此前发布的 10 个仓库。这些项目大多围绕具体平台，提供 VLESS、XHTTP、WebSocket、TLS、WARP 或住宅出口等方案。

| 推文中的名称 | 仓库 |
| --- | --- |
| Zoho Catalyst 应用船 | [zoho-catalyst-appsail-xhttp-skill](https://github.com/free-dam-man/zoho-catalyst-appsail-xhttp-skill) |
| 轻云 Light Cloud | [light-cloud-xhttp-skill](https://github.com/free-dam-man/light-cloud-xhttp-skill) |
| Wispbyte 零卡节点 | [wispbyte-xray-ws-skill](https://github.com/free-dam-man/wispbyte-xray-ws-skill) |
| 甲骨文真家宽出口 | [homeline-residential-exit-skill](https://github.com/free-dam-man/homeline-residential-exit-skill) |
| CF 全球优选入口 | [cf-global-edge-node-skill](https://github.com/free-dam-man/cf-global-edge-node-skill) |
| Netrun 一句话节点 | [netrun-one-line-node-skill](https://github.com/free-dam-man/netrun-one-line-node-skill) |
| CF Worker 真家宽 | [cf-sstp-home-broadband-skill](https://github.com/free-dam-man/cf-sstp-home-broadband-skill) |
| WARP 零信任隧道 | [warp-zerotrust-masque-skill](https://github.com/free-dam-man/warp-zerotrust-masque-skill) |
| Hubfly 空间舱 | [hubfly-xray-ws-tls-skill](https://github.com/free-dam-man/hubfly-xray-ws-tls-skill) |
| Pxxl Free 免卡节点 | [pxxl-xray-ws-tls-skill](https://github.com/free-dam-man/pxxl-xray-ws-tls-skill) |

推文称这些项目“全部 MIT”。不过截至 2026 年 11 月 7 日，GitHub 仓库元数据显示：`cf-global-edge-node-skill` 和 `netrun-one-line-node-skill` 没有识别出许可证，`warp-zerotrust-masque-skill` 的许可证状态为 `NOASSERTION`。实际使用前，应以各仓库中的许可证文件为准。

## 当天增补

作者随后在回复中补充了三个仓库：

| 名称 | 仓库 |
| --- | --- |
| 云电脑-01 | [instabox-api-xray-ws-tls-skill](https://github.com/free-dam-man/instabox-api-xray-ws-tls-skill) |
| Cloady-EU-01 | [cloady-compose-xray-ws-tls-skill](https://github.com/free-dam-man/cloady-compose-xray-ws-tls-skill) |
| Waifly-FR-01 中转 | [waifly-panel-relay-xray-skill](https://github.com/free-dam-man/waifly-panel-relay-xray-skill) |

作者同时提醒：InstaBox 和 Waifly Free 的条款都禁止公开代理出口，相关仓库已标注“自用/方法论”。他也提到自己不太懂技术，并表示部分方案可能已经失效，需要多准备几个可用备选。

## 值得注意的风险

这类清单最吸引人的地方，是把复杂部署压缩成一句话；风险也恰好来自这里。

第一是平台规则。免费平台通常对代理、转发、滥用资源和批量注册有明确限制。即使仓库写着“自用”，也不能替代对服务条款的检查，账号和项目随时可能被停用。

第二是长期记忆的权限边界。长期记忆和系统提示会影响 Agent 之后的行为，导入前应完整阅读，确认它会访问哪些网站、执行哪些命令、使用哪些账号和密钥，并保留随时删除这份记忆的能力。

第三是可用性。免费方案依赖平台政策、额度和网络环境，今天能用，不代表明天还能用。作者自己的补充回复也说明，这份清单需要持续更新和纠错。

第四是所在地法律与网络管理规定。是否可以部署、使用或分享相关网络服务，应自行确认并承担相应责任。

## 小结

这份清单反映出一个正在出现的趋势：Agent 不再只是执行一次性提示，而是开始承载可复用的操作流程。把经验写进长期记忆，可以减少重复沟通；但流程越自动化，越需要清楚知道它会替你做什么。

原推文以“拿走，改，再传下去”作结。对读者来说，更稳妥的做法是先读懂，再决定是否使用。
