---
categories:
- - 站主的瞎话
cover: https://cdn.jsdelivr.net/gh/sy0u1ti/picx-images-hosting@master/image.6bh0plu8ni.png
date: '2024-09-07T13:46:59.734481+08:00'
description: '利用 Caddy 2 与 forwardproxy 扩展模块构建高性能 HTTPS 正向代理：全自动申请维护 Let’s Encrypt TLS 证书，搭配伪装站点防主动探测，并附带 SwitchyOmega、小火箭及 QX 客户端配置教程。'
tags:
- Caddy
- 代理
- HTTPS
- Linux
- 教程
title: 极简与安全：使用 Caddy 2 与 forwardproxy 插件快速搭建 HTTPS 正向代理
updated: '2024-09-07T20:08:42.809+08:00'
---
HTTPS 正向代理（HTTP/2 over TLS）是一种兼具极高伪装性与低开销的代理方案。通过将代理流量伪装在标准的 TLS 握手与 HTTP/2 多路复用隧道中，外部探测只会看到合法的 Web 握手。

而 **Caddy 2** 拥有业内最省心的**全自动 SSL/TLS 证书生命周期管理**，配合官方社区维护的 `forwardproxy` 模块，能省去手动申请和维护证书的所有繁琐环节。

---

## 前置准备：解析域名 DNS 记录

在域名解析控制台添加一条 A 记录，将二级域名解析到你的 VPS 公网 IP（不要开启 CDN 代理，保持直连解析）：

| 主机记录（子域名） | 记录类型 | TTL | 记录值 |
| :--- | :--- | :--- | :--- |
| `proxy` | A | 3600 | 你的 VPS IPv4 地址 |
| `proxy` | AAAA（可选） | 3600 | 你的 VPS IPv6 地址 |

---

## 服务端部署：编译带插件的 Caddy 2

由于 `forwardproxy` 不是 Caddy 的官方内置模块，我们需要使用官方编译构建工具 **xcaddy** 打包编译。

### 1. 配置 Go 语言编译环境

在 VPS 终端执行以下命令，下载并解压官方 Go 二进制包：

```bash
wget https://go.dev/dl/go1.23.0.linux-amd64.tar.gz -O - | tar -xz -C /usr/local/
```

配置环境变量（可写入 `~/.profile` 或 `~/.bashrc`）：

```bash
cat << 'EOF' >> ~/.profile
export GOROOT=/usr/local/go
export GOBIN=$GOROOT/bin
export PATH=$PATH:/usr/local/go/bin:$GOBIN
EOF

source ~/.profile
```

### 2. 使用 xcaddy 编译集成 forwardproxy

下载安装官方构建工具 `xcaddy`：

```bash
wget https://github.com/caddyserver/xcaddy/releases/download/v0.4.2/xcaddy_0.4.2_linux_amd64.tar.gz -O - | tar -xz -C /usr/bin/
```

一键构建嵌入 `forwardproxy` 扩展模块的 Caddy 二进制文件：

```bash
xcaddy build master --with github.com/caddyserver/forwardproxy@caddy2

# 将编译出的 caddy 可执行文件移动到系统路径
mv caddy /usr/bin/caddy

# 验证模块是否加载成功（列表中应出现 http.handlers.forward_proxy）
caddy list-modules | grep forward_proxy
```

---

## 编写 Caddyfile 配置文件

创建 Caddy 配置主目录与 Caddyfile：

```bash
mkdir -p /etc/caddy
```

创建配置文件 `/etc/caddy/https.caddyfile`：

```text
:443, proxy.yourdomain.com {
    route {
        forward_proxy {
            basic_auth your_username your_strong_password
            hide_ip
            hide_via
        }
        # 遇到未通过代理认证的常规请求，回退显示静态网页，完美防主动探测
        file_server
    }
}
```

> **注意**：
> 1. 将 `proxy.yourdomain.com` 替换为你的真实解析域名。
> 2. 将 `your_username` 与 `your_strong_password` 替换为你的强密码。
> 3. 确保护理服务器的 80 和 443 端口未被 Nginx 或 Apache 占用，因为 Caddy 首次启动时需要借助 80/443 端口完成 ACME 证书挑战。

---

## 注册 Systemd 系统守护进程

为了让 Caddy 随系统开机自启并具备崩溃自动恢复能力，创建守护进程配置：

```bash
cat << 'EOF' > /etc/systemd/system/caddy.service
[Unit]
Description=Caddy HTTP/2 Reverse & Forward Proxy
Documentation=https://caddyserver.com/docs/
After=network.target network-online.target
Requires=network-online.target

[Service]
User=root
ExecStart=/usr/bin/caddy run --environ --config /etc/caddy/https.caddyfile
ExecReload=/usr/bin/caddy reload --config /etc/caddy/https.caddyfile --force
TimeoutStopSec=5s
LimitNOFILE=1048576
PrivateTmp=true
ProtectSystem=full
AmbientCapabilities=CAP_NET_ADMIN CAP_NET_BIND_SERVICE
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF
```

加载配置并启动服务：

```bash
systemctl daemon-reload
systemctl enable --now caddy

# 查看运行状态
systemctl status caddy
```

看到绿色 `active (running)` 即表示服务端已部署就绪，证书已自动颁发完毕。

---

## 客户端连接配置

### 1. 电脑端浏览器（Zero-Client 方案）

使用 Chrome / Edge 配合 **SwitchyOmega**（或 ZeroOmega）插件，无需在本地运行任何代理客户端核心：

1. 新建情景模式，代理协议选择 **HTTPS**。
2. **代理服务器**填入你的域名，**端口**填写 `443`。
3. 点击右侧的“锁”图标，填入刚才设置的账户名和密码。

[![](https://hostalk.net/posts/gost_https_proxy/gost1.png)](https://hostalk.net/posts/gost_https_proxy/gost1.png)

如需分流，可在自动切换模式中引入社区规则列表（如 gfwlist）：

[![](https://hostalk.net/posts/gost_https_proxy/gost2.png)](https://hostalk.net/posts/gost_https_proxy/gost2.png)

### 2. 移动端：Shadowrocket（小火箭）

添加节点类型选择 **HTTPS**：
- **服务器**：`proxy.yourdomain.com`
- **端口**：`443`
- **标志 / 认证**：填写设置的用户名和密码

[![](https://hostalk.net/posts/gost_https_proxy/gost3.jpg)](https://hostalk.net/posts/gost_https_proxy/gost3.jpg)

### 3. 移动端：Quantumult X

在 Quantumult X 配置文件中的 `[server_local]` 区段追加一条配置：

```ini
http=proxy.yourdomain.com:443, username=你的账号, password=你的密码, over-tls=true, tls-verification=true, tls-host=proxy.yourdomain.com, fast-open=false, udp-relay=false, tls13=true, tag=Caddy2-HTTPS
```
