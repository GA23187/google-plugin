@title ���������
@color 0a
@echo 5���������
ping  127.0.0.1  -n 5
@echo ׼�����������10���ر�
@echo off
cd /d C:\Program Files (x86)\Microsoft\Edge\Application
start msedge.exe https://www.ygbks.com
@ping -n 10 127.0.0.1>nul
@echo �ر������
taskkill /F /IM msedge.exe
@timeout /t 10 /nobreak