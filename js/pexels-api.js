/**
 * Luxe Gems - Pexels API Integration
 * Fetches high-quality jewelry images from Pexels API
 */

const PEXELS_API_KEY = '9HvMoyVUcQyBiFBGVNmWzchrT0kKP5rvOWdOykwZghFS41dzSrPv3kqw';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize product images
    initProductImages();
});

/**
 * Initialize product images from Pexels
 */
async function initProductImages() {
    try {
        // Fetch images for each category
        await fetchCategoryImages('necklaces', 4);
        await fetchCategoryImages('bracelets', 4);
        await fetchCategoryImages('rings', 4);
        await fetchCategoryImages('earrings', 4);
        
        // Fetch hero images
        await fetchHeroImages();
        
        // Fetch artisan images
        await fetchArtisanImages();
        
        // Fetch artisan videos
        await fetchArtisanVideos();
        
        // Fetch limited edition images
        await fetchLimitedEditionImages();
    } catch (error) {
        console.error('Error initializing product images:', error);
    }
}

/**
 * Category-specific search queries for variety
 */
const categoryQueries = {
    necklaces: ['gold necklace jewelry', 'diamond pendant', 'pearl necklace', 'silver chain'],
    bracelets: ['gold bracelet', 'silver bangle', 'charm bracelet', 'tennis bracelet'],
    rings: ['diamond engagement ring', 'gold wedding band', 'gemstone ring', 'vintage rings'],
    earrings: ['diamond stud earrings', 'gold hoop earrings', 'chandelier earrings', 'pearl earrings']
};

/**
 * Fetch images for a specific category
 */
async function fetchCategoryImages(categoryId, count) {
    try {
        // Use a random query from the array for each category
        const query = categoryQueries[categoryId][Math.floor(Math.random() * categoryQueries[categoryId].length)];
        
        const images = await fetchPexelsImages(query, count);
        const categorySection = document.getElementById(categoryId);
        
        if (!categorySection) return;
        
        const grid = categorySection.querySelector('.collection__grid');
        if (!grid) return;
        
        // Create product cards with fetched images
        images.forEach((image, index) => {
            const productCard = createProductCard(
                `${categoryId}-${index + 1}`,
                image.src.large,
                image.alt || `${query} ${index + 1}`,
                getRandomProductName(categoryId),
                getRandomPrice()
            );
            
            grid.appendChild(productCard);
        });
    } catch (error) {
        console.error(`Error fetching ${categoryId} images:`, error);
    }
}

/**
 * Fetch hero images for various pages
 */
async function fetchHeroImages() {
    try {
        // Fetch hero image for limited editions page
        const limitedEditionsHero = await fetchPexelsImages('luxury jewelry display', 1);
        if (limitedEditionsHero.length > 0) {
            const heroElement = document.querySelector('.page-hero--limited');
            if (heroElement) {
                const optimizedImage = optimizeImage(limitedEditionsHero[0].src.large2x, 1920);
                heroElement.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${optimizedImage.src}')`;
            }
        }
    } catch (error) {
        console.error('Error fetching hero images:', error);
    }
}

/**
 * Fetch artisan images
 */
async function fetchArtisanImages() {
    try {
        // Fetch artisan workshop images with varied queries
        const artisanQueries = ['jewelry craftsman workshop', 'jewelry making artisan', 'goldsmith working', 'jewelry designer studio'];
        
        for (let i = 0; i < artisanQueries.length; i++) {
            const artisanImages = await fetchPexelsImages(artisanQueries[i], 1);
            if (artisanImages.length > 0) {
                const artisanElements = document.querySelectorAll('.artisan__image img');
                if (i < artisanElements.length) {
                    const optimizedImage = optimizeImage(artisanImages[0].src.large, 800);
                    artisanElements[i].src = optimizedImage.src;
                    artisanElements[i].srcset = optimizedImage.srcset;
                    artisanElements[i].sizes = optimizedImage.sizes;
                    artisanElements[i].alt = artisanImages[0].alt || 'Jewelry artisan at work';
                }
            }
        }
    } catch (error) {
        console.error('Error fetching artisan images:', error);
    }
}

/**
 * Fetch artisan videos
 */
async function fetchArtisanVideos() {
    try {
        const videos = await fetchPexelsVideos('jewelry making', 2);
        if (videos.length > 0) {
            const videoElements = document.querySelectorAll('.artisan__video iframe');
            videoElements.forEach((element, index) => {
                if (index < videos.length) {
                    // Get the smallest file size video that's at least 720p
                    const videoFile = videos[index].video_files.find(file => file.height >= 720) || 
                                     videos[index].video_files[0];
                    
                    // Replace iframe with video element
                    const videoElement = document.createElement('video');
                    videoElement.src = videoFile.link;
                    videoElement.controls = true;
                    videoElement.autoplay = false;
                    videoElement.muted = true;
                    videoElement.loop = true;
                    videoElement.playsInline = true;
                    videoElement.poster = videos[index].image;
                    videoElement.setAttribute('loading', 'lazy');
                    videoElement.setAttribute('width', '100%');
                    videoElement.setAttribute('height', 'auto');
                    
                    element.parentNode.replaceChild(videoElement, element);
                }
            });
        }
    } catch (error) {
        console.error('Error fetching artisan videos:', error);
    }
}

/**
 * Fetch limited edition collection images
 */
async function fetchLimitedEditionImages() {
    try {
        // Fetch ocean-themed jewelry images
        const oceanQueries = ['blue gemstone jewelry', 'aquamarine jewelry', 'ocean inspired jewelry', 'blue topaz'];
        const oceanImages = await fetchPexelsImages(oceanQueries[Math.floor(Math.random() * oceanQueries.length)], 4);
        
        if (oceanImages.length > 0) {
            const oceanProducts = document.querySelectorAll('#ocean-preview .product-card__image img');
            oceanProducts.forEach((element, index) => {
                if (index < oceanImages.length) {
                    const optimizedImage = optimizeImage(oceanImages[index].src.large, 600);
                    element.src = optimizedImage.src;
                    element.srcset = optimizedImage.srcset;
                    element.sizes = optimizedImage.sizes;
                    element.alt = oceanImages[index].alt || 'Ocean-inspired jewelry piece';
                }
            });
        }
        
        // Fetch celestial-themed jewelry images
        const celestialQueries = ['star moon jewelry', 'celestial jewelry', 'constellation jewelry', 'star sapphire'];
        const celestialImages = await fetchPexelsImages(celestialQueries[Math.floor(Math.random() * celestialQueries.length)], 4);
        
        if (celestialImages.length > 0) {
            const celestialProducts = document.querySelectorAll('#celestial-products .product-card__image img');
            celestialProducts.forEach((element, index) => {
                if (index < celestialImages.length) {
                    const optimizedImage = optimizeImage(celestialImages[index].src.large, 600);
                    element.src = optimizedImage.src;
                    element.srcset = optimizedImage.srcset;
                    element.sizes = optimizedImage.sizes;
                    element.alt = celestialImages[index].alt || 'Celestial-inspired jewelry piece';
                }
            });
        }
    } catch (error) {
        console.error('Error fetching limited edition images:', error);
    }
}

/**
 * Fetch images from Pexels API
 */
async function fetchPexelsImages(query, count = 5) {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`, {
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });
        
        if (!response.ok) {
            throw new Error(`Pexels API error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.photos;
    } catch (error) {
        console.error('Error fetching from Pexels:', error);
        return getFallbackImages(query, count);
    }
}

/**
 * Fetch videos from Pexels API
 */
async function fetchPexelsVideos(query, count = 2) {
    try {
        const response = await fetch(`https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=${count}`, {
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });
        
        if (!response.ok) {
            throw new Error(`Pexels API error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.videos;
    } catch (error) {
        console.error('Error fetching videos from Pexels:', error);
        return getFallbackVideos(query, count);
    }
}

/**
 * Check if browser supports WebP
 */
function supportsWebP() {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
}

// Use WebP if supported
const useWebP = supportsWebP();

/**
 * Optimize image loading and processing
 */
function optimizeImage(imageUrl, width) {
    // Use WebP if supported
    const format = useWebP ? 'webp' : 'jpg';
    const baseUrl = `${imageUrl}?auto=compress&cs=tinysrgb&fm=${format}`;
    
    // Use srcset for responsive images
    const sizes = [320, 640, 1024, 1600];
    const srcset = sizes.map(size => `${baseUrl}&w=${size} ${size}w`).join(', ');
    
    return {
        src: `${baseUrl}&w=${width || 800}`,
        srcset: srcset,
        sizes: '(max-width: 320px) 320px, (max-width: 640px) 640px, (max-width: 1024px) 1024px, 1600px'
    };
}

/**
 * Create a product card element
 */
function createProductCard(id, imageSrc, imageAlt, title, price) {
    const optimizedImage = optimizeImage(imageSrc, 500);
    
    const article = document.createElement('article');
    article.className = 'product-card';
    article.dataset.productId = id;
    
    article.innerHTML = `
        <figure class="product-card__image">
            <img src="${optimizedImage.src}" 
                 srcset="${optimizedImage.srcset}" 
                 sizes="${optimizedImage.sizes}" 
                 alt="${imageAlt}" 
                 loading="lazy">
        </figure>
        <div class="product-card__content">
            <h3 class="product-card__title">${title}</h3>
            <p class="product-card__price">${price}</p>
            <button class="btn btn--secondary product-card__btn">Add to Cart</button>
        </div>
    `;
    
    return article;
}

/**
 * Get random product name based on category
 */
function getRandomProductName(category) {
    const names = {
        necklaces: [
            'Diamond Pendant Necklace',
            'Gold Chain Necklace',
            'Pearl Strand Necklace',
            'Sapphire Drop Necklace',
            'Emerald Halo Necklace',
            'Ruby Pendant Necklace',
            'Platinum Chain Necklace',
            'Amethyst Statement Necklace'
        ],
        bracelets: [
            'Diamond Tennis Bracelet',
            'Gold Charm Bracelet',
            'Silver Cuff Bracelet',
            'Pearl Link Bracelet',
            'Ruby Bangle Bracelet',
            'Emerald Tennis Bracelet',
            'Sapphire Chain Bracelet',
            'Rose Gold Bangle'
        ],
        rings: [
            'Diamond Solitaire Ring',
            'Sapphire Halo Ring',
            'Gold Band Ring',
            'Three-Stone Engagement Ring',
            'Emerald Cut Diamond Ring',
            'Ruby Cluster Ring',
            'Vintage Filigree Ring',
            'Platinum Eternity Band'
        ],
        earrings: [
            'Diamond Stud Earrings',
            'Pearl Drop Earrings',
            'Gold Hoop Earrings',
            'Sapphire Chandelier Earrings',
            'Emerald Cluster Earrings',
            'Ruby Dangle Earrings',
            'Platinum Diamond Hoops',
            'Vintage Pearl Studs'
        ]
    };
    
    const categoryNames = names[category] || names.necklaces;
    return categoryNames[Math.floor(Math.random() * categoryNames.length)];
}

/**
 * Get random price for product
 */
function getRandomPrice() {
    const basePrice = Math.floor(Math.random() * 5000) + 500;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(basePrice);
}

/**
 * Get fallback images if Pexels API fails
 */
function getFallbackImages(query, count) {
    const fallbackImages = [];
    
    for (let i = 0; i < count; i++) {
        fallbackImages.push({
            src: {
                original: `../images/products/fallback-${i + 1}.jpg`,
                large: `../images/products/fallback-${i + 1}.jpg`,
                large2x: `../images/products/fallback-${i + 1}.jpg`
            },
            alt: `${query} jewelry piece`
        });
    }
    
    return fallbackImages;
}

/**
 * Get fallback videos if Pexels API fails
 */
function getFallbackVideos(query, count) {
    const fallbackVideos = [];
    
    for (let i = 0; i < count; i++) {
        fallbackVideos.push({
            video_files: [
                {
                    link: `../videos/fallback-${i + 1}.mp4`,
                    height: 720
                }
            ],
            image: `../images/videos/fallback-${i + 1}.jpg`
        });
    }
    
    return fallbackVideos;
}