document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const elements = {
        hamburger: document.querySelector('.hamburger'),
        navLinks: document.querySelector('.nav-links'),
        logo: document.getElementById('backToTop'),
        homeLink: document.getElementById('homeLink'),
        productsLink: document.getElementById('productsLink'),
        cataloguesLink: document.getElementById('cataloguesLink'),
        heroCataloguesButton: document.getElementById('heroCataloguesButton'),
        productsDivider: document.getElementById('products-divider'),
        cataloguesDivider: document.getElementById('catalogues-divider'),
        slides: document.querySelectorAll('.slide'),
        scrollTopLink: document.querySelector('.scroll-top'),
        // Virtual Tour elements
        tourButton: document.getElementById('tourButton'),
        tourOverlay: document.getElementById('tourOverlay'),
        tourClose: document.getElementById('tourClose'),
        tourMainImage: document.getElementById('tourMainImage'),
        tourThumbnails: document.querySelectorAll('.tour-thumbnail'),
        // Product items for animation
        productItems: document.querySelectorAll('.product-item'),
        sectionDividers: document.querySelectorAll('.section-divider')
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

    // Smooth scroll to top function
    const smoothScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Smooth scroll to element function
    const smoothScrollToElement = (element, extraOffset = 0) => {
        if (!element) return;

        // Get the actual navbar height dynamically
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 80; // Default to 80px if not found

        // Small delay to ensure accurate calculations
        setTimeout(() => {
            // Get the element's position
            const rect = element.getBoundingClientRect();
            const absoluteTop = window.pageYOffset + rect.top;

            // Scroll to the element's position minus the navbar height
            window.scrollTo({
                top: absoluteTop - navbarHeight + extraOffset,
                behavior: 'smooth'
            });
        }, 10);
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

    // Home link event listener
    elements.homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScroll();
        // Close mobile menu if open
        if (elements.navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Products link event listener
    elements.productsLink.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollToElement(elements.productsDivider);
        // Close mobile menu if open
        if (elements.navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Catalogues link event listener
    elements.cataloguesLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Add a small positive offset to ensure it sits flush with the navbar
        smoothScrollToElement(elements.cataloguesDivider, 1);
        // Close mobile menu if open
        if (elements.navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    elements.scrollTopLink?.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScroll();
    });

    // Hero Catalogues button event listener
    elements.heroCataloguesButton.addEventListener('click', () => {
        // Use the same behavior as the header Catalogues link
        smoothScrollToElement(elements.cataloguesDivider, 1);
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

    // Virtual Tour functionality
    let currentTourImage = 0;
    const tourImages = [
        {
            main: 'Loading 360° Tour...',
            thumb: '1',
            isStreetView: true,
            streetViewUrl: 'https://www.google.com/maps/embed?pb=!4v1718363200000!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRDRtcGZmNXdF!2m2!1d53.52683098002037!2d-7.348661684159903!3f293.87677!4f0!5f0.7820865974627469'
        },
        { main: 'Virtual Tour Image 2', thumb: '2' }
    ];

    // Cache additional elements
    elements.tourContent = document.getElementById('tourContent');
    elements.streetViewFrame = document.getElementById('streetViewFrame');

    // Function to update the main tour image with transition
    const updateTourImage = (index) => {
        // Handle Street View vs regular images
        if (tourImages[index].isStreetView) {
            // If switching to Street View
            elements.tourContent.style.opacity = '0';

            setTimeout(() => {
                // Load Street View iframe if not already loaded
                if (!elements.streetViewFrame.src) {
                    elements.streetViewFrame.src = tourImages[index].streetViewUrl;
                }

                // Show Street View iframe, hide content container
                elements.streetViewFrame.style.display = 'block';
                elements.tourContent.style.display = 'none';
                elements.tourContent.style.opacity = '0';

                // Update active thumbnail
                elements.tourThumbnails.forEach((thumb, i) => {
                    if (i === index) {
                        thumb.classList.add('active');
                    } else {
                        thumb.classList.remove('active');
                    }
                });

                currentTourImage = index;
            }, 300);
        } else {
            // If switching to regular image
            // Hide Street View iframe if visible
            elements.streetViewFrame.style.display = 'none';
            elements.tourContent.style.display = 'flex';

            // Fade out current image
            const placeholderText = elements.tourContent.querySelector('.placeholder-text');
            placeholderText.style.opacity = '0';

            setTimeout(() => {
                // Update main image text
                placeholderText.textContent = tourImages[index].main;

                // Fade in new image
                placeholderText.style.opacity = '1';
                elements.tourContent.style.opacity = '1';

                // Update active thumbnail
                elements.tourThumbnails.forEach((thumb, i) => {
                    if (i === index) {
                        thumb.classList.add('active');
                    } else {
                        thumb.classList.remove('active');
                    }
                });

                currentTourImage = index;
            }, 300); // Match this timing with the CSS transition duration
        }
    };

    // Navigate to next image
    const nextImage = () => {
        const nextIndex = (currentTourImage + 1) % tourImages.length;
        updateTourImage(nextIndex);
    };

    // Navigate to previous image
    const prevImage = () => {
        const prevIndex = (currentTourImage - 1 + tourImages.length) % tourImages.length;
        updateTourImage(prevIndex);
    };

    // Open tour overlay
    const openTourOverlay = () => {
        elements.tourOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when overlay is open

        // Initialize with the first image (Street View)
        updateTourImage(0);
    };

    // Close tour overlay
    const closeTourOverlay = () => {
        elements.tourOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    // Event listeners for virtual tour
    elements.tourButton.addEventListener('click', openTourOverlay);
    elements.tourClose.addEventListener('click', closeTourOverlay);

    // Pre-load the Street View iframe to avoid delay on first click
    elements.streetViewFrame.src = tourImages[0].streetViewUrl;

    // Close overlay when clicking outside the content
    elements.tourOverlay.addEventListener('click', (e) => {
        if (e.target === elements.tourOverlay) {
            closeTourOverlay();
        }
    });

    // Thumbnail click event
    elements.tourThumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const index = parseInt(thumb.getAttribute('data-index'));
            updateTourImage(index);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!elements.tourOverlay.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeTourOverlay();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    });

    // We don't need a click handler for the main image anymore since Street View is embedded

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    // Set up touch event listeners on the tour content (not the Street View iframe)
    elements.tourContent.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, false);

    elements.tourContent.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;

        // Only handle as swipe if it's a horizontal swipe (not a tap or vertical swipe)
        if (Math.abs(touchEndX - touchStartX) > Math.abs(touchEndY - touchStartY)) {
            handleSwipe();
        }
    }, false);

    // Handle the swipe direction
    const handleSwipe = () => {
        const swipeThreshold = 50; // Minimum distance for a swipe
        const swipeDistance = touchEndX - touchStartX;

        if (swipeDistance > swipeThreshold) {
            // Swiped right - go to previous image
            prevImage();
        } else if (swipeDistance < -swipeThreshold) {
            // Swiped left - go to next image
            nextImage();
        }
    };

    // Scroll animation for elements
    const animateOnScroll = () => {
        // Get all elements that need to be animated
        const animatedElements = document.querySelectorAll('.product-item, .services-list li');

        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;

            // Check if element is in viewport
            if (elementTop < windowHeight - 100 && elementBottom > 0) {
                // Add a staggered delay based on the element's position in its container
                const index = Array.from(element.parentNode.children).indexOf(element);
                const delay = index * 100; // 100ms delay between each element

                setTimeout(() => {
                    element.classList.add('animate-in');
                }, delay);
            }
        });
    };

    // Add scroll event listener for animations
    window.addEventListener('scroll', debounce(animateOnScroll, 50));

    // Initial check for elements in viewport
    animateOnScroll();

    // Section dividers no longer have parallax effect as requested by the user
});

