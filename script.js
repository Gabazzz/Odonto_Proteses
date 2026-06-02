document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Header scroll animation
    const header = document.querySelector('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // 2. Mobile navigation toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger / close icon
            const icon = menuBtn.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 3. Reveal-on-scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Animates only once
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active'));
    }

    // 4. Contact Form WhatsApp Redirection
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('formName');
            const messageInput = document.getElementById('formMessage');
            
            if (!nameInput || !messageInput) return;
            
            const name = nameInput.value.trim();
            const message = messageInput.value.trim();
            
            if (name === '' || message === '') {
                alert('Por favor, preencha todos os campos do formulário.');
                return;
            }
            
            // Format phone number: 55 (Brazil) + 38 (DDD) + 34810797 (number)
            const phoneNumber = '553834810797';
            
            // Format WhatsApp text URL-encoded
            const formattedText = `Olá! Meu nome é ${encodeURIComponent(name)}. ${encodeURIComponent(message)}`;
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${formattedText}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');
            
            // Optional: reset form after brief timeout
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        });
    }

    // 5. Cookie Consent Banner (LGPD)
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    
    if (cookieBanner && acceptCookiesBtn) {
        // Check if user already consented
        const cookieConsent = localStorage.getItem('cookieConsent');
        
        if (!cookieConsent) {
            // Show banner after 2 seconds delay
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 2000);
        }
        
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('show');
        });
    }
});
