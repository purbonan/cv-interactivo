document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       CUSTOM CURSOR
       ========================================= */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Only init if device has hover capability (not mobile)
    if (window.matchMedia("(any-hover: hover)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            // Dot follows exactly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Outline follows with slight delay
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards", easing: "ease-out" });
        });
        
        // Add hover effect on interactable elements
        const interactables = document.querySelectorAll('a, button, .project-card, .contact-card');
        
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hover');
            });
        });
    }

    /* =========================================
       TYPEWRITER EFFECT
       ========================================= */
    const roles = [
        "Periodista",
        "Comunicador Audiovisual",
        "Redactor",
        "Locutor",
        "Fotógrafo"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    const typeWriterElement = document.querySelector('.typewriter');
    
    function typeWriter() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Remove a character
            typeWriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster deleting
        } else {
            // Add a character
            typeWriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing
        }
        
        // If word is fully typed
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at the end
        } 
        // If word is fully deleted
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length; // Move to next role
            typingSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start typewriter
    setTimeout(typeWriter, 1000);

    /* =========================================
       SCROLL REVEAL & SKILL BARS
       ========================================= */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const skillFills = document.querySelectorAll('.skill-fill');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            // Add active class for CSS animations
            entry.target.classList.add('active');
            
            // If it's a skill category, animate the bars inside it
            if (entry.target.classList.contains('skill-category')) {
                const bars = entry.target.querySelectorAll('.skill-fill');
                bars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300); // Slight delay after container reveals
                });
            }
            
            // Unobserve once revealed
            observer.unobserve(entry.target);
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* =========================================
       NAVBAR BACKGROUND & ACTIVE LINKS
       ========================================= */
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
    
    window.addEventListener('scroll', () => {
        // Navbar transparency
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 8, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(5, 5, 8, 0.8)';
            navbar.style.boxShadow = 'none';
        }
        
        // Active link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* =========================================
       SIMPLE BACKGROUND PARTICLES
       ========================================= */
    const createParticles = () => {
        const container = document.getElementById('particles-container');
        const particleCount = 30; // Not too many to keep it clean
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            
            // Random properties
            const size = Math.random() * 3 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const opacity = Math.random() * 0.5 + 0.1;
            const animDuration = Math.random() * 20 + 10;
            const animDelay = Math.random() * 5;
            
            // Styles
            particle.style.position = 'absolute';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = '#c9a847';
            particle.style.borderRadius = '50%';
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = opacity;
            
            // Animation via web animations API (cleaner than lots of CSS keyframes)
            particle.animate([
                { transform: `translate(0, 0)`, opacity: opacity },
                { transform: `translate(${Math.random() * 100 - 50}px, -${Math.random() * 100 + 50}px)`, opacity: 0 }
            ], {
                duration: animDuration * 1000,
                delay: animDelay * 1000,
                iterations: Infinity,
                direction: 'alternate',
                easing: 'ease-in-out'
            });
            
            container.appendChild(particle);
        }
    };
    
    createParticles();
});
