---
title: '009 Wiki 布局：桌面与移动端兼顾'
date: '2026-11-02T00:35:00+08:00'
updated: '2026-11-02T00:35:00+08:00'
categories:
- - 科技&产品
tags:
- 信息架构
- 文档设计
- 响应式
- UI
- 前端开发
description: '把 Wiki 拆成内容、章节树和阅读目录三层，用粘性导航、滚动感应、边缘渐隐与移动端底部面板兼顾桌面和手机，并附完整示例 Prompt。'
collection:
  profile: topic
  id: vibe-product-quality
---

当产品开始变复杂，官网又需要承载大量说明与 SEO 文章时，Wiki 就不只是几篇文档的组合。

它同时承担两种任务：让已经进入文档的人快速找到答案，也让从搜索引擎落地的人知道自己在哪、接下来该读什么。布局一旦混乱，内容越多，迷路越严重。

一套可靠的 Wiki 不需要堆更多入口，而是先回答三个问题：什么应该跟着页面滚动，什么应该停在原地，窄屏时哪些导航应该暂时收起。

## 导航应该是内容结构的投影

页面列表和文章大纲不应该各自维护一份标题。

它们最好都从文档本身生成：页面列表读取站点内容树，大纲读取当前文章的 `h2`、`h3` 与稳定锚点。这样新增章节、调整标题或修改 URL 时，不会出现正文已经变了、导航还停留在旧结构的情况。

顶栏只保留三类信息：返回官网的 Logo、少量关键页面的下拉入口、一个明确的主动作。Wiki 的完整层级交给左侧页面列表，当前文章的阅读路径交给右侧大纲，不再重复塞进顶栏。

## 页面不是一整块，而是三层滚动

文档页最稳定的结构是：

```text
文章与页脚：跟随页面滚动
页面列表与大纲：sticky，到达顶部后停留
顶栏：开篇随页面离开，正文开始后浮动返回
```

两侧导航使用 `position: sticky`，而不是一开始就固定。它们先处在正常文档流中，滚到顶部后才停住，所以页面初始不会突然少了高度，也不会在滚动起点发生跳动。父级布局的底部会自然把它们向上推走。

```css
.docs-sidebar,
.docs-toc {
  position: sticky;
  top: var(--docs-sticky-top);
  align-self: start;
  max-height: calc(100dvh - var(--docs-sticky-top) - var(--space-6));
  overflow: auto;
}
```

文章标题需要预留浮动顶栏的高度，避免锚点跳转后标题被遮住：

```css
.docs-content :is(h1, h2, h3, h4) {
  scroll-margin-top: var(--docs-header-offset);
}
```

## 顶栏：先随页面离开，再浮回来

如果顶栏从页面第一帧开始就固定，首屏里的大图、标题和导航会互相挤压。更好的顺序是：

1. 在页面顶部，顶栏透明，属于开篇内容；
2. 用户向下滚动，开篇横幅完全离开屏幕；
3. 顶栏再变成浮动栏，提供持续可达的导航。

判断时机时，可以在横幅之后放一个观察点，用 `IntersectionObserver` 触发状态变化。相比在每次滚动里反复读取 `getBoundingClientRect()`，它更直接，也更容易把工作留给浏览器。

如果沿用 Prompt 里的矩形判断，也应把计算放进一个 `requestAnimationFrame`，不要同时驱动多套滚动监听。

浮动栏使用半透明背景、背景模糊和柔和阴影，只改变 `transform`、`opacity` 与 `blur`。进入约 320ms，退出约 120ms：出现需要稍慢，让用户理解顶栏从哪里来；离场应该更快，不拖住内容。

如果退出途中用户再次向下滚动，不要从零重新播放。取消离场，保留当前状态并反向回到显示，动作才不会跳帧。

Safari 等浏览器会根据页面顶部颜色调整地址栏观感。把 `<meta name="theme-color">`、顶栏背景和品牌色放进同一套变量里，页面内外的边界才不会突然断开。

## 章节树：独立滚动，也要告诉用户还有内容

文档侧栏经常比视口还长。与其让它跟着整页滚动，不如让它在自己的高度内独立滚动，并把滚动条隐藏起来。

但滚动条消失之后，用户会失去“上面或下面还有内容”的线索。只在实际溢出的一侧显示渐变遮罩：

```css
.docs-sidebar[data-more-above][data-more-below] {
  mask-image: linear-gradient(
    to bottom,
    transparent 0,
    #000 40px,
    #000 calc(100% - 56px),
    transparent 100%
  );
}
```

顶部与底部还要保留一小段完全透明的区域，否则半截行会被模糊成一条脏线。遮罩只在对应方向确有更多内容时出现，列表没有溢出时不需要任何装饰。

每个溢出边缘可以配一个圆形箭头，点击后滚动列表可见高度的约 60%。箭头是鼠标用户的便利入口，因此设置 `tabindex="-1"` 与 `aria-hidden="true"`；使用键盘的用户本来就能聚焦列表并滚动。

其他边界同样值得处理：

- 初次加载时，把当前页面滚进可视区域；
- 切换文档后，从 `sessionStorage` 恢复页面列表的滚动位置；
- 如果页面上有搜索框，按 `/` 可以直接聚焦，但在输入框或可编辑区域里不要劫持按键。

## 大纲跟随的是阅读位置，不是滚动增量

当前章节不应该按“滚了多少像素”来判断，而应该看一条固定的阅读线。

把视口向下 20% 的位置作为判断线：这条线上方最后一个标题，就是用户当前所在章节。这个阈值比视口正顶部更接近真实阅读焦点，也不会因为顶部浮动栏发生变化。

被选中的大纲链接使用 `aria-current="location"`，同时改变左边框和文字颜色。滚动过程中最多每个动画帧更新一次，避免连续布局读取与样式写入互相打断。

目录不是另一套内容索引，而是当前阅读进度的可视化。它可以被快速扫视，但不应该比正文更抢眼。

## 移动端把两套导航收进一个底部入口

桌面上的左侧页面列表和右侧大纲，在窄屏会一起吃掉正文宽度。

平板上可以先收起大纲，手机上再收起页面列表，把两者放进一个固定在底部的双入口栏：

```text
左侧：页面列表
右侧：当前章节名称
```

右侧直接显示正在阅读的章节名，过长时省略；它同时承担“大纲入口”和“当前位置”两个作用，不再额外增加一排说明文字。

点击任一侧，用 `showModal()` 打开自底部滑出的面板。原生 `dialog` 自带焦点管理和 Esc 关闭，比自建遮罩层更可靠。面板向上移动约 24px 并淡入，背景不压暗，让用户仍然知道自己身处哪一层页面。

打开时标记当前条目并调用 `scrollIntoView({ block: "center" })`；点击条目、关闭按钮、面板外区域或按 Esc 都能关闭。触摸目标要比桌面列表更大，同时为底部栏预留安全区：

```css
.docs-mobile-nav {
  position: fixed;
  inset: auto 0 0;
  padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
}
```

正文底部也要留出与栏高相等的空间，否则最后一个标题或上下页链接会被永久遮住。

## 文章结尾：先解决问题，再继续转化

读者滑到文末，通常只有两种状态：问题已经解决，或者仍然卡住。

所以在上下页之前，先放一张真正有帮助的卡片。它应该提供可以执行的渠道，例如问题仓库、社群或联系入口，而不是泛泛地写一句“联系我们”。

接着才是上一篇与下一篇。链接直接显示页面标题，让用户知道接下来会读什么；“上一篇”和“下一篇”本身不能提供足够信息。第一篇文档的上一篇应返回首页。

如果 Wiki 需要文末转化，社群、社交账号和产品入口也要使用与正文相同的卡片、字体、圆角和间距。它应该像内容的一部分，而不是突然贴上的广告。

页脚可以承担收尾、品牌和站点结构，也可以通过背景图与有用信息形成一次完整的视觉停顿。但它的高度应由内容决定，不必为了“超过半屏”而制造空白。长度不是目的，用户愿意停留并找到下一步才是。

## 动画只服务于位置变化

整个布局只保留少量必要动作：

- 顶栏进入与退出，让“随页面离开、再浮回来”的空间关系可读；
- 页面列表遮罩切换，提示还有内容；
- 移动端底部面板升起，说明它来自屏幕底边；
- 锚点跳转平滑滚动，帮助用户建立章节位置。

在 `prefers-reduced-motion: reduce` 下关闭平滑滚动和顶栏进出动画，但保留所有状态变化与导航能力。动效减少，不代表功能减少。

## 检查清单

- 页面列表和大纲是否来自同一份文档结构；
- 顶栏是否只在开篇离开后固定，锚点是否避开浮动栏；
- 两侧导航是否使用 sticky，页面初始高度是否没有跳动；
- 页面列表只在确有溢出的一侧显示遮罩和箭头；
- 当前章节是否按固定阅读线更新，而非按滚动距离累计；
- 手机端底部栏是否显示当前章节，并处理好安全区与正文留白；
- 面板是否可点击外部、关闭按钮与 Esc 关闭；
- 文末是否先提供帮助，再展示带标题的上下页；
- 页脚高度是否由真实内容支撑；
- 减少动态效果时，导航与阅读位置是否仍然完整可用。

{% folding color:blue Wiki 布局示例 Prompt %}
```text
Prompt：

Polish the layout of my docs or help center pages: the header, the page list, the outline and the end of each article. Keep the content, copy, colours and fonts. Change only how these parts sit, scroll and respond.

0. Start from what exists
- Find the shared docs layout, the site header, the page list (sidebar), the outline (table of contents) and the footer. Change those, so every page inherits the result.
- Use CSS and a little plain JS. Add no scroll or animation libraries.

1. Think of the page as three layers
- The article and the footer scroll with the page.
- The page list and the outline are position: sticky. They stop where they start, so they never jump when scrolling begins, and the end of the layout pushes them up at the bottom.
- The header becomes position: fixed only after the page's opening (banner or hero) has left the screen. Before that it belongs to the page and scrolls away with it.

2. Header: it scrolls away, then comes back floating
- At the top it is clear, with no background.
- Once the reader has scrolled and the banner's bottom edge is at or above the top of the screen (getBoundingClientRect().bottom <= 0), show it as a floating bar: position: fixed; a translucent white background; backdrop-filter: blur(18px); a soft shadow.
- It enters in 320ms ease-out, from translateY(-24px) with blur(8px) and opacity 0. It leaves in 120ms when the reader scrolls back up to the banner. If the reader scrolls down again during the exit, cancel it and keep the bar.
- Give headings a scroll-margin-top so anchor links never land under the bar.

3. Page list: it scrolls on its own, and shows where there is more
- Hide its scrollbar and let it scroll by itself.
- Fade an edge only while more of the list waits beyond it. Toggle data-more-above and data-more-below on scroll and resize, and drive a mask-image: linear-gradient(...) with them: about 40px at the top and 56px at the bottom, each with a short fully clear strip at the very edge, so a half-cut row never shows as a faint line.
- Add a small round arrow on each edge that has more. A click scrolls the list by 60% of its visible height, smoothly. Arrows are for the mouse only (tabindex="-1", aria-hidden="true"); keyboard focus already scrolls the list.
- On load, bring the current page into view. Keep the list's scroll position in sessionStorage, so moving to another page does not reset it.
- If there is a search box, let "/" focus it.

4. Outline: mark the section being read
- The current section is the last heading above a line 20% down the viewport.
- Mark its link with aria-current="location" and style that: border-left-color and text in the accent colour.
- Update it on scroll, at most once per animation frame.

5. End of the article: help first, then the next page
- If the reader is still stuck, a "Still need help?" card with one or two real channels (the issue tracker, the community, a contact).
- Then previous and next links, with each page's title. The first page links back to the home page.
- Then the footer.

6. Narrow screens
- Hide the outline on tablets and the page list on phones. Put both in one bar fixed at the bottom: the page list on its left half, the outline on its right half.
- The right half shows the name of the section being read, updated by the same 20% line, and truncated with an ellipsis when it is long.
- A tap on either half opens its list as a sheet from the bottom edge (a dialog opened with showModal()), sliding up 24px as it fades in, with no dimming behind it. Mark the current entry and scroll it into view (scrollIntoView({ block: "center" })).
- A tap on an entry, the close button, outside the sheet or Esc closes it; a section link then scrolls to its heading.
- Make the tap targets one size up from the desktop list.

7. Motion
- Under prefers-reduced-motion: reduce, turn off smooth scrolling and the header's enter and exit animations.

8. When done
- List every file and selector you changed.
- Check four states on my own pages: the top of a page, the middle, the end, and a phone-width window.
- Show a screenshot of each.
```
{% endfolding %}

## 质感来自可解释的细节

Wiki 的高级感不来自导航项更多，而来自每个元素知道自己属于哪一层。

文章负责阅读，页面列表负责范围，大纲负责位置，顶栏负责持续可达，移动端底部栏负责在窄空间里保留选择。每一层只做一件事，用户才会在复杂内容里始终保持方向。
