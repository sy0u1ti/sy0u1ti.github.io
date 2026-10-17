---
categories:
- - 站主的瞎话
cover: null
date: '2023-08-26T15:55:31.256047+08:00'
description: '从基础布尔逻辑、用户定向、多媒体过滤到互动阈值（点赞/转推量）与时间跨度约束：全面拆解 Twitter (X) 高级搜索指令语法与实战情报挖掘组合技。'
tags:
- Twitter/X
- 搜索技巧
- 社交媒体
- 教程
title: Twitter (X) 高级搜索技巧与精准情报检索全指南
updated: '2023-08-27T17:26:54.290+08:00'
---
Twitter (X) 拥有海量的实时信息流，但默认的全局关键字搜索往往充斥着垃圾广告、转推搬运和无关噪声。

熟练掌握 Twitter 官方支持的原生**高级检索运算符（Search Operators）**，你可以像编写数据库查询语句一样，精准挖掘高价值的干货推文、定位行业大 V 的历史言论或过滤噪音。

---

## 一、基础逻辑与关键词匹配

| 搜索语法 | 作用与示例 | 检索说明 |
| :--- | :--- | :--- |
| `apple banana` | `apple banana` | **与（AND）**：必须同时包含这两个词（默认模式） |
| `"exact phrase"` | `"deep learning"` | **精准完全匹配**：短语词序与内容不可变 |
| `A OR B` | `claude OR gpt` | **或（OR）**：包含 A 或 B，或两者皆有（OR 须大写） |
| `-keyword` | `python -snake` | **排除（NOT）**：包含 python，但坚决剔除含有 snake 的推文 |
| `#hashtag` | `#OpenAI` | 检索打上指定标签（Hashtag）的话题推文 |

---

## 二、账号与人际关系定向

| 搜索语法 | 作用与示例 | 检索说明 |
| :--- | :--- | :--- |
| `from:username` | `from:sama` | 检索由该用户**主动发出**的原创或转推内容 |
| `to:username` | `to:elonmusk` | 检索其他人**发给或回复**给该用户的推文 |
| `@username` | `@OpenAI` | 检索正文中 `@` 提及（Mention）该用户的推文 |
| `list:ID` | `list:1234567` | 仅在指定的推特公开列表（List）成员中进行搜索 |

---

## 三、推文类型与多媒体过滤

| 搜索语法 | 作用与示例 | 检索说明 |
| :--- | :--- | :--- |
| `filter:media` | `AI filter:media` | 仅筛选包含多媒体（图片或视频）的推文 |
| `filter:images` | `midjourney filter:images` | 仅筛选包含静态图片的推文 |
| `filter:videos` | `tutorial filter:videos` | 仅筛选包含上传视频的推文 |
| `filter:links` | `paper filter:links` | 仅筛选正文中附带外部 URL 链接的推文 |
| `-filter:retweets` | `cursor -filter:retweets` | **排除所有转推**（抓取原创推文的神级参数） |
| `-filter:replies` | `crypto -filter:replies` | 排除评论回复，仅保留主楼首推（Thread 首条） |
| `filter:verified` | `security filter:verified` | 仅筛选认证用户（蓝标/金标）发布的推文 |
| `url:github` | `llm url:github.com` | 检索包含特定域名链接的推文（如开源项目） |

---

## 四、热度指标过滤（筛选爆款与高赞干货）

利用点赞、转发和回复阈值，可以瞬间过滤掉 99% 的水贴和低质推文：

| 搜索语法 | 作用与示例 | 检索说明 |
| :--- | :--- | :--- |
| `min_faves:N` | `agent min_faves:500` | 筛选**点赞量 ≥ 500** 的高赞推文 |
| `min_retweets:N` | `AI min_retweets:100` | 筛选**转推量 ≥ 100** 的广泛传播推文 |
| `min_replies:N` | `discussion min_replies:50` | 筛选**讨论评论数 ≥ 50** 的高互动争议/讨论帖 |

---

## 五、精准时间跨度定位

时间格式统一遵循 `YYYY-MM-DD`（基于 UTC 时区）：

- **`since:2024-01-01`**：检索该日期之后（包含当天）发布的推文。
- **`until:2024-06-30`**：检索该日期之前发布的推文。

---

## 六、高阶实战组合公式推荐

所有上述指令可以任意自由空格叠加，以下是几个极具实用价值的检索模板：

### 1. 查找某领域近期高质量干货长推（排除转推与广告水军）
```text
"system prompt" -filter:retweets -filter:replies min_faves:200 since:2024-01-01
```
*含义：搜索 2024 年以来，包含精确短语 "system prompt"、非转推、非回复、且点赞量超过 200 的硬核推文。*

### 2. 查阅某个大佬的历史早期原创言论
```text
from:sama "AGI" until:2020-01-01 -filter:retweets
```
*含义：精准翻看 Sam Altman 在 2020 年之前关于 AGI 的所有原创发言。*

### 3. 寻找开源代码与工具推荐
```text
Claude "prompt" url:github.com min_faves:100
```
*含义：挖掘包含 GitHub 开源仓库、附带 Prompt、且点赞破百的高质量项目分享。*

> 参考官方标准：[Twitter Developer API Search Syntax](https://developer.twitter.com/en/docs/twitter-api/v1/tweets/search/overview)
