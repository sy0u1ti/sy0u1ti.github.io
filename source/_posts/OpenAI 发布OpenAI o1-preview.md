---
categories:
- - 科技&产品
cover: https://images.ctfassets.net/kftzwdyauwt9/5KQV9Im89elavhOaw857H7/9bf152dd9b0e38f51264e593a0c6ebac/oai_o1_model_picker.png?w=3840&q=90&fm=webp
date: '2024-09-13T01:20:19.402683+08:00'
description: 'OpenAI 正式发布全新推理模型系列 OpenAI o1-preview（代号 Strawberry 草莓 / Q*）：通过强化学习机制赋予模型“慢思考”能力，在数学竞赛、算法编码与博士级数理难题上取得历史性突破。'
tags:
- OpenAI
- AI
- 大语言模型
- 模型发布
title: OpenAI o1-preview (草莓) 正式发布：给 AI 思考时间，推理模型迎重大飞跃
updated: '2024-09-13T01:25:19.783+08:00'
---
2024 年 9 月 12 日，OpenAI 正式发布了代号为 **Strawberry（草莓 / 传闻中的 Q*）** 的全新推理模型系列——**OpenAI o1-preview** 以及轻量版 **OpenAI o1-mini**。

这是大语言模型从“快直觉响应（System 1）”迈向“深思熟虑（System 2）”的关键范式转移：不同于以往即问即答的 GPT-4o，o1 系列在输出最终答案前，会通过内置的**私有思维链（Chain of Thought）**进行自我推演、纠错和反复验证。

![OpenAI o1 模型选择界面](https://images.ctfassets.net/kftzwdyauwt9/5KQV9Im89elavhOaw857H7/9bf152dd9b0e38f51264e593a0c6ebac/oai_o1_model_picker.png?w=3840&q=90&fm=webp)

## 核心机制：给 AI 真正“思考”的时间

以往的自回归模型在生成每个 Token 时消耗的算力是固定的，遇到复杂多步问题容易在逻辑链条中途掉入幻觉。

OpenAI o1 引入了全新的**大规模强化学习（Reinforcement Learning）**训练范式：
- **隐式思维链**：在作答前，模型会先在幕后生成密集的思考过程，尝试多种策略、识别自身错误、探索备选路径，并最终收敛出最可靠的推理答案。
- **测试时算力换准确率（Inference-time Compute）**：思考的时间越长、搜索的路径越多，输出答案的确定性和逻辑严密性就越高。

---

## 基准测试表现：从学生到博士的质变

在需要深度多步推理的硬核科目中，o1-preview 展现出了颠覆性的成绩跃升：

- **国际数学奥林匹克（IMO）资格赛**：GPT-4o 正确率仅为 13%，而 o1 跃升至 **83%**。
- **竞技编程竞赛（Codeforces）**：o1 的编码评分达到了所有参赛选手的 **第 89 百分位**（ELO 1807），达到人类资深算法选手的水平。
- **前沿科学难题（GPQA Diamond）**：涵盖物理、化学、生物学等博士级水平的评估测试中，o1 的表现首次超越了人类领域专家的平均水平。

---

## 版本划分与定位差异

### 1. OpenAI o1-preview（旗舰推理）
- **定位**：面向全领域复杂科学难题、前沿理论推导、跨学科综合分析与长链路逻辑规划。
- **特点**：推理最深入，但生成速度较慢、消耗 Token 较多。

### 2. OpenAI o1-mini（专精编程与效率）
- **定位**：专为**代码生成与数学运算**深度微调的轻量化推理模型。
- **特点**：推理速度极快，API 价格比 o1-preview **便宜 80%**，在 Codeforces 竞赛测试中表现甚至略优于完整预览版，是极具性价比的工程师生产力利器。

---

## 当前版本的局限与取舍

作为 Preview（预览）版本，o1 当前主要聚焦于纯文本逻辑推理，牺牲了一部分常规 ChatGPT 的便携功能：
- 暂不支持网页实时浏览（Web Browsing）
- 暂不支持上传文件/解析图片等原生多模态输入
- 暂不支持自定义 System Prompt 与 Function Calling（结构化输出）
- 思考过程目前通过模型摘要折叠显示，不直接暴露原始推理 Token

---

## 使用与权限获取

- **ChatGPT Plus / Team 用户**：已在模型下拉列表中上线，o1-preview 与 o1-mini 分配了独立周配额。
- **企业版与教育版**：计划于次周全面灰度推送。
- **API 开发者**：Tier 5 级别的开发者已开放调用，受 20 RPM 频次限制。
- **免费用户**：官方承诺后续将向所有 ChatGPT Free 用户开放 o1-mini 的访问通道。

---

## 官方实机演示

以下为 OpenAI 官方公布的解题与编码实战演示视频：

<iframe width="100%" height="450" src="https://www.youtube.com/embed/T0IrhzrhR40?si=Y8RaoNN5RQF8kAzi" title="OpenAI o1 官方推理演示" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="border-radius:12px;margin:1rem 0;"></iframe>

<iframe width="100%" height="450" src="https://www.youtube.com/embed/50W4YeQdnSg?si=OC4VJ0x3kUewgajS" title="OpenAI o1 算法竞赛实战演示" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="border-radius:12px;margin:1rem 0;"></iframe>
