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

    // Get all product images
    const productImages = document.querySelectorAll('.product-image');
    
    productImages.forEach(imageDiv => {
        // Add loading class initially
        imageDiv.classList.add('loading');
        
        // Get the background image URL
        const style = window.getComputedStyle(imageDiv);
        const imageUrl = style.backgroundImage.slice(4, -1).replace(/"/g, "");
        
        // Create a new image object to check when it's loaded
        const img = new Image();
        img.src = imageUrl;
        
        img.onload = function() {
            // Remove loading class when image is loaded
            imageDiv.classList.remove('loading');
        };
        
        img.onerror = function() {
            // Handle error case - could add an error class here
            imageDiv.classList.remove('loading');
            imageDiv.classList.add('error');
            console.error('Failed to load image:', imageUrl);
        };
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



