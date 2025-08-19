// Cosmic Research Institute - PumpAlien Discovery Project
// Professional JavaScript Implementation

// Global State Management
const appState = {
    isLoading: true,
    currentSection: 'hero',
    classifiedMode: false,
    terminalHistory: [],
    modalOpen: false
};

// DOM Elements Cache
const elements = {
    loadingScreen: null,
    nav: null,
    terminal: null,
    modal: null
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main Initialization Function
function initializeApp() {
    cacheElements();
    setupEventListeners();
    startLoadingSequence();
    
    console.log('🚀 Cosmic Research Institute - PumpAlien Discovery Project Initialized');
}

// Cache DOM Elements
function cacheElements() {
    elements.loadingScreen = document.getElementById('loading-screen');
    elements.nav = document.querySelector('.main-nav');
    elements.terminal = document.getElementById('terminal-input');
    elements.modal = document.getElementById('analysis-modal');
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation scroll effects
    setupNavigationEffects();
    
    // Terminal functionality
    setupTerminal();
    
    // Form submissions
    setupFormHandlers();
    
    // Keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Intersection Observer for animations
    setupScrollAnimations();
}

// Loading Sequence
function startLoadingSequence() {
    const loadingSteps = [
        'Initializing classified protocols...',
        'Loading PumpAlien research data...',
        'Establishing secure connections...',
        'Access granted. Welcome, Researcher.'
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
    
    // Simulate loading completion after 6 seconds
    setTimeout(() => {
        clearInterval(statusInterval);
        completeLoading();
    }, 6000);
}

// Complete Loading Sequence
function completeLoading() {
    elements.loadingScreen.classList.add('fade-out');
    
    setTimeout(() => {
        elements.loadingScreen.style.display = 'none';
        appState.isLoading = false;
        
        // Initialize hero section animations
        initializeHeroAnimations();
        
        // Show navigation
        showNavigation();
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

// Show Navigation
function showNavigation() {
    elements.nav.style.transform = 'translateY(0)';
    elements.nav.style.opacity = '1';
}

// Navigation Effects
function setupNavigationEffects() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class for styling
        if (currentScrollY > 100) {
            elements.nav.classList.add('scrolled');
        } else {
            elements.nav.classList.remove('scrolled');
        }
        
        // Hide/show navigation on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            elements.nav.style.transform = 'translateY(-100%)';
        } else {
            elements.nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
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
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.timeline-item, .analysis-card, .finding-item, .protocol-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Terminal System
function setupTerminal() {
    if (!elements.terminal) return;
    
    const terminalCommands = {
        help: {
            description: 'Show available commands',
            execute: () => showTerminalHelp()
        },
        clear: {
            description: 'Clear terminal output',
            execute: () => clearTerminal()
        },
        status: {
            description: 'Show system status',
            execute: () => showSystemStatus()
        },
        scan: {
            description: 'Scan for PumpAlien signals',
            execute: () => scanForSignals()
        },
        analyze: {
            description: 'Analyze current data',
            execute: () => analyzeData()
        },
        classified: {
            description: 'Toggle classified mode',
            execute: () => toggleClassifiedMode()
        }
    };
    
    // Store commands globally for access
    window.terminalCommands = terminalCommands;
}

// Handle Terminal Commands
function handleTerminalCommand(event) {
    if (event.key === 'Enter') {
        const input = event.target.value.trim();
        if (input) {
            executeCommand(input);
            event.target.value = '';
        }
    }
}

// Execute Terminal Command
function executeCommand(input) {
    const command = input.toLowerCase().split(' ')[0];
    const args = input.split(' ').slice(1);
    
    addTerminalOutput(`> ${input}`);
    
    if (window.terminalCommands && window.terminalCommands[command]) {
        try {
            window.terminalCommands[command].execute(args);
        } catch (error) {
            addTerminalOutput(`Error: ${error.message}`);
        }
    } else {
        addTerminalOutput(`Command not found: ${command}. Type 'help' for available commands.`);
    }
}

// Terminal Output Functions
function addTerminalOutput(message) {
    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalOutput) return;
    
    const outputLine = document.createElement('div');
    outputLine.className = 'output-line';
    outputLine.textContent = message;
    
    terminalOutput.appendChild(outputLine);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function clearTerminal() {
    const terminalOutput = document.getElementById('terminal-output');
    if (terminalOutput) {
        terminalOutput.innerHTML = '';
        addTerminalOutput('Terminal cleared.');
    }
}

// Terminal Commands Implementation
function showTerminalHelp() {
    const helpText = [
        'Available Commands:',
        '  help      - Show this help message',
        '  clear     - Clear terminal output',
        '  status    - Show system status',
        '  scan      - Scan for PumpAlien signals',
        '  analyze   - Analyze current data',
        '  classified - Toggle classified mode'
    ];
    
    helpText.forEach(line => addTerminalOutput(line));
}

function showSystemStatus() {
    const status = [
        'System Status:',
        `  Loading: ${appState.isLoading ? 'Yes' : 'No'}`,
        `  Classified Mode: ${appState.classifiedMode ? 'Active' : 'Inactive'}`,
        `  Current Section: ${appState.currentSection}`,
        `  Security Level: ${appState.classifiedMode ? 'Classified' : 'Public'}`,
        '  All systems operational.'
    ];
    
    status.forEach(line => addTerminalOutput(line));
}

function scanForSignals() {
    addTerminalOutput('Initiating signal scan...');
    
    setTimeout(() => {
        const signals = Math.floor(Math.random() * 5);
        if (signals > 0) {
            addTerminalOutput(`Scan complete. Found ${signals} potential signal(s)!`);
            addTerminalOutput('Analyzing signal patterns...');
            
            setTimeout(() => {
                addTerminalOutput('Signal analysis complete. Patterns suggest PumpAlien activity.');
            }, 2000);
        } else {
            addTerminalOutput('Scan complete. No signals detected in current frequency range.');
        }
    }, 3000);
}

function analyzeData() {
    addTerminalOutput('Starting data analysis...');
    
    const analysisSteps = [
        'Loading research data...',
        'Analyzing biological patterns...',
        'Processing energy signatures...',
        'Cross-referencing with known entities...',
        'Analysis complete.'
    ];
    
    let step = 0;
    const analysisInterval = setInterval(() => {
        if (step < analysisSteps.length) {
            addTerminalOutput(analysisSteps[step]);
            step++;
        } else {
            clearInterval(analysisInterval);
            addTerminalOutput('Results: PumpAlien shows unprecedented complexity. Further research required.');
        }
    }, 1000);
}

// Classified Mode Toggle
function toggleClassifiedMode() {
    appState.classifiedMode = !appState.classifiedMode;
    
    if (appState.classifiedMode) {
        document.body.classList.add('classified-mode');
        addTerminalOutput('Classified mode activated. Enhanced security protocols enabled.');
    } else {
        document.body.classList.remove('classified-mode');
        addTerminalOutput('Classified mode deactivated. Returning to public mode.');
    }
    
    updateClassifiedModeUI();
}

// Update Classified Mode UI
function updateClassifiedModeUI() {
    const classifiedElements = document.querySelectorAll('.classified-content');
    classifiedElements.forEach(el => {
        if (appState.classifiedMode) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    });
}

// Form Handlers
function setupFormHandlers() {
    const contactForm = document.querySelector('.secure-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

// Handle Contact Form Submission
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const clearance = formData.get('security-clearance');
    const message = formData.get('contact-message');
    
    if (!clearance || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Secure message sent successfully. Research team will respond within 24 hours.', 'success');
    
    // Reset form
    event.target.reset();
    
    // Log to terminal if available
    if (elements.terminal) {
        addTerminalOutput(`Secure message sent via ${clearance} clearance level.`);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Keyboard Shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (event) => {
        // Ctrl/Cmd + K to focus terminal
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            if (elements.terminal) {
                elements.terminal.focus();
            }
        }
        
        // Escape to close modals
        if (event.key === 'Escape') {
            closeModal();
        }
        
        // Ctrl/Cmd + / to toggle classified mode
        if ((event.ctrlKey || event.metaKey) && event.key === '/') {
            event.preventDefault();
            toggleClassifiedMode();
        }
    });
}

// Modal System
function showModal(title, content) {
    const modal = document.getElementById('analysis-modal');
    if (!modal) return;
    
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (modalTitle) modalTitle.textContent = title;
    if (modalBody) modalBody.innerHTML = content;
    
    modal.classList.add('show');
    appState.modalOpen = true;
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('analysis-modal');
    if (!modal) return;
    
    modal.classList.remove('show');
    appState.modalOpen = false;
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Analysis Modal Functions
function viewDetailedAnalysis(type) {
    const analysisData = {
        biological: {
            title: 'Biological Profile - Detailed Analysis',
            content: `
                <div class="analysis-detail">
                    <h4>Species Classification</h4>
                    <p>PumpAlien represents a previously unknown branch of extraterrestrial evolution, 
                    exhibiting characteristics that challenge our understanding of biological possibility.</p>
                    
                    <h4>Physical Composition</h4>
                    <p>The entity appears to exist in a state between pure energy and solid matter, 
                    capable of transitioning between forms at will. This suggests advanced control over 
                    quantum states and dimensional physics.</p>
                    
                    <h4>Consciousness Analysis</h4>
                    <p>Initial attempts to measure consciousness levels have failed, suggesting 
                    intelligence beyond current human measurement capabilities. The entity appears 
                    to operate on multiple cognitive levels simultaneously.</p>
                    
                    <h4>Lifespan Assessment</h4>
                    <p>No signs of aging or cellular decay have been observed. The entity may be 
                    effectively immortal, existing outside normal temporal constraints.</p>
                </div>
            `
        },
        technological: {
            title: 'Technological Capabilities - Detailed Analysis',
            content: `
                <div class="analysis-detail">
                    <h4>Energy Manipulation</h4>
                    <p>PumpAlien demonstrates mastery over energy forms previously thought impossible. 
                    The entity can create, destroy, and transform energy at will, suggesting understanding 
                    of physics beyond current human knowledge.</p>
                    
                    <h4>Space-Time Control</h4>
                    <p>Advanced sensors have detected localized distortions in space-time around 
                    the entity. This suggests the ability to manipulate the fundamental fabric of reality, 
                    a technology that could revolutionize human understanding of physics.</p>
                    
                    <h4>Communication Systems</h4>
                    <p>The entity communicates through quantum entanglement, bypassing normal 
                    communication limitations. This technology could enable instant communication 
                    across any distance.</p>
                    
                    <h4>Threat Assessment</h4>
                    <p>While PumpAlien has shown no hostile intent, its capabilities represent 
                    a potential threat if misused. Current containment protocols are designed 
                    to prevent any unauthorized access to these technologies.</p>
                </div>
            `
        },
        behavioral: {
            title: 'Behavioral Patterns - Detailed Analysis',
            content: `
                <div class="analysis-detail">
                    <h4>Motivation Analysis</h4>
                    <p>PumpAlien's motivations remain unclear. The entity appears to be studying 
                    human civilization, but the purpose of this observation is unknown. Theories 
                    range from scientific curiosity to preparation for contact.</p>
                    
                    <h4>Interaction Patterns</h4>
                    <p>The entity has maintained a non-hostile stance throughout all encounters. 
                    It appears to respect boundaries and protocols, suggesting advanced understanding 
                    of social dynamics and cultural sensitivity.</p>
                    
                    <h4>Communication Methods</h4>
                    <p>PumpAlien communicates through telepathic means, projecting thoughts and 
                    concepts directly into the minds of observers. This method bypasses language 
                    barriers and cultural differences.</p>
                    
                    <h4>Social Structure</h4>
                    <p>Current observations suggest PumpAlien operates as an individual entity, 
                    though this may be a limitation of our observation methods. The entity may 
                    be part of a larger collective consciousness or civilization.</p>
                </div>
            `
        }
    };
    
    if (analysisData[type]) {
        showModal(analysisData[type].title, analysisData[type].content);
    }
}

// Hero Section Functions
function beginInvestigation() {
    const discoverySection = document.getElementById('discovery');
    if (discoverySection) {
        discoverySection.scrollIntoView({ behavior: 'smooth' });
        appState.currentSection = 'discovery';
    }
}

function viewClassifiedFiles() {
    if (!appState.classifiedMode) {
        showNotification('Classified mode required to access restricted files.', 'warning');
        return;
    }
    
    showModal('Classified Files - PumpAlien Research', `
        <div class="classified-files">
            <h4>Restricted Access Files</h4>
            <p>Welcome to the classified research database. The following files contain 
            sensitive information about PumpAlien and related phenomena.</p>
            
            <div class="file-list">
                <div class="file-item">
                    <span class="file-icon">📄</span>
                    <span class="file-name">XT-2024-001_Initial_Contact.pdf</span>
                    <span class="file-status">Classified</span>
                </div>
                <div class="file-item">
                    <span class="file-icon">📄</span>
                    <span class="file-name">PumpAlien_Biological_Analysis.pdf</span>
                    <span class="file-status">Classified</span>
                </div>
                <div class="file-item">
                    <span class="file-icon">📄</span>
                    <span class="file-name">Energy_Signature_Research.pdf</span>
                    <span class="file-status">Classified</span>
                </div>
                <div class="file-item">
                    <span class="file-icon">📄</span>
                    <span class="file-name">Contact_Protocols_v2.1.pdf</span>
                    <span class="file-status">Classified</span>
                </div>
            </div>
            
            <p class="warning">⚠️ These files contain sensitive information. Unauthorized access 
            will result in immediate termination of research privileges.</p>
        </div>
    `);
}

// Secure Terminal Access
function accessSecureTerminal() {
    const terminalSection = document.querySelector('.terminal-section');
    if (terminalSection) {
        terminalSection.scrollIntoView({ behavior: 'smooth' });
        
        // Focus terminal after scroll
        setTimeout(() => {
            if (elements.terminal) {
                elements.terminal.focus();
            }
        }, 1000);
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance Optimization
const optimizedScrollHandler = debounce(() => {
    // Handle scroll-based animations and effects
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Export functions for global access
window.beginInvestigation = beginInvestigation;
window.viewClassifiedFiles = viewClassifiedFiles;
window.accessSecureTerminal = accessSecureTerminal;
window.toggleClassifiedMode = toggleClassifiedMode;
window.viewDetailedAnalysis = viewDetailedAnalysis;
window.closeModal = closeModal;
window.handleTerminalCommand = handleTerminalCommand;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
