@echo off
echo Starting Smart Contract Management System with Gemini AI...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && python gemini_analyzer.py"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo Services are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window...
pause > nul 