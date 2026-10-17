---
categories:
- - 站主的瞎话
cover: null
date: '2024-11-16T19:11:56.592158+08:00'
description: '针对 Mac 昂贵的内置固态硬盘容量，介绍如何通过软链接（Symbolic Link）或 OLLAMA_MODELS 环境变量，将动辄数十 GB 的开源大模型无缝重定向存储到外置移动固态硬盘（SSD）中运行。'
tags:
- AI
- Ollama
- macOS
- 本地部署
- 存储管理
title: 解救 Mac 存储：如何把 Ollama 本地模型无缝迁移并运行在外置移动硬盘
updated: '2024-11-24T16:30:33.335+08:00'
---
众所周知，Mac 的内置存储空间堪比“黄金”。随着 Llama 3、Qwen 2.5、DeepSeek 等大参数量开源模型的普及，随便拉取几个 14B 或 32B 的 GGUF 权重，几十上百 GB 的磁盘空间瞬间就会被吃光。

Ollama 默认会将所有下载的模型存放在用户主目录下的隐藏文件夹中：`~/.ollama/models`。为了彻底释放内置硬盘压力，我们可以借助 **符号链接（软链接，Symbolic Link）**，将数据仓库无损重定向到雷电/USB 4 移动固态硬盘上。

![Ollama 模型存放示意](https://cdn.jsdelivr.net/gh/sy0u1ti/picx-images-hosting@master/image.491atwtfvd.webp)

---

## 操作步骤：使用符号链接无缝重定向

### 步骤 1：完全退出 Ollama 进程

在迁移现有文件前，请确保 Ollama 没有在后台加载模型：
- 在顶部菜单栏找到 Ollama 图标，点击 **Quit Ollama**。
- 或者在终端中执行：`pkill -f ollama`。

### 步骤 2：迁移现有模型到外置硬盘

假设你的外置移动硬盘挂载名称为 `ExternalSSD`（可在访达或终端 `/Volumes` 下查看）：

```bash
# 1. 在外置硬盘上新建存放目录
mkdir -p /Volumes/ExternalSSD/ollama_models

# 2. 将原目录中的模型权重迁移过去（如果原本已有下载模型）
if [ -d ~/.ollama/models ]; then
    cp -R ~/.ollama/models/* /Volumes/ExternalSSD/ollama_models/
    # 确认迁移完成后备份并重命名原目录
    mv ~/.ollama/models ~/.ollama/models.bak
fi
```

### 步骤 3：创建全局符号链接

执行软链接创建指令：

```bash
ln -s /Volumes/ExternalSSD/ollama_models ~/.ollama/models
```

检查链接是否创建成功：

```bash
ls -la ~/.ollama/models
# 如果显示 ~/.ollama/models -> /Volumes/ExternalSSD/ollama_models 即表示成功
```

### 步骤 4：验证与清理

重新启动 Ollama 客户端：
1. 终端运行 `ollama list`，确认之前拉取的模型列表依然完好显示。
2. 运行 `ollama run qwen2.5:7b` 测试对话与推理吞吐，确认外置硬盘读写正常。
3. 确认一切无误后，即可安全删除之前的本地备份释放宝贵的 Mac 内置空间：
   ```bash
   rm -rf ~/.ollama/models.bak
   ```

---

## 常见注意事项

- **未挂载外置盘时的行为**：如果拔掉外置硬盘后启动了 Ollama，终端会提示找不到目录或创建空白目录，重新插上硬盘即可恢复。
- **传输速率建议**：大模型权重对顺序读取性能要求较高，建议使用支持 NVMe 协议的移动硬盘盒或雷电硬盘（读取速度 > 1000 MB/s），以避免首次加载模型出现卡顿。
