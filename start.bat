@echo off
chcp 65001 >nul
echo 🚀 启动 PumpAlien Discovery Project...
echo ==================================

REM 检查Node.js是否安装
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 错误: 未找到Node.js，请先安装Node.js 18+
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

REM 检查npm是否安装
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 错误: 未找到npm，请先安装npm
    pause
    exit /b 1
)

REM 检查Node.js版本
for /f "tokens=2 delims=." %%i in ('node -v') do set NODE_VERSION=%%i
if %NODE_VERSION% lss 18 (
    echo ❌ 错误: Node.js版本过低，需要18+，当前版本: 
    node -v
    echo 请更新Node.js到最新版本
    pause
    exit /b 1
)

echo ✅ Node.js版本: 
node -v
echo ✅ npm版本: 
npm -v

REM 检查是否已安装依赖
if not exist "node_modules" (
    echo 📦 安装项目依赖...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
    echo ✅ 依赖安装完成
) else (
    echo ✅ 依赖已安装
)

REM 启动开发服务器
echo 🌐 启动开发服务器...
echo 📱 本地访问: http://localhost:3000
echo 🔄 按 Ctrl+C 停止服务器
echo ==================================

npm run dev
pause
