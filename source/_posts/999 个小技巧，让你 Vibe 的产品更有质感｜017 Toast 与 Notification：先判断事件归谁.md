---
title: '017 Toast 与 Notification：先判断事件归谁'
date: '2026-11-14T13:00:00+08:00'
updated: '2026-11-14T13:00:00+08:00'
categories:
- - 科技&产品
tags:
- 交互设计
- 通知
- 反馈
- UI
- 无障碍
description: '按事件来源、紧急程度、可撤销性与是否必须处理，判断 Toast、Notification 或都不使用，并附完整审查与改造 Prompt。'
collection:
  profile: topic
  id: vibe-product-quality
---

Toast 和 Notification 都能告诉用户“发生了一件事”，但它们回答的不是同一种问题。

Toast 回应的是用户刚刚做过的动作：复制成功、同步完成、文件已上传。用户知道结果就可以继续工作。

Notification 传递的是用户没有刚刚触发、由其他人或系统发出的消息：有人提到了你、支付到账、后台报告完成、安全告警。它可能和当前操作无关，但用户之后必须能找到。

如果两者只是换一个位置和样式，产品的反馈层级就会变乱：真正需要处理的消息一闪而过，而普通成功状态却在页面角落里长期占位。

## Toast 只承接眼前这次操作

Toast 出现在用户正在工作的位置上，不打断任务，并自动消失。

它可以分成三种：

### Status Toast

只确认结果。一个图标加几个字，例如「链接已复制」「已同步」，不需要按钮。

用户不需要跳去别处检查，也不需要做下一步，看到就够了。

### Action Toast

动作已经完成，但还保留一个紧随其后的选择，通常只有「撤销」。

它需要停留足够久，让用户能读到并点击；如果是限时撤销，还要显示剩余时间。关闭按钮与操作按钮并列，不能把撤销藏进二级菜单。

能立即撤销的操作，直接执行并给 Undo，比执行前弹一次确认更轻。

### Progress Toast

短时间运行中的工作，例如上传、同步或导出。它先显示进度，完成后在原位变成结果，并提供一个查看入口。

Toast 不擅长处理必须修复的失败。上传失败、支付失败或表单错误都应该留在出事的位置，直到用户解决。

## Notification 承接用户没触发的消息

Notification 的核心不是“长得像系统通知”，而是消息来源与当前动作无关。

它可能需要：

- 一条标题；
- 一两行正文；
- 最多两个操作；
- 时间与其他上下文。

它应该跨页面可见，直到用户打开、处理或关闭，同时保存在通知中心、活动列表或铃铛入口中。多条 Notification 可以堆叠。

如果用户错过它会造成明显后果，它就不该只以三秒 Toast 的形式出现。

## 有些信息不该做成浮层

很多反馈问题不是选错 Toast 或 Notification，而是根本不应该出现在浮层里。

| 情况 | 更合适的位置 |
| --- | --- |
| 单个字段错误 | 字段旁或表单内 |
| 上传、支付等必须修复的失败 | 原项目上，保留到解决 |
| 不可撤销操作 | 执行前就地确认或 Dialog |
| 只值得顺便看一眼的状态 | 徽标、圆点或原地状态变化 |

尤其不能先执行不可逆操作，再用 Toast 告知“已经删除”。确认必须发生在动作之前。

## 用几个问题完成判断

先看事件是谁造成的：

- 用户刚刚触发：优先 Toast；
- 其他人、系统或后台任务：优先 Notification；
- 用户早先在别处触发、现在才完成：可以进入 Notification 列表。

再看用户是否需要行动：

- 不需要行动：Status Toast；
- 只需一个快速后续动作：Action Toast；
- 需要做决定或回复：Notification；
- 必须修复：留在原处。

还要问：

- 操作能否撤销？能，就直接执行并给 Undo；不能，就在执行前确认。
- 内容有多少？几个字适合 Toast；一两句话、姓名、金额与位置更适合 Notification。
- 错过会不会有影响？不会，可以让 Toast 自动消失；会，就保留在 Notification 与收件箱里。
- 用户离开当前页面后任务是否还在运行？如果仍在运行，页内 Toast 已无法覆盖，需要浏览器或系统通知，并同步进入产品内通知列表。
- 同时出现多条怎么办？Toast 一次只显示一条；Notification 可以堆叠。

## Toast 的动作要像一个整体

在设计样式前，先保持反馈层级稳定。

Toast 默认可以放在内容顶部中央、顶栏下方，一次一个。它应该足够轻，但又能让图标、文案、操作和关闭按钮组成一个完整对象。

进入时，整块 Toast 一起下移、放大并清除模糊，不能让文字逐字出现。离开要更快，避免用户等它退场。

只有当结果已经完成时，才扫过一次高光；正在等待用户选择的 Undo Toast 不需要提前庆祝。

进度转结果时，旧文案向上模糊离开，新文案从下方进入，Toast 宽度与图标在原位过渡。重要的不是动画多复杂，而是用户能看出“同一个任务变成了结果”。

计时规则也要明确：

- Status Toast 约 3–5 秒，文案越长停留越久；
- Action Toast 至少约 5 秒；
- Progress Toast 在工作期间保留，完成后约 3 秒离开；
- 指针停在 Toast 上或焦点位于内部时，计时暂停。

## Notification 要像一叠可以展开的卡片

Notification 更适合放在页面右上角，跨页面保持一致。

默认堆叠时，最新一条在最前，后面几条只露出边缘，最多显示三层。新通知从上方落下并压到栈顶，原有卡片顺势后退，用户能看到“新的叠上来了”，而不是旧的突然被替换。

悬停或点击时，堆叠展开成真实高度的列表。展开后每张卡保留细边与轻阴影，避免阴影压到下一张。

删除时，卡片向右滑出并淡出，下面的卡片用稍慢一点的动画闭合空位。触屏没有悬停，应该点击展开，并允许滑动关闭。

铃铛显示待处理数量，页面标题也同步显示数字，后台标签页才能提示用户。需要做决定的安全、支付等通知，即使从屏幕清掉，也应该继续留在通知列表。

## 可访问性不能被浮层打断

Toast 不应抢焦点，可通过 `role="status"` 进行礼貌播报。需要用户注意的 Notification 只播报一次，也不能把焦点从当前任务移走。

两者的按钮都必须能通过键盘访问，Escape 关闭当前焦点所在的卡片。触摸设备保持同样的位置与层级，并提供滑动手势。

在 `prefers-reduced-motion: reduce` 下，保留状态变化与约 150ms 淡入淡出，取消位移、缩放和模糊。深色模式沿用相同的层级规则，高光要更弱。

## 先审查，再决定是否改样式

最有效的顺序不是先画一个新 Toast，而是先盘点产品里所有“告诉用户发生了什么”的入口：

- Toast 与 Snackbar；
- Alert、Banner 与页内错误；
- 通知列表、收件箱、活动面板；
- 徽标与数字；
- 浏览器通知或系统推送。

逐条记录触发者、内容、按钮、出现位置、停留时间，以及之后能否重新找到。

然后先输出一张表：位置、现在如何显示、应该是什么、原因、需要改什么。已经正确的保持不动；处于两种情况之间的，明确写出需要用户决定的问题。

只有分类和文案确认后，再决定是否重做 Toast、Notification 或两者的视觉。

## 检查清单

- Toast 是否只回应用户刚完成的动作；
- Notification 是否承接与当前操作无关、需要保留的消息；
- Status、Action、Progress 三种 Toast 是否没有混用；
- 可撤销操作是否直接执行并提供 Undo；
- 不可逆操作是否在执行前确认；
- 必须修复的失败是否留在原处，而不是短暂 Toast；
- 后台任务离开页面后是否仍能通过系统通知与站内列表找到；
- Toast 是否一次一个，Notification 是否正确堆叠；
- 计时、悬停暂停、进度转结果和 Undo 后状态是否成立；
- 键盘、读屏、触屏、深色模式与减少动态效果是否完整。

{% folding color:blue Toast 与 Notification 示例 Prompt %}
```text
Prompt

Review how my product tells people that something happened, and decide for each message whether it should be a toast, a notification, or neither. Then, if I want it, restyle the toasts and notifications along the lines below. This is about judgment first: diagnose and recommend, and change only what I approve.

This is a change to my product, not a demo. Work inside my code, on my stack, with my components, tokens, corner scale, fonts and copy style. Do not add a dependency, a new state library or a new visual pattern without asking. Every value below is a default to start from.

0. Read the product first
- Find every place that shows a message about an event: toasts and snackbars, alerts and banners, notification lists, inbox or activity panels, badges and counts, inline success and error text, and browser or push notifications.
- For each one, note: what triggers it (the person's own action, another person, the system, a background job), what it says, any buttons, where it appears, how long it stays, and whether it can be found again later.
- Find the components behind them and where they are mounted (one per page, or one for the whole app). Note how they announce themselves to screen readers.
- Tell me in a few lines what you found before going on.

1. What each one is for
- Toast: answers something the person just did, in the place they are working. It is short, it does not interrupt, and it goes away by itself. It comes in three kinds:
  a. Status: confirms a result, so the person does not have to go and check. An icon and a few words, no buttons. Example: "Link copied".
  b. Action: the action has already been done, and the toast holds the one step that may follow, usually Undo. One line and one button, plus a close. It stays long enough to use the button, with the time left shown.
  c. Progress: work that takes a moment. It shows that the work is under way, then turns into the result in the same place, with a button to see it. Example: "Uploading brand-guide.pdf" turns into "Uploaded to Files, Open".
- Notification: news the person did not cause just now, from other people or from the system: a mention, a reply, a payment, a deadline, a security alert, a finished report. It can carry more: a title, a few lines and up to two actions. It is shown on every page, stays until it is opened, handled or closed, and several can be shown at once. It is also kept somewhere the person can find it again (an inbox or a list behind a bell, with a count).
- Neither:
  - A form error or a problem with one field: show it next to the field.
  - A failure the person has to fix (an upload that failed, a payment that did not go through): keep it on the item, with a way to fix it, until it is fixed. A toast that disappears after a few seconds is not enough.
  - An action that cannot be undone: ask before doing it (a confirm next to the button, or a dialog for something with a large impact). A toast after the fact is too late.
  - Something only worth seeing when the person looks: a badge, a dot or a change of state in place, with no message at all.

2. Questions that settle a case
- Who caused it? The person, just now: toast. Someone else, the system, or the person a while ago in another place: notification.
- Does the person need to act? No: status toast. One quick step that may follow (Undo, View): action toast. A real decision or a reply: notification. Something that must be fixed: keep it on the item.
- Can the action be undone? Then do it at once and offer Undo in a toast instead of asking first. If it cannot be undone, confirm before, not after.
- How much is there to say? A few words: toast. A sentence or two, a name, an amount, a place: notification.
- Would it matter if the person missed it? No: toast. Yes: notification, kept until handled.
- Is the work still running when the person leaves? If it ends while they are still on the page, a toast is enough. If they have moved to another tab or app, a browser or system notification (with permission) is the only way to reach them; inside the product, it also goes into the notification list.
- Several at once? Toasts: one at a time; a new one replaces the old one, or waits. Notifications: they stack.

3. Report before changing anything
Give me a table first, and do not change code yet. One row per message:
- Where: the screen or component, and what triggers it.
- Now: how it is shown today, in a few words.
- Should be: status toast, action toast, progress toast, notification, or neither (and which).
- Why: one line, using the questions above.
- Change: what would change (kind, wording, buttons, how long it stays, where it is kept).
Mark the ones that are already right. Mark the ones that could go either way and say what decides between them, as a question for me. Then list anything missing: an action that should offer Undo, a failure that only shows a toast, a background job that never says it is done, news with no place to find it again.
Then ask me which rows to change and wait.

4. Optional: restyle the toast and the notifications
After the table, offer these as a separate choice, and wait for my answer:
A. Restyle the toast only.
B. Restyle the notifications only.
C. Both.
D. Neither; just fix the kinds and wording.
For each one I pick, show me a short before and after (values and motion), in my product's own colours and corners, and wait for my go-ahead before building.

4A. Toast
- Place: the top centre of the page, 12 under the top bar, over the content. One at a time.
- Shape: 40 tall, 16 corners (or the nearest step in my corner scale), a white surface with a soft top-to-bottom gradient (#ffffff to #f7f9fc), a 1px border rgba(214, 219, 227, 0.95), and a soft shadow (0 16px 36px rgba(17, 24, 39, 0.08), 0 3px 10px rgba(17, 24, 39, 0.05)). Inner shapes are concentric with it: the icon, 8 in, is 24 with 8 corners; a button or the close, 6 in, is 28 with 10 corners.
- Content: icon, then one line of 14/20 text, then the button and the close if there are any. The done icon is a check on a soft tile in my accent colour; work in progress is a ring; the time left to undo is a ring that empties, with the seconds in its centre. The button is accent-coloured text, with a tint only on hover. Keep the gaps tight: 8 between the icon and the text, the button and the close next to each other.
- Enter: in 500ms on cubic-bezier(0.25, 0.1, 0.25, 1), the whole toast comes down from 10px above, grows from 96% and clears from an 8px blur; it is fully opaque a little before the end. Text and controls move with it as one piece, not letter by letter.
- Leave: 220ms, ease-in: up 6px, blur 6px, fade out.
- Sheen: a light band crosses it once (900ms, ease-out) only when something is done: a status toast as it enters, a progress toast as it turns into its result, an Undo toast after Undo. An action toast that still waits for a choice enters without it.
- Change in place (progress to result, archived to restored): the old line (text, button and close together) blurs out and moves 5px up in 180ms; the new line blurs in from 5px below between 100 and 400ms; the toast takes its new width in 380ms on cubic-bezier(0.32, 0.72, 0, 1). Only the icon has a move of its own: the old one shrinks and blurs away while the new one turns in from -40 degrees and half size.
- After Undo: the change is reverted, and the toast says so ("Task restored") for about 1.5 seconds before it leaves.
- Timing: a status toast stays 3 to 5 seconds, longer for longer text; an action toast at least 5 seconds; a progress toast stays while the work runs, then 3 seconds. The timer pauses while the pointer is over the toast or focus is inside it.

4B. Notifications
- Place: the top right, 12 under the top bar, the same on every page, above the content. 344 wide.
- Card: 24 corners with 12 of padding, so the picture (32, a person's photo or the product's logo) and the buttons (32 tall, 12 corners) are concentric with it. A title (14/20, semibold) with the time on the right, up to three lines of 13/20 text, then up to two buttons on the bottom right, the main one last.
- A stack: the newest is in front. The older ones are cut to the front one's height and peek out 12 below it, at 95% and 90%, showing only their edge; at most three show.
- A new one arrives: it slides down onto the stack from 56px above in 560ms on cubic-bezier(0.32, 0.72, 0, 1), clearing from a light blur, while the others are pushed down and back a step. The one it covers keeps its content until the new one is on its way over it, so it reads as stacking, not replacing.
- Hover: the stack spreads into a list at the cards' own heights, 8 apart, in 380ms on the same curve. In the list each card keeps to a hairline and a light shadow, so no shadow falls on the card below; stacked, only the front card has the deep shadow.
- Close one, as on macOS: a small close button (24, 10 corners) appears over a card's top-left corner while the pointer is on that card. Handling a card with one of its buttons also removes it. A removed card slides 48px to the right and fades in 260ms, and the ones below close the gap in 400ms. "Clear all" sits under the last card while the list is spread out.
- Counts: the bell shows how many are waiting, and so does the page title, so a tab in the background shows it too. Notifications that need a decision (security, payments) stay in the list behind the bell even when they are cleared from the screen.

4C. For both
- Reduced motion: keep the change of state and a short fade (about 150ms); drop the movement, scaling and blur.
- Screen readers: toasts are announced politely (role="status"); a notification that needs attention is announced once as it arrives. Neither takes focus away from what the person is doing. Their buttons can be reached by keyboard, and Escape closes the one in focus.
- Touch: the same places, with swipe to dismiss; there is no hover, so the stack spreads on tap.
- Dark mode: the same rules on my dark surfaces; the sheen is fainter.

5. Build what I pick
- List the files you will touch and wait for my go-ahead.
- Change one thing at a time and keep what each action does. Then check:
  - Short and long text, a missing picture, many notifications at once, several toasts in a row.
  - Undo used, ignored and closed; a progress that fails; leaving the page while something is still running.
  - Phone and desktop layouts, light and dark, reduced motion, keyboard and screen reader.
  - Existing tests still pass.
- Web: CSS transitions or the Web Animations API for the toast; for the stack, measure each card's height and animate transform and height together. Sonner (React) has a similar stack and can be adapted, but ask before adding it. iOS, Android and Flutter: use the platform's own animation tools with the same values; for messages that reach people outside the app, use the system's notifications.
```
{% endfolding %}

## 质感来自可解释的细节

Toast 与 Notification 的选择，不是把消息放在顶部还是右上角。

问题在于：这件事是谁引起的、用户现在是否必须知道、错过会不会有损失、之后还能不能找到。反馈机制回答了这些问题，界面才会安静但不遗漏，明确却不打断。
