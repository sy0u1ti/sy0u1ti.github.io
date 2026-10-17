---
categories:
- - 站主的瞎话
cover: null
date: '2024-10-18T00:34:58.620389+08:00'
description: '自建 LobeChat 聊天节点模型上新：接入英伟达 NVIDIA 官方渠道，正式上线在 Arena 竞技场表现抢眼的 Llama-3.1-Nemotron-70B，并预告接入零一万物国产黑马 Yi-Lightning。'
tags:
- AI
- 大语言模型
- 模型更新
- 聊天机器人
title: 自建 AI Chat 模型与渠道更新：上线英伟达 Nemotron-70B 与零一万物 Yi-Lightning
updated: '2024-10-18T20:31:08.302+08:00'
---
站内自建的 LobeChat 聚合节点近期完成了一波渠道扩容与顶尖开源模型接入，重点引进了两款在主流大模型竞技场（LMSYS Chatbot Arena）中表现惊艳的新模型。

> 注：如需试用站长的自建 LobeChat 节点，可通过任意公开社交媒体私信联系。

---

## 一、已上线：NVIDIA Llama-3.1-Nemotron-70B-Instruct

我们正式接入了 **NVIDIA 官方推理 API 渠道**，现已完整支持 `llama-3.1-nemotron-70b`。

该模型由英伟达团队基于 Meta 的 Llama 3.1 70B 底座，结合先进的 RLHF（人类反馈强化学习）与奖励模型深度调优而成。在最新的 LMSYS Arena 盲测榜单中，这款 70B 尺寸的模型表现出极强的爆发力，综合胜率一举反超了早期的 GPT-4o（05-13 版）以及 Claude 3.5 Sonnet，在代码生成、逻辑推理和对齐响应上尤为干脆利索。

![LMSYS Arena 榜单成绩](https://cdn.jsdelivr.net/gh/sy0u1ti/picx-images-hosting@master/image_2024-10-18_00-31-49.9kg682cmtk.webp)

---

## 二、即将接入：零一万物 Yi-Lightning

另一款近期备受关注的国产黑马是来自李开复带队的零一万物——**Yi-Lightning（闪电）**。

在竞技场实测中，Yi-Lightning 凭借出色的中文语感与超快首字延迟（TTFT），排名甚至一度逼近全球前沿梯队。我们正在调试上游接入渠道，预计将在近几日内完成部署并向节点用户开放。

![Yi-Lightning 竞技场评测截图](https://cdn.jsdelivr.net/gh/sy0u1ti/picx-images-hosting@master/image_2024-10-18_00-23-37.4n7pe7wyzk.webp)
