// Global variables
let selectedOption = '';

// Function to select an option
function selectOption(option) {
    selectedOption = option;
    
    // Update visual feedback
    const tierA = document.querySelector('.tier-a');
    const tierB = document.querySelector('.tier-b');

    // Remove previous selections
    tierA.classList.remove('selected');
    tierB.classList.remove('selected');

    // Add selection to chosen tier
    if (option === 'A') {
        tierA.classList.add('selected');
    } else {
        tierB.classList.add('selected');
    }
    
    // Open contact modal
    openContact();
}

// Function to open contact modal
function openContact() {
    const modal = document.getElementById('contactModal');
    const optionSelect = document.getElementById('option');
    
    // Pre-select the option if one was chosen
    if (selectedOption) {
        optionSelect.value = selectedOption;
    }
    
    modal.style.display = 'block';
    
    // Add event listener to close modal when clicking outside
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const option = formData.get('option');
        const email = formData.get('email');
        const telegram = formData.get('telegram');
        const handle = formData.get('handle');

        // Create the message
        const optionText = option === 'A' ? 'Capital Operator' : 'IRv12 Society Member';
        const message = `4 COMMAS APPLICATION\n\nTier: ${optionText}\nEmail: ${email}\nContact: ${telegram}\nDesired Handle: ${handle}`;

        // Show success message
        showSuccessMessage(message);
        
        // Close modal
        closeModal();
        
        // Reset form
        form.reset();
        selectedOption = '';
        
        // Remove selection visual feedback
        document.querySelector('.tier-a').classList.remove('selected');
        document.querySelector('.tier-b').classList.remove('selected');
    });
});

// Function to show success message
function showSuccessMessage(message) {
    // Create success overlay
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';
    overlay.innerHTML = `
        <div class="success-content">
            <div class="success-icon">💎</div>
            <h3>Application Submitted to 4 Commas!</h3>
            <p>Your sovereign handle request has been recorded. You'll be contacted within 24 hours to begin your journey into the digital empire.</p>
            <div class="message-preview">
                <h4>Your Application:</h4>
                <pre>${message}</pre>
            </div>
            <button onclick="closeSuccess()" class="close-success-btn">CLOSE</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Auto-close after 10 seconds
    setTimeout(() => {
        closeSuccess();
    }, 10000);
}

// Function to close success message
function closeSuccess() {
    const overlay = document.querySelector('.success-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Initialize AOS and cinematic effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Initialize money canvas
    initMoneyCanvas();

    // Initialize number counters
    initCounters();

    // Initialize scroll triggers
    initScrollTriggers();

    // Smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Scroll to section function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// FAQ Toggle functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Open clicked item if it wasn't already active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Auction Countdown Timer
function startAuctionCountdown() {
    const auctionCountdownElement = document.getElementById('auction-countdown');
    if (!auctionCountdownElement) return;

    // Set auction end time (1.5 hours from now)
    const auctionEndTime = new Date().getTime() + (1.5 * 60 * 60 * 1000);

    function updateAuctionCountdown() {
        const now = new Date().getTime();
        const timeLeft = auctionEndTime - now;

        if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            auctionCountdownElement.textContent =
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            auctionCountdownElement.textContent = "AUCTION ENDED";
            auctionCountdownElement.style.color = "#EF4444";
        }
    }

    // Update immediately and then every second
    updateAuctionCountdown();
    setInterval(updateAuctionCountdown, 1000);
}

// Start auction countdown when page loads
document.addEventListener('DOMContentLoaded', function() {
    startAuctionCountdown();
});

// Money Canvas Animation
function initMoneyCanvas() {
    const canvas = document.getElementById('money-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const symbols = ['$', '€', '£', '¥', '₿', '◊'];
    const particles = [];

    class MoneyParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
            this.speed = Math.random() * 2 + 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.size = Math.random() * 20 + 10;
        }

        update() {
            this.y += this.speed;
            if (this.y > canvas.height) {
                this.y = -this.size;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#A855F7';
            ctx.font = `${this.size}px Arial`;
            ctx.fillText(this.symbol, this.x, this.y);
            ctx.restore();
        }
    }

    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new MoneyParticle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.glitch-number');

    const animateCounter = (counter) => {
        const target = counter.getAttribute('data-target');
        const isInfinity = target === '∞';

        if (isInfinity) {
            counter.textContent = '∞';
            return;
        }

        const targetNum = parseInt(target);
        const duration = 2000;
        const increment = targetNum / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNum) {
                counter.textContent = targetNum.toLocaleString();
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    };

    // Trigger counters when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => observer.observe(counter));
}

// Scroll Triggers
function initScrollTriggers() {
    let ticking = false;

    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Parallax effect on hero background
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.style.transform = `translateY(${rate}px)`;
        }

        // Floating protocols
        const protocols = document.querySelectorAll('.protocol-orb');
        protocols.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.1);
            orb.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// Scroll to section function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        closeModal();
        closeSuccess();
    }
    
    // Quick select options with number keys
    if (e.key === '1') {
        selectOption('A');
    } else if (e.key === '2') {
        selectOption('B');
    }
});

// Add loading animation for buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'PROCESSING...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Add hover effects and animations
document.addEventListener('DOMContentLoaded', function() {
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
    
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Add countdown timer (optional - can be activated)
function startCountdown(hours = 24) {
    const countdownElement = document.createElement('div');
    countdownElement.className = 'countdown-timer';
    countdownElement.innerHTML = `
        <div class="countdown-content">
            <span class="countdown-label">OFFER EXPIRES IN:</span>
            <span class="countdown-time" id="countdown-display"></span>
        </div>
    `;
    
    // Insert after header
    const header = document.querySelector('.header');
    header.insertAdjacentElement('afterend', countdownElement);
    
    const endTime = new Date().getTime() + (hours * 60 * 60 * 1000);
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('countdown-display').innerHTML = 'EXPIRED';
            return;
        }
        
        const hoursLeft = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('countdown-display').innerHTML = 
            `${hoursLeft.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Activate 2-hour countdown for the current offer
startCountdown(2);

// Hero Slides Functionality
let currentSlide = 1;
let slideInterval;

function goToSlide(slideNumber) {
    // Remove active class from current slide and dot
    document.querySelector('.hero-slide.active').classList.remove('active');
    document.querySelector('.slide-dot.active').classList.remove('active');

    // Add active class to new slide and dot
    document.querySelector(`[data-slide="${slideNumber}"]`).classList.add('active');
    document.querySelectorAll('.slide-dot')[slideNumber - 1].classList.add('active');

    currentSlide = slideNumber;

    // Reset auto-advance timer
    clearInterval(slideInterval);
    startSlideTimer();
}

function nextSlide() {
    const nextSlideNumber = currentSlide >= 3 ? 1 : currentSlide + 1;
    goToSlide(nextSlideNumber);
}

function startSlideTimer() {
    slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
}

// Initialize hero slides when page loads
document.addEventListener('DOMContentLoaded', function() {
    startSlideTimer();

    // Pause auto-advance on hover
    const heroSlides = document.querySelector('.hero-slides');
    if (heroSlides) {
        heroSlides.addEventListener('mouseenter', () => clearInterval(slideInterval));
        heroSlides.addEventListener('mouseleave', startSlideTimer);
    }
});

// Scroll to Top Button
window.addEventListener('scroll', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Chat Agent Functionality
let chatOpen = false;

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatOpen = !chatOpen;

    if (chatOpen) {
        chatWindow.classList.add('open');
    } else {
        chatWindow.classList.remove('open');
    }
}

function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (message === '') return;

    // Add user message
    addMessage(message, 'user');
    input.value = '';

    // Generate bot response
    setTimeout(() => {
        const response = generateResponse(message);
        addMessage(response, 'bot');
    }, 500);
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `<p>${text}</p>`;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // Protocol-related questions
    if (message.includes('protocol') || message.includes('infrastructure')) {
        return "The Syndicate Ledger includes 5 main protocol categories: Identity Protocols (.signatureai, .textme), Trade Infrastructure (.madeinusa, .ftz), Agent Networks (.aiagents, .mcpserver), Hardware Protocols (.superchip, .neuralprocessor), and Tokenization Layers (.utilitycoin, .aitokens). Each powers different aspects of the New Internet.";
    }

    // Tier-related questions
    if (message.includes('tier') || message.includes('price') || message.includes('cost')) {
        return "We offer 5 tiers: Angel ($100) - 1 subdomain + agent; Builder ($250) - 2 subdomains + priority access; Architect ($500) - 3 subdomains + 1% profit participation; Syndicate ($1,000) - 5+ agents + 2% yield; Empire ($2,500+) - Full protocol access + 3% yield + governance rights.";
    }

    // New Internet questions
    if (message.includes('new internet') || message.includes('infrastructure')) {
        return "The New Internet is built on: 🧠 AI agents instead of apps, 🌐 Protocol identities instead of profiles, 🪙 Utility coins + AI tokens instead of ad revenue, and 📡 Decentralized routes instead of platforms. You're securing the infrastructure that powers this transformation.";
    }

    // Token/coin questions
    if (message.includes('token') || message.includes('coin') || message.includes('utility')) {
        return "All protocols support: A native Utility Coin for minting/licensing/transactions, AI Tokens that wrap individual agents/platforms, and a future conversion path to equity via Syndicate-backed asset pools. This is infrastructure-to-own, not play-to-earn.";
    }

    // Benefits questions
    if (message.includes('benefit') || message.includes('get') || message.includes('receive')) {
        return "Benefits include: 🪪 Ledger Identity (name in protocol wall), 🛠️ Subdomain + AI Agent Licenses, 💸 Profit Flow Access (% of monetization), 🎟️ Priority Launch Access, and 🧠 Governance Input on select protocols. Higher tiers get more benefits.";
    }

    // Investment/security questions
    if (message.includes('investment') || message.includes('security') || message.includes('legal')) {
        return "This is NOT a security or traditional investment. You're purchasing access rights to protocol infrastructure, including subdomain minting privileges, AI agent licenses, and profit participation. Think of it as a digital infrastructure license with yield mechanics.";
    }

    // How it works
    if (message.includes('how') || message.includes('work') || message.includes('process')) {
        return "1) Choose your tier based on desired access level, 2) Contribute to secure your position, 3) Receive dashboard access within 24 hours, 4) Start minting subdomains and deploying AI agents, 5) Earn from protocol monetization. No ongoing fees or commitments.";
    }

    // Risk questions
    if (message.includes('risk') || message.includes('safe') || message.includes('guarantee')) {
        return "The Syndicate Ledger is diversified across multiple protocols. If one underperforms, others may compensate. Your access rights remain valid even if revenue is lower than projected. No guarantees on returns - this is infrastructure development with inherent risks.";
    }

    // Default response
    return "I can help with questions about protocols, tiers, the New Internet infrastructure, tokens, benefits, or how the Syndicate Ledger works. What specific aspect would you like to know more about?";
}
