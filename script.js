// PumpAlien Discovery - Interactive Experience
// Optimized for Alien Elements and User Engagement

// Global State
const appState = {
    isLoading: true,
    currentStep: 1,
    alienMode: false,
    energyLevel: 0,
    messages: [],
    findings: [],
    ufoPositions: [],
    alienPositions: [],
    globalElements: []
};

// DOM Elements
const elements = {
    loadingScreen: null,
    alienCore: null,
    energyRings: null,
    scannerDisplay: null,
    energyMeter: null,
    messageDisplay: null,
    floatingUfos: null,
    floatingAlien: null,
    globalFloatingContainer: null
};

// Main Initialization
function initializeApp() {
    cacheElements();
    setupEventListeners();
    startLoadingSequence();
    initializeFloatingElements();
    generateGlobalFloatingElements();
    console.log('👽 PumpAlien Discovery Project Initialized');
}

// Cache DOM Elements
function cacheElements() {
    elements.loadingScreen = document.getElementById('loading-screen');
    elements.alienCore = document.querySelector('.alien-core-img');
    elements.energyRings = document.querySelectorAll('.ring');
    elements.scannerDisplay = document.querySelector('.scanner-display');
    elements.energyMeter = document.getElementById('energy-level');
    elements.messageDisplay = document.getElementById('message-display');
    elements.floatingUfos = document.querySelectorAll('.floating-ufo');
    elements.floatingAlien = document.querySelector('.floating-alien-img');
    elements.globalFloatingContainer = document.getElementById('global-floating-elements');
}

// Setup Event Listeners
function setupEventListeners() {
    document.addEventListener('keydown', handleKeyboard);
    setupScrollAnimations();
    setupAlienInteractions();
    setupFloatingElementInteractions();
}

// Initialize Floating Elements
function initializeFloatingElements() {
    // Initialize UFO positions
    elements.floatingUfos.forEach((ufo, index) => {
        const randomX = Math.random() * 80 + 10; // 10% to 90%
        const randomY = Math.random() * 60 + 20; // 20% to 80%
        ufo.style.left = `${randomX}%`;
        ufo.style.top = `${randomY}%`;
        
        // Add random animation delays
        ufo.style.animationDelay = `${Math.random() * 10}s`;
    });
    
    // Initialize alien position
    if (elements.floatingAlien) {
        const randomX = Math.random() * 60 + 20; // 20% to 80%
        const randomY = Math.random() * 40 + 30; // 30% to 70%
        elements.floatingAlien.style.right = `${100 - randomX}%`;
        elements.floatingAlien.style.top = `${randomY}%`;
    }
}

// Setup Floating Element Interactions
function setupFloatingElementInteractions() {
    // UFO click effects
    elements.floatingUfos.forEach(ufo => {
        ufo.addEventListener('click', () => {
            triggerUfoEffect(ufo);
        });
    });
    
    // Alien click effects
    if (elements.floatingAlien) {
        elements.floatingAlien.addEventListener('click', () => {
            triggerAlienEffect();
        });
    }
}

// Trigger UFO Effect
function triggerUfoEffect(ufo) {
    ufo.style.transform = 'scale(1.3) rotate(15deg)';
    ufo.style.filter = 'drop-shadow(0 0 40px var(--ufo-color))';
    
    // Add message
    addAlienMessage('🛸 UFO signal detected!');
    
    setTimeout(() => {
        ufo.style.transform = '';
        ufo.style.filter = '';
    }, 1000);
}

// Trigger Alien Effect
function triggerAlienEffect() {
    if (!elements.floatingAlien) return;
    
    elements.floatingAlien.style.transform = 'scale(1.4) rotate(10deg)';
    elements.floatingAlien.style.filter = 'drop-shadow(0 0 50px var(--alien-color))';
    
    addAlienMessage('👽 *Telepathic wave detected*');
    
    setTimeout(() => {
        elements.floatingAlien.style.transform = '';
        elements.floatingAlien.style.filter = '';
    }, 1000);
}

// Start Loading Sequence
function startLoadingSequence() {
    const loadingSteps = [
        'Initializing cosmic sensors...',
        'Calibrating alien detection systems...',
        'Establishing dimensional connections...',
        'PumpAlien entity located...',
        'Welcome to the discovery...'
    ];
    
    let currentStep = 0;
    const statusElement = document.querySelector('.loading-status');
    const progressElement = document.querySelector('.loading-progress');
    
    const updateLoading = () => {
        if (currentStep < loadingSteps.length) {
            statusElement.textContent = loadingSteps[currentStep];
            progressElement.style.width = `${((currentStep + 1) / loadingSteps.length) * 100}%`;
            currentStep++;
            setTimeout(updateLoading, 800);
        } else {
            setTimeout(() => {
                elements.loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    elements.loadingScreen.style.display = 'none';
                    startAlienAnimations();
                }, 500);
            }, 1000);
        }
    };
    
    updateLoading();
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

// Setup Alien Interactions
function setupAlienInteractions() {
    if (elements.alienCore) {
        elements.alienCore.addEventListener('click', triggerAlienReaction);
    }
    
    if (elements.energyRings) {
        elements.energyRings.forEach(ring => {
            ring.addEventListener('mouseenter', () => {
                ring.style.borderWidth = '3px';
                ring.style.opacity = '1';
            });
            
            ring.addEventListener('mouseleave', () => {
                ring.style.borderWidth = '2px';
                ring.style.opacity = '0.6';
            });
        });
    }
}

// Trigger Alien Reaction
function triggerAlienReaction() {
    if (!elements.alienCore) return;
    
    elements.alienCore.style.transform = 'scale(1.3) rotate(10deg)';
    elements.alienCore.style.filter = 'drop-shadow(0 0 60px var(--alien-color))';
    
    addAlienMessage('👽 *Telepathic communication initiated*');
    
    // Trigger energy ring pulse
    elements.energyRings.forEach((ring, index) => {
        setTimeout(() => {
            ring.style.borderWidth = '4px';
            ring.style.opacity = '1';
            setTimeout(() => {
                ring.style.borderWidth = '2px';
                ring.style.opacity = '0.6';
            }, 300);
        }, index * 100);
    });
    
    setTimeout(() => {
        elements.alienCore.style.transform = '';
        elements.alienCore.style.filter = '';
    }, 1000);
}

// Timeline Step Activation
function activateStep(stepNumber) {
    appState.currentStep = stepNumber;
    const steps = document.querySelectorAll('.timeline-step');
    
    steps.forEach((step, index) => {
        if (index + 1 <= stepNumber) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
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

// Interactive Functions
function scanFrequency() {
    const scanner = elements.scannerDisplay;
    if (!scanner) return;
    
    // Add scanning effect
    scanner.style.boxShadow = 'inset 0 0 30px var(--accent-color)';
    
    setTimeout(() => {
        scanner.style.boxShadow = '';
        addAlienMessage('🔍 Frequency scan complete. Multiple signals detected.');
    }, 2000);
}

function sendMessage(event) {
    if (event && event.key !== 'Enter') return;
    
    const input = document.getElementById('human-input');
    const message = input.value.trim();
    
    if (message) {
        addHumanMessage(message);
        input.value = '';
        
        // Simulate alien response
        setTimeout(() => {
            const responses = [
                '👽 *Telepathic understanding*',
                '👽 Your message has been received...',
                '👽 *Cosmic resonance detected*',
                '👽 The PumpAlien acknowledges your communication'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addAlienMessage(randomResponse);
        }, 1000 + Math.random() * 2000);
    }
}

function analyzeEnergy() {
    const newLevel = Math.min(100, appState.energyLevel + Math.random() * 30);
    updateEnergyLevel(newLevel);
    
    if (newLevel > 80) {
        addAlienMessage('⚡ Energy levels critical! PumpAlien entity stabilizing...');
    } else if (newLevel > 50) {
        addAlienMessage('⚡ Energy levels moderate. Entity status: Stable');
    } else {
        addAlienMessage('⚡ Energy levels low. Entity requires energy boost');
    }
}

function updateEnergyLevel(level) {
    appState.energyLevel = level;
    if (elements.energyMeter) {
        elements.energyMeter.style.width = `${level}%`;
    }
}

function addAlienMessage(text) {
    addMessage(text, 'alien');
}

function addHumanMessage(text) {
    addMessage(text, 'human');
}

function addMessage(text, type) {
    if (!elements.messageDisplay) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'alien' ? 'alien-message' : 'human-message';
    messageDiv.textContent = text;
    
    elements.messageDisplay.appendChild(messageDiv);
    elements.messageDisplay.scrollTop = elements.messageDisplay.scrollHeight;
    
    // Auto-remove old messages
    if (elements.messageDisplay.children.length > 10) {
        elements.messageDisplay.removeChild(elements.messageDisplay.firstChild);
    }
}

// Research Functions
function revealFinding(findingId) {
    const findings = {
        1: {
            title: 'Energy Patterns',
            content: 'Unique quantum signatures detected in PumpAlien\'s energy field. The entity appears to exist in a state of quantum superposition, allowing it to interact with multiple dimensions simultaneously.',
            icon: '🔬'
        },
        2: {
            title: 'Dimensional Presence',
            content: 'Advanced scanning reveals PumpAlien exists across 11 dimensions. This multi-dimensional nature explains its ability to manipulate space-time and energy fields beyond our current understanding.',
            icon: '🌌'
        },
        3: {
            title: 'Pump Effect',
            content: 'The mysterious substance consumed by PumpAlien appears to be a dimensional catalyst. It enhances the entity\'s abilities and allows it to bridge between different cosmic realms.',
            icon: '💊'
        }
    };
    
    const finding = findings[findingId];
    if (finding) {
        showModal(finding.title, finding.content, finding.icon);
    }
}

// Hero Section Functions
function beginAlienContact() {
    addAlienMessage('👽 *Initiating first contact protocol*');
    addAlienMessage('👽 Greetings, Earth beings. I am PumpAlien, entity XT-2024-001.');
    
    // Trigger visual effects
    if (elements.alienCore) {
        triggerAlienReaction();
    }
}

function scanAlienSignals() {
    addAlienMessage('🔍 *Scanning for alien signals*');
    addAlienMessage('🔍 Multiple frequencies detected. PumpAlien signature confirmed.');
    
    // Trigger scanner effect
    scanFrequency();
}

// Alien Mode Toggle
function toggleAlienMode() {
    appState.alienMode = !appState.alienMode;
    document.body.classList.toggle('alien-mode', appState.alienMode);
    
    if (appState.alienMode) {
        addAlienMessage('👽 Alien mode activated. Enhanced perception enabled.');
    } else {
        addAlienMessage('👽 Alien mode deactivated. Returning to normal perception.');
    }
}

// Activate Beam
function activateBeam() {
    addAlienMessage('🚀 *Activating cosmic beam*');
    addAlienMessage('🚀 Dimensional portal opening...');
    
    // Add visual effect
    document.body.style.filter = 'hue-rotate(180deg)';
    setTimeout(() => {
        document.body.style.filter = '';
    }, 2000);
}

// Modal System
function showModal(title, content, icon = '') {
    const modal = document.getElementById('info-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (modal && modalTitle && modalBody) {
        modalTitle.textContent = title;
        modalBody.innerHTML = `
            <div style="text-align: center; margin-bottom: 1rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">${icon}</div>
                <p>${content}</p>
            </div>
        `;
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('info-modal');
    if (modal) {
        modal.style.display = 'none';
    }
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
        case 'Enter':
            if (document.activeElement.id === 'human-input') {
                sendMessage();
            }
            break;
    }
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Generate Global Floating Elements
function generateGlobalFloatingElements() {
    if (!elements.globalFloatingContainer) return;
    
    // Clear existing elements
    elements.globalFloatingContainer.innerHTML = '';
    
    // Generate UFOs
    for (let i = 0; i < 8; i++) {
        createGlobalElement('ufo', i);
    }
    
    // Generate Aliens
    for (let i = 0; i < 6; i++) {
        createGlobalElement('alien', i);
    }
    
    // Generate Pumps
    for (let i = 0; i < 5; i++) {
        createGlobalElement('pump', i);
    }
    
    // Generate Stars
    for (let i = 0; i < 12; i++) {
        createGlobalElement('star', i);
    }
}

// Create Global Floating Element
function createGlobalElement(type, index) {
    const element = document.createElement('div');
    element.className = `global-floating-element global-${type}`;
    
    // Set random position
    const x = Math.random() * 90 + 5; // 5% to 95%
    const y = Math.random() * 90 + 5; // 5% to 95%
    
    element.style.left = `${x}%`;
    element.style.top = `${y}%`;
    
    // Add random animation delay
    element.style.animationDelay = `${Math.random() * 10}s`;
    
    // Add click event
    element.addEventListener('click', () => {
        triggerGlobalElementEffect(type, element);
    });
    
    // Add to container
    elements.globalFloatingContainer.appendChild(element);
    
    // Store reference
    appState.globalElements.push({
        element: element,
        type: type,
        x: x,
        y: y
    });
}

// Trigger Global Element Effect
function triggerGlobalElementEffect(type, element) {
    switch(type) {
        case 'ufo':
            element.style.transform = 'scale(1.4) rotate(20deg)';
            element.style.filter = 'drop-shadow(0 0 40px var(--ufo-color))';
            addAlienMessage('🛸 Global UFO signal detected!');
            break;
        case 'alien':
            element.style.transform = 'scale(1.5) rotate(15deg)';
            element.style.filter = 'drop-shadow(0 0 50px var(--alien-color))';
            addAlienMessage('👽 *Global telepathic wave*');
            break;
        case 'pump':
            element.style.transform = 'scale(1.6)';
            element.style.filter = 'drop-shadow(0 0 60px var(--pump-color))';
            addAlienMessage('💊 Global pump effect activated!');
            break;
        case 'star':
            element.style.transform = 'scale(1.8)';
            element.style.filter = 'drop-shadow(0 0 30px var(--accent-color))';
            addAlienMessage('⭐ Cosmic energy surge detected!');
            break;
    }
    
    setTimeout(() => {
        element.style.transform = '';
        element.style.filter = '';
    }, 1000);
}

// Export functions for global access
window.activateStep = activateStep;
window.expandInfo = showModal;
window.scanFrequency = scanFrequency;
window.sendMessage = sendMessage;
window.analyzeEnergy = analyzeEnergy;
window.revealFinding = revealFinding;
window.beginAlienContact = beginAlienContact;
window.scanAlienSignals = scanAlienSignals;
window.toggleAlienMode = toggleAlienMode;
window.activateBeam = activateBeam;
window.closeModal = closeModal;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
