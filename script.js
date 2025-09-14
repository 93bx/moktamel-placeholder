// Smooth scrolling and interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Language toggle functionality
    const langButtons = document.querySelectorAll('.lang-btn');
    const htmlElement = document.documentElement;
    const elementsWithData = document.querySelectorAll('[data-en], [data-ar]');
    
    // Set initial language from localStorage or default to Arabic
    let currentLang = localStorage.getItem('selectedLanguage') || 'ar';
    updateLanguage(currentLang);
    
    // Add click event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            updateLanguage(selectedLang);
            localStorage.setItem('selectedLanguage', selectedLang);
        });
    });
    
    function updateLanguage(lang) {
        // Update HTML dir attribute for RTL support
        if (lang === 'ar') {
            htmlElement.setAttribute('dir', 'rtl');
            htmlElement.setAttribute('lang', 'ar');
        } else {
            htmlElement.setAttribute('dir', 'ltr');
            htmlElement.setAttribute('lang', 'en');
        }
        
        // Update button states
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        // Update text content
        elementsWithData.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
        
        // Update page title
        if (lang === 'ar') {
            document.title = 'مكتمل - قريباً';
        } else {
            document.title = 'Moktamel - Coming Soon';
        }
    }
    
    // Add mouse movement parallax effect to floating shapes
    const shapes = document.querySelectorAll('.floating-shape');
    const container = document.querySelector('.container');
    
    // Mouse parallax effect
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Add click animation to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Progress bar animation with realistic progress
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    // Simulate realistic progress updates
    const progressMessages = {
        en: [
            'Development in Progress',
            'Building Core Features',
            'Optimizing Performance',
            'Final Testing Phase',
            'Almost Ready!'
        ],
        ar: [
            'التطوير قيد التقدم',
            'بناء الميزات الأساسية',
            'تحسين الأداء',
            'مرحلة الاختبار النهائية',
            'تقريباً جاهز!'
        ]
    };
    
    let currentProgress = 0;
    let currentMessageIndex = 0;
    
    const updateProgress = () => {
        if (currentProgress < 75) {
            currentProgress += Math.random() * 2;
            progressFill.style.width = `${Math.min(currentProgress, 75)}%`;
            
            // Update message occasionally
            if (Math.random() < 0.1 && currentMessageIndex < progressMessages[currentLang].length - 1) {
                currentMessageIndex++;
                progressText.textContent = progressMessages[currentLang][currentMessageIndex];
            }
            
            setTimeout(updateProgress, 200 + Math.random() * 300);
        }
    };
    
    // Start progress animation after initial load
    setTimeout(updateProgress, 2000);
    
    // Add typing effect to the description
    const description = document.querySelector('.description');
    let originalText = description.textContent;
    description.textContent = '';
    
    let charIndex = 0;
    const typeWriter = () => {
        if (charIndex < originalText.length) {
            description.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Update typing effect when language changes
    function updateTypingEffect() {
        originalText = description.textContent;
        description.textContent = '';
        charIndex = 0;
        setTimeout(typeWriter, 100);
    }
    
    // Start typing effect after logo animation
    setTimeout(typeWriter, 1500);
    
    // Add typing effect update to language change
    const originalUpdateLanguage = updateLanguage;
    updateLanguage = function(lang) {
        originalUpdateLanguage(lang);
        currentLang = lang;
        setTimeout(updateTypingEffect, 100);
    };
    
    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.logo, .main-content, .features, .footer');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement && focusedElement.classList.contains('social-link')) {
                focusedElement.click();
            }
        }
    });
    
    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add a subtle entrance animation to the entire page
        const content = document.querySelector('.content');
        content.style.animation = 'fadeInUp 1s ease-out';
    });
    
    // Add performance optimization
    let ticking = false;
    
    function updateAnimations() {
        // Throttle animation updates for better performance
        if (!ticking) {
            requestAnimationFrame(() => {
                // Any frame-based animations can go here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Optimize scroll events
    let lastScrollTime = 0;
    window.addEventListener('scroll', function() {
        const now = Date.now();
        if (now - lastScrollTime > 16) { // ~60fps
            updateAnimations();
            lastScrollTime = now;
        }
    });
    
    // Add error handling for animations
    try {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // Disable animations for users who prefer reduced motion
            document.documentElement.style.setProperty('--animation-duration', '0.01s');
            document.documentElement.style.setProperty('--animation-delay', '0s');
        }
    } catch (error) {
        console.log('Animation preferences not supported');
    }
});

// Add service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
