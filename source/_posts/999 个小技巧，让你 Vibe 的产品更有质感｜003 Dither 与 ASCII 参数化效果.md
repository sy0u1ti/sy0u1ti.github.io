---
title: '003 Dither 与 ASCII 参数化效果'
date: '2026-10-28T03:42:00+08:00'
updated: '2026-10-28T03:42:00+08:00'
categories:
- - 科技&产品
tags:
- 视觉设计
- 图像处理
- Canvas
- 前端开发
- UI
description: '用同一套参数系统，把图片或视频变成可调的 ASCII 字符画或有序 Dither 纹理，并附完整示例 Prompt。'
collection:
  profile: topic
  id: vibe-product-quality
---

ASCII 和 Dither 都能把普通图片或视频变成更有设计感的视觉素材，但它们不是简单套一层滤镜。

两者共享同一套参数语言：遮罩、色调、采样强度、大小和间距；差别在于如何把画面重新编码。一个用字符表示明暗，另一个用有序矩阵压缩色阶。只有把这些参数映射到明确的视觉结果，效果才会稳定、可调，也才像设计系统的一部分。

## ASCII：用字符重建明暗

ASCII 效果把画面切成网格，再根据每个格子的亮度替换成不同密度的字符。字符从空到满依次为：

```text
 .,:;-=+xX08S#&@
```

四个参数各自负责一件事：

- **大小**：字号，决定单个字符覆盖多少画面。
- **间距**：网格步长，决定字符排列的疏密。
- **采样强度**：明暗对比，以及字符的亮度和不透明度。
- **采样色调**：选择用深色字符表现暗部，还是用浅色字符表现亮部。

采样时先把素材适配到渲染盒子中，缩放到长边约 480px 的采样画布，再取约 12,000 个均匀样本。用亮度的第 8 百分位和第 92 百分位建立归一化区间，避免极端高光或阴影把整体对比拉平。

之后把归一化亮度映射到字符密度，并用一条可调色调曲线控制黑白场。字符颜色取自原图，再在 HSV 空间中适当提亮和增加饱和度，让字符不只是灰白色噪声，而能保留素材本身的色彩气质。

推荐参数：

- 遮罩：90
- 采样色调：暗部
- 采样强度：100
- 大小：37
- 间距：0

## Dither：用 Bayer 矩阵压缩色阶

Dither 效果把画面切成像素块，再用 4×4 Bayer 矩阵作为阈值，对每个颜色通道做有序量化。

矩阵如下：

```text
0   8   2  10
12  4  14   6
3  11   1   9
15  7  13   5
```

每个像素的阈值由它在矩阵中的位置决定，量化结果再写回像素块。最后把低分辨率画布放大绘制，并关闭图像平滑，保留清晰的颗粒边界。

这里的参数含义和 ASCII 不同：

- **大小**：像素块尺寸，通常在 2–9px。
- **间距**：Bayer 图案的缩放尺度，决定纹理颗粒的重复节奏。
- **采样强度**：控制颜色级数和量化替换程度；强度越高，颜色越少，颗粒感越重。
- **颜色**：在量化前把亮度映射到某个调色板，统一画面的色相。

推荐参数：

- 遮罩：88
- 采样强度：100
- 大小：15
- 间距：0

## 遮罩与调色板

两种效果都需要一层垂直遮罩。遮罩在顶部、42% 和底部设置渐变停点，让画面从视觉上后退，效果更像纹理，而不是覆盖在内容上的噪点。

浅色页面使用白色遮罩，深色页面使用黑色遮罩，基础透明度分别为 54/20/38% 和 44/20/50%。遮罩值不是简单线性叠加，而是通过一条轻微弯曲的曲线调整，避免中间区域过灰或过亮。

图层顺序也不一样：

- ASCII：重新着色后的画面 → 遮罩 → 字符。
- Dither：抖动后的画面 → 遮罩。

颜色可以从原图开始，也可以使用五种四段式调色板：

- `meadow`：`#2B361F`、`#677D45`、`#AEBA78`、`#E5E1BD`
- `blue`：`#192A4D`、`#326AC5`、`#A2C2F1`、`#EDF3FC`
- `amber`：`#3C200F`、`#A74C15`、`#EF9A46`、`#F7E7CA`
- `lavender`：`#292144`、`#6552AB`、`#B3A5E4`、`#F0ECFB`
- `mono`：`#151515`、`#575757`、`#A6A6A6`、`#ECECEC`

切换滤镜或调色板时，从上一帧开始做约 150ms 的交叉淡化，避免画面突然跳变。

## 控制面板与渲染

效果层和参数面板共享同一个设置对象：

```text
{ filter: 'ascii' | 'dither', mask, palette, inkTone, strength, size, spacing }
```

两种滤镜各自保存参数，来回切换时不会丢失之前的调整。面板放在素材旁边，有空间时放在下方，否则放在侧面，但不能遮住素材本身。面板宽度约 420px，每行高 46px，滑块、数值框、色板和推荐值重置操作都保持实时响应。

渲染时，在素材上覆盖一张同尺寸、同圆角的画布。设备像素比上限为 1.6 倍，画布尺寸约为 2048×2048。图片在参数变化后防抖 72ms 重绘；视频在播放且位于屏幕内时，通过 `requestVideoFrameCallback` 逐帧重绘，不支持时回退到 `requestAnimationFrame`。

这类效果真正提升质感的地方，不是“把图变旧”，而是让素材在保持原始尺寸、圆角和层叠关系的前提下，获得一套可控的视觉语言。

{% folding color:blue ASCII / Dither 示例 Prompt %}
```text
Add an ASCII / ordered-dither effect to one specific image or video in this
project, with a live control panel next to it. Use the asset and the place I
name (an image, a video, or a file path or URL, and the page or section it sits
in); ask me if I have not named them. Apply the effect to that asset only, in
place: keep its size, position, rounded corners and anything layered on top of
it. If the project already has an image or canvas effect pipeline, or slider,
segmented-control and panel components, build on them; otherwise create a
reusable EffectLayer and EffectPanel.

Settings, one object shared by the layer and the panel:
{ filter: 'ascii' | 'dither', mask, palette, inkTone, strength, size, spacing }
Keep separate values per filter, so switching filters brings back that filter's
own settings.
What each control does in each filter, its range, and the recommended value
(ASCII / Dither):

Mask effect, 0-100 (90 / 88): a vertical veil over the picture so the effect
reads as texture rather than noise. Same in both filters.

Color, Original or one of five palettes (Original): gradient-maps the asset's
luminance into one color family before filtering.
Sample tones, Shadows | Highlights (Shadows; ASCII only, hidden for Dither):
which end of the tonal range becomes dense characters.
Sampling strength, 0-100 (100 / 100). ASCII: contrast of the tone curve and how
bright and opaque the characters are. Dither: how few levels each color channel
keeps (8 at 0, 2 at 100) and how fully the quantized color replaces the
original.
Size, 0-100 (37 / 15). ASCII: font size, 7-24px. Dither: pixel block, 2-9px.
Spacing, 0-100 (0 / 0). ASCII: grid step, 8-24px across and 9-26px down, never
tighter than the glyphs. Dither: scale of the Bayer pattern, 1-4 blocks per
matrix cell.
Helpers used throughout:
range(v, a, b) = a + (b - a) * v / 100
luminance L = (0.299 R + 0.587 G + 0.114 B) / 255

s = strength / 100
"The box" is the asset's rendered size on the page.
Sampling:
Cover-fit the asset into the box and draw it into a small sampling canvas
(about 480px on the long side), then read it with getImageData. A sample is the
pixel under a point in the box, composited over white.
With a palette, recolor that canvas first: map each pixel's L through a
256-entry lookup built from the palette's four stops.

Per image or video frame, take about 12,000 evenly spaced samples: low = 8th
percentile of L, high = 92nd percentile.
Shadows means dark ink, Highlights light ink.
ASCII:
Characters, from empty to full: " .,:;-=+xX08S#&@" (starts with two spaces).
Font: round(range(size, 7, 24))px monospace (22 instead of 24 when the box is
under 720px wide), centered in each cell.

Grid: x step = max(range(spacing, 8, 24), widest glyph * 1.08); line height =
max(range(spacing, 9, 26), height of "@" * 1.12, font * 1.04). The first cell
sits half a step in from the edge.
Tone of a cell: raw = dark ink ? 1 - L : L; normalized = dark ink ?
(high - L) / (high - low) : (L - low) / (high - low), clamped 0-1 (use raw alone
when high - low < 0.025); mix = 0.72 + 0.14 s; t = raw (1 - mix) + normalized
mix. Then a tone curve: black = 0.22 s, white = 1 - 0.08 s, lev =
clamp((t - black) / (white - black), 0, 1), tone = lev (1 - s) +
smoothstep(lev) s.
Skip cells with tone <= 0.02. Character = chars[round(tone * 16)]; skip spaces.
Ink: the sampled color lifted in HSV: value += (1 - value) * (0.24 + 0.18 s +
0.24 tone); saturation *= 1 + 0.16 + 0.2 s (clamped). Alpha =
clamp((0.12 + 0.7 tone) (0.72 + 0.28 s), 0.06, 0.94).
Dither (ordered, Bayer 4x4):
pixel size = max(2, round(range(size, 2, 9))) (7 instead of 9 under 720px);
pattern scale = max(1, round(range(spacing, 1, 4))); levels = max(2,
round(range(strength, 8, 2))) per channel; blend = range(strength, 0.32, 1).
Matrix [[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]]; threshold =
(m + 0.5) / 16, indexed by floor(x / pattern scale), floor(y / pattern scale).

For each block sample its center, push saturation away from luma by
1 + 0.06 + 0.18 s, then per channel: scaled = c / 255 * (levels - 1);
q = floor(scaled) + (fraction > threshold ? 1 : 0);
out = c + (q / (levels - 1) * 255 - c) * blend.
Write the blocks into a canvas of box / pixel size and draw it scaled up with
image smoothing off.
Mask and layering:
The mask is a vertical gradient with stops at the top, 42% and the bottom.
Base opacities: on a light page white 54/20/38%, on a dark page black
44/20/50%. For a mask value v: stop = v <= 50 ? base * (v / 50)^1.08 :
base + (100 - base) * ((v - 50) / 50)^1.08.
ASCII: draw the (recolored) picture, the mask, then the characters. Dither:
draw the dithered picture, then the mask on top.

Changing filter or palette cross-fades from the last frame over 150ms.
Palettes (four stops at 0, 0.4, 0.74, 1):
meadow: #2B361F, #677D45, #AEBA78, #E5E1BD
blue: #192A4D, #326AC5, #A2C2F1, #EDF3FC
amber: #3C200F, #A74C15, #EF9A46, #F7E7CA
lavender: #292144, #6552AB, #B3A5E4, #F0ECFB
mono: #151515, #575757, #A6A6A6, #ECECEC

Rendering:
Draw into a canvas laid over the asset with the same size and corner radius,
at devicePixelRatio capped at 1.6x and about 2048 x 2048.
Image: redraw when a setting changes (debounced 72ms).
Video: redraw on every new frame (requestVideoFrameCallback, falling back to
requestAnimationFrame) while it plays and is on screen; keep the video element
underneath as the source.
Control panel:

Place it next to the asset, below it when there is room, otherwise beside it,
never covering it. About 420px wide, centered on the asset.
Rows, in order: Mask effect, Filter (two tabs: ASCII | Dither), Color (round
swatches), Sample tones (ASCII only), Sampling strength, Size, Spacing (shown
with %).
Each row 46px tall: a 136px label column, then the control. Slider: a 22px
track with 8px radius and a filled part, a 9x30 rounded-rectangle thumb (3px
radius), a number box with the value centered, and a snap mark at 50. Swatches:
22px circles, each filled with its palette's two middle stops at 135deg
(Original: a tiny crop of the asset); the selected one gets a ring with a small
gap.
Every change applies live while dragging. Add a "Reset to recommended" action
that restores the values above for the current filter.

Follow the page's light or dark theme and the project's tokens.
```
{% endfolding %}

## 质感来自可解释的细节

ASCII 和 Dither 都说明了一件事：视觉特效的质感不来自堆叠更多参数，而来自每个参数都有明确、可预测的结果。

当效果层只作用于指定素材，保留原有布局和层叠关系，再让遮罩、色调、采样和渲染节奏共同工作，它就会从“滤镜”变成界面语言的一部分。
