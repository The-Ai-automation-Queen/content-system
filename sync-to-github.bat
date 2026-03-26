@echo off
echo Syncing content system to GitHub...

set REPO=C:\Users\fatih\.claude\builds\content-system

copy /Y "C:\Users\fatih\.claude\builds\outputs\content-vault.md" "%REPO%\content-vault.md" >nul
copy /Y "C:\Users\fatih\.claude\skills\last30days\research-notes.md" "%REPO%\research-notes.md" >nul
copy /Y "C:\Users\fatih\.claude\skills\last30days\inspiration-library\SKILL.md" "%REPO%\inspiration-library\SKILL.md" >nul
copy /Y "C:\Users\fatih\.claude\skills\last30days\inspiration-library\creators.csv" "%REPO%\inspiration-library\creators.csv" >nul
copy /Y "C:\Users\fatih\.claude\skills\positioning\SKILL.md" "%REPO%\positioning\SKILL.md" >nul

cd /d "%REPO%"
git add -A
git commit -m "sync: %date:~6,4%-%date:~3,2%-%date:~0,2% %time:~0,5%"
git push origin main

echo Done.
pause
