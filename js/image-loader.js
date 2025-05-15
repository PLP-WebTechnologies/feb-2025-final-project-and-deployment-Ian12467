/**
 * Luxe Gems - Image Loading Optimization
 * Handles lazy loading, WebP detection, and image optimization
 */

document.addEventListener('DOMContentLoaded', () => {
    // Detect WebP support
    detectWebP();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize responsive videos
    initResponsiveVideos();
});

/**
 * Detect WebP support and add class to HTML element
 */
function detectWebP() {
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
        const webpSupport = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        document.documentElement.classList.add(webpSupport ? 'webp' : 'no-webp');
    } else {
        document.documentElement.classList.add('no-webp');
    }
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    // Use Intersection Observer if available
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Load the image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    // Load srcset if available
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                        img.removeAttribute('data-srcset');
                    }
                    
                    // Add loaded class for animation
                    img.classList.add('loaded');
                    
                    // Stop observing the image
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            // Add placeholder classes
            img.classList.add('lazy-image');
            
            // Add blur-up effect if there's a low-res placeholder
            if (img.src && img.dataset.src) {
                img.classList.add('blur-up');
            }
            
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        loadImagesImmediately(document.querySelectorAll('img[data-src]'));
    }
}

/**
 * Load all images immediately (fallback)
 */
function loadImagesImmediately(images) {
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
        
        if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
        }
        
        img.classList.add('loaded');
    });
}

/**
 * Initialize responsive videos
 */
function initResponsiveVideos() {
    // Wrap all videos and iframes in responsive containers
    const videos = document.querySelectorAll('video, iframe');
    
    videos.forEach(video => {
        // Skip if already in a container
        if (video.parentNode.classList.contains('video-container')) {
            return;
        }
        
        // Create container
        const container = document.createElement('div');
        container.classList.add('video-container');
        
        // Replace video with container
        video.parentNode.insertBefore(container, video);
        container.appendChild(video);
        
        // Add lazy loading for videos
        if (video.tagName === 'VIDEO') {
            lazyLoadVideo(video);
        }
    });
}

/**
 * Lazy load video
 */
function lazyLoadVideo(video) {
    // Use Intersection Observer if available
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    
                    // Load the video source
                    if (video.dataset.src) {
                        video.src = video.dataset.src;
                        video.removeAttribute('data-src');
                    }
                    
                    // Preload the video
                    video.load();
                    
                    // Stop observing the video
                    observer.unobserve(video);
                }
            });
        }, {
            rootMargin: '100px 0px',
            threshold: 0.01
        });
        
        // Observe the video
        videoObserver.observe(video);
    } else {
        // Fallback for browsers that don't support Intersection Observer
        if (video.dataset.src) {
            video.src = video.dataset.src;
            video.removeAttribute('data-src');
            video.load();
        }
    }
}

/**
 * Generate responsive image markup
 */
function generateResponsiveImage(src, alt, sizes, className = '') {
    // Extract base URL and extension
    const lastDot = src.lastIndexOf('.');
    const baseSrc = src.substring(0, lastDot);
    const ext = src.substring(lastDot);
    
    // Generate srcset for different sizes
    const widths = [320, 640, 1024, 1600];
    const srcset = widths.map(w => `${baseSrc}-${w}w${ext} ${w}w`).join(', ');
    
    // Default sizes attribute if not provided
    const sizesAttr = sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    
    // Create image markup
    return `<img src="${src}" 
                 srcset="${srcset}" 
                 sizes="${sizesAttr}" 
                 alt="${alt}" 
                 loading="lazy" 
                 class="${className}">`;
}

// Export functions for use in other scripts
window.imageLoader = {
    generateResponsiveImage,
    detectWebP,
    initLazyLoading,
    initResponsiveVideos
};