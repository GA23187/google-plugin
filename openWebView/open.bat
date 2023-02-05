@title 开启浏览器
@color 0a
@echo 5秒后打开浏览器
ping  127.0.0.1  -n 5
@echo 准备打开浏览器，10秒后关闭
@echo off
cd /d C:\Program Files (x86)\Microsoft\Edge\Application
start msedge.exe https://www.ygbks.com
@ping -n 10 127.0.0.1>nul
@echo 关闭浏览器
taskkill /F /IM msedge.exe
@timeout /t 10 /nobreak