// 全局变量
let currentScene = 'opening-scene';
let gameState = {
    energy: 100,
    discoveredCivilizations: 0,
    signalsSent: 0,
    currentLocation: 0
};

// 科学数据和研究资料
const scientificData = {
    drakeEquation: {
        R: 7, // 银河系恒星形成率
        fp: 0.5, // 有行星的恒星比例
        ne: 2, // 宜居行星数量
        fl: 0.1, // 生命出现的概率
        fi: 0.01, // 智能生命概率
        fc: 0.1, // 文明通信概率
        L: 1000 // 文明寿命
    },
    setiData: {
        frequencies: [1420, 1665, 22000],
        searchYears: 60,
        totalObservations: 1000000
    },
    exoplanets: {
        total: 5000,
        habitable: 50,
        earthLike: 12
    }
};

// 费米悖论假说详情
const hypotheses = {
    'great-filter': {
        title: '大过滤器假说',
        description: '在文明发展的某个阶段，存在一个几乎无法跨越的障碍。这可能包括：\n\n• 核战争\n• 气候变化\n• 人工智能失控\n• 生物技术灾难\n• 小行星撞击\n\n如果这个假说成立，那么大多数文明在达到星际旅行能力之前就已经灭绝了。',
        evidence: '人类文明目前正面临多个潜在的生存威胁，包括气候变化、核武器扩散和人工智能发展。',
        probability: '高 (70-80%)'
    },
    'zoo-hypothesis': {
        title: '动物园假说',
        description: '高级文明知道我们的存在，但选择不接触我们，就像我们在动物园里观察动物一样。\n\n可能的原因：\n• 保护我们免受文化冲击\n• 等待我们达到某种成熟度\n• 避免干扰我们的自然发展\n• 遵守某种宇宙公约',
        evidence: '人类在接触原始部落时也采用类似的"不接触"政策。',
        probability: '中等 (20-30%)'
    },
    'rare-earth': {
        title: '稀有地球假说',
        description: '地球的条件极其特殊，生命出现的概率极低。\n\n关键因素包括：\n• 适中的恒星类型和距离\n• 稳定的行星轨道\n• 月球的存在稳定地球自转\n• 板块构造活动\n• 磁场保护\n• 适中的重力',
        evidence: '迄今为止发现的系外行星中，真正类似地球的极少。',
        probability: '中等 (15-25%)'
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeStars();
    setupEventListeners();
    console.log('🚀 PumpAlien宇宙探索项目已启动！');
});

// 创建动态星空
function initializeStars() {
    const starsContainer = document.getElementById('stars');
    const stars2Container = document.getElementById('stars2');
    const stars3Container = document.getElementById('stars3');
    
    // 创建更多星星
    for (let i = 0; i < 200; i++) {
        createStar(starsContainer, 'star');
        createStar(stars2Container, 'star2');
        createStar(stars3Container, 'star3');
    }
}

function createStar(container, className) {
    const star = document.createElement('div');
    star.className = className;
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 20 + 's';
    star.style.animationDuration = (Math.random() * 10 + 10) + 's';
    container.appendChild(star);
}

// 设置事件监听器
function setupEventListeners() {
    // 悖论卡片点击事件
    document.querySelectorAll('.paradox-card').forEach(card => {
        card.addEventListener('click', function() {
            const hypothesis = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showHypothesis(hypothesis);
        });
    });
}

// 开始探索
function startJourney() {
    console.log('🌟 PumpAlien开始宇宙探索！');
    playSound('start');
    nextScene('opening-scene', 'fermi-intro');
}

// 场景切换
function nextScene(fromScene, toScene) {
    const fromElement = document.getElementById(fromScene);
    const toElement = document.getElementById(toScene);
    
    if (fromElement && toElement) {
        fromElement.classList.remove('active');
        setTimeout(() => {
            toElement.classList.add('active');
            currentScene = toScene;
            
            // 特殊场景效果
            if (toScene === 'fermi-intro') {
                animateDrakeEquation();
            } else if (toScene === 'paradox-explanation') {
                animateParadoxCards();
            } else if (toScene === 'pump-alien-story') {
                animatePumpAlien();
            }
            
        }, 300);
    }
}

// 选择探索路径
function choosePath(path) {
    console.log(`🚀 选择了${path}路径`);
    
    let targetScene;
    switch(path) {
        case 'scientific':
            targetScene = 'scientific-path';
            break;
        case 'philosophical':
            targetScene = 'philosophical-path';
            break;
        case 'adventure':
            targetScene = 'adventure-path';
            break;
    }
    
    if (targetScene) {
        nextScene('pump-alien-story', targetScene);
    }
}

// 显示假说详情
function showHypothesis(hypothesisKey) {
    const hypothesis = hypotheses[hypothesisKey];
    if (!hypothesis) return;
    
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'hypothesis-modal';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="hypothesis-content">
            <h3>${hypothesis.title}</h3>
            <p style="white-space: pre-line; text-align: left; margin: 1rem 0;">${hypothesis.description}</p>
            <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 10px; margin: 1rem 0;">
                <strong>科学证据：</strong> ${hypothesis.evidence}
            </div>
            <div style="background: rgba(255,107,107,0.1); padding: 1rem; border-radius: 10px; margin: 1rem 0;">
                <strong>成立概率：</strong> ${hypothesis.probability}
            </div>
            <button class="close-modal" onclick="this.parentElement.parentElement.remove()">关闭</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 添加点击外部关闭功能
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// 德雷克方程动画
function animateDrakeEquation() {
    const resultElement = document.querySelector('.result');
    if (resultElement) {
        resultElement.style.opacity = '0';
        resultElement.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            resultElement.style.transition = 'all 1s ease';
            resultElement.style.opacity = '1';
            resultElement.style.transform = 'scale(1)';
        }, 500);
    }
}

// 悖论卡片动画
function animateParadoxCards() {
    const cards = document.querySelectorAll('.paradox-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

// PumpAlien动画
function animatePumpAlien() {
    const alien = document.querySelector('.alien-body');
    const pump = document.querySelector('.pump-effect');
    
    if (alien && pump) {
        alien.style.animation = 'alien-float 1s ease-in-out infinite';
        pump.style.animation = 'pump-glow 0.8s ease-in-out infinite';
        
        // 添加特殊效果
        setTimeout(() => {
            alien.style.filter = 'drop-shadow(0 0 30px rgba(138,43,226,1))';
            pump.style.filter = 'drop-shadow(0 0 25px #ff6b6b)';
        }, 1000);
    }
}

// 冒险游戏功能
function scanSystem() {
    const currentSystem = document.querySelector(`[data-civilization]:nth-child(${gameState.currentLocation + 1})`);
    if (currentSystem) {
        const civilization = currentSystem.getAttribute('data-civilization');
        let message = '';
        
        switch(civilization) {
            case 'none':
                message = '🔍 扫描结果：这个星系没有发现文明迹象';
                break;
            case 'ancient':
                message = '🔍 扫描结果：发现古代文明遗迹！能量消耗：20';
                gameState.energy -= 20;
                gameState.discoveredCivilizations++;
                break;
            case 'advanced':
                message = '🔍 扫描结果：发现高级文明！能量消耗：30';
                gameState.energy -= 30;
                gameState.discoveredCivilizations++;
                break;
        }
        
        showGameMessage(message);
        updateGameState();
    }
}

function sendSignal() {
    if (gameState.energy >= 25) {
        gameState.energy -= 25;
        gameState.signalsSent++;
        
        const message = `📡 信号已发送！等待回应...\n能量剩余：${gameState.energy}`;
        showGameMessage(message);
        updateGameState();
        
        // 模拟信号回应
        setTimeout(() => {
            const responses = [
                '收到微弱的回应信号...',
                '信号被某种干扰阻挡了',
                '没有收到回应',
                '检测到未知信号源！'
            ];
            const response = responses[Math.floor(Math.random() * responses.length)];
            showGameMessage(`📡 ${response}`);
        }, 2000);
    } else {
        showGameMessage('❌ 能量不足，无法发送信号！');
    }
}

function travel() {
    if (gameState.energy >= 40) {
        gameState.energy -= 40;
        gameState.currentLocation = (gameState.currentLocation + 1) % 4;
        
        const message = `🚀 已到达新的星系！\n当前位置：${gameState.currentLocation + 1}\n能量剩余：${gameState.energy}`;
        showGameMessage(message);
        updateGameState();
        
        // 更新星系显示
        highlightCurrentSystem();
    } else {
        showGameMessage('❌ 能量不足，无法进行星际旅行！');
    }
}

function highlightCurrentSystem() {
    document.querySelectorAll('.star-system').forEach((system, index) => {
        if (index === gameState.currentLocation) {
            system.style.borderColor = '#4ecdc4';
            system.style.transform = 'scale(1.2)';
        } else {
            system.style.borderColor = 'rgba(255,255,255,0.1)';
            system.style.transform = 'scale(1)';
        }
    });
}

function showGameMessage(message) {
    // 创建消息提示
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        border-left: 4px solid #4ecdc4;
        max-width: 300px;
        z-index: 1000;
        font-family: 'Exo 2', sans-serif;
        white-space: pre-line;
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // 3秒后自动消失
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateX(100%)';
        messageDiv.style.transition = 'all 0.5s ease';
        setTimeout(() => messageDiv.remove(), 500);
    }, 3000);
}

function updateGameState() {
    // 更新游戏状态显示
    const gameArea = document.querySelector('.adventure-game');
    if (gameArea) {
        let statusDiv = gameArea.querySelector('.game-status');
        if (!statusDiv) {
            statusDiv = document.createElement('div');
            statusDiv.className = 'game-status';
            statusDiv.style.cssText = `
                background: rgba(0,0,0,0.5);
                padding: 1rem;
                border-radius: 10px;
                margin: 1rem 0;
                font-family: 'Orbitron', monospace;
            `;
            gameArea.appendChild(statusDiv);
        }
        
        statusDiv.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: center;">
                <div>⚡ 能量: ${gameState.energy}</div>
                <div>🌍 发现文明: ${gameState.discoveredCivilizations}</div>
                <div>📡 发送信号: ${gameState.signalsSent}</div>
            </div>
        `;
    }
}

// 揭示真相
function revealTruth() {
    const revelationElement = document.getElementById('final-revelation');
    const truths = [
        "宇宙的真相是：我们从未真正孤独过。每一个文明都在寻找彼此，就像我们在寻找他们一样。",
        "费米悖论不是问题，而是答案：宇宙的浩瀚让我们明白，真正的联系不在于距离，而在于理解。",
        "也许其他文明就在我们身边，只是我们还没有学会如何感知他们的存在。",
        "孤独是宇宙给我们的礼物，它让我们珍惜每一次相遇，每一次发现。",
        "真相是：我们都是宇宙的孩子，在寻找回家的路。"
    ];
    
    const randomTruth = truths[Math.floor(Math.random() * truths.length)];
    
    // 打字机效果
    let i = 0;
    revelationElement.textContent = '';
    revelationElement.style.color = '#4ecdc4';
    
    const typeWriter = setInterval(() => {
        if (i < randomTruth.length) {
            revelationElement.textContent += randomTruth.charAt(i);
            i++;
        } else {
            clearInterval(typeWriter);
            // 添加闪烁效果
            setInterval(() => {
                revelationElement.style.opacity = revelationElement.style.opacity === '0.5' ? '1' : '0.5';
            }, 1000);
        }
    }, 50);
}

// 重新开始
function restartJourney() {
    // 重置游戏状态
    gameState = {
        energy: 100,
        discoveredCivilizations: 0,
        signalsSent: 0,
        currentLocation: 0
    };
    
    // 回到开场场景
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
    });
    
    document.getElementById('opening-scene').classList.add('active');
    currentScene = 'opening-scene';
    
    console.log('🔄 宇宙探索重新开始！');
}

// 音效系统（模拟）
function playSound(soundType) {
    // 这里可以集成真实的音效
    console.log(`🔊 播放音效: ${soundType}`);
}

// 添加键盘快捷键
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowRight':
            e.preventDefault();
            // 下一个场景
            break;
        case 'ArrowLeft':
            e.preventDefault();
            // 上一个场景
            break;
        case 'Escape':
            // 关闭模态框
            const modal = document.querySelector('.hypothesis-modal');
            if (modal) modal.remove();
            break;
    }
});

// 添加触摸手势支持
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // 检测滑动手势
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
            // 向左滑动 - 下一个场景
            console.log('👈 向左滑动');
        } else {
            // 向右滑动 - 上一个场景
            console.log('👉 向右滑动');
        }
    }
});

// 性能优化：节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 响应式处理
window.addEventListener('resize', throttle(function() {
    // 处理窗口大小变化
    console.log('🔄 窗口大小已调整');
}, 100));

console.log('🚀 PumpAlien宇宙探索项目JavaScript已加载完成！');
