// Pixel Art NFT Meme Style JavaScript
// Global Variables
let currentScene = 'opening-scene';
let gameState = {
    energy: 100,
    discoveredCivilizations: 0,
    signalsSent: 0,
    currentLocation: 0,
    pixelMode: true,
    particles: []
};

// Scientific Data and Research Materials
const scientificData = {
    drakeEquation: {
        R: 7, // Star formation rate
        fp: 0.5, // Fraction with planets
        ne: 2, // Habitable planets
        fl: 0.1, // Life probability
        fi: 0.01, // Intelligence probability
        fc: 0.1, // Communication probability
        L: 1000 // Civilization lifetime
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

// Fermi Paradox Hypotheses
const hypotheses = {
    'great-filter': {
        title: 'Great Filter Hypothesis',
        description: 'Some unknown factor prevents civilizations from reaching interstellar travel. This might include:\n\n• Nuclear war\n• Climate change\n• AI runaway\n• Biotech disaster\n• Asteroid impact\n\nIf this hypothesis holds, most civilizations become extinct before reaching interstellar travel capability.',
        evidence: 'Human civilization currently faces multiple potential survival threats, including climate change, nuclear proliferation, and AI development.',
        probability: 'High (70-80%)'
    },
    'zoo-hypothesis': {
        title: 'Zoo Hypothesis',
        description: 'Advanced civilizations know of our existence but choose not to contact us, like we observe animals in a zoo.\n\nPossible reasons:\n• Protect us from cultural shock\n• Wait for us to reach certain maturity\n• Avoid interfering with our natural development\n• Follow some cosmic convention',
        evidence: 'Humans also adopt similar "no-contact" policies when encountering primitive tribes.',
        probability: 'Medium (20-30%)'
    },
    'rare-earth': {
        title: 'Rare Earth Hypothesis',
        description: 'Earth\'s conditions are extremely special, making life emergence extremely rare.\n\nKey factors include:\n• Moderate star type and distance\n• Stable planetary orbit\n• Moon\'s existence stabilizing Earth\'s rotation\n• Plate tectonic activity\n• Magnetic field protection\n• Moderate gravity',
        evidence: 'Among discovered exoplanets, truly Earth-like ones are extremely rare.',
        probability: 'Medium (15-25%)'
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializePixelElements();
    setupEventListeners();
    generateParticles();
    console.log('🚀 PumpAlien Cosmic Quest Project - Pixel Mode Activated!');
});

// Initialize Pixel Elements
function initializePixelElements() {
    // Create floating pixel elements
    createFloatingElements();
    
    // Generate pixel particles
    generateParticles();
    
    // Add pixel scan lines
    addScanLines();
}

// Create Floating Elements
function createFloatingElements() {
    const container = document.getElementById('floating-elements');
    
    // Add more variety to floating elements
    const elements = [
        { emoji: '🚀', speed: 2, delay: 0 },
        { emoji: '👽', speed: 1.5, delay: 4 },
        { emoji: '🛸', speed: 3, delay: 8 },
        { emoji: '⭐', speed: 1, delay: 12 },
        { emoji: '🪐', speed: 0.8, delay: 16 },
        { emoji: '💊', speed: 2.5, delay: 20 },
        { emoji: '⚡', speed: 1.8, delay: 24 },
        { emoji: '🌌', speed: 1.2, delay: 28 }
    ];
    
    elements.forEach((element, index) => {
        const div = document.createElement('div');
        div.className = `pixel-${element.emoji === '🚀' ? 'ship' : 
                               element.emoji === '👽' ? 'alien' : 
                               element.emoji === '🛸' ? 'ufo' : 
                               element.emoji === '⭐' ? 'star' : 
                               element.emoji === '🪐' ? 'planet' : 'element'}`;
        div.textContent = element.emoji;
        div.style.animationDelay = `${element.delay}s`;
        div.style.animationDuration = `${20 / element.speed}s`;
        container.appendChild(div);
    });
}

// Generate Pixel Particles
function generateParticles() {
    const container = document.getElementById('pixel-particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
        container.appendChild(particle);
    }
}

// Add Scan Lines
function addScanLines() {
    const scanLine = document.createElement('div');
    scanLine.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
        animation: scan-line 3s linear infinite;
        z-index: 1000;
        pointer-events: none;
    `;
    document.body.appendChild(scanLine);
}

// Setup Event Listeners
function setupEventListeners() {
    // Paradox card click events
    document.querySelectorAll('.paradox-card').forEach(card => {
        card.addEventListener('click', function() {
            const hypothesis = this.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
            if (hypothesis) showHypothesis(hypothesis);
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
    
    // Add touch gestures
    setupTouchGestures();
    
    // Add mouse effects
    setupMouseEffects();
}

// Handle Keyboard
function handleKeyboard(e) {
    switch(e.key) {
        case 'ArrowRight':
            e.preventDefault();
            nextSceneFromKeyboard();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            previousSceneFromKeyboard();
            break;
        case 'Escape':
            closeAllModals();
            break;
        case 'p':
        case 'P':
            togglePixelMode();
            break;
        case ' ':
            e.preventDefault();
            if (currentScene === 'opening-scene') startJourney();
            break;
    }
}

// Setup Touch Gestures
function setupTouchGestures() {
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
        
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSceneFromKeyboard();
            } else {
                previousSceneFromKeyboard();
            }
        }
    });
}

// Setup Mouse Effects
function setupMouseEffects() {
    document.addEventListener('mousemove', function(e) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const speed = (index % 3 + 1) * 0.5;
            const x = (e.clientX * speed) / window.innerWidth;
            const y = (e.clientY * speed) / window.innerHeight;
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Start Journey
function startJourney() {
    console.log('🌟 PumpAlien begins cosmic exploration!');
    playPixelSound('start');
    addPixelEffect('start');
    nextScene('opening-scene', 'fermi-intro');
}

// Scene Navigation
function nextScene(fromScene, toScene) {
    const fromElement = document.getElementById(fromScene);
    const toElement = document.getElementById(toScene);
    
    if (fromElement && toElement) {
        fromElement.classList.remove('active');
        addPixelEffect('transition');
        
        setTimeout(() => {
            toElement.classList.add('active');
            currentScene = toScene;
            
            // Special scene effects
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

// Choose Exploration Path
function choosePath(path) {
    console.log(`🚀 Chose ${path} path`);
    
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
        addPixelEffect('choice');
        nextScene('pump-alien-story', targetScene);
    }
}

// Show Hypothesis Details
function showHypothesis(hypothesisKey) {
    const hypothesis = hypotheses[hypothesisKey];
    if (!hypothesis) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'hypothesis-modal';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="hypothesis-content">
            <h3 class="pixel-heading">${hypothesis.title}</h3>
            <p style="white-space: pre-line; text-align: left; margin: 1rem 0; font-family: 'VT323', monospace;">${hypothesis.description}</p>
            <div style="background: rgba(0,255,65,0.1); padding: 1rem; border: 2px solid var(--primary-color); margin: 1rem 0;">
                <strong>Scientific Evidence:</strong> ${hypothesis.evidence}
            </div>
            <div style="background: rgba(255,0,255,0.1); padding: 1rem; border: 2px solid var(--secondary-color); margin: 1rem 0;">
                <strong>Probability:</strong> ${hypothesis.probability}
            </div>
            <button class="close-modal" onclick="this.parentElement.parentElement.remove()">CLOSE</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    addPixelEffect('modal');
}

// Animate Drake Equation
function animateDrakeEquation() {
    const resultElement = document.querySelector('.pixel-result');
    if (resultElement) {
        resultElement.classList.add('pixel-fade-in');
        setTimeout(() => {
            resultElement.classList.remove('pixel-fade-in');
        }, 500);
    }
    
    // Animate parameters one by one
    const params = document.querySelectorAll('.param-item');
    params.forEach((param, index) => {
        setTimeout(() => {
            param.classList.add('pixel-fade-in');
            setTimeout(() => param.classList.remove('pixel-fade-in'), 500);
        }, index * 200);
    });
}

// Animate Paradox Cards
function animateParadoxCards() {
    const cards = document.querySelectorAll('.paradox-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('pixel-fade-in');
            setTimeout(() => card.classList.remove('pixel-fade-in'), 500);
        }, index * 200);
    });
}

// Animate PumpAlien
function animatePumpAlien() {
    const alien = document.querySelector('.alien-sprite');
    const pump = document.querySelector('.pump-effect');
    const glow = document.querySelector('.pixel-glow');
    
    if (alien && pump && glow) {
        alien.classList.add('pixel-shake');
        pump.classList.add('pixel-fade-in');
        glow.style.animation = 'glow-pulse 0.5s ease-in-out infinite';
        
        setTimeout(() => {
            alien.classList.remove('pixel-shake');
            pump.classList.remove('pixel-fade-in');
        }, 1000);
    }
}

// Adventure Game Functions
function scanSystem() {
    const currentSystem = document.querySelector(`[data-civilization]:nth-child(${gameState.currentLocation + 1})`);
    if (currentSystem) {
        const civilization = currentSystem.getAttribute('data-civilization');
        let message = '';
        
        switch(civilization) {
            case 'none':
                message = '🔍 Scan Result: No civilization signs detected in this system';
                break;
            case 'ancient':
                message = '🔍 Scan Result: Ancient civilization ruins discovered! Energy cost: 20';
                gameState.energy -= 20;
                gameState.discoveredCivilizations++;
                addPixelEffect('discovery');
                break;
            case 'advanced':
                message = '🔍 Scan Result: Advanced civilization found! Energy cost: 30';
                gameState.energy -= 30;
                gameState.discoveredCivilizations++;
                addPixelEffect('discovery');
                break;
        }
        
        showGameMessage(message);
        updateGameState();
        addPixelEffect('scan');
    }
}

function sendSignal() {
    if (gameState.energy >= 25) {
        gameState.energy -= 25;
        gameState.signalsSent++;
        
        const message = `📡 Signal sent! Waiting for response...\nEnergy remaining: ${gameState.energy}`;
        showGameMessage(message);
        updateGameState();
        addPixelEffect('signal');
        
        // Simulate signal response
        setTimeout(() => {
            const responses = [
                'Received weak response signal...',
                'Signal blocked by interference',
                'No response received',
                'Unknown signal source detected!'
            ];
            const response = responses[Math.floor(Math.random() * responses.length)];
            showGameMessage(`📡 ${response}`);
        }, 2000);
    } else {
        showGameMessage('❌ Insufficient energy to send signal!');
        addPixelEffect('error');
    }
}

function travel() {
    if (gameState.energy >= 40) {
        gameState.energy -= 40;
        gameState.currentLocation = (gameState.currentLocation + 1) % 4;
        
        const message = `🚀 Arrived at new star system!\nCurrent location: ${gameState.currentLocation + 1}\nEnergy remaining: ${gameState.energy}`;
        showGameMessage(message);
        updateGameState();
        addPixelEffect('travel');
        
        // Update system display
        highlightCurrentSystem();
    } else {
        showGameMessage('❌ Insufficient energy for interstellar travel!');
        addPixelEffect('error');
    }
}

function upgradeShip() {
    if (gameState.energy >= 50) {
        gameState.energy -= 50;
        gameState.energy = Math.min(100, gameState.energy + 20);
        
        const message = `⚡ Ship upgraded! Energy restored to ${gameState.energy}`;
        showGameMessage(message);
        updateGameState();
        addPixelEffect('upgrade');
    } else {
        showGameMessage('❌ Insufficient energy for upgrade!');
        addPixelEffect('error');
    }
}

function highlightCurrentSystem() {
    document.querySelectorAll('.star-system').forEach((system, index) => {
        if (index === gameState.currentLocation) {
            system.style.borderColor = 'var(--accent-color)';
            system.style.transform = 'scale(1.2)';
            system.style.boxShadow = '0 0 20px var(--shadow-color)';
        } else {
            system.style.borderColor = 'var(--border-color)';
            system.style.transform = 'scale(1)';
            system.style.boxShadow = 'none';
        }
    });
}

function showGameMessage(message) {
    // Create message display
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0,0,0,0.9);
        color: var(--text-color);
        padding: 1rem;
        border: var(--pixel-size) solid var(--border-color);
        max-width: 300px;
        z-index: 1000;
        font-family: 'VT323', monospace;
        white-space: pre-line;
        animation: pixel-fade-in 0.3s ease-in;
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'pixel-fade-in 0.3s ease-in reverse';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

function updateGameState() {
    // Update game status display
    const energyDisplay = document.getElementById('energy-display');
    const civilizationsDisplay = document.getElementById('civilizations-display');
    const signalsDisplay = document.getElementById('signals-display');
    
    if (energyDisplay) energyDisplay.textContent = gameState.energy;
    if (civilizationsDisplay) civilizationsDisplay.textContent = gameState.discoveredCivilizations;
    if (signalsDisplay) signalsDisplay.textContent = gameState.signalsSent;
}

// Philosophical Path Functions
function generateThought() {
    const thoughts = [
        "If we are alone, does that make us special or insignificant?",
        "Perhaps the universe is waiting for us to mature enough to join the cosmic community.",
        "Maybe loneliness is the price we pay for consciousness.",
        "In the vastness of space, every connection becomes precious.",
        "The search for others might be the search for ourselves."
    ];
    
    const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
    showGameMessage(`🤔 ${randomThought}`);
    addPixelEffect('thought');
}

function meditate() {
    showGameMessage('🧘 Meditating...\nEnergy restored by 10');
    gameState.energy = Math.min(100, gameState.energy + 10);
    updateGameState();
    addPixelEffect('meditation');
}

// Scientific Path Functions
function scanForSignals() {
    showGameMessage('🔬 Scanning for signals...\nThis may take a moment...');
    
    setTimeout(() => {
        const signals = Math.floor(Math.random() * 5);
        if (signals > 0) {
            showGameMessage(`🔬 Found ${signals} potential signal(s)!`);
            addPixelEffect('discovery');
        } else {
            showGameMessage('🔬 No signals detected in this frequency range.');
        }
    }, 2000);
}

// Utility Functions
function shuffleCards() {
    const cards = document.querySelectorAll('.paradox-card');
    cards.forEach(card => {
        card.style.animation = 'pixel-shake 0.5s ease-in-out';
        setTimeout(() => card.style.animation = '', 500);
    });
    addPixelEffect('shuffle');
}

function animateEquation() {
    const equation = document.querySelector('.equation');
    if (equation) {
        equation.style.animation = 'pixel-shake 0.5s ease-in-out';
        setTimeout(() => equation.style.animation = '', 500);
    }
    addPixelEffect('equation');
}

// Reveal Truth
function revealTruth() {
    const revelationElement = document.getElementById('final-revelation');
    const truths = [
        "The truth of the universe is: We were never truly alone. Every civilization is searching for others, just as we search for them.",
        "The Fermi Paradox is not a problem, but an answer: The vastness of the universe teaches us that true connection lies not in distance, but in understanding.",
        "Perhaps other civilizations are right beside us, we just haven't learned how to perceive their existence yet.",
        "Loneliness is the universe's gift to us, making us cherish every encounter, every discovery.",
        "The truth is: We are all children of the universe, searching for our way home."
    ];
    
    const randomTruth = truths[Math.floor(Math.random() * randomTruth.length)];
    
    // Typewriter effect
    let i = 0;
    revelationElement.textContent = '';
    revelationElement.style.color = 'var(--accent-color)';
    
    const typeWriter = setInterval(() => {
        if (i < randomTruth.length) {
            revelationElement.textContent += randomTruth.charAt(i);
            i++;
        } else {
            clearInterval(typeWriter);
            // Add blinking effect
            setInterval(() => {
                revelationElement.style.opacity = revelationElement.style.opacity === '0.5' ? '1' : '0.5';
            }, 1000);
        }
    }, 50);
    
    addPixelEffect('revelation');
}

// Restart Journey
function restartJourney() {
    // Reset game state
    gameState = {
        energy: 100,
        discoveredCivilizations: 0,
        signalsSent: 0,
        currentLocation: 0,
        pixelMode: gameState.pixelMode,
        particles: []
    };
    
    // Return to opening scene
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
    });
    
    document.getElementById('opening-scene').classList.add('active');
    currentScene = 'opening-scene';
    
    addPixelEffect('restart');
    console.log('🔄 Cosmic exploration restarted!');
}

// Share Experience
function shareExperience() {
    const shareText = `I just explored the Fermi Paradox with PumpAlien! 🚀👽💊\nCheck out this cosmic quest!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'PumpAlien Cosmic Quest',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback for browsers without Web Share API
        navigator.clipboard.writeText(shareText + '\n' + window.location.href);
        showGameMessage('📋 Experience copied to clipboard!');
    }
    
    addPixelEffect('share');
}

// Pixel Effects
function addPixelEffect(effectType) {
    const effects = {
        start: () => createPixelExplosion(),
        transition: () => createPixelTrail(),
        choice: () => createPixelRipple(),
        scan: () => createPixelScan(),
        signal: () => createPixelWave(),
        travel: () => createPixelWarp(),
        upgrade: () => createPixelUpgrade(),
        discovery: () => createPixelDiscovery(),
        error: () => createPixelError(),
        thought: () => createPixelThought(),
        meditation: () => createPixelMeditation(),
        shuffle: () => createPixelShuffle(),
        equation: () => createPixelEquation(),
        revelation: () => createPixelRevelation(),
        restart: () => createPixelRestart(),
        share: () => createPixelShare(),
        modal: () => createPixelModal()
    };
    
    if (effects[effectType]) {
        effects[effectType]();
    }
}

// Create various pixel effects
function createPixelExplosion() {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.animation = `pixel-explosion 1s ease-out forwards`;
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

function createPixelTrail() {
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
        opacity: 0.3;
        animation: pixel-trail 0.5s ease-out forwards;
        pointer-events: none;
        z-index: 999;
    `;
    document.body.appendChild(trail);
    
    setTimeout(() => trail.remove(), 500);
}

// Add more pixel effect functions as needed...

// Toggle Pixel Mode
function togglePixelMode() {
    gameState.pixelMode = !gameState.pixelMode;
    
    if (gameState.pixelMode) {
        document.body.classList.add('pixel-mode');
        document.body.classList.remove('smooth-mode');
    } else {
        document.body.classList.remove('pixel-mode');
        document.body.classList.add('smooth-mode');
    }
    
    addPixelEffect('toggle');
}

// Close All Modals
function closeAllModals() {
    const modals = document.querySelectorAll('.hypothesis-modal');
    modals.forEach(modal => modal.remove());
}

// Navigation from Keyboard
function nextSceneFromKeyboard() {
    const scenes = ['opening-scene', 'fermi-intro', 'paradox-explanation', 'pump-alien-story', 'scientific-path', 'philosophical-path', 'adventure-path', 'conclusion'];
    const currentIndex = scenes.indexOf(currentScene);
    const nextIndex = (currentIndex + 1) % scenes.length;
    
    if (nextIndex > 0) {
        nextScene(currentScene, scenes[nextIndex]);
    }
}

function previousSceneFromKeyboard() {
    const scenes = ['opening-scene', 'fermi-intro', 'paradox-explanation', 'pump-alien-story', 'scientific-path', 'philosophical-path', 'adventure-path', 'conclusion'];
    const currentIndex = scenes.indexOf(currentScene);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : scenes.length - 1;
    
    if (prevIndex >= 0) {
        nextScene(currentScene, scenes[prevIndex]);
    }
}

// Sound System (Simulated)
function playPixelSound(soundType) {
    // Here you can integrate real pixel sound effects
    console.log(`🔊 Playing pixel sound: ${soundType}`);
}

// Performance Optimization
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

// Responsive Handling
window.addEventListener('resize', throttle(function() {
    console.log('🔄 Window resized');
}, 100));

// Add CSS animations for pixel effects
const style = document.createElement('style');
style.textContent = `
    @keyframes pixel-explosion {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        100% { transform: scale(1) rotate(360deg); opacity: 0; }
    }
    
    @keyframes pixel-trail {
        0% { transform: translateX(-100%); opacity: 0.3; }
        50% { transform: translateX(0%); opacity: 0.6; }
        100% { transform: translateX(100%); opacity: 0; }
    }
    
    .pixel-mode {
        image-rendering: pixelated;
        image-rendering: -moz-crisp-edges;
        image-rendering: crisp-edges;
    }
    
    .smooth-mode {
        image-rendering: auto;
    }
`;
document.head.appendChild(style);

console.log('🚀 PumpAlien Cosmic Quest Project - Pixel JavaScript Loaded!');
