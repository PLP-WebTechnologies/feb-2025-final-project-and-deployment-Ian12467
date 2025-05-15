/**
 * Luxe Gems - Main JavaScript
 * Handles all interactive elements of the jewelry e-commerce website
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    initMobileMenu();
    
    // Newsletter form handling
    initNewsletterForm();
    
    // Product interactions
    initProductInteractions();
    
    // Countdown timer for limited editions
    initCountdownTimer();
    
    // Initialize image galleries if they exist
    initImageGalleries();
    
    // Initialize custom order form if it exists
    if (document.querySelector('#custom-order-form')) {
        initCustomOrderForm();
    }
});

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.header__menu-toggle');
    if (!menuToggle) return;
    
    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !expanded);
    });
    
    // Handle submenu toggles on mobile
    const menuItems = document.querySelectorAll('.header__menu-item');
    menuItems.forEach(item => {
        const submenu = item.querySelector('.header__submenu');
        if (submenu) {
            const link = item.querySelector('.header__menu-link');
            link.addEventListener('click', (e) => {
                // Only toggle on mobile view
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !e.target.closest('.header__nav') && 
            menuToggle.getAttribute('aria-expanded') === 'true') {
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Newsletter form submission and validation
 */
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('newsletter-email').value;
        if (!validateEmail(email)) {
            showFormError(form, 'Please enter a valid email address');
            return;
        }
        
        // Get selected preferences
        const preferences = [...document.querySelectorAll('input[name="topics"]:checked')]
            .map(checkbox => checkbox.value);
        
        // Store preferences in localStorage
        localStorage.setItem('newsletter_preferences', JSON.stringify(preferences));
        
        // Simulate API call
        simulateFormSubmission(form, {
            email,
            preferences
        }).then(() => {
            showFormSuccess(form, 'Thank you for subscribing!');
            form.reset();
        }).catch(error => {
            showFormError(form, 'There was an error. Please try again.');
            console.error('Newsletter submission error:', error);
        });
    });
}

/**
 * Product interactions (add to cart, wishlist)
 */
function initProductInteractions() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.product-card__btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product-card');
            const productTitle = product.querySelector('.product-card__title').textContent;
            const productPrice = product.querySelector('.product-card__price').textContent;
            
            // Add product to cart (simulated)
            addToCart({
                title: productTitle,
                price: productPrice,
                quantity: 1
            });
            
            // Update cart count
            updateCartCount();
            
            // Show confirmation
            showToast(`${productTitle} added to cart`);
        });
    });
}

/**
 * Countdown timer for limited edition launches
 */
function initCountdownTimer() {
    const countdown = document.getElementById('countdown');
    if (!countdown) return;
    
    // Set the launch date (30 days from now for demo purposes)
    const now = new Date();
    const launchDate = new Date(now);
    launchDate.setDate(now.getDate() + 30);
    
    // Update countdown every second
    const timer = setInterval(() => {
        const now = new Date();
        const distance = launchDate - now;
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById('countdown-days').textContent = formatNumber(days);
        document.getElementById('countdown-hours').textContent = formatNumber(hours);
        document.getElementById('countdown-minutes').textContent = formatNumber(minutes);
        document.getElementById('countdown-seconds').textContent = formatNumber(seconds);
        
        // If the countdown is finished
        if (distance < 0) {
            clearInterval(timer);
            countdown.innerHTML = '<p class="countdown__expired">Collection Now Available!</p>';
        }
    }, 1000);
}

/**
 * Initialize image galleries with lightbox functionality
 */
function initImageGalleries() {
    const galleries = document.querySelectorAll('.gallery');
    if (galleries.length === 0) return;
    
    galleries.forEach(gallery => {
        const images = gallery.querySelectorAll('.gallery__image');
        
        images.forEach(image => {
            image.addEventListener('click', () => {
                openLightbox(image.src, image.alt);
            });
        });
    });
}

/**
 * Initialize custom order form with validation
 */
function initCustomOrderForm() {
    const form = document.getElementById('custom-order-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const description = document.getElementById('description').value;
        
        if (!name || !validateEmail(email) || !description) {
            showFormError(form, 'Please fill out all required fields correctly');
            return;
        }
        
        // Collect form data
        const formData = {
            name,
            email,
            description,
            budget: document.getElementById('budget').value,
            timeline: document.getElementById('timeline').value,
            attachments: document.getElementById('attachments').files
        };
        
        // Simulate form submission
        simulateFormSubmission(form, formData)
            .then(() => {
                showFormSuccess(form, 'Your custom order request has been submitted. We\'ll contact you shortly!');
                form.reset();
            })
            .catch(error => {
                showFormError(form, 'There was an error submitting your request. Please try again.');
                console.error('Custom order submission error:', error);
            });
    });
}

/**
 * Fetch product images from Pexels API
 * @param {string} query - Search query for images
 * @param {number} count - Number of images to fetch
 * @returns {Promise} - Promise resolving to array of image URLs
 */
async function fetchPexelsImages(query, count = 5) {
    // Note: In a real implementation, you would use your actual API key
    // For this demo, we'll simulate the API response
    
    // Simulated API response
    return new Promise((resolve) => {
        setTimeout(() => {
            // These would normally come from the API
            const sampleImages = [
                {
                    src: {
                        medium: 'images/products/necklace-1.jpg'
                    },
                    alt: 'Gold pendant necklace'
                },
                {
                    src: {
                        medium: 'images/products/bracelet-1.jpg'
                    },
                    alt: 'Silver chain bracelet'
                },
                {
                    src: {
                        medium: 'images/products/ring-1.jpg'
                    },
                    alt: 'Diamond ring'
                },
                {
                    src: {
                        medium: 'images/products/earrings-1.jpg'
                    },
                    alt: 'Pearl earrings'
                }
            ];
            
            // Return a subset of the sample images
            resolve(sampleImages.slice(0, count));
        }, 300);
    });
}

/**
 * Render fetched images to a gallery element
 * @param {string} galleryId - ID of the gallery element
 * @param {Array} images - Array of image objects
 */
function renderGallery(galleryId, images) {
    const gallery = document.getElementById(galleryId);
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src.medium;
        imgElement.alt = image.alt;
        imgElement.classList.add('gallery__image');
        imgElement.loading = 'lazy';
        
        const figure = document.createElement('figure');
        figure.classList.add('gallery__item');
        figure.appendChild(imgElement);
        
        gallery.appendChild(figure);
    });
}

/**
 * Utility Functions
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Format number to always have two digits
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
function formatNumber(num) {
    return num < 10 ? `0${num}` : num.toString();
}

/**
 * Show form error message
 * @param {Element} form - Form element
 * @param {string} message - Error message
 */
function showFormError(form, message) {
    let errorElement = form.querySelector('.form-error');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.classList.add('form-error');
        form.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 5000);
}

/**
 * Show form success message
 * @param {Element} form - Form element
 * @param {string} message - Success message
 */
function showFormSuccess(form, message) {
    let successElement = form.querySelector('.form-success');
    
    if (!successElement) {
        successElement = document.createElement('div');
        successElement.classList.add('form-success');
        form.appendChild(successElement);
    }
    
    successElement.textContent = message;
    successElement.style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(() => {
        successElement.style.display = 'none';
    }, 5000);
}

/**
 * Show toast notification
 * @param {string} message - Toast message
 */
function showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.classList.add('toast');
        document.body.appendChild(toast);
    }
    
    // Set message and show
    toast.textContent = message;
    toast.classList.add('toast--visible');
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('toast--visible');
    }, 3000);
}

/**
 * Simulate form submission with delay
 * @param {Element} form - Form element
 * @param {Object} data - Form data
 * @returns {Promise} - Promise resolving after submission
 */
function simulateFormSubmission(form, data) {
    return new Promise((resolve, reject) => {
        // Show loading state
        form.classList.add('form--loading');
        
        // Simulate API call delay
        setTimeout(() => {
            form.classList.remove('form--loading');
            
            // 90% success rate for demo
            if (Math.random() < 0.9) {
                resolve(data);
            } else {
                reject(new Error('Simulated API error'));
            }
        }, 1500);
    });
}

/**
 * Add product to cart (simulated)
 * @param {Object} product - Product to add
 */
function addToCart(product) {
    // Get existing cart or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.title === product.title);
    
    if (existingProductIndex >= 0) {
        // Increment quantity if product already in cart
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        // Add new product to cart
        cart.push(product);
    }
    
    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Update cart count in header
 */
function updateCartCount() {
    const cartCountElement = document.querySelector('.header__cart-count');
    if (!cartCountElement) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElement.textContent = totalItems;
    
    // Add animation class
    cartCountElement.classList.add('header__cart-count--animate');
    setTimeout(() => {
        cartCountElement.classList.remove('header__cart-count--animate');
    }, 300);
}

/**
 * Open lightbox with image
 * @param {string} src - Image source
 * @param {string} alt - Image alt text
 */
function openLightbox(src, alt) {
    // Create lightbox if it doesn't exist
    let lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `
            <div class="lightbox__content">
                <button class="lightbox__close" aria-label="Close">&times;</button>
                <img class="lightbox__image" src="" alt="">
                <div class="lightbox__caption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // Add close functionality
        lightbox.querySelector('.lightbox__close').addEventListener('click', () => {
            closeLightbox();
        });
        
        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('lightbox--visible')) {
                closeLightbox();
            }
        });
    }
    
    // Set image and show lightbox
    const lightboxImage = lightbox.querySelector('.lightbox__image');
    const lightboxCaption = lightbox.querySelector('.lightbox__caption');
    
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightboxCaption.textContent = alt;
    
    // Show lightbox
    lightbox.classList.add('lightbox--visible');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

/**
 * Close lightbox
 */
function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.classList.remove('lightbox--visible');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Initialize cart count on page load
updateCartCount();