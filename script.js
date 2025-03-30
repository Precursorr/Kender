document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    const logo = document.getElementById('backToTop');
    
    logo.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // New slideshow code
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    // Show first slide initially
    slides[0].classList.add('active');

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Change slide every 8 seconds
    setInterval(nextSlide, 8000);

    // Add smooth scrolling for the Home link in footer
    const scrollTopLink = document.querySelector('.scroll-top');
    
    scrollTopLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

