---
title: Linus 谈 AI 工具：真正聪明的人，从不抗拒新工具
date: '2026-10-17T05:56:00+08:00'
updated: '2026-10-17T05:56:00+08:00'
categories:
- - 科技&产品
tags:
- Linux
- AI
- 开源
- 行业观察
description: 'Linus Torvalds 在内核邮件列表（LKML）反驳“禁用 AI”的论调：工程的真谛在于真正理解自己在做什么，而不是用了什么工具；真正聪明的人，从来不会抗拒尝试新工具。'
---

> **导读与说明：** 本文是 Linus Torvalds 于 2026 年 10 月 13 日在 Linux 内核邮件列表（LKML）中一封公开回信的完整存档，附英文原文与精校中文翻译。针对社区内关于“是否应禁止 AI 参与代码或提交说明”的争论，Linus 以其一贯辛辣直白、直击本质的风格击碎了工具层面的教条主义。文中流传最广的一句是：`I don't understand this whole idiotic concept of "don't use AI for X".`

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

> 这件事的本质在于明确标准与预期，清楚告诉大家我们想要什么、不想要什么。

不对。你真正纠结的完全是另一回事。这跟所谓的“确立预期”毫无关系，纯粹是你自己放不下的心理包袱在作祟。

我实在是搞不懂，“在某某事情上不许用 AI”这种蠢到家的教条到底是怎么来的。

那我专门为你量身定一条新规矩：往后你给内核提交代码，一律不准用编译器。

因为如果你不能手写汇编，来证明自己真正通晓机器的底层运作，那我根本不想看到你的代码贡献。你既然手写不出来，显然水平根本不过关嘛。

顺带一句，你写 commit message 时，最好也别用任何文本编辑器。

因为我要你向我证明：哪怕不用那些能轻松按退格、把打字失误悄悄掩盖的工具，你也能写出高水准的提交说明。

懂了吗？

否则的话，你那些借由“工具辅助”出来的提交，显然证明不了你心里真有数。

难道你真看不出来，立这种规矩到底有多荒唐透顶、愚蠢至极吗？

所以，答案是不行。我们绝不会制定“禁止用工具做某某事”这种愚蠢的规矩。

如果非要说**我**对大家有什么预期，那就是希望每个人都竭尽所能，并且对自己手头做的事情了然于胸、知其所以然。

但这番理解，跟他们究竟使用什么工具，几乎半点关系都没有。

而且说句心里话，依我这辈子的经验来看，那些真正让我打心底敬佩、配得上“聪明”二字的人，从来不会畏手畏脚，抗拒去尝试新奇有趣的工具。

Linus

## 背景：这封邮件从哪来

2026 年 10 月 9 日，内核资深维护者 Sasha Levin 在内核邮件列表提交补丁 `[PATCH] docs: remove Assisted-by references`：提议落实维护者峰会（Maintainers Summit）达成的共识，正式废弃 `Assisted-by` 标签，并删去文档中要求开发者披露 AI 辅助的规定（涉及 `coding-assistants.rst`、`submitting-patches.rst` 与 `scripts/checkpatch.pl`）。

讨论中有人主张保留某种形式的披露要求。Laurent Pinchart 提出，可以效仿 Mesa 项目的做法，强制要求提交说明必须由人工撰写，并写道：

> What this is about is setting our expectations, telling what we want and what we don't want.  
> （这件事的本质在于明确标准与预期，清楚告诉大家我们想要什么、不想要什么。）

Linus 的这封回信正是针对这句话发出的强力反驳。他的核心论点是：**工程贡献的真正门槛在于开发者是否真正通晓代码与系统运转，而绝不在于开发者手里用了什么工具；给工具设立“禁用禁区”，在逻辑上既荒谬自欺，在实践中也毫无意义。**

## 存档链接

- 官方存档（lore.kernel.org）：<https://lore.kernel.org/all/CAHk-=whTs09_ozN%2Be09GU68N1wPP56MUzDjrg9rnKxQUa0A_4Q%40mail.gmail.com/>
- 完整讨论串：<https://lore.kernel.org/all/CAHk-=whTs09_ozN%2Be09GU68N1wPP56MUzDjrg9rnKxQUa0A_4Q%40mail.gmail.com/T/#u>
- 原始邮件（raw）：<https://lore.kernel.org/all/CAHk-=whTs09_ozN%2Be09GU68N1wPP56MUzDjrg9rnKxQUa0A_4Q%40mail.gmail.com/raw>
- MARC 镜像：<https://marc.info/?l=linux-kernel&m=179192462390688&w=2>
- MARC 原始正文：<https://marc.info/?l=linux-kernel&m=179192462390688&w=2&q=raw>
- lkml.iu.edu 镜像：<https://lkml.iu.edu/2610.1/13255.html>

> lore.kernel.org 对自动抓取设有访问验证，用浏览器正常打开即可。
