---
abbrlink: ''
author: null
banner: null
breadcrumb: null
categories:
- - 站主的瞎话
comments: null
cover: null
date: '2024-10-07T00:19:53.853336+08:00'
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
- cloudflare
- 反代
title: 利用 Cloudflare Origin Rules 实现自定义域名回源指定端口
topic: null
type: null
updated: '2024-10-07T00:26:23.754+08:00'
---
转载自 [`https://link.syouiti.com/cf-origin-rules`](https://link.syouiti.com/cf-origin-rules)
<mark color="green">归档</mark>

通过添加Cloudflare的Origin Rules回源规则，可以将源服务器上的某个端口服务交由Cloudflare所绑定的自定义域名的CDN所反代，实现指定端口转发。

这里使用docker在源服务器上部署了Vocechat服务，而docker对外访问端口是3019。在没有绑定域名的情况下，默认只能使用ip+监听端口的方式来访问服务。

![](https://hyrikuma-akari.top/images/cf-origin-rules/docker-port.png)

要想通过访问自定域的方式来访问源端口服务，可以利用Cloudflare的Origin Rules来实现。

首先准备一个已经解析到Cloudflare DNS上的域名，进入到域名的管理界面，点击DNS管理，选择**添加记录**，设定域名前缀（不想设置可以直接填入@，这里填入的是chat），**将源服务器的ip地址正确填入到内容栏中**，开启CDN代理，然后保存。

![](https://hyrikuma-akari.top/images/cf-origin-rules/dns-setting.png)

此时创建的域名[chat.hyrikuma-akari.top ](https://chat.hyrikuma-akari.top/)指向的是默认的web端口80或443。要想指定的docker-proxy端口3019和这个域名绑定，就需要添加Origin Rules回源规则。

在左侧边栏点击规则，选择Origin Rules，并点击创建规则，进入规则配置界面。自定规则名称，下面选择**自定义筛选表达式**。

![](https://hyrikuma-akari.top/images/cf-origin-rules/rule1.png)

然后定义配置表达式，字段选择**主机名**，令其等于**刚才创建的域名值**，在目标端口设置上选择**重写到**，并填入指定的端口（这里是3019），然后保存部署。

![](https://hyrikuma-akari.top/images/cf-origin-rules/rule2.png)

此时再次访问域名[chat.hyrikuma-akari.top ](https://chat.hyrikuma-akari.top/)，可以看到已经成功解析到对应的源服务器端口服务上了。

