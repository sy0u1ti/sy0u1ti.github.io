---
title: Linus 论 AI 工具：别把「禁止用 AI 做 X」变成规则（邮件存档）
date: '2026-10-17T05:56:00+08:00'
updated: '2026-10-17T05:56:00+08:00'
categories:
- - 科技&产品
tags:
- Linux
- AI
- 开源
- 行业观察
description: 'Linus Torvalds 2026 年 10 月 13 日在内核邮件列表（LKML）中的回信存档：他反对「禁止用 AI 做 X」式的规则，认为关键是理解自己在做什么，而不是用了什么工具。附英文原文、中文翻译与官方存档链接。'
---

> **存档说明：** 本文是一封公开邮件列表（LKML）中 Linus Torvalds 回信的存档，英文原文与中文翻译各保留一份。译文仅为方便阅读，如有出入请以官方存档的英文原文为准。这封邮件里流传最广的一句是：`I don't understand this whole idiotic concept of "don't use AI for X".`

## 邮件信息

| 项目 | 内容 |
| :--- | :--- |
| 发件人 | Linus Torvalds `<torvalds@linux-foundation.org>` |
| 收件人 | Laurent Pinchart `<laurent.pinchart@ideasonboard.com>` |
| 日期 | 2026-10-13 13:45:09 -0700（UTC 20:45:09） |
| 主题 | `Re: [PATCH] docs: remove Assisted-by references` |
| Message-ID | `CAHk-=whTs09_ozN+e09GU68N1wPP56MUzDjrg9rnKxQUa0A_4Q@mail.gmail.com` |

## 原文（英文）

```text line_number:false
On Tue, 13 Oct 2026 at 13:16, Laurent Pinchart
<laurent.pinchart@ideasonboard.com> wrote:
>
> What this is about is setting our expectations, telling what we want and
> what we don't want.

No. What you are about is something entirely different. It has nothing
to do with "expectations", and it has everything to do with your
hangups.

I don't understand this whole idiotic concept of "don't use AI for X".

Here's a new rule just for you: don't use compilers for any of your
kernel submissions.

Because if you can't show that you really understand what the machine
is actually doing by writing your code in assembler, then I don't want
to see your code contribution. You clearly aren't competent if you
can't write it that way.

And btw, you had better not use an editor to write that commit message either.

Because I need you to show me that you can actually write a good
commit message without using tools that make it easy to backspace and
hide the mistakes you made while typing.

Ok?

Because otherwise those tool-assisted commits of yours clearly aren't
showing that you know what you are doing.

Do you not see how UTTERLY STUPID those kinds of rules would be?

So no. We're not going to make stupid rules that say "you can't use
tools for X".

The kind of expectations *I* have is that people do their best and I
expect people to understand what they are doing.

But that understanding has very little to do with what tools they use.

And quite honestly, in my experience, the people I respect and call
intelligent are not the ones that shy away from using new and
interesting tools.

                   Linus
```

## 中文翻译

**2026 年 10 月 13 日 13:16，Laurent Pinchart 写道：**

> 这件事的意义在于设定我们的预期，告诉大家我们想要什么、不想要什么。

不。你所在意的是完全另一回事。它和「预期」毫无关系，只和你的心结有关。

我完全无法理解「不要用 AI 做 X」这种愚蠢的概念。

那我专门为你定一条新规矩：你的任何内核提交都不许使用编译器。

因为如果你不能靠用汇编语言写代码来证明你真正理解机器在做什么，那我就不想看到你的代码贡献。你要是写不出来，显然就是能力不够。

顺便说一句，你也最好别用编辑器来写提交信息。

因为我需要你证明：不借助那些能轻松退格、能把打字错误藏起来的工具，你依然能写出好的提交信息。

明白吗？

因为否则的话，你那些「工具辅助」的提交显然不能证明你知道自己在做什么。

难道你看不出来，这类规矩会有多愚蠢吗？

所以，不行。我们不会制定「你不许用某种工具做 X」这种愚蠢的规矩。

*我*所抱有的那种预期是：人们尽力而为，并且理解自己在做什么。

但这种理解和他们使用什么工具几乎没有关系。

而且说实话，以我的经验来看，我尊重并认为聪明的人，恰恰不是那些回避使用新奇工具的人。

Linus

## 背景：这封邮件从哪来

2026 年 10 月 9 日，Sasha Levin 在内核邮件列表提交补丁 `[PATCH] docs: remove Assisted-by references`：维护者峰会（Maintainers Summit）达成共识，弃用 `Assisted-by` 标签，并删除文档中要求标注 AI 辅助的内容（涉及 `coding-assistants.rst`、`submitting-patches.rst` 与 `scripts/checkpatch.pl`）。

讨论中有人主张保留某种披露要求。Laurent Pinchart 提出，可以像 Mesa 那样要求提交信息必须由人撰写，并写道：

> What this is about is setting our expectations, telling what we want and what we don't want.

Linus 的这封回信就是针对这句话。他的观点是：问题的关键不在于用了什么工具，而在于人是否真正理解自己在做什么。

## 存档链接

- 官方存档（lore.kernel.org）：<https://lore.kernel.org/all/CAHk-=whTs09_ozN%2Be09GU68N1wPP56MUzDjrg9rnKxQUa0A_4Q%40mail.gmail.com/>
- 完整讨论串：<https://lore.kernel.org/all/CAHk-=whTs09_ozN%2Be09GU68N1wPP56MUzDjrg9rnKxQUa0A_4Q%40mail.gmail.com/T/#u>
- 原始邮件（raw）：<https://lore.kernel.org/all/CAHk-=whTs09_ozN%2Be09GU68N1wPP56MUzDjrg9rnKxQUa0A_4Q%40mail.gmail.com/raw>
- MARC 镜像：<https://marc.info/?l=linux-kernel&m=179192462390688&w=2>
- MARC 原始正文：<https://marc.info/?l=linux-kernel&m=179192462390688&w=2&q=raw>
- lkml.iu.edu 镜像：<https://lkml.iu.edu/2610.1/13255.html>

> lore.kernel.org 对自动抓取设有访问验证，用浏览器正常打开即可。
