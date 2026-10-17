---
categories:
- - 站主的瞎话
cover: null
date: '2024-10-07T00:19:53.853336+08:00'
description: '无需在源站折腾 Nginx 反代或安装 Cloudflare Tunnel 守护进程，巧用 Cloudflare 边缘层 Origin Rules（回源规则）将 443 标准 HTTPS 流量直接重写回源至服务器上的任意自定义端口。'
tags:
- Cloudflare
- 网络
- 反向代理
- 教程
title: 免配 Nginx 与隧道：巧用 Cloudflare Origin Rules 将域名反向代理至源站非标端口
updated: '2024-10-07T00:26:23.754+08:00'
---
在 VPS 上使用 Docker 部署自托管服务（例如 VoceChat、Vaultwarden、Uptime Kuma 等）时，容器映射到宿主机的往往是一个自定义的高位端口（例如 `3019`）。

在传统架构下，为了让外部能通过标准的 `https://yourdomain.com` 域名直接访问，通常有两种做法：
1. 在服务器上安装配置 Nginx / Caddy 进行本地反向代理与证书申请；
2. 在宿主机后台常驻安装 `cloudflared` 隧道守护进程。

其实，如果你的域名已经托管在 Cloudflare 上并开启了“小黄云”CDN 代理，完全可以利用 Cloudflare 官方提供的免费功能 **Origin Rules（回源规则）**，在边缘节点层直接实现端口重写——**访客端使用标准的 443 端口连接，Cloudflare 在回源时自动打到你服务器的指定端口**。零依赖、零维护。

---

## 场景演示与实操

假设我们在源站通过 Docker 跑了一个 VoceChat 聊天服务，对外暴露的宿主机端口为 `3019`。此时若未做任何反代配置，外部只能通过暴露真实的 `http://IP:3019` 访问，既不安全也缺少 SSL 证书加密。

![](https://hyrikuma-akari.top/images/cf-origin-rules/docker-port.png)

### 步骤 1：添加开启 CDN 代理的 DNS 解析

1. 登录 Cloudflare 控制台，进入目标域名仪表盘。
2. 进入 `DNS -> 记录`，点击 **添加记录**。
3. 类型选择 **A 记录**，名称根据需要填写二级域名前缀（例如 `chat`），IPv4 地址填入你的源站公网 IP。
4. **关键点**：务必确认**代理状态（Proxy status）保持为“已代理（橙色小黄云）”**，点击保存。

![](https://hyrikuma-akari.top/images/cf-origin-rules/dns-setting.png)

此时，域名 `chat.yourdomain.com` 已经经过 Cloudflare 边缘节点，但默认情况下，边缘节点向源站回源只会请求标准的 80 或 443 端口。接下来我们需要告诉 Cloudflare：“遇到这个子域名，请帮我改道去 3019 端口拿数据”。

### 步骤 2：创建 Origin Rules（回源规则）

1. 在 Cloudflare 域名左侧导航栏中，依次点击 `规则（Rules） -> 回源规则（Origin Rules）`。
2. 点击 **创建规则（Create rule）**。
3. 输入一个易记的规则名称（例如 `Rewrite-Port-3019`）。
4. 在匹配条件（When incoming requests match...）中，选择**自定义筛选表达式**：
   - **字段（Field）**：选择 `主机名（Hostname）`
   - **运算符（Operator）**：选择 `等于（equals）`
   - **值（Value）**：填入刚才创建的完整二级域名（例如 `chat.yourdomain.com`）

![](https://hyrikuma-akari.top/images/cf-origin-rules/rule1.png)

5. 向下滚动到**目标端口（Destination Port）**设置区域：
   - 勾选 **重写到...（Rewrite to...）**
   - 填入你服务器上实际监听的业务端口（例如 `3019`）
6. 点击右下角 **部署（Deploy）** 生效。

![](https://hyrikuma-akari.top/images/cf-origin-rules/rule2.png)

---

## 验证与注意事项

规则部署后通常几十秒内即可在全球节点生效。此时直接在浏览器中打开 `https://chat.yourdomain.com`（无需追加 `:3019`），就能看到完整的服务页面，且自动拥有 Cloudflare 颁发的受信任 SSL/TLS 证书。

**注意事项**：
- 源站如果启用了云厂商的安全组或本地防火墙（UFW/iptables），需确保目标端口允许来自 Cloudflare 官方 IP 范围的访问。
- 若源站业务原本是纯 HTTP 服务，请在 Cloudflare 的 `SSL/TLS` 概览中将加密模式设置为 **灵活（Flexible）** 或 **完全（Full）**，避免产生重定向循环。

> 参考归档源：[`https://link.syouiti.com/cf-origin-rules`](https://link.syouiti.com/cf-origin-rules)

