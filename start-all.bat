@echo off
echo 🚀 Pokrećem Sofia Blog backend i frontend...

:: Pokreni BACKEND u novom prozoru
start "Sofia Backend" cmd /k "cd backend && node server.js"

:: Pokreni FRONTEND u drugom novom prozoru
start "Sofia Frontend" cmd /k "cd sofia-blog && npm start"

echo ✅ Backend i Frontend pokrenuti!
