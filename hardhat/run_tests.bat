@echo off
cd /d "d:\hackathons & other projects\web3ssh-ASCendant--main\hardhat"
set NO_COLOR=1
node node_modules\hardhat\internal\cli\bootstrap.js test 2>&1
