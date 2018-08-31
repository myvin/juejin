# 掘金小程序

掘金第三方版--非掘金官方小程序

# 声明

***这并不是掘金官方小程序（貌似没有搜到掘金 `APP` 对应的官方小程序），完全为第三者开发者开发，仅用于学习交流，禁止用于其他用途。若要使用官方正版，可访问掘金 [官方网站](https://juejin.im/)，或下载掘金官方 APP，或访问掘金官方其他途径。***

***该小程序所有 `API` 均来自掘金官方 `web` 网站和官方 `Android` 版 `APP`（以 `web` 为主），`UI` 是~~照抄~~参照的掘金官方 `Android` 版 `APP（ver 5.4.3）`。部分静态资源（`icon`、图片等）直接从掘金官方 `apk` 里拷出来的。***

***该小程序代码已开源，[点击可查看源码](https://github.com/myvin/juejin)，可随意 star。也可以先扫描下方的小程序码直接体验。***


![](https://user-gold-cdn.xitu.io/2018/8/14/16538953d48291ef?w=344&h=344&f=jpeg&s=67848)

# 利益相关

无


# 具体实现

前段时间写了一个简单的小程序 [QuietWeather](https://github.com/myvin/quietweather)，[源码在这里](https://github.com/myvin/quietweather)，具体实现相关可查看这篇文章：[两天撸一个天气应用微信小程序](https://juejin.im/post/5b39bbcc5188252ce018c745)。但是这个 [掘金小程序](https://github.com/myvin/juejin) 和 [QuietWeather](https://github.com/myvin/quietweather) 完全不是一个数量级的，说完具体实现，天都黑了，这里直接上效果图，感兴趣的可以 [查看源码](https://github.com/myvin/juejin) 。实际体验可扫描👆上面的小程序码。

# 效果图

>  对应页面可打开掘金官方 `APP` 对比

> `PC` 开发者工具录制，会有些卡顿

<img src='https://user-gold-cdn.xitu.io/2018/8/17/1654665c893411a1?w=375&h=667&f=gif&s=1571950'><img src='https://user-gold-cdn.xitu.io/2018/8/17/1654668f178b1e6c?w=375&h=667&f=gif&s=1902000'><img src='https://user-gold-cdn.xitu.io/2018/8/17/165466a23b637491?w=375&h=667&f=gif&s=1328318'><img src='https://user-gold-cdn.xitu.io/2018/8/17/165466afde516b27?w=375&h=667&f=gif&s=2003104'><img src='https://user-gold-cdn.xitu.io/2018/8/17/16546b3482680c2d?w=375&h=667&f=gif&s=428130'><img src='https://user-gold-cdn.xitu.io/2018/8/17/16546b38638cd558?w=375&h=667&f=gif&s=427959'><img src='https://user-gold-cdn.xitu.io/2018/8/17/16546caa90108b33?w=375&h=667&f=gif&s=3329762'><img src='https://user-gold-cdn.xitu.io/2018/8/17/165466ef8f0f0f3e?w=375&h=667&f=gif&s=131121'>

> 文章数据入口调整了，也保留了动画，请酌情忽略 `gif` 卡顿

<img src='https://user-gold-cdn.xitu.io/2018/8/17/165467078dc95a86?w=375&h=667&f=gif&s=33983'><img src='https://user-gold-cdn.xitu.io/2018/8/17/165467baad411893?w=375&h=667&f=gif&s=909792'><img src='https://user-gold-cdn.xitu.io/2018/8/17/16546bd4c1ef6b8e?w=375&h=667&f=gif&s=3563749'><img src='https://user-gold-cdn.xitu.io/2018/8/17/165467bddb5161ab?w=375&h=667&f=gif&s=1733393'><img src='https://user-gold-cdn.xitu.io/2018/8/17/165467c042b7fbb4?w=375&h=667&f=gif&s=171333'><img src='https://user-gold-cdn.xitu.io/2018/8/17/165467c318b6a087?w=375&h=668&f=gif&s=34910'><img src='https://user-gold-cdn.xitu.io/2018/8/17/165467faf44ed0bd?w=375&h=667&f=gif&s=39546'><img src='https://user-gold-cdn.xitu.io/2018/8/17/1654687295d78859?w=375&h=667&f=gif&s=12671'>

# 完成度

`APP` 里面的东西实在是不少，包括页面和交互，要完全~~照抄~~实现确实需要一些时间和精力，`UI` 之类的都是简单测量+肉眼调试实现的，下面列出页面和交互的完成度，这里应该只是列出了绝大部分（还是上面那句话，`APP` 里面的东西实在是不少），未列出、未实现的后续会根据时间、精力来实现。

实际完成度请以代码为主（线上小程序也会持续更新）。

## 页面完成度

- [x] 启动页
- [x] 登录、未登录跳转逻辑和页面数据刷新逻辑等
- [x] HOME、搜索、沸点、小册 TAB 涉及到的上拉、下拉刷新
- [x] POST、ENTRY（文章类型不同） 详情页
- [ ] HOME TAB
  - [x] 首页
    - [x] 热门推荐
    - [x] 下部列表
  - [ ] 标签展示相关
- [ ] 搜索 TAB
  - [x] 顶部轮播
  - [x] 热门文章
  - [ ] 搜索功能相关
  - [ ] 本周最热
  - [ ] 收藏集
    - [ ] ...
  - [ ] 活动
    - [ ] ...
- [ ] 沸点 TAB
  - [ ] 推荐
    - [x] 顶部热门沸点
    - [x] 沸点列表
    - [x] 沸点详情
  - [ ] 话题
  - [ ] 动态
  - [ ] 发布沸点
- [ ] 小册 TAB
  - [x] 小册列表
  - [x] 小册详情
- [ ] 我的 TAB
  - [ ] 个人主页
    - [x] 文章数据
    - [ ] 编辑
    - [ ] 关注、被关注列表
    - [x] 动态页
    - [x] 沸点页
    - [x] 原创文章页
    - [x] 收藏集
      - [ ] 收藏集详情页
    - [x] 喜欢的文章
    - [x] 关注的标签
      - [ ] 标签详情页
  - [x] 我喜欢的
  - [x] 收藏集
  - [ ] 已购小册
  - [x] 赞过的沸点
  - [x] 阅读过的文章
  - [x] 标签管理
    - [x] 已关注标签
    - [x] 所有标签
      - [x] 推荐标签
      - [x] 所有标签
  - [ ] 夜间模式
  - [x] 意见反馈（和官方 APP 有差异，这里是个简单的关于页）
  - [ ] 设置
    - [ ] ...
- [x] 登录页
- [ ] 注册页
- [ ] 修改密码页
- [x] 其他完成部分...
- [ ] 未完待续部分...

### 交互完成度
评论、留言、关注、添加到收藏集、喜欢、发表沸点等暂时均没有实现，因为 APP 里面的东西实在是不少......

- [ ] 评论
- [ ] 留言
- [ ] 关注
- [ ] 喜欢
- [ ] 未完待续部分...

# 说明

* 1、话说掘金的 `API` 域名（二级）真是多啊，小程序后台域名白名单最多只能配 `20` 个，现在已经占了 `16` 个了，感觉要完整~~抄完~~实现掘金 `APP` 版小程序，配额不够啊。不行的话，就只能搭个 `server` 代理了；
* 2、个别接口只有 `APP` 用到了，请求字段需要按照 `web` 的略作调整；个别接口也要设置对应的 `header`；
* 3、文章详情页返回的是整片文章的 `html` 格式的 `content`，这里使用的是开源的 [wxParse](https://github.com/icindy/wxParse) 进行富文本解析；
* 4、由于小程序的限制，第三方的 `url` 不能在 `webview` 中打开，所以文章里面的外链能点开算我输；
* 5、开发时，个别细节需要稍微注意，比如：沸点 `tab` 页，如果已经滑到了顶部，`onShow` 获取新数据，否则，不刷新；未登录时，首页 `APP` 调用的 API 是  `get_recommended_entry`，~~就是懒~~为了方便小程序里仍然使用  `get_entry_by_timeline`；其他的不一一赘述，详情可 [查看源码](https://github.com/myvin/juejin)；
* 6、由于~~账号权限等问题~~有些 `API` 需要天时地利人和，部分 `API` 返回的数据格式没有拿到，所以对应的页面也没有写，比如：系统消息页面（最近一直没有系统消息）等；
* 7、部分数据可能未完全覆盖，比如：用户消息这块，目前列举出的 `category` 有 `collection`、`comment`、`follow`、`comment-like`、`pin-like`、`pin-comment`，可能还会有其他消息类型，遇到了会一一补上；还有动态页，也是同样的问题；可能还有其他没有完全覆盖的数据；
* 8、点击某些文章进入详情页会提示 `illegal token`，亦或文章没有正常显示出来，应该是请求参数需要略作调整，或者文章类型需要判断。类似这样的小问题，后续会调整补充；
* 9、小程序（非小游戏）在于一个 **小** 字，应该是一个应用的浓缩精华版，而不应该是一个内容丰富多彩的 `APP` 的 `100%` 的复制版，这样会显得比较臃肿，此处应该有 `but`，该小程序仅仅是出于学习交流的目的，所以这个问题不在我们的考虑范围内；
* ~~10、登录现在只能手机号登录，邮箱登录给忘记了，回头一并加上；~~
* 11、我也是有人生梦想的人；

## 请喝咖啡
如果我的项目对你有帮助，可以请我喝杯咖啡噢~

### 支付宝

> 省事的可以先扫码领红包，然后扫支付宝将红包支付给我（商家）~

<img src="https://raw.githubusercontent.com/myvin/miniprogram/master/9181893579988_.pic_hd.jpg" width="300" /> <img src="https://raw.githubusercontent.com/myvin/miniprogram/master/9191893579989_.pic.jpg" width="300" />

### 微信

<img src="https://raw.githubusercontent.com/myvin/miniprogram/master/9201893579990_.pic_hd.jpg" width="300" />


> 转载请注明出处

*********
