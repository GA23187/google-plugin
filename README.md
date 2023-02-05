# google-plugin

> 注意目前chrome插件最新版本是3 以下学习记录是以2来的

## 前言

增强浏览器功能，轻松实现属于自己的“定制版”浏览器，等等。

Chrome插件提供了很多实用API供我们使用，包括但不限于：

- 书签控制；
- 下载控制；
- 窗口控制；
- 标签控制；
- 网络请求控制，各类事件监听；
- 自定义原生菜单；
- 完善的通信机制；
- 等等；

> 涉及permissions字段的更新都需要移除插件才会生效，其他页面上的改动好像开启关闭插件就可以生效了。

## 获取cookie

```json
{
  "permissions": [
  	"tabs",
    "cookies",
    "http://*/*", 
    "https://*/*"
  ]
}
```

获取当前页面url，利用tabs

```
document.addEventListener('DOMContentLoaded', ()=> {
  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    function(tabs){
      const url = new URL(tabs[0].url)
      chrome.cookies.getAll({
        domain: url.host
      }, (cookies) => {
        console.log(cookie)
      })
    }
  );
})
```

参考：[Chrome小插件开发 - 获取网站cookies](https://juejin.cn/post/6871679202995896327)

[chrome-extension-cookie 一键搞定 cookie 跨域访问](https://www.jianshu.com/p/1b9639506728)





## 其他

### 定时打开网页 并点击网页特定按钮

#### 定时打开

- window下任务计划

  - https://blog.csdn.net/AddisonDing/article/details/111429414

- bat脚本

  ```bash
  @title 开启浏览器Chrome
  @color 0a
  ping  127.0.0.1  -n 5
  @echo 准备打开浏览器
  @echo off
  cd /d C:\Users\Administrator\AppData\Local\Google\Chrome\Application
  start chrome.exe https://www.ygbks.com
  @ping -n 150 127.0.0.1>nul
  @echo 关闭浏览器
  taskkill /F /IM chrome.exe
  @timeout /t 10 /nobreak
  ```

  - http://www.ygbks.com/1824.html
  - https://blog.csdn.net/single_0910/article/details/120759796

#### 点击网页特定按钮

> 跨域网页无法操作 理由很简单 在A页面操作B页面的数据会有很大的安全漏洞

- chrome脚本
  - http://blog.haoji.me/chrome-plugin-develop.html
  - https://blog.csdn.net/foryouslgme/article/details/104362876
- 自动化测试

## 参考

- [【干货】Chrome插件(扩展)开发全攻略 ](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html)