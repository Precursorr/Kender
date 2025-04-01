document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const elements = {
        hamburger: document.querySelector('.hamburger'),
        navLinks: document.querySelector('.nav-links'),
        logo: document.getElementById('backToTop'),
        slides: document.querySelectorAll('.slide'),
        scrollTopLink: document.querySelector('.scroll-top')
    };

    let isAnimating = false;
    let currentSlide = 0;

    // Debounce function for performance
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Combine event handlers
    const toggleMenu = () => {
        if (isAnimating) return;
        
        isAnimating = true;
        elements.hamburger.classList.toggle('active');
        elements.navLinks.classList.toggle('active');

        setTimeout(() => isAnimating = false, 300);
    };

    // Smooth scroll function
    const smoothScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Slideshow function
    const nextSlide = () => {
        elements.slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % elements.slides.length;
        elements.slides[currentSlide].classList.add('active');
    };

    // Event listeners
    elements.hamburger.addEventListener('click', toggleMenu);
    elements.logo.addEventListener('click', smoothScroll);
    elements.scrollTopLink?.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScroll();
    });

    // Close menu when clicking outside
    document.addEventListener('click', debounce((e) => {
        if (!isAnimating && 
            !elements.hamburger.contains(e.target) && 
            !elements.navLinks.contains(e.target)) {
            elements.hamburger.classList.remove('active');
            elements.navLinks.classList.remove('active');
        }
    }, 100));

    // Initialize slideshow
    elements.slides[0].classList.add('active');
    setInterval(nextSlide, 8000);
});

