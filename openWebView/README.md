## 定时打开网页 并点击网页特定按钮

### 定时打开

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

### 点击网页特定按钮

> 跨域网页无法操作 理由很简单 在A页面操作B页面的数据会有很大的安全漏洞

- chrome脚本
  - http://blog.haoji.me/chrome-plugin-develop.html
  - https://blog.csdn.net/foryouslgme/article/details/104362876
- 自动化测试