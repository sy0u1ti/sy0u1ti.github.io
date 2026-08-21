---
abbrlink: ''
author: null
banner: null
breadcrumb: null
categories:
- - 站主的瞎话
comments: null
cover: null
date: '2024-10-06T20:13:45.885767+08:00'
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
- mac
- apple
title: macOS 装机与效率环境配置指南
topic: null
type: null
updated: '2024-10-06T20:40:13.418+08:00'
---
# 日常软件

## 前置工作

### 允许安装任意来源的 App

```bash
sudo spctl --master-disable
```

然后前往系统偏好设置👉安全性与隐私👉点击左下角的小锁

![Image](https://image.3001.net/images/20220123/16429464344952.png#center)

### 安装 Xcode Command Line Tools

工具依赖

```bash
xcode-select --install
```

## HomeBrew

### 安装

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

国内环境安装命令

```bash
/bin/bash -c "$(curl -fsSL https://gitee.com/ineo6/homebrew-install/raw/master/install.sh)"
```

❗注意

> 如果命令执行中卡在下面信息： （来源于[https://brew.idayer.com/guide/start/#part3](https://brew.idayer.com/guide/start/#part3)）
> ==> Tapping homebrew/core
> Cloning into ‘/usr/local/Homebrew/Library/Taps/homebrew/homebrew-core’…
> <code>Control + C</code> 中断脚本执行如下命令：

```bash
cd "$(brew --repo)/Library/Taps/"
mkdir homebrew && cd homebrew
git clone https://mirrors.ustc.edu.cn/homebrew-core.git
```

然后再执行

```bash
/bin/bash -c "$(curl -fsSL https://gitee.com/ineo6/homebrew-install/raw/master/install.sh)"
```

安装完成后根据提示，运行下面的命令

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(source /opt/homebrew/bin/brew shellenv)"
```

安装一下 cask 便于后面软件的安装

```bash
brew install cask
```

### 常用命令

更新Homebrew

```bash
brew update
```

搜索相关包

```bash
brew search keyword
```

卸载软件

```bash
brew uninstall keyword
```

查看已安装的软件

```bash
brew list
```

### 卸载Homebrew

官方脚本

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
```

国内脚本

```bash
/bin/bash -c "$(curl -fsSL https://gitee.com/ineo6/homebrew-install/raw/master/uninstall.sh)"
```

## 软件商店

* [appstorrent](https://appstorrent.ru) - 俄罗斯的网站
* [MacYY](https://www.macyy.cn) - 国人运营的良心网站
* [xmac.app](https://xmac.app/app?page=2) - 第一个网站的资源，便于搜索下载

## 防火墙

首先要安装的就是防火墙，Mac 自带的防火墙只能防御进入 Mac 的流量，但是遇到流氓软件向服务器上传我们的隐私数据就防御不了。同时也可以过滤广告哦。
我们可以选择两个软件，二选一即可

### Little Snitch（许可证一次收费）

[官网下载地址](https://www.obdev.at/products/littlesnitch/download.html)

![Image](https://cdn.ipfsscan.io/ipfs/QmYmH1EAKgWTY95Uo5wuosFtyEMFcw1ahkVXxviiWqPKQj?filename=monitor-screenshot@2x.png)

许可证可以在淘宝进行购买，按需购入

### LuLu（开源，免费）

LuLu 是一个开源的防火墙工具
安装也很简单

```bash
brew install --cask lulu
```

保持默认选项

![Image](https://objective-see.org/images/LL/configure.png)

有程序发起请求时，会跳出弹窗，我们只需要选择放行或者阻止即可，设置过一次或者配置好规则就可以一劳永逸
附上常见的阻止🚫规则 [blockyouxlist](https://ceadd.ca/blockyouxlist.txt)，勾选然后粘贴链接即可

![Image](https://preview.cloud.189.cn/image/imageAction?param=028C7CF9BF729D133EF05EBE8C46E685BB211BA56E80A271C2A4B23A2E78ADA3D81189E32757F92EC778E29916D7365FED77C78F1F135F14D88151BF9FB3A8E423BE76389E5093AEBAC473AEEFCF860079E97163EAB3DE8498D289F0E26D2D5B5CFB5EE2EF945EADD5E1B43EA98A3F57)

## 1Password

非常值得入手的密码管理工具，只需要记住一个密码就可以自动保存、保存填写网站、SSH 密钥、加密钱包等密码
淘宝购入年费会员也不贵，安全性也不错，全平台通用

```bash
brew install --cask 1password
```

[官网链接](https://1password.com/zh-cn)

## Raycast

Raycast 是一个启动器，可以高效打开文件、软件、网站并执行各种便捷操作，可以代替 Mac 自带的「焦点（Spotlight）」
同样 brew 安装

```bash
brew install --cask raycast
```

也可以官网下载 dmg 文件
[官网下载地址](https://www.raycast.com/)

### 教程

[goalonez(常用功能)](https://blog.goalonez.site/blog/Raycast%E6%8A%98%E8%85%BE%E4%B9%8B%E8%B7%AF%EF%BC%88%E5%B8%B8%E7%94%A8%E5%8A%9F%E8%83%BD%E7%AF%87%EF%BC%89.html)

### 插件

以下是一些推荐的插件
[1password](raycast://extensions/khasbilegt/1password?source=webstore)

[chatgpt](raycast://extensions/abielzulio/chatgpt?source=webstore)
Chatgpt 免费 API 申请

![Image](https://github-readme-stats.xaoxuu.com/api/pin/?username=chatanywhere&repo=GPT_API_free&&show_owner=true)

[Raycast-G4F (GPT4Free)](https://github.com/XInTheDark/raycast-g4f)
免费使用 GPT4，Llama-3 等等，无需 API 密钥

![Image](https://github-readme-stats.xaoxuu.com/api/pin/?username=XInTheDark&repo=raycast-g4f&&show_owner=true)

[Raycast 插件](raycast://extensions/thomas/visual-studio-code?source=webstore)
[Kill Process](raycast://extensions/rolandleth/kill-process?source=webstore)

## 🔋 Battery(AlDente Pro 免费平替)

一个开源的电池保护工具
AlDente Pro 免费平替🆓

![Image](https://github-readme-stats.xaoxuu.com/api/pin/?username=actuallymentor&repo=battery&&show_owner=true)

```bash
brew install --cask battery
```

使用方法
电池充到 80 停止

```bash
battery maintain 80
```

## PrettyClean

好用的 macOS 磁盘清理工具
[https://www.prettyclean.cc/zh](https://www.prettyclean.cc/zh)
[点击下载](https://www.prettyclean.cc/zh/download?t=auto)

## Keka

压缩解压工具

```bash
brew install --cask keka
```

[官网下载](https://d.keka.io/)


## IINA

视频播放器

```bash
brew install --cask iina
```

## Vidhub

可挂载阿里云盘、百度网盘、SMB、WebDAV 等资源，并支持直连 Emby、Jellyfin、Plex 媒体库。
可以播放 4K 视频，HDR 效果目前不如 `Infuse`。
免费🆓！还能生成精美的海报墙，要什么自行车🚲
[App Store 下载](https://apps.apple.com/cn/app/vidhub-%E9%AB%98%E6%B8%85%E5%BD%B1%E7%89%87%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%99%A8-%E7%9B%B4%E8%BF%9E%E9%98%BF%E9%87%8C%E4%BA%91%E7%9B%98-%E7%99%BE%E5%BA%A6%E7%BD%91%E7%9B%98/id1659622164)

## XPTV

美区软件，支持添加阿里云盘、夸克网盘，<psw>可以添加 tvbox 的源！</psw>，IPTV 源
[App Store 下载](https://apps.apple.com/us/app/xptv/id6459409368)

## Shottr

纯净的截屏工具
长截图，ocr，智能打码，贴图，取色等功能

```bash
brew install --cask shottr
```

[官网下载](https://shottr.cc/)

## ishot

国产多功能截屏工具
长截图，录音，录屏，ocr，贴图，取色等功能
[官方下载](https://www.better365.cn/ishot.html)

## QuickRecorder

多功能、轻量化、高性能的 macOS 屏幕录制工具

* 使用 SwiftUI 编写, 体积小巧轻量化. 软件大小仅 4MB 左右, 无任何累赘功能.
* 支持窗口录制, App 录制等模式; 支持窗口声音内录, 鼠标高亮, 隐藏桌面文件等功能.
* QuickRecorder 启动后直接显示主功能面板, 关闭后可以点击 Dock 栏图标再次呼出.

```bash
brew install lihaoyun6/tap/quickrecorder
```

## Bob or TTime

两款都是优秀的翻译软件，可以划词翻译和截图翻译
[Bob](https://bobtranslate.com/) [TTime](https://ttime.timerecord.cn/)
Bob 是老牌 mac 工具，目前在 App Store 可以下载，而 GitHub 版本已停止维护
可以下载免费的 bob 插件使用

![Image](https://github-readme-stats.xaoxuu.com/api/pin/?username=akl7777777&repo=bob-plugin-akl-deepl-free-translate&&show_owner=true)

TTime 是新晋的开源工具，可以自己配置 ocr 和翻译的 api，可以申请大厂的 api 接口，都有免费额度，足够个人使用了

## Ice

菜单栏管理工具
只需 `Command + 拖动菜单栏项目` 即可重新排列

```bash
brew install jordanbaird-ice
```

## Qspace

一款多窗口布局的文件管理工具
[官方下载](https://qspace.awehunt.com/zh-cn/index.html#editions) 免费版与专业版的区别

![Image](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAAaADAAQAAAABAAAAAQAAAADa6r/EAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII=)

## Rectangle

快捷键分屏

```bash
brew install --cask rectangle
```

## Obsidian

优秀的笔记工具
可以更改主题，安装各种插件
同步可以用 GitHub
[官网下载](https://obsidian.md/)

## KeyboardHolder

有些时候我们会遇到总是频繁切换中英文输入法，或者标点的场景
使用这款工具就可以记住场景，自动切换

```bash
brew install --cask keyboardholder
```

## Mac Mouse Fix

```bash
brew install mac-mouse-fix
```

## Motrix

开源的下载器，支持 HTTP, FTP, BitTorrent, Magnet 等

```bash
brew install --cask motrix
```

## PDF Expert

Mac 上非常优秀的 PDF 编辑、查看、管理工具
[官网](https://pdfexpert.com/)

## PDFGear

免费的 PDF 编辑、阅读工具
自带 AI 阅读 PDF，OCR 识别
[官网](https://www.pdfgear.com/pdfgear-for-mac/)

## Wechat 微信

[App Store 下载](https://apps.apple.com/cn/app/%E5%BE%AE%E4%BF%A1/id836500024?mt=12)
[官网下载](https://weixin.qq.com/cgi-bin/readtemplate?t=mac&lang=zh_CN)

## Telegram

```bash
brew install --cask telegram
```

## Discord

```bash
brew install --cask discord
```

## NetNewsWire

RSS 阅读器

```bash
brew install --cask netnewswire
```

## 鼠须管 Squirrel 输入法

Rime 输入法
开源，高度自定义

```bash
brew install --cask squirrel
```

### 配置

自动化配置脚本👉 [https://github.com/Mark24Code/rime-auto-deploy/tree/main](https://github.com/Mark24Code/rime-auto-deploy/tree/main)

1. 安装依赖
   ruby3

```bash
brew install ruby
```

2. 执行下面的代码

```bash
git clone --depth=1 https://github.com/Mark24Code/rime-auto-deploy.git --branch latest
cd rime-auto-deploy
./installer.rb
```

<br>
<br>
<br>
<br>
<br>

# 渗透工具

> 注意因为渗透测试考虑到安全性，工具配置在虚拟机中更加合适，所以本文只介绍少数工具

## 主机探测

```bash
brew install nmap
brew install arp-scan
```

## 抓包工具

### Burpsuite

首先 [官网下载](https://portswigger.net/burp/releases)
点开 dmg 文件安装，将注册 jar 将其放入到 BP Jar 包的同级目录下：
[注册 jar 下载](/assets/wiki/mac/BurpLoaderKeygen.jar)

```bash
cd /Applications/Burp\ Suite\ Professional.app/Contents/Resources/app && "/Applications/Burp Suite Professional.app/Contents/Resources/jre.bundle/Contents/Home/bin/java" "--add-opens=java.desktop/javax.swing=ALL-UNNAMED" "--add-opens=java.base/java.lang=ALL-UNNAMED" "--add-opens=java.base/jdk.internal.org.objectweb.asm=ALL-UNNAMED" "--add-opens=java.base/jdk.internal.org.objectweb.asm.tree=ALL-UNNAMED" "--add-opens=java.base/jdk.internal.org.objectweb.asm.Opcodes=ALL-UNNAMED" "-javaagent:BurpLoaderKeygen.jar"  "-jar" "/Applications/Burp Suite Professional.app/Contents/Resources/app/burpsuite_pro.jar"
```

显示激活窗口

另外打开一个终端

```bash
/Applications/Burp\ Suite\ Professional.app/Contents/Resources/jre.bundle/Contents/Home/bin/java -jar /Applications/Burp\ Suite\ Professional.app/Contents/Resources/app/BurpLoaderKeygen.jar
```

再运行下面的命令

```bash
echo "--add-opens=java.desktop/javax.swing=ALL-UNNAMED" >> /Applications/Burp\ Suite\ Professional.app/Contents/vmoptions.txt
echo "--add-opens=java.base/java.lang=ALL-UNNAMED" >> /Applications/Burp\ Suite\ Professional.app/Contents/vmoptions.txt
echo "--add-opens=java.base/jdk.internal.org.objectweb.asm=ALL-UNNAMED" >> /Applications/Burp\ Suite\ Professional.app/Contents/vmoptions.txt
echo "--add-opens=java.base/jdk.internal.org.objectweb.asm.tree=ALL-UNNAMED" >> /Applications/Burp\ Suite\ Professional.app/Contents/vmoptions.txt
echo "--add-opens=java.base/jdk.internal.org.objectweb.asm.Opcodes=ALL-UNNAMED" >> /Applications/Burp\ Suite\ Professional.app/Contents/vmoptions.txt
echo "-javaagent:BurpLoaderKeygen.jar" >> /Applications/Burp\ Suite\ Professional.app/Contents/vmoptions.txt
echo "-Xmx2048m" >> /Applications/Burp\ Suite\ Professional.app/Contents/vmoptions.txt
```

那么激活完成，可以在应用程序中直接打开

### Yakit

[Yakit 官网](https://yaklang.io/)
选择 macOS (Apple Sillion)


### Wireshark

网络数据包分析
[官网下载](https://www.wireshark.org/download.html)

## 承影

一款安全工具箱,集成了目录扫描、JWT、Swagger 测试、编/解码、轻量级 BurpSuite、杀软辅助功能
[Github 下载](https://github.com/yhy0/ChYing)

## SQL 注入

```bash
brew install sqlmap
```

## 文件分析

```bash
brew install binwalk
brew install exiftool
```

### Hex Fiend

小巧的 Hex 文件查看器，支持自定义高亮选中展示
[应用商店下载](https://apps.apple.com/cn/app/hex-fiend/id1342896380?mt=12)

## Shambles

次世代嵌入式逆向工程神器
智能扫描漏洞，固件对比，环境模拟
[官网](https://www.liansecurity.com/#/main/product/info?productId=2)

## Cutter

Cutter 是由 rizin 支持的免费开源逆向工程平台。

```bash
brew install --cask cutter
```

## 冰蝎

动态二进制加密网站（WebShell）管理客户端
[Github 下载](https://kgithub.com/rebeyond/Behinder)

## SiteSucker Pro

下载网站
[下载链接](https://appstorrent.ru/634-sitesucker.html)

## Metasploit

下载最新版本的安装包：[https://osx.metasploit.com/metasploitframework-latest.pkg](https://osx.metasploit.com/metasploitframework-latest.pkg)
双击点开安装
安装路径为/opt/metasploit-framework/bin
配置环境变量

```bash
echo 'export PATH="$PATH:/opt/metasploit-framework/bin/"' >> ~/.zshrc
```

重新打开终端

```bash
msfconsole
# 输入 y 确定初始化一个新的数据库
Would you like to use and setup a new database (recommended)? y
```

## Hashcat

密码破解神器

```bash
brew install hashcat
```

<br>
<br>
<br>
<br>
<br>

# 开发配置

## iTerm2

没有一个好看的终端怎么行 😂

```bash
brew install --cask iterm2
```

### 终端美化

Starship
安装

```bash
brew install starship
```

```bash
echo 'eval "$(starship init zsh)"' >> ~/.zshrc
```

配置文件

```bash
mkdir -p ~/.config
cd ~/.config
wget https://raw.githubusercontent.com/44maker/kaliinit/main/starship.toml
cd ~
```

卸载 Starship

1. 删除 shell 配置中 `~/.zshrc`
   用于初始化 Starship 的所有行
2. 删除 Starship

## Kitty

迅速、轻量化的终端

```bash
brew install --cask kitty
```

## Tmux

### 安装

终端复用神器

```bash
brew install tmux
```

教程
[Tmux 使用教程- 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2019/10/tmux.html)
[Tmux使用手册](http://louiszhai.github.io/2017/09/30/tmux/)

### 配置文件

```bash
nano ~/.tmux.conf
```

```plaintext
#tmux attach 如果无分离终端则新建
new-session
# split panes using | and -
bind | split-window -h
bind - split-window -v
unbind ' " '
unbind %
bind -r k select-pane -U # 绑定k为↑
bind -r j select-pane -D # 绑定j为↓
bind -r h select-pane -L # 绑定h为←
bind -r l select-pane -R # 绑定l为→
# reload config file (change file location to your the tmux.conf you want to use)
bind r source-file ~/.tmux.conf; display-message "Config reloaded.."
bind V source-file ~/.tmux/layout1
```

```bash
mkdir ~/.tmux
nano ~/.tmux/layout1
```

```plaintext
selectp -t 0 # select the first (0) pane
splitw -v -p 50 # split it into two halves
selectp -t 1 # select the new, second (1) pane
splitw -h -p 50 # split it into two halves
selectp -t 0 # go back to the first pane
```

完成后

```bash
source ~/.zshrc
```

之后使用的话，在终端输入 `tmux`
然后 Ctrl + B 再按  Shift + V
就可以分屏了

### 常用命令

最大化

```bash
Ctrl+b z
```

复制模式  q退出

```bash
Ctrl+b [
```

窗口列表

```bash
Ctrl+b w
```

切换窗口

```bash
Ctrl+b 0~9
```

会话列表

```bash
Ctrl+b s
```

挂起

```bash
Ctrl+b Ctrl+z
```

## Git

```bash
# 配置邮箱
git config --global user.email "xxxxx@xxx.com"

# 配置用户名
git config --global user.name "xxx"
```

## Python

在调试 Python 的时候可能遇到不同的环境问题，在这里先使用 pyenv 进行本地环境配置，后面如果做机器学习、深度学习等使用 conda 虚拟环境配置

```bash
brew install pyenv
```

配置 shell 环境

```bash
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
```

查看可安装的版本

```bash
pyenv install -l
```

安装与卸载

```bash
pyenv install 具体版本
pyenv uninstall 具体版本
```

查看已安装的版本

```bash
# 当前版本
pyenv version
# 查看已经安装的 Python 版本
pyenv versions
```

版本切换

```bash
# shell 会话设置 只影响当前的shell会话
pyenv shell <python版本>
# 取消 shell 会话的设置
pyenv shell --unset
# local 本地设置 只影响所在文件夹
pyenv local <python版本>
# global 全局设置 一般不建议改变全局设置
pyenv global <python版本>
```

> 注意：pyenv 的 global、local、shell 的优先级关系是：shell > local > global

## JAVA

[JDK8](https://www.oracle.com/java/technologies/downloads/#java8-mac)
[https://www.123pan.com/s/L9uDVv-QQu7H.html](https://www.123pan.com/s/L9uDVv-QQu7H.html)
[JDK11](https://www.oracle.com/java/technologies/downloads/#java11-mac)
[https://www.123pan.com/s/L9uDVv-9Qu7H.html](https://www.123pan.com/s/L9uDVv-9Qu7H.html)
[JDK17](https://download.oracle.com/java/17/latest/jdk-17_macos-aarch64_bin.dmg)

下载安装之后
再安装 jenv 便于切换环境

```bash
brew instal jenv
```

配置 zshrc 环境

```bash
echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(jenv init -)"' >> ~/.zshrc
```

安装完成后

```bash
# 查看当前的 Java 版本
jenv version
# 列出目前 jenv 所有可切换管理的版本
jenv versions

# 手动添加本地的 Java Home 路径
jenv add /Library/Java/JavaVirtualMachines/jdk-20.jdk/Contents/Home/
jenv add /Library/Java/JavaVirtualMachines/jdk1.8.0_291.jdk/Contents/Home/
jenv add /Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home/

# global 全局设置 一般不建议改变全局设置
jenv global <java 版本>

# shell 会话设置 只影响当前的shell会话
jenv shell <java 版本>
# 取消 shell 会话的设置
jenv shell --unset

# local 本地设置 只影响所在文件夹
jenv local <java 版本>
```

## Docker

```bash
brew install --cask docker
```

### OrbStack

OrbStack 是一种在 macOS 上运行 Docker 容器和 Linux 机器的快速、轻便且简单的方法。可以将其视为强大的 WSL 和 Docker Desktop 替代方案，全部集成在一个易于使用的应用程序中

```bash
brew install orbstack
```

Docker 切换 OrbStack

```bash
docker context use orbstack
```

在设置中可以进行换源

```json
{
    "ipv6": true,
    "registry-mirrors": [
        "http://hub-mirror.c.163.com",
        "https://registry.docker-cn.com",
        "https://mirror.baidubce.com",
        "https://kn77wnbv.mirror.aliyuncs.com",
        "https://0dj0t5fb.mirror.aliyuncs.com",
        "https://docker.nju.edu.cn",
        "https://kuamavit.mirror.aliyuncs.com",
        "https://y0qd3iq.mirror.aliyuncs.com",
        "https://docker.mirrors.ustc.edu.cn"
    ]
}
```

## Parallels Desktop

Mac 上性能最好的虚拟化工具

## UTM

UTM 是一个功能齐全的系统模拟器和虚拟机主机，适用于 iOS 和 macOS。它基于 QEMU。所以可以模拟 x86、ARM64 和 RISC-V。

```bash
brew install --cask utm
```

### Vulnhub

kali 攻击机上官网下载 iso 文件导入即可
[官网下载](https://www.kali.org/get-kali/#kali-installer-images)
然后到 vulnhub 查找自己想要练习的靶机，并下载 ova
[vulnhub](https://www.vulnhub.com/) [vulnhub 国内镜像](https://file.vulnhub.cn/)

```bash
cd Downloads
tar xvf xxx.ova
```

解压完成后安装一下 qemu

```bash
brew install qemu
```

转换成 qcow2 格式

```bash
qemu-img convert -O qcow2 xxx-disk001.vmdk xxx.qcow2
```

打开 UTM，选择左上角➕，新建
选择 `模拟` -> `其他` -> 勾选 `跳过ISO启动` -> 选择内存等 -> 继续 -> 填写名字 -> 保存
在主页面能看到新建的机器 -> 右击编辑 -> 选择 `QEMU` -> 取消勾选 `UEFI启动`
右击 `IDE Drive` 删除
再点击驱动器下方的新建 -> 导入 -> 选择刚刚生成的 qcow2 文件即可

### x86

在网上下载你想要模拟的 x86 系统的 iso 文件
打开 UTM -> 左上角➕ -> 选择模拟 -> linux(或者windows) -> 调整内存 -> 驱动器大小 -> 名字 -> 完成
之后就可以正常打开使用了

## VirtualBox

Virtualbox 是一个开源的虚拟机工具
可以在官网下载安装
[官网下载](https://www.virtualbox.org/wiki/Downloads)
Virtualbox 更加适用于打靶机的情况，比如 [hackmyvm 靶场](https://hackmyvm.eu/) 中大部分的靶机都是适配 Virtualbox 的

## Vmware Fusion

Vmware 是除了 PD 以外非常优秀的虚拟机工具，如果觉得 PD 收费太高，那么可以选择 Vmware
[官网下载](https://customerconnect.vmware.com/cn/downloads/info/slug/desktop_end_user_computing/vmware_fusion/13_0)

## Firefox

开源浏览器

```bash
brew install --cask firefox
```

## Arc

非常好看的浏览器，垂直标签栏能更好的保存网站分类

```bash
brew install --cask arc
```

> 注意：需要加入愿望单，获取名额

## Electerm

支持 ssh/sftp 的客户端
支持 GitHub，gitee 同步

```bash
brew install --cask electerm
```

## Insomnia

一个用于 GraphQL、REST、WebSockets、SSE 和 gRPC 的开源、跨平台 API 客户端

```bash
brew install --cask insomnia
```

## Vscode

```bash
brew install --cask visual-studio-code
```

[官网下载](https://code.visualstudio.com/)

## Miniconda

### 安装

下载安装包
[官方链接](https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-arm64.sh) [清华镜像](https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/Miniconda3-latest-MacOSX-arm64.sh)

```bash
curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-arm64.sh
sh Miniconda3-latest-MacOSX-arm64.sh
```

在安装的最后会出现

```bash
Do you wish the installer to initialize Miniconda3 by running conda init? [yes|no]
[yes] >>>
```

输入 yes
此时安装包会向当前 SHELL 的配置文件（~/.zshrc）中写入 conda 初始化语句
查看 conda 版本，检查是否安装成功

```bash
conda -V
```

### 配置

#### 取消激活 base 环境

因为我们之前已经配置了本地 python 环境，为了区分用途 [pyenv 管理的 python 用于 python 开发等，conda 用于机器学习、深度学习等]
以上是我个人的习惯，如果只有单方面需求，使用对应的 python 配置方法即可
安装 Miniconda 后，打开终端默认会激活 base 环境
所以通过命令取消掉

```bash
conda config --set auto_activate_base False
```

想要在终端激活 conda 中的虚拟环境的时候

```bash
conda activate base[虚拟环境名]
```

想要恢复默认激活 base 环境

```bash
conda config --set auto_activate_base True
```

#### conda-forge

conda-forge 是一个由社区维护的大量 Python 包的通道。 为 conda 增加 conda-forge 通道，可以安装更多的软件包

```bash
conda config --add channels conda-forge
```

设置通道优先级为 strict。当一个包同时位于 conda-forge 和 main 通道时，总是使用 conda-forge 提供的包

```bash
conda config --set channel_priority true
```

显示通道 URL

```bash
conda config --set show_channel_urls true
```

#### conda 换源

```bash
conda config --add default_channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
conda config --set 'custom_channels.conda-forge' https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
```

设置 conda 使用更快的 libmamab solver

```bash
conda install -n base conda-libmamba-solver
conda config --set solver libmamba
```

#### conda 虚拟环境

创建虚拟环境

```bash
conda create -n py38 python=3.8
```

激活虚拟环境

```bash
conda activate py38
```

查看已创建的虚拟环境

```bash
conda env list
```

退出当前环境

```bash
deactivate 环境名字
```

删除环境

```bash
conda remove -n 环境名字 --all
```

删除环境中的某个包

```bash
conda remove -n 环境名字 包名
```

## TensorFlow

### 安装

```bash
conda install -c apple tensorflow-deps
pip install tensorflow-macos
pip install tensorflow-metal
```

### 测试

```bash
conda activate py38
python
import tensorflow as tf
print("tf version",tf.__version__)
print("tf gpu",tf.test.is_gpu_available())
```

## Pytorch

### 安装

Anaconda

```bash
conda install pytorch torchvision torchaudio -c pytorch-nightly
```

pip

```bash
pip3 install --pre torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/nightly/cpu
```

### 测试

```python
import torch
if torch.backends.mps.is_available():
    mps_device = torch.device("mps")
    x = torch.ones(1, device=mps_device)
    print (x)
else:
    print ("MPS device not found.")
```

The output should show:

```plaintext
tensor([1.], device='mps:0')
```

安装一些常用的库

```bash
pip install pandas matplotlib glob2 tqdm opencv-python scipy scikit-learn mlx
```

## Adobe 全家桶

[https://www.yuque.com/yihulaojiu-gsfg9/zz2qv5/vixkf6](https://www.yuque.com/yihulaojiu-gsfg9/zz2qv5/vixkf6)

## MATLAB

[官方文档](https://www.mathworks.com/support/requirements/apple-silicon.html)
安装 Amazon Corretto 8

> 对于 Apple silicon Mac 上的 MATLAB，MathWorks 仅支持 Amazon Corretto 8 附带的 Java 8 JRE。
> [下载 Amazon Corretto 8](https://corretto.aws/downloads/latest/amazon-corretto-8-aarch64-macos-jdk.pkg)
> [官网下载链接🔗](https://www.mathworks.com/downloads/web_downloads/)

## Pinokio

在 AI 蓬勃发展的阶段，有许多 AI 应用出现，但配置的过程对于很多人来说比较复杂
`Pinokio` 就可以一键安装 LobeChat，Stable Diffusion web UI 等等
[下载链接](https://docs.pinokio.computer/download/applemac.html)


## LM Studio

[下载链接](https://lmstudio.ai/)

## Ollama

[下载链接](https://www.ollama.com/download/mac)

<br>
<br>
<br>
<br>
<br>

# 常见问题

## xxx.app 已损坏，无法打开，你应该将它移到废纸篓/打不开 xxx，因为它来自身份不明的开发者解决方法

### 方法1 开启任何来源

1. 先打开 系统偏好设置 -> 安全与隐私 -> 通用 选项卡，检查是否已经启用了 任何来源 选项。
2. 如果没有这个选项，复制以下面的命令：

```bash
sudo spctl --master-disable
```

3. 重新安装文件

### 方法2 应用签名

安装 Command Line Tools 工具
打开终端工具输入如下命令：

```bash
xcode-select --install
```

打开终端工具输入并执行如下命令对应用签名：

```bash
sudo codesign --force --deep --sign - (应用路径)
```

应用路径：打开访达（Finder），点击左侧导航栏的 应用程序，找到相关应用，将它拖进终端命令- 的后面，然后按下回车即可，注意最后一个 - 后面有一个空格。
正常情况下只有一行提示，即成功：
`/文件位置 : replacing existing signature`

如遇如下错误：
`/文件位置 : replacing existing signature /文件位置 : resource fork,Finder information,or similar detritus not allowed`
先在终端执行：

```bash
xattr -cr /文件位置（直接将应用拖进去即可）
```

然后再次执行如下指令即可：

```bash
codesign --force --deep --sign - /文件位置（直接将应用拖进去即可）
```

### 绕过公证

打开终端，输入以下命令：

```bash
sudo xattr -rd com.apple.quarantine /Applications/xxxxxx.app
```

将上面的 xxxxxx.app 换成 App 名称，比如 Sketch.app
`sudo xattr -rd com.apple.quarantine /Applications/Sketch.app`
然后按键盘的回车键（return），输入密码，再按回车键，完成。

