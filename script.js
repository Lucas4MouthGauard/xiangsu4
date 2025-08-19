// PumpAlien Discovery - Interactive Experience
// Optimized for Alien Elements and User Engagement

// Global State
const appState = {
    isLoading: true,
    currentStep: 1,
    alienMode: false,
    energyLevel: 0,
    messages: [],
    findings: []
};

// DOM Elements
const elements = {
    loadingScreen: null,
    alienCore: null,
    energyRings: null,
    scannerDisplay: null,
    energyMeter: null,
    messageDisplay: null
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main Initialization
function initializeApp() {
    cacheElements();
    setupEventListeners();
    startLoadingSequence();
    
    console.log('👽 PumpAlien Discovery Project Initialized');
}

// Cache DOM Elements
function cacheElements() {
    elements.loadingScreen = document.getElementById('loading-screen');
    elements.alienCore = document.querySelector('.alien-core');
    elements.energyRings = document.querySelectorAll('.ring');
    elements.scannerDisplay = document.querySelector('.scanner-display');
    elements.energyMeter = document.getElementById('energy-level');
    elements.messageDisplay = document.getElementById('message-display');
}

// Setup Event Listeners
function setupEventListeners() {
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
    
    // Scroll animations
    setupScrollAnimations();
    
    // Alien interactions
    setupAlienInteractions();
}

// Loading Sequence
function startLoadingSequence() {
    const loadingSteps = [
        'Scanning cosmic signals...',
        'Detecting alien presence...',
        'Analyzing energy patterns...',
        'PumpAlien entity confirmed!'
    ];
    
    let currentStep = 0;
    const statusElement = document.querySelector('.loading-status');
    
    const updateStatus = () => {
        if (currentStep < loadingSteps.length) {
            statusElement.textContent = loadingSteps[currentStep];
            currentStep++;
        }
    };
    
    // Update status every 1.5 seconds
    const statusInterval = setInterval(updateStatus, 1500);
    
    // Complete loading after 6 seconds
    setTimeout(() => {
        clearInterval(statusInterval);
        completeLoading();
    }, 6000);
}

// Complete Loading
function completeLoading() {
    elements.loadingScreen.classList.add('fade-out');
    
    setTimeout(() => {
        elements.loadingScreen.style.display = 'none';
        appState.isLoading = false;
        
        // Initialize hero animations
        initializeHeroAnimations();
        
        // Start alien animations
        startAlienAnimations();
    }, 500);
}

// Initialize Hero Animations
function initializeHeroAnimations() {
    const heroElements = [
        '.hero-badge',
        '.hero-title',
        '.hero-description',
        '.hero-actions',
        '.hero-stats'
    ];
    
    heroElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}

// Start Alien Animations
function startAlienAnimations() {
    if (elements.alienCore) {
        elements.alienCore.style.animation = 'alien-core-pulse 3s ease-in-out infinite';
    }
    
    if (elements.energyRings) {
        elements.energyRings.forEach((ring, index) => {
            ring.style.animation = `ring-rotate ${10 + index * 5}s linear infinite`;
        });
    }
}

// Setup Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.timeline-step, .info-card, .finding-card, .interactive-panel');
    animatedElements.forEach(el => observer.observe(el));
}

// Setup Alien Interactions
function setupAlienInteractions() {
    // Alien core click effect
    if (elements.alienCore) {
        elements.alienCore.addEventListener('click', () => {
            triggerAlienReaction();
        });
    }
    
    // Energy rings interaction
    if (elements.energyRings) {
        elements.energyRings.forEach(ring => {
            ring.addEventListener('mouseenter', () => {
                ring.style.animationPlayState = 'paused';
            });
            
            ring.addEventListener('mouseleave', () => {
                ring.style.animationPlayState = 'running';
            });
        });
    }
}

// Trigger Alien Reaction
function triggerAlienReaction() {
    if (!elements.alienCore) return;
    
    // Visual effect
    elements.alienCore.style.transform = 'scale(1.3) rotate(10deg)';
    elements.alienCore.style.filter = 'drop-shadow(0 0 50px var(--alien-color))';
    
    // Add message
    addAlienMessage('👽 *Telepathic communication initiated*');
    
    // Reset after animation
    setTimeout(() => {
        elements.alienCore.style.transform = '';
        elements.alienCore.style.filter = '';
    }, 1000);
}

// Timeline Step Activation
function activateStep(stepNumber) {
    // Update current step
    appState.currentStep = stepNumber;
    
    // Update visual state
    const steps = document.querySelectorAll('.timeline-step');
    steps.forEach((step, index) => {
        if (index + 1 <= stepNumber) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Trigger step-specific effects
    switch(stepNumber) {
        case 1:
            addAlienMessage('👽 Signal detected in Andromeda sector...');
            break;
        case 2:
            addAlienMessage('👽 First contact protocol initiated...');
            break;
        case 3:
            addAlienMessage('👽 Analysis complete. Entity classified as PumpAlien.');
            break;
    }
}

// Expand Information
function expandInfo(type) {
    const infoData = {
        biology: {
            title: '🧬 Biological Profile',
            content: `
                <div class="info-detail">
                    <h4>Species Classification</h4>
                    <p>PumpAlien represents an unknown branch of extraterrestrial evolution, 
                    existing as an energy-matter hybrid form.</p>
                    
                    <h4>Physical Composition</h4>
                    <p>The entity can transition between pure energy and solid matter states, 
                    suggesting advanced control over quantum physics.</p>
                    
                    <h4>Consciousness Level</h4>
                    <p>Intelligence beyond current human measurement capabilities, 
                    operating on multiple cognitive levels simultaneously.</p>
                </div>
            `
        },
        tech: {
            title: '⚡ Technological Capabilities',
            content: `
                <div class="info-detail">
                    <h4>Energy Manipulation</h4>
                    <p>Mastery over energy forms previously thought impossible, 
                    creating, destroying, and transforming energy at will.</p>
                    
                    <h4>Space-Time Control</h4>
                    <p>Advanced sensors detect localized distortions in space-time, 
                    suggesting manipulation of reality's fundamental fabric.</p>
                    
                    <h4>Communication Systems</h4>
                    <p>Quantum entanglement communication, bypassing normal 
                    communication limitations across any distance.</p>
                </div>
            `
        },
        behavior: {
            title: '🧠 Behavioral Patterns',
            content: `
                <div class="info-detail">
                    <h4>Motivation Analysis</h4>
                    <p>PumpAlien appears to be studying human civilization, 
                    though the purpose remains unclear.</p>
                    
                    <h4>Interaction Style</h4>
                    <p>Maintains non-hostile stance, respects boundaries and protocols, 
                    suggesting advanced social understanding.</p>
                    
                    <h4>Communication Method</h4>
                    <p>Telepathic communication, projecting thoughts directly into 
                    observers' minds, bypassing language barriers.</p>
                </div>
            `
        }
    };
    
    if (infoData[type]) {
        showModal(infoData[type].title, infoData[type].content);
    }
}

// Interactive Functions
function scanFrequency() {
    if (!elements.scannerDisplay) return;
    
    // Visual scanning effect
    const scanner = elements.scannerDisplay;
    scanner.style.background = 'linear-gradient(45deg, var(--accent-color), var(--alien-color))';
    
    // Simulate scanning
    setTimeout(() => {
        scanner.style.background = '';
        addAlienMessage('🔬 Frequency scan complete. Alien signals detected!');
        
        // Update energy level
        updateEnergyLevel(Math.random() * 100);
    }, 2000);
}

function sendMessage(event) {
    if (event && event.key !== 'Enter') return;
    
    const input = document.getElementById('human-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add human message
    addHumanMessage(message);
    input.value = '';
    
    // Simulate alien response
    setTimeout(() => {
        const responses = [
            '👽 *Telepathic acknowledgment received*',
            '👽 Your message has been processed, Earth being.',
            '👽 *Curious energy patterns detected*',
            '👽 Communication protocol established successfully.'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addAlienMessage(randomResponse);
    }, 1500);
}

function analyzeEnergy() {
    if (!elements.energyMeter) return;
    
    // Simulate energy analysis
    const newLevel = Math.random() * 100;
    updateEnergyLevel(newLevel);
    
    // Add analysis message
    addAlienMessage(`⚡ Energy analysis complete. Current level: ${Math.round(newLevel)}%`);
}

// Update Energy Level
function updateEnergyLevel(level) {
    if (!elements.energyMeter) return;
    
    appState.energyLevel = level;
    elements.energyMeter.style.width = `${level}%`;
    
    // Color change based on level
    if (level < 30) {
        elements.energyMeter.style.background = 'var(--energy-color)';
    } else if (level < 70) {
        elements.energyMeter.style.background = 'var(--accent-color)';
    } else {
        elements.energyMeter.style.background = 'var(--alien-color)';
    }
}

// Message Functions
function addAlienMessage(message) {
    addMessage(message, 'alien');
}

function addHumanMessage(message) {
    addMessage(`👤 ${message}`, 'human');
}

function addMessage(message, type) {
    if (!elements.messageDisplay) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}-message`;
    messageElement.textContent = message;
    
    elements.messageDisplay.appendChild(messageElement);
    elements.messageDisplay.scrollTop = elements.messageDisplay.scrollHeight;
    
    // Store message
    appState.messages.push({ text: message, type, timestamp: Date.now() });
}

// Reveal Finding
function revealFinding(findingNumber) {
    const findings = [
        {
            title: '🔬 Energy Patterns',
            content: 'Unique quantum signatures detected in PumpAlien\'s energy field. These patterns suggest advanced understanding of dimensional physics beyond current human knowledge.'
        },
        {
            title: '🌌 Dimensional Presence',
            content: 'PumpAlien exists across multiple dimensions simultaneously. Advanced sensors detected presence in 11 different dimensional planes, suggesting capabilities beyond three-dimensional constraints.'
        },
        {
            title: '💊 Pump Effect',
            content: 'The mysterious substance known as "Pump" appears to enhance PumpAlien\'s abilities. Research suggests it may be a catalyst for dimensional manipulation and energy amplification.'
        }
    ];
    
    if (findings[findingNumber - 1]) {
        const finding = findings[findingNumber - 1];
        showModal(finding.title, `<p>${finding.content}</p>`);
        
        // Add to findings list
        if (!appState.findings.includes(findingNumber)) {
            appState.findings.push(findingNumber);
        }
    }
}

// Hero Section Functions
function beginAlienContact() {
    const entitySection = document.querySelector('#entity');
    if (entitySection) {
        entitySection.scrollIntoView({ behavior: 'smooth' });
        
        // Trigger contact effect
        setTimeout(() => {
            triggerAlienReaction();
        }, 1000);
    }
}

function scanAlienSignals() {
    const interactiveSection = document.querySelector('#interactive');
    if (interactiveSection) {
        interactiveSection.scrollIntoView({ behavior: 'smooth' });
        
        // Auto-trigger scan
        setTimeout(() => {
            scanFrequency();
        }, 1000);
    }
}

// Alien Mode Toggle
function toggleAlienMode() {
    appState.alienMode = !appState.alienMode;
    
    if (appState.alienMode) {
        document.body.classList.add('alien-mode');
        addAlienMessage('👽 Alien mode activated. Enhanced perception enabled.');
    } else {
        document.body.classList.remove('alien-mode');
        addAlienMessage('👽 Alien mode deactivated. Returning to normal perception.');
    }
}

// Activate Beam
function activateBeam() {
    // Visual beam effect
    const beam = document.createElement('div');
    beam.className = 'energy-beam';
    beam.style.cssText = `
        position: fixed;
        top: 0;
        left: 50%;
        width: 10px;
        height: 100vh;
        background: linear-gradient(to bottom, var(--accent-color), var(--alien-color));
        transform: translateX(-50%);
        z-index: 1000;
        animation: beam-activate 2s ease-in-out;
    `;
    
    document.body.appendChild(beam);
    
    // Add beam effect to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes beam-activate {
            0% { opacity: 0; transform: translateX(-50%) scaleY(0); }
            50% { opacity: 1; transform: translateX(-50%) scaleY(1); }
            100% { opacity: 0; transform: translateX(-50%) scaleY(0); }
        }
    `;
    document.head.appendChild(style);
    
    // Remove beam after animation
    setTimeout(() => {
        document.body.removeChild(beam);
        addAlienMessage('⚡ Energy beam activated. Scanning complete.');
    }, 2000);
}

// Modal System
function showModal(title, content) {
    const modal = document.getElementById('info-modal');
    if (!modal) return;
    
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (modalTitle) modalTitle.textContent = title;
    if (modalBody) modalBody.innerHTML = content;
    
    modal.classList.add('show');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('info-modal');
    if (!modal) return;
    
    modal.classList.remove('show');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Keyboard Handler
function handleKeyboard(event) {
    switch(event.key) {
        case 'Escape':
            closeModal();
            break;
        case '1':
        case '2':
        case '3':
            activateStep(parseInt(event.key));
            break;
        case 'a':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                toggleAlienMode();
            }
            break;
        case 'b':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                activateBeam();
            }
            break;
    }
}

// Export functions for global access
window.activateStep = activateStep;
window.expandInfo = expandInfo;
window.scanFrequency = scanFrequency;
window.sendMessage = sendMessage;
window.analyzeEnergy = analyzeEnergy;
window.revealFinding = revealFinding;
window.beginAlienContact = beginAlienContact;
window.scanAlienSignals = scanAlienSignals;
window.toggleAlienMode = toggleAlienMode;
window.activateBeam = activateBeam;
window.closeModal = closeModal;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
