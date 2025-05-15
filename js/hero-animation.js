/**
 * Luxe Gems - Hero Animation
 * Handles animations and effects for the enhanced hero section
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize parallax effect
    initParallax();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize luxury accents animation
    initLuxuryAccents();
    
    // Initialize video background
    initVideoBackground();
});

/**
 * Initialize parallax effect on hero section
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            // Create parallax effect on scroll
            const parallaxOffset = scrollPosition * 0.4;
            hero.style.backgroundPositionY = `calc(50% + ${parallaxOffset}px)`;
            
            // Fade out hero content on scroll
            const heroContent = hero.querySelector('.hero__content');
            if (heroContent) {
                const opacity = 1 - (scrollPosition / (window.innerHeight * 0.5));
                heroContent.style.opacity = Math.max(opacity, 0);
            }
        }
    });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    // Animate elements when they come into view
    if ('IntersectionObserver' in window) {
        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    animateOnScroll.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        // Observe elements to animate
        document.querySelectorAll('.section-title, .featured-collection__grid, .artisan-preview__content, .artisan-preview__image, .limited-edition-preview__info, .limited-edition-preview__image, .style-card').forEach(element => {
            element.classList.add('animate-on-scroll');
            animateOnScroll.observe(element);
        });
    }
}

/**
 * Initialize luxury accents animation
 */
function initLuxuryAccents() {
    const accents = document.querySelectorAll('.luxury-accent');
    if (accents.length === 0) return;
    
    // Create subtle pulsing effect
    let scale = 1;
    let growing = true;
    
    setInterval(() => {
        if (growing) {
            scale += 0.005;
            if (scale >= 1.1) growing = false;
        } else {
            scale -= 0.005;
            if (scale <= 1) growing = true;
        }
        
        accents.forEach(accent => {
            accent.style.transform = `scale(${scale})`;
        });
    }, 50);
    
    // Move accents on mouse move for parallax effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        accents.forEach((accent, index) => {
            const offsetX = (mouseX - 0.5) * (index % 2 === 0 ? -40 : 40);
            const offsetY = (mouseY - 0.5) * (index % 2 === 0 ? -40 : 40);
            
            accent.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
        });
    });
}

/**
 * Initialize video background
 */
function initVideoBackground() {
    const video = document.querySelector('.hero__video');
    if (!video) return;
    
    // Check if video can play
    video.addEventListener('canplaythrough', () => {
        video.play().catch(error => {
            console.error('Auto-play was prevented:', error);
            // Show fallback image if video can't play
            video.style.display = 'none';
        });
    });
    
    // Handle video loading error
    video.addEventListener('error', () => {
        console.error('Video loading error');
        // Hide video container if error
        const videoContainer = document.querySelector('.hero__video-container');
        if (videoContainer) {
            videoContainer.style.display = 'none';
        }
    });
    
    // Optimize video playback
    video.addEventListener('loadedmetadata', () => {
        // Reduce resolution for mobile devices
        if (window.innerWidth < 768) {
            video.setAttribute('playbackRate', '0.5');
        }
    });
}

// Add CSS class for animations
document.documentElement.classList.add('has-animations');

// Add styles for animation
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .animate-on-scroll.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    .featured-collection__grid .product-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .featured-collection__grid.animated .product-card {
        opacity: 1;
        transform: translateY(0);
    }
    
    .featured-collection__grid.animated .product-card:nth-child(1) {
        transition-delay: 0.1s;
    }
    
    .featured-collection__grid.animated .product-card:nth-child(2) {
        transition-delay: 0.2s;
    }
    
    .featured-collection__grid.animated .product-card:nth-child(3) {
        transition-delay: 0.3s;
    }
    
    .featured-collection__grid.animated .product-card:nth-child(4) {
        transition-delay: 0.4s;
    }
    
    .style-guide-preview__grid .style-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .style-guide-preview__grid.animated .style-card {
        opacity: 1;
        transform: translateY(0);
    }
    
    .style-guide-preview__grid.animated .style-card:nth-child(1) {
        transition-delay: 0.1s;
    }
    
    .style-guide-preview__grid.animated .style-card:nth-child(2) {
        transition-delay: 0.2s;
    }
    
    .style-guide-preview__grid.animated .style-card:nth-child(3) {
        transition-delay: 0.3s;
    }
`;
document.head.appendChild(style);