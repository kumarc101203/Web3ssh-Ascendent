#!/bin/bash

echo "Starting Smart Contract Management System with Gemini AI..."
echo

echo "Starting Backend Server..."
cd backend && python gemini_analyzer.py &
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 3

echo "Starting Frontend Server..."
npm run dev &
FRONTEND_PID=$!

echo
echo "Services are starting..."
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:5173"
echo
echo "Press Ctrl+C to stop all services..."

# Wait for user to stop
trap "echo 'Stopping services...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait 