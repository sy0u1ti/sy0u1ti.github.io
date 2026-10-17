---
categories:
- - 科技&产品
cover: null
date: '2024-10-23T00:16:36.997436+08:00'
description: '大模型领域神仙打架的一天：上午马斯克正式开放 xAI API；晚间 Anthropic 推出迭代版 Claude 3.5 Sonnet、全新 Claude 3.5 Haiku，并首发颠覆性的 Computer Use（AI 模拟人类操作电脑）功能。'
tags:
- AI
- 模型发布
- xAI
- Anthropic
- OpenAI
title: 大模型神仙打架的一天：xAI API 正式上线，Anthropic 推出 Computer Use 模拟操作
updated: '2024-10-23T00:25:28.545+08:00'
---
今天大模型圈仿佛在集体过节——上午埃隆·马斯克（Elon Musk）刚宣布 xAI 官方开发者 API 正式上线；到了晚间，Anthropic 又投下一枚深水炸弹：带来迭代版 Claude 3.5 Sonnet、全新轻量旗舰 Claude 3.5 Haiku，以及一项极具前瞻性的新能力——**Computer Use（AI 模拟人类操作电脑）**。

![大模型双重更新](https://cdn.jsdelivr.net/gh/sy0u1ti/picx-images-hosting@master/image.6t7474n424.webp)

{% twitter https://x.com/elonmusk/status/1848398370219364385 %}

{% twitter https://x.com/AnthropicAI/status/1848742740420341988 %}

---

## 一、xAI 开发者 API 正式上线

马斯克旗下的 xAI 正式推出了官方公共 API 接口（[console.x.ai](https://console.x.ai)）：
- **接入模型**：当前核心开放的是 **`grok-beta`** 模型，支持 128k 上下文窗口。
- **生态联动**：支持函数调用（Function Calling）与 OpenAI 兼容格式，开发者可以无缝替换现有的 SDK 终端地址进行集成。
- **计费与定价**：定价采用输入 $5 / 百万 Token、输出 $15 / 百万 Token，并向早期开发者提供了一定的免费测试额度。

随着 xAI 孟菲斯超级计算集群（Colossus）的满负荷运转，xAI 正加速从自用闭门走向商业开放生态。

---

## 二、Anthropic 家族三连发：从模型迭代到“智能体上机”

如果说 xAI 是补齐了生态入口，那么 Anthropic 的更新则是直接拓宽了大模型应用场景的边界。

### 1. 行业首发：Computer Use（模拟人类使用电脑）

这无疑是本次发布中最具想象力的一项创新——**让 AI 像人类一样直接操作真实的桌面操作系统**。

通过公共 Beta 版 API，开发者可以给 Claude 下达复杂指令，Claude 会：
1. **感知屏幕**：自动截取当前屏幕画面并解析 UI 元素；
2. **规划动作**：像人类操作员一样计算坐标、移动鼠标指针、点击按钮；
3. **交互输入**：在表单和终端中键入文本、快捷键切换窗口；
4. **多步闭环**：观察操作结果，遇到弹窗或报错即时纠偏，自主完成横跨多软件的端到端自动化任务。

这项功能不仅能极大提升软件自动化测试与数据采集的效率，更为真正意义上的“通用智能体助理（General Agents）”铺平了道路。

### 2. 旗舰再进化：新版 Claude 3.5 Sonnet

作为目前全球公认的“最强代码与工程模型”，Claude 3.5 Sonnet 再次迎来了全面刷新，且保持**加量不加价**（速度与定价均与旧版保持一致）：
- **真实编码跑分（SWE-bench Verified）**：业内最高基准提升至 **49.0%**，大幅领跑所有主流模型。
- **工具调用能力（TAU-bench）**：零售领域从 62.6% 跃升至 **69.2%**，航空业务场景达到 **46.0%**。
- **长逻辑推理**：显著强化了多步代码重构、跨文件依赖分析与故障排查的准确度。

### 3. 全新轻量速度怪兽：Claude 3.5 Haiku

新一代 Claude 3.5 Haiku 彻底改写了轻量级模型的战力天花板：
- **战力越级**：在多项编码和通用基准评测中，表现甚至超越了上一代的顶级旗舰 **Claude 3 Opus**。
- **极速与低成本**：保持了极致的低延迟响应与优秀的指令遵循度，非常适合用于代码补全、复杂路由分发、高并发客诉与实时界面交互场景。

详细官方更新说明可参考：[Anthropic 官方新闻稿](https://www.anthropic.com/news/3-5-models-and-computer-use)。
