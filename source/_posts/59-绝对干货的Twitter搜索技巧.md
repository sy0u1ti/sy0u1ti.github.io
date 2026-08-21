---
categories:
- - 站主的瞎话
cover: null
date: '2023-08-26T15:55:31.256047+08:00'
tags:
- twitter
- X
- x
- 技巧
- 干货
title: Twitter (X) 搜索技巧与高级语法指南
updated: 2023-8-27T17:26:54.290+8:0
---
### 搜索词

搜索词，即我们想要获得什么样的推文。这个搜索词可以是一个词语，也可以是一个条件。Twitter搜索中支持的搜索词类型如下：


| **搜索词**                        | **搜索结果**                                                 |
| --------------------------------- | ------------------------------------------------------------ |
| watching now                      | 同时包含“watching”和“now”的推文（默认搜索模式）          |
| “happy hour”                    | 包含完整的短语”happy hour”的推文                           |
| love OR hate                      | 包含”love”或”hate”，或同时包含两个词的推文               |
| beer -root                        | 包含”beer”，但不包含”root”的推文                         |
| #haiku                            | 包含Twitter话题”haiku”的推文                               |
| from:shangy1yi                    | 由推特账户“shangy1yi”发布的推文（用于抓取指定用户的推文）  |
| list:NASA/astronauts-in-space-now | 由NASA列表astronauts-in-space-now中的Twitter账户发布的推文   |
| to:shangy1yi                      | 回复Twitter账户”shangy1yi”的推文                           |
| @shangy1yi                        | 提到Twitter账户”shangy1yi”的推文(即@指定Twitter账户的推文) |

### 内容筛选

内容筛选是指在搜索词的基础上，我们可以依据Twitter推文的内容进行筛选。常用的筛选条件如下：


| **搜索词**                   | **搜索结果**                                         |
| ---------------------------- | ---------------------------------------------------- |
| politics filter:safe         | 包含”puppy”，且过滤被可能包含潜在敏感信息的推文    |
| puppy filter:media           | 包含”puppy”，且包含图片或视频                      |
| puppy -filter:retweets       | 包含“puppy”，且不包含转推（用于过滤转推推文）      |
| puppy filter:native\\\_video | 包含”puppy”，且包含一个上传的视频                  |
| puppy filter:periscope       | 包含”puppy”，且包含一个可展示为视频的链接          |
| puppy filter:images          | 包含”puppy”，且包含一个图片                        |
| puppy filter:links           | 包含”puppy”，且包含一个链接                        |
| puppy url:amazon             | 包含”puppy”，且包含一个内容包括”amazon”的Url链接 |

### 时间筛选

除了依据推文内容进行筛选外，我们也可以依据推文的发布时间进行筛选。依据时间筛选的标准如下：


| **Operator**         | **Finds Tweets…**                                      |
| -------------------- | ------------------------------------------------------- |
| puppy since:2020-6-4 | 包含”puppy”且发布时间晚于2020.06.04(包含2020.06.04)   |
| puppy until:2020-6-4 | 包含”puppy”且发布时间早于2020.06.04(不包含2020.06.04) |

内容筛选的条件和时间筛选的条件可以任意叠加，例如我们如果想要获取Twitter账户”NASA”在2020年5月所有发布的不是转推的推文，用如下搜索语句即可：

<pre></ul><code class="has-numbering hljs css">from:NASA -filter:retweets since:2020-5-1 until:2020-6-1</code></pre>

### 附 Twitter 开发者文档中的列表


| **Operator**                      | **Finds Tweets…**                                                                              |
| --------------------------------- | ----------------------------------------------------------------------------------------------- |
| watching now                      | containing both “watching” and “now”. This is the default operator.                         |
| “happy hour”                    | containing the exact phrase “happy hour”.                                                     |
| love OR hate                      | containing either “love” or “hate” (or both).                                               |
| beer -root                        | containing “beer” but not “root”.                                                           |
| #haiku                            | containing the hashtag “haiku”.                                                               |
| from:interior                     | sent from Twitter account “interior”.                                                         |
| list:NASA/astronauts-in-space-now | sent from a Twitter account in the NASA list astronauts-in-space-now                            |
| to:NASA                           | a Tweet authored in reply to Twitter account “NASA”.                                          |
| @NASA                             | mentioning Twitter account “NASA”.                                                            |
| politics filter:safe              | containing “politics” with Tweets marked as potentially sensitive removed.                    |
| puppy filter:media                | containing “puppy” and an image or video.                                                     |
| puppy -filter:retweets            | containing “puppy”, filtering out retweets                                                    |
| puppy filter:native\\\_video      | containing “puppy” and an uploaded video, Amplify video, Periscope, or Vine.                  |
| puppy filter:periscope            | containing “puppy” and a Periscope video URL.                                                 |
| puppy filter:vine                 | containing “puppy” and a Vine.                                                                |
| puppy filter:images               | containing “puppy” and links identified as photos, including third parties such as Instagram. |
| puppy filter:twimg                | containing “puppy” and a pic.twitter.com link representing one or more photos.                |
| hilarious filter:links            | containing “hilarious” and linking to URL.                                                    |
| puppy url:amazon                  | containing “puppy” and a URL with the word “amazon” anywhere within it.                     |
| superhero since:2015-12-21        | containing “superhero” and sent since date “2015-12-21” (year-month-day).                   |
| puppy until:2015-12-21            | containing “puppy” and sent before the date “2015-12-21”.                                   |
| movie -scary ?                    | containing “movie”, but not “scary”, and with a positive attitude.                          |
| flight ?                          | containing “flight” and with a negative attitude.                                             |
| traffic ?                         | containing “traffic” and asking a question.                                                   |

开发者文档地址：[https://developer.twitter.com/en/docs/twitter-api/v1/tweets/search/overview](https://xding.top/go/aHR0cHM6Ly9kZXZlbG9wZXIudHdpdHRlci5jb20vZW4vZG9jcy90d2l0dGVyLWFwaS92MS90d2VldHMvc2VhcmNoL292ZXJ2aWV3)
原文链接：[https://blog.csdn.net/Changxing\_J/article/details/106611387](https://xding.top/go/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0NoYW5neGluZ19KL2FydGljbGUvZGV0YWlscy8xMDY2MTEzODc=)
