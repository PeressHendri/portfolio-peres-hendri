class PortfolioWebsite {
    constructor() {
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupThemeToggle();
        this.setupScrollProgress();
        this.setupScrollAnimations();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupFormHandling();
        this.setupParallaxEffect();
        this.setupTypingEffect();
        this.setupProjectCardInteractions();
        this.setupSkillTagAnimations();
        this.setupContactLinkAnimations();
        this.setupKeyboardShortcuts();
        this.setupPerformanceOptimizations();
        this.setupMatrixBackground();
        this.setupBinaryAnimation();
        this.setupRandomLetters();
        this.setupGlitchEffects();
        this.setupScrollToTop();
        this.setupCookieBanner();
        this.setupErrorHandling();
        this.setupCVDownload();
    }

    setupThemeToggle() {
        const body = document.body;

        // Set initial theme
        if (this.isDarkMode) {
            body.classList.add('dark');
        }

        // Simple theme toggle function
        const toggleTheme = () => {
            this.isDarkMode = !this.isDarkMode;
            body.classList.toggle('dark');
            localStorage.setItem('darkMode', this.isDarkMode.toString());
            console.log('Theme toggled:', this.isDarkMode ? 'dark' : 'light');
        };

        // Event delegation for all theme toggles
        document.addEventListener('click', (e) => {
            // Check if clicked element is a theme toggle
            const themeToggle = e.target.closest('.theme-toggle');
            const mobileThemeToggle = e.target.closest('.mobile-theme-toggle');
            
            if (themeToggle || mobileThemeToggle) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle theme
                toggleTheme();
                
                // Visual feedback
                const clickedElement = themeToggle || mobileThemeToggle;
                if (clickedElement) {
                    clickedElement.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        clickedElement.style.transform = '';
                    }, 150);
                }
            }
        });

        // Additional touch event for mobile
        document.addEventListener('touchstart', (e) => {
            const themeToggle = e.target.closest('.theme-toggle');
            const mobileThemeToggle = e.target.closest('.mobile-theme-toggle');
            
            if (themeToggle || mobileThemeToggle) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle theme
                toggleTheme();
                
                // Visual feedback
                const clickedElement = themeToggle || mobileThemeToggle;
                if (clickedElement) {
                    clickedElement.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        clickedElement.style.transform = '';
                    }, 150);
                }
            }
        }, { passive: false });

        // Prevent mobile menu from closing when clicking theme toggle
        const themeToggleItem = document.querySelector('.theme-toggle-item');
        if (themeToggleItem) {
            themeToggleItem.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }



    setupScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            if (progressBar) {
                progressBar.style.width = scrollPercent + '%';
            }
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Add staggered animation for timeline items
                    if (entry.target.classList.contains('timeline-item')) {
                        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.2;
                        entry.target.style.animationDelay = `${delay}s`;
                    }
                    
                    // Add staggered animation for project cards
                    if (entry.target.classList.contains('project-card')) {
                        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1;
                        entry.target.style.animationDelay = `${delay}s`;
                    }
                    
                    // Add staggered animation for contact items
                    if (entry.target.classList.contains('contact-item')) {
                        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.15;
                        entry.target.style.animationDelay = `${delay}s`;
                    }
                }
            });
        }, observerOptions);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll('.card, .timeline-item, .project-card, .contact-item, .tag');
        animatedElements.forEach(el => observer.observe(el));
        
        // Hero elements now stay static (no animations)
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        const navLinks = document.querySelectorAll('.mobile-menu .nav-links a');
        const body = document.body;

        // Menu state handlers
        const closeMobileMenu = () => {
            mobileMenuBtn?.classList.remove('active');
            mobileMenu?.classList.remove('active');
            body.classList.remove('menu-open');
        };

        const openMobileMenu = () => {
            mobileMenuBtn?.classList.add('active');
            mobileMenu?.classList.add('active');
            body.classList.add('menu-open');
        };

        const toggleMobileMenu = () => {
            if (mobileMenu?.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        };

        // Event listeners
        mobileMenuBtn?.addEventListener('click', toggleMobileMenu);
        mobileMenuClose?.addEventListener('click', closeMobileMenu);
        
        // Close on link click (but not theme toggle)
        navLinks.forEach(link => {
            // Don't close menu when clicking theme toggle
            if (!link.closest('.theme-toggle-item')) {
                link.addEventListener('click', closeMobileMenu);
            }
        });

        // Prevent theme toggle from closing mobile menu
        const themeToggleItem = mobileMenu?.querySelector('.theme-toggle-item');
        if (themeToggleItem) {
            themeToggleItem.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        // Theme toggle is handled by setupThemeToggle, no need for additional handlers here

        // Close on outside click
        mobileMenu?.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Close on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }

    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupFormHandling() {
        const form = document.querySelector('.contact-form form');
        const submitButton = form?.querySelector('.form-submit');

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Disable submit button
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Mengirim...';
            }

            // Get form data
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            // Validate form data
            if (!data.name || !data.email || !data.message) {
                this.showErrorNotification('Data Tidak Lengkap', 'Mohon isi semua field yang diperlukan.');
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Kirim Pesan';
                }
                return;
            }

            // Validate email format
            if (!this.isValidEmail(data.email)) {
                this.showErrorNotification('Email Tidak Valid', 'Mohon masukkan format email yang benar.');
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Kirim Pesan';
                }
                return;
            }

            try {
                // Send to WhatsApp
                this.sendToWhatsApp(data);
                this.showSuccessNotification('Berhasil!', 'Pesan Anda akan dibuka di WhatsApp. Silakan kirim pesan.');
                form.reset();
            } catch (error) {
                this.showErrorNotification('Gagal Mengirim', 'Terjadi kesalahan saat membuka WhatsApp. Silakan coba lagi.');
            } finally {
                // Re-enable submit button
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Kirim Pesan';
                }
            }
        });
    }

    sendToWhatsApp(data) {
        const phoneNumber = '6285159452235';
        const message =
            `Halo Peres! Saya ingin menghubungi Anda.\n\n` +
            `*Data Pengirim:*\n` +
            `Nama: ${data.name}\n` +
            `Email: ${data.email}\n\n` +
            `*Pesan:*\n${data.message}\n\n` +
            `---\nPesan ini dikirim dari website portfolio Anda.`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    async simulateFormSubmission(data) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.isValidEmail(data.email)) {
                    resolve();
                } else {
                    reject(new Error('Invalid email'));
                }
            }, 2000);
        });
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    setupParallaxEffect() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            floatingElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    setupTypingEffect() {
        console.log('=== TYPED.JS DEBUGGING ===');
        
        // Simple typing effect without Typed.js
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) {
            console.log('Hero title element not found!');
            return;
        }
        
        console.log('Hero title found, setting up typing effect...');
        
        const text = 'PERES HENDRI VIRGIAWAN';
        let index = 0;
        let isDeleting = false;
        
        function typeWriter() {
            if (isDeleting) {
                // Deleting effect
                heroTitle.textContent = text.substring(0, index - 1);
                index--;
            } else {
                // Typing effect
                heroTitle.textContent = text.substring(0, index + 1);
                index++;
            }
            
            // Add cursor
            heroTitle.innerHTML += '<span class="cursor">|</span>';
            
            let speed = isDeleting ? 50 : 100;
            
            if (!isDeleting && index === text.length) {
                // Pause at end
                speed = 10000;
                isDeleting = true;
            } else if (isDeleting && index === 0) {
                // Pause at beginning
                speed = 1000;
                isDeleting = false;
            }
            
            setTimeout(typeWriter, speed);
        }
        
        // Start the typing effect
        typeWriter();
        console.log('Typing effect started!');
    }

    setupProjectCardInteractions() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.03)';
                
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.3)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.pointerEvents = 'none';
                ripple.style.zIndex = '1';
                
                card.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
            
            // Add click animation
            card.addEventListener('click', () => {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'translateY(-15px) scale(1.03)';
                }, 150);
            });
        });
    }

    setupSkillTagAnimations() {
        const tags = document.querySelectorAll('.tag');
        
        tags.forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.1}s`;
            tag.classList.add('animate-on-scroll');
            
            // Add click animation
            tag.addEventListener('click', () => {
                tag.style.transform = 'scale(0.9) rotate(5deg)';
                tag.style.animation = 'bounceIn 0.6s ease-out';
                
                setTimeout(() => {
                    tag.style.transform = '';
                    tag.style.animation = '';
                }, 600);
            });
            
            // Add hover sound effect (visual feedback)
            tag.addEventListener('mouseenter', () => {
                tag.style.animation = 'pulse 0.3s ease-out';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.animation = '';
            });
        });
    }

    setupContactLinkAnimations() {
        const contactLinks = document.querySelectorAll('.contact-item a');
        
        contactLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateX(8px) scale(1.05)';
                link.style.color = 'var(--primary)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateX(0) scale(1)';
                link.style.color = '';
            });
            
            // Add click animation
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(99, 102, 241, 0.3)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.pointerEvents = 'none';
                ripple.style.zIndex = '1';
                
                link.style.position = 'relative';
                link.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            });
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Theme toggle: Ctrl/Cmd + T
            if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                e.preventDefault();
                document.querySelector('.theme-toggle')?.click();
            }
            
            // Scroll to top: Ctrl/Cmd + Home
            if ((e.ctrlKey || e.metaKey) && e.key === 'Home') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    setupPerformanceOptimizations() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        if (images.length > 0) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }

        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Handle scroll-based optimizations
            }, 100);
        });

        // Performance monitoring
        this.monitorPerformance();
    }

    monitorPerformance() {
        // Monitor Core Web Vitals
        if ('performance' in window) {
            // First Contentful Paint
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.name === 'first-contentful-paint') {
                        console.log('FCP:', entry.startTime);
                        this.reportMetric('FCP', entry.startTime);
                    }
                }
            });
            
            try {
                observer.observe({ entryTypes: ['paint'] });
            } catch (e) {
                console.log('Performance monitoring not supported');
            }

            // Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
                this.reportMetric('LCP', lastEntry.startTime);
            });
            
            try {
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                console.log('LCP monitoring not supported');
            }
        }

        // Monitor memory usage
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
                    console.warn('High memory usage detected');
                }
            }, 30000); // Check every 30 seconds
        }
    }

    reportMetric(name, value) {
        // Send to analytics service (replace with your preferred service)
        console.log(`Performance Metric - ${name}: ${value}ms`);
        
        // Example: Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'performance_metric', {
                metric_name: name,
                metric_value: value
            });
        }
    }

    setupMatrixBackground() {
        const matrixContainer = document.createElement('div');
        matrixContainer.className = 'matrix-background';
        document.body.appendChild(matrixContainer);

        const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const columns = Math.floor(window.innerWidth / 20);
        
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = `${i * 20}px`;
            column.style.animationDuration = `${Math.random() * 3 + 2}s`;
            column.style.animationDelay = `${Math.random() * 2}s`;
            
            let text = '';
            for (let j = 0; j < 20; j++) {
                text += matrixChars[Math.floor(Math.random() * matrixChars.length)] + '<br>';
            }
            column.innerHTML = text;
            
            matrixContainer.appendChild(column);
        }

        // Regenerate matrix columns periodically
        setInterval(() => {
            const columns = matrixContainer.querySelectorAll('.matrix-column');
            columns.forEach(column => {
                let text = '';
                for (let j = 0; j < 20; j++) {
                    text += matrixChars[Math.floor(Math.random() * matrixChars.length)] + '<br>';
                }
                column.innerHTML = text;
            });
        }, 5000);
    }

    setupBinaryAnimation() {
        const binaryContainer = document.createElement('div');
        binaryContainer.className = 'binary-container';
        document.body.appendChild(binaryContainer);

        const createBinaryElement = () => {
            const binary = document.createElement('div');
            binary.className = 'binary-float';
            binary.style.left = `${Math.random() * window.innerWidth}px`;
            binary.style.animationDuration = `${Math.random() * 12 + 12}s`; // Much slower: 12-24s
            binary.style.animationDelay = `${Math.random() * 5}s`; // Much longer delay
            
            let binaryText = '';
            for (let i = 0; i < Math.floor(Math.random() * 20) + 10; i++) { // More digits: 10-30
                binaryText += Math.random() > 0.5 ? '1' : '0';
            }
            binary.textContent = binaryText;
            
            binaryContainer.appendChild(binary);
            
            // Remove element after animation
            setTimeout(() => {
                if (binary.parentNode) {
                    binary.parentNode.removeChild(binary);
                }
            }, 24000); // Much longer duration
        };

        // Create binary elements periodically - much slower
        setInterval(createBinaryElement, 6000); // Every 6 seconds instead of 3
        
        // Create initial elements with much longer delays
        for (let i = 0; i < 20; i++) { // More initial elements
            setTimeout(createBinaryElement, i * 800); // Much longer delays between elements
        }
    }

    setupRandomLetters() {
        const lettersContainer = document.createElement('div');
        lettersContainer.className = 'letters-container';
        document.body.appendChild(lettersContainer);

        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        
        const createLetterElement = () => {
            const letter = document.createElement('div');
            letter.className = 'random-letters';
            letter.style.top = `${Math.random() * window.innerHeight}px`;
            letter.style.animationDuration = `${Math.random() * 10 + 10}s`; // Much slower: 10-20s
            letter.style.animationDelay = `${Math.random() * 4}s`; // Much longer delay
            
            let letterText = '';
            for (let i = 0; i < Math.floor(Math.random() * 12) + 5; i++) { // More characters: 5-17
                letterText += letters[Math.floor(Math.random() * letters.length)];
            }
            letter.textContent = letterText;
            
            lettersContainer.appendChild(letter);
            
            // Remove element after animation
            setTimeout(() => {
                if (letter.parentNode) {
                    letter.parentNode.removeChild(letter);
                }
            }, 20000); // Much longer duration
        };

        // Create letter elements periodically - much slower
        setInterval(createLetterElement, 8000); // Every 8 seconds instead of 4
        
        // Create initial elements with much longer delays
        for (let i = 0; i < 15; i++) { // More initial elements
            setTimeout(createLetterElement, i * 1000); // Much longer delays between elements
        }
    }

    setupGlitchEffects() {
        // Removed glitch effect from hero title - stays static
        
        // Add holographic effect to buttons only
        const buttons = document.querySelectorAll('.btn-primary');
        buttons.forEach(button => {
            button.classList.add('holographic');
        });
    }

    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainContent = document.getElementById('mainContent');
        
        if (loadingScreen && mainContent) {
            // Setup loading screen animations
            this.setupLoadingAnimations();
            
            // Hide loading screen and show main content after page loads
            window.addEventListener('load', () => {
                setTimeout(() => {
                    // Hide loading screen
                    loadingScreen.classList.add('hidden');
                    
                    // Show main content
                    mainContent.classList.add('visible');
                    
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 800);
                }, 2000); // Show loading for 2 seconds
            });
        }
    }

    setupLoadingAnimations() {
        // Setup floating elements for loading screen
        this.setupLoadingFloatingElements();
        
        // Setup binary animation for loading screen
        this.setupLoadingBinaryAnimation();
        
        // Setup random letters for loading screen
        this.setupLoadingRandomLetters();
        
        // Setup matrix background for loading screen
        this.setupLoadingMatrixBackground();
    }

    setupLoadingFloatingElements() {
        const loadingFloatingElements = document.querySelector('#loadingScreen .floating-elements .floating-element');
        if (loadingFloatingElements) {
            // Floating elements are already styled with CSS animations
            // No additional JavaScript needed
        }
    }

    setupLoadingBinaryAnimation() {
        const binaryContainer = document.querySelector('#loadingScreen .binary-container');
        if (binaryContainer) {
            const createBinaryElement = () => {
                const binary = document.createElement('div');
                binary.className = 'binary-float';
                binary.style.left = `${Math.random() * window.innerWidth}px`;
                binary.style.animationDuration = `${Math.random() * 8 + 8}s`; // Faster for loading
                binary.style.animationDelay = `${Math.random() * 2}s`;
                
                let binaryText = '';
                for (let i = 0; i < Math.floor(Math.random() * 15) + 8; i++) {
                    binaryText += Math.random() > 0.5 ? '1' : '0';
                }
                binary.textContent = binaryText;
                
                binaryContainer.appendChild(binary);
                
                // Remove element after animation
                setTimeout(() => {
                    if (binary.parentNode) {
                        binary.parentNode.removeChild(binary);
                    }
                }, 16000);
            };

            // Create binary elements more frequently for loading
            setInterval(createBinaryElement, 3000);
            
            // Create initial elements
            for (let i = 0; i < 10; i++) {
                setTimeout(createBinaryElement, i * 500);
            }
        }
    }

    setupLoadingRandomLetters() {
        const lettersContainer = document.querySelector('#loadingScreen .letters-container');
        if (lettersContainer) {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
            
            const createLetterElement = () => {
                const letter = document.createElement('div');
                letter.className = 'random-letters';
                letter.style.top = `${Math.random() * window.innerHeight}px`;
                letter.style.animationDuration = `${Math.random() * 6 + 6}s`; // Faster for loading
                letter.style.animationDelay = `${Math.random() * 2}s`;
                
                let letterText = '';
                for (let i = 0; i < Math.floor(Math.random() * 8) + 4; i++) {
                    letterText += letters[Math.floor(Math.random() * letters.length)];
                }
                letter.textContent = letterText;
                
                lettersContainer.appendChild(letter);
                
                // Remove element after animation
                setTimeout(() => {
                    if (letter.parentNode) {
                        letter.parentNode.removeChild(letter);
                    }
                }, 12000);
            };

            // Create letter elements more frequently for loading
            setInterval(createLetterElement, 4000);
            
            // Create initial elements
            for (let i = 0; i < 8; i++) {
                setTimeout(createLetterElement, i * 600);
            }
        }
    }

    setupLoadingMatrixBackground() {
        const matrixContainer = document.querySelector('#loadingScreen .matrix-background');
        if (matrixContainer) {
            const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
            const columns = Math.floor(window.innerWidth / 20);
            
            for (let i = 0; i < columns; i++) {
                const column = document.createElement('div');
                column.className = 'matrix-column';
                column.style.left = `${i * 20}px`;
                column.style.animationDuration = `${Math.random() * 2 + 1.5}s`; // Faster for loading
                column.style.animationDelay = `${Math.random() * 1}s`;
                
                let text = '';
                for (let j = 0; j < 20; j++) {
                    text += matrixChars[Math.floor(Math.random() * matrixChars.length)] + '<br>';
                }
                column.innerHTML = text;
                
                matrixContainer.appendChild(column);
            }

            // Regenerate matrix columns periodically
            setInterval(() => {
                const columns = matrixContainer.querySelectorAll('.matrix-column');
                columns.forEach(column => {
                    let text = '';
                    for (let j = 0; j < 20; j++) {
                        text += matrixChars[Math.floor(Math.random() * matrixChars.length)] + '<br>';
                    }
                    column.innerHTML = text;
                });
            }, 3000); // More frequent updates
        }
    }

    setupScrollToTop() {
        const scrollToTopBtn = document.getElementById('scrollToTop');
        
        if (scrollToTopBtn) {
            // Show/hide button based on scroll position
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollToTopBtn.classList.add('visible');
                } else {
                    scrollToTopBtn.classList.remove('visible');
                }
            });
            
            // Scroll to top when clicked
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    setupCookieBanner() {
        const cookieBanner = document.getElementById('cookieBanner');
        const acceptBtn = document.getElementById('acceptCookies');
        const declineBtn = document.getElementById('declineCookies');
        
        if (cookieBanner && acceptBtn && declineBtn) {
            // Check if user has already made a choice
            const cookieChoice = localStorage.getItem('cookieChoice');
            
            if (!cookieChoice) {
                // Show banner after 2 seconds
                setTimeout(() => {
                    cookieBanner.classList.add('visible');
                }, 2000);
            }
            
            // Handle accept
            acceptBtn.addEventListener('click', () => {
                localStorage.setItem('cookieChoice', 'accepted');
                cookieBanner.classList.remove('visible');
                this.showNotification('Cookies diterima!', 'success');
            });
            
            // Handle decline
            declineBtn.addEventListener('click', () => {
                localStorage.setItem('cookieChoice', 'declined');
                cookieBanner.classList.remove('visible');
                this.showNotification('Cookies ditolak.', 'error');
            });
        }
    }

    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (e) => {
            console.error('Website error:', e.error);
            this.showErrorNotification('Terjadi kesalahan', 'Silakan refresh halaman atau coba lagi nanti.');
        });
        
        // Unhandled promise rejection
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.showErrorNotification('Kesalahan Sistem', 'Terjadi masalah dengan sistem. Silakan coba lagi.');
        });
    }

    showErrorNotification(title, message) {
        // Remove existing notifications first
        const existingNotifications = document.querySelectorAll('.error-notification');
        existingNotifications.forEach(notification => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });
        
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.innerHTML = `
            <h4>${title}</h4>
            <p>${message}</p>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    showSuccessNotification(title, message) {
        // Remove existing notifications first
        const existingNotifications = document.querySelectorAll('.success-notification');
        existingNotifications.forEach(notification => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });
        
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <h4>${title}</h4>
            <p>${message}</p>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    setupCVDownload() {
        let isDownloading = false;
        
        // Handle CV download clicks
        document.addEventListener('click', (e) => {
            const downloadLink = e.target.closest('a[href*="cv-peres-hendri.pdf"]');
            
            if (downloadLink && !isDownloading) {
                e.preventDefault();
                isDownloading = true;
                
                // Show loading state
                const originalText = downloadLink.innerHTML;
                downloadLink.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
                downloadLink.style.pointerEvents = 'none';
                
                // Simple download approach
                setTimeout(() => {
                    // Create a temporary link to trigger download
                    const link = document.createElement('a');
                    link.href = '/cv-peres-hendri.pdf';
                    link.download = 'CV_Peres_Hendri_Virgiawan.pdf';
                    link.style.display = 'none';
                    
                    // Add to DOM temporarily
                    document.body.appendChild(link);
                    
                    // Trigger download
                    link.click();
                    
                    // Clean up
                    setTimeout(() => {
                        document.body.removeChild(link);
                    }, 100);
                    
                    // Restore original button state
                    downloadLink.innerHTML = originalText;
                    downloadLink.style.pointerEvents = 'auto';
                    
                    // Show success notification
                    this.showSuccessNotification(
                        'CV Downloaded!', 
                        'CV Anda telah berhasil diunduh. Terima kasih atas ketertarikan Anda!'
                    );
                    
                    // Track download event (for analytics)
                    console.log('CV downloaded successfully');
                    
                    // Reset downloading flag after a delay
                    setTimeout(() => {
                        isDownloading = false;
                    }, 2000);
                    
                }, 500); // Small delay for better UX
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioWebsite();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioWebsite;
} 