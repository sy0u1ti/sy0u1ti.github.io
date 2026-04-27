---
abbrlink: ''
author: null
banner: null
breadcrumb: null
categories:
- - 站主的瞎话
comments: null
cover: https://cdn.jsdelivr.net/gh/sy0u1ti/picx-images-hosting@master/image.6bh0plu8ni.png
date: '2024-09-07T13:46:59.734481+08:00'
description: null
h1: null
indexing: null
katex: null
leftbar: null
mathjax: null
mermaid: null
poster:
  caption: null
  color: null
  headline: null
  topic: null
references: null
rightbar: null
sticky: null
tags:
- proxy
- https
- caddy
title: Caddy2搭建HTTPS正向代理
topic: null
type: null
updated: '2024-09-07T20:08:42.809+08:00'
---
使用Caddy v2打入forwardproxy插件快速搭建HTTPS正向代理，毕竟Caddy自动请求SSL证书，能够省下许多不必要的折腾。

### 添加域名DNS记录

添加域名DNS记录，如果没有v6IP的话，就填一个v4IP的A记录，如下：

| Name (prefix) | Type | TTL |         Target         |
| :-----------: | :--: | :--: | :---------------------: |
|              |  A  | 3600 |   这里填写vps上的v4IP   |
|              | AAAA | 3600 | vps上的v6IP，没有可不填 |

上面完成后，就开始服务端的配置了。

### 服务端编译Caddy2

为什么要编译caddy2，因为要打入非标准插件forwardproxy才能实现https正向代理，如下，先要配置go环境。

#### 配置Go

下载go并解压到`/usr/local`路径下：

`wget https://go.dev/dl/go1.23.0.linux-amd64.tar.gz -O - | tar -xz -C /usr/local/`

设置go环境变量，也可以写入到profile中

`vi ~/.profile` 添加下面内容：

```
export PATH=$PATH:/usr/local/go/bin
export PATH=$PATH:$HOME/.cargo/bin
export GOROOT=/usr/local/go
export GOBIN=$GOROOT/bin
export PATH=$PATH:$GOBIN

```

保存后，`source ~/.profile`

#### 下载Xcaddy

项目地址：[https://github.com/caddyserver/xcaddy](https://github.com/caddyserver/xcaddy)

`wget https://github.com/caddyserver/xcaddy/releases/download/v0.4.2/xcaddy_0.4.2_linux_amd64.tar.gz -O - | tar -xz -C /usr/bin/`

运行xcaddy并打入forwardproxy@caddy2插件

项目地址：[https://github.com/caddyserver/forwardproxy](https://github.com/caddyserver/forwardproxy)

```
xcaddy build master \
    --with github.com/caddyserver/forwardproxy@caddy2

```

编译完成后caddy二进制文件会在root目录下，俺们可以移到`/usr/bin/`下运行：

`mv caddy /usr/bin`

可以用下面命令查看forwardproxy插件有没有加入成功：

`caddy list-modules`

### 配置caddyfile文件

上面安装好caddy2后，现在就来配置caddyfile文件，caddy v2的配置文件改成json后，有点复杂，不过可以沿用caddy v1的caddyfile写法：

新建一个caddy文件夹，存放caddyfile文件

`mkdir -p /etc/caddy`

`vi /etc/caddy/https.caddyfile`

编写https.caddyfile文件，添加内容如下：

```
:443, proxy.xxxx.com
route {
	forward_proxy {
		basic_auth user1 0NtCL2JPJBgddPMmlPcJ  #用户名和密码
		hide_ip  #隐藏客户端IP
		hide_via
	}
	file_server
}

```

上面需要修改的地方是自己的域名，添加用户名和密码就可以了。注意删除掉上面注释

如果要把上面配置文件生成caddy v2标准的json文件可用下面命令生成：

`caddy adapt --config /etc/caddy/https.caddyfile`

检查80端口有没有被其它服务占用，因为caddy需要用80/443端口申请证书，否则会启动失败。下面命令检查端口占用情况：

`netstat -lntp`

上面配置、检查完就可以启动caddy了，启动命令如下：

`caddy run -c /etc/caddy/https.caddyfile`

如果启动后，出现申请证书不成功的情况，一般是因为域名已经申请过证书导致的，建议DNS解析页面新建一个子域名，重新配置、启动申请证书。

启动后会发现，caddy一直在前台运行，很不方便，这个时候俺们就需要注册systemctl服务，用systemctl来启动caddy。

### 注册systemd服务

新建`caddy.service`文件，命令：

`vi /etc/systemd/system/caddy.service`

添加如下内容

```
[Unit]
Description=Caddy
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

[Install]
WantedBy=multi-user.target

```

重载systemctl服务 `systemctl daemon-reload`

到这也就可以启动caddy了，启动命令

`systemctl start caddy` #启动

`systemctl restart caddy` #重启

`systemctl status caddy` #查看状态

`systemctl stop caddy` #停止

`systemctl enable caddy` #添加开机自启动

服务端到此也就部署完成了，下面来折腾客户端。https正向代理，不必多讲，安全、快捷，电脑端不用另装客户端，移动端大多APP都支持http/https代理。

### 客户端配置

电脑端浏览器安装SwitchyOmega插件，新建一个代理情景模式，代理协议填写HTTPS，代理服务器填写你的域名，端口填写你使用的端口，没有另外设置的话就填443，最后点击右边小锁，填写你的用户名和密码，就可以使用了，如果需要分流的话，可以另建立一个自动切换模式。

[![](https://hostalk.net/posts/gost_https_proxy/gost1.png)](https://hostalk.net/posts/gost_https_proxy/gost1.png)

在SwitchyOmega插件上设置代理自动分流模式，另新建一个自动切换模式，设置如下图：

[![](https://hostalk.net/posts/gost_https_proxy/gost2.png)](https://hostalk.net/posts/gost_https_proxy/gost2.png)

AutoProxy：[https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt](https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt)

移动端，以小火箭和Quantumult X为例，小火箭，选择https代理，服务器填写你的域名，其它看图：

[![](https://hostalk.net/posts/gost_https_proxy/gost3.jpg)](https://hostalk.net/posts/gost_https_proxy/gost3.jpg)

Quantumult X 配置文件/编辑/server\_local字头下填写：

`http=你的域名:443, username=用户名, password=密码, over-tls=true, tls-verification=true, tls-host=你的域名, fast-open=false, udp-relay=false, tls13=false, tag=caddy2`
