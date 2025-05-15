/**
 * Luxe Gems - Pexels API Integration
 * Fetches high-quality jewelry images from Pexels API
 */

const PEXELS_API_KEY = '9HvMoyVUcQyBiFBGVNmWzchrT0kKP5rvOWdOykwZghFS41dzSrPv3kqw';

document.addEventListener('DOMContentLoaded', () => {
    // Create image directories if they don't exist
    createImageDirectories();
    
    // Initialize product images
    initProductImages();
    
    // Fix hero video
    fixHeroVideo();
});

/**
 * Create necessary image directories
 */
function createImageDirectories() {
    const directories = [
        'images/products',
        'images/style',
        'images/artisans',
        'images/limited',
        'images/care',
        'images/workshop'
    ];
    
    directories.forEach(dir => {
        const path = dir.split('/');
        let currentPath = '';
        
        path.forEach(folder => {
            currentPath += folder + '/';
            try {
                if (!window.dirExists) {
                    // Create directory using fetch to a server endpoint
                    // This is a placeholder - in a real implementation, you'd use server-side code
                    console.log(`Creating directory: ${currentPath}`);
                }
            } catch (error) {
                console.error(`Error creating directory ${currentPath}:`, error);
            }
        });
    });
}

/**
 * Fix hero video
 */
function fixHeroVideo() {
    const heroVideo = document.querySelector('.hero__video');
    if (heroVideo) {
        // Use a reliable video source
        const videoSource = heroVideo.querySelector('source');
        if (videoSource) {
            videoSource.src = 'https://cdn.pixabay.com/vimeo/328240392/jewelry-23378.mp4?width=1280&hash=f1c3e7b6c7d9c5e5e5e5e5e5e5e5e5e5e5e5e5e5';
            heroVideo.load();
        }
        
        // Add fallback image
        heroVideo.poster = 'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=1600';
    }
    
    // Add logo
    const heroLogo = document.querySelector('.hero__logo');
    if (heroLogo) {
        heroLogo.src = 'https://via.placeholder.com/180x80/ffffff/3A7BD5?text=LUXE+GEMS';
    }
}

/**
 * Initialize product images from Pexels
 */
async function initProductImages() {
    try {
        // Fetch images for each category with specific queries
        await fetchCategoryImages('necklaces', 'gold necklace jewelry', 4);
        await fetchCategoryImages('bracelets', 'bracelet jewelry', 4);
        await fetchCategoryImages('rings', 'diamond ring jewelry', 4);
        await fetchCategoryImages('earrings', 'earrings jewelry', 4);
        
        // Fix homepage product images
        fixHomepageProductImages();
        
        // Fetch artisan images
        await fetchArtisanImages();
        
        // Fetch artisan videos
        await fetchArtisanVideos();
        
        // Fetch limited edition images
        await fetchLimitedEditionImages();
        
        // Fetch style inspiration images
        await fetchStyleImages();
        
        // Fetch jewelry care images
        await fetchCareImages();
    } catch (error) {
        console.error('Error initializing product images:', error);
    }
}

/**
 * Fix homepage product images
 */
function fixHomepageProductImages() {
    // Fix necklace image
    const necklaceImg = document.querySelector('.product-card:nth-child(1) .product-card__image img');
    if (necklaceImg) {
        necklaceImg.src = 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=800';
        necklaceImg.alt = 'Gold pendant necklace with emerald stone';
    }
    
    // Fix bracelet image
    const braceletImg = document.querySelector('.product-card:nth-child(2) .product-card__image img');
    if (braceletImg) {
        braceletImg.src = 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800';
        braceletImg.alt = 'Silver chain bracelet with sapphire charm';
    }
    
    // Fix ring image
    const ringImg = document.querySelector('.product-card:nth-child(3) .product-card__image img');
    if (ringImg) {
        ringImg.src = 'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=800';
        ringImg.alt = 'Rose gold ring with diamond accents';
    }
    
    // Fix earrings image
    const earringsImg = document.querySelector('.product-card:nth-child(4) .product-card__image img');
    if (earringsImg) {
        earringsImg.src = 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=800';
        earringsImg.alt = 'Pearl drop earrings with silver accents';
    }
    
    // Fix artisan image
    const artisanImg = document.querySelector('.artisan-preview__image img');
    if (artisanImg) {
        artisanImg.src = 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=800';
        artisanImg.alt = 'Jewelry artisan working in studio';
    }
    
    // Fix limited edition image
    const limitedImg = document.querySelector('.limited-edition-preview__image img');
    if (limitedImg) {
        limitedImg.src = 'https://images.pexels.com/photos/10513822/pexels-photo-10513822.jpeg?auto=compress&cs=tinysrgb&w=800';
        limitedImg.alt = 'Ocean Treasures Collection preview';
    }
    
    // Fix style images
    const styleImgs = document.querySelectorAll('.style-card__image img');
    const styleImageUrls = [
        'https://images.pexels.com/photos/1374910/pexels-photo-1374910.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1619801/pexels-photo-1619801.jpeg?auto=compress&cs=tinysrgb&w=800'
    ];
    
    styleImgs.forEach((img, index) => {
        if (index < styleImageUrls.length) {
            img.src = styleImageUrls[index];
        }
    });
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
async function fetchCategoryImages(categoryId, query, count) {
    try {
        // Use a random query from the array for each category
        const categoryQuery = categoryQueries[categoryId] ? 
            categoryQueries[categoryId][Math.floor(Math.random() * categoryQueries[categoryId].length)] : 
            query;
        
        const images = await fetchPexelsImages(categoryQuery, count);
        const categorySection = document.getElementById(categoryId);
        
        if (!categorySection) return;
        
        const grid = categorySection.querySelector('.collection__grid');
        if (!grid) return;
        
        // Clear existing content
        grid.innerHTML = '';
        
        // Create product cards with fetched images
        images.forEach((image, index) => {
            const productCard = createProductCard(
                `${categoryId}-${index + 1}`,
                image.src.large,
                image.alt || `${categoryQuery} ${index + 1}`,
                getRandomProductName(categoryId),
                getRandomPrice()
            );
            
            grid.appendChild(productCard);
        });
    } catch (error) {
        console.error(`Error fetching ${categoryId} images:`, error);
        
        // Use fallback images
        const fallbackImages = getFallbackImages(categoryId, count);
        const categorySection = document.getElementById(categoryId);
        
        if (!categorySection) return;
        
        const grid = categorySection.querySelector('.collection__grid');
        if (!grid) return;
        
        // Clear existing content
        grid.innerHTML = '';
        
        // Create product cards with fallback images
        fallbackImages.forEach((image, index) => {
            const productCard = createProductCard(
                `${categoryId}-${index + 1}`,
                image.src.large,
                image.alt,
                getRandomProductName(categoryId),
                getRandomPrice()
            );
            
            grid.appendChild(productCard);
        });
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
                    artisanElements[i].src = artisanImages[0].src.large;
                    artisanElements[i].alt = artisanImages[0].alt || 'Jewelry artisan at work';
                }
            }
        }
    } catch (error) {
        console.error('Error fetching artisan images:', error);
        
        // Use fallback images
        const artisanElements = document.querySelectorAll('.artisan__image img');
        const fallbackUrls = [
            'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3768886/pexels-photo-3768886.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3768889/pexels-photo-3768889.jpeg?auto=compress&cs=tinysrgb&w=800'
        ];
        
        artisanElements.forEach((element, index) => {
            if (index < fallbackUrls.length) {
                element.src = fallbackUrls[index];
                element.alt = 'Jewelry artisan at work';
            }
        });
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
        
        // Use fallback videos
        const videoElements = document.querySelectorAll('.artisan__video iframe');
        const fallbackVideos = [
            'https://player.vimeo.com/video/328240392',
            'https://player.vimeo.com/video/328240392'
        ];
        
        videoElements.forEach((element, index) => {
            if (index < fallbackVideos.length) {
                element.src = fallbackVideos[index];
            }
        });
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
                    element.src = oceanImages[index].src.large;
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
                    element.src = celestialImages[index].src.large;
                    element.alt = celestialImages[index].alt || 'Celestial-inspired jewelry piece';
                }
            });
        }
    } catch (error) {
        console.error('Error fetching limited edition images:', error);
        
        // Use fallback images
        const oceanProducts = document.querySelectorAll('#ocean-preview .product-card__image img');
        const celestialProducts = document.querySelectorAll('#celestial-products .product-card__image img');
        
        const oceanFallbacks = [
            'https://images.pexels.com/photos/10513822/pexels-photo-10513822.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/10513823/pexels-photo-10513823.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/10513824/pexels-photo-10513824.jpeg?auto=compress&cs=tinysrgb&w=800'
        ];
        
        const celestialFallbacks = [
            'https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1458868/pexels-photo-1458868.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1458869/pexels-photo-1458869.jpeg?auto=compress&cs=tinysrgb&w=800'
        ];
        
        oceanProducts.forEach((element, index) => {
            if (index < oceanFallbacks.length) {
                element.src = oceanFallbacks[index];
                element.alt = 'Ocean-inspired jewelry piece';
            }
        });
        
        celestialProducts.forEach((element, index) => {
            if (index < celestialFallbacks.length) {
                element.src = celestialFallbacks[index];
                element.alt = 'Celestial-inspired jewelry piece';
            }
        });
    }
}

/**
 * Fetch style inspiration images
 */
async function fetchStyleImages() {
    try {
        const styleQueries = ['summer jewelry styling', 'office jewelry styling', 'evening jewelry styling'];
        
        for (let i = 0; i < styleQueries.length; i++) {
            const styleImages = await fetchPexelsImages(styleQueries[i], 1);
            if (styleImages.length > 0) {
                const styleElements = document.querySelectorAll('.style-card__image img');
                if (i < styleElements.length) {
                    styleElements[i].src = styleImages[0].src.large;
                    styleElements[i].alt = styleImages[0].alt || `${styleQueries[i]} example`;
                }
            }
        }
    } catch (error) {
        console.error('Error fetching style images:', error);
    }
}

/**
 * Fetch jewelry care images
 */
async function fetchCareImages() {
    try {
        const careQueries = ['jewelry cleaning', 'jewelry polishing', 'jewelry storage', 'gemstone care'];
        
        for (let i = 0; i < careQueries.length; i++) {
            const careImages = await fetchPexelsImages(careQueries[i], 1);
            if (careImages.length > 0) {
                const careElements = document.querySelectorAll('.care-guide__image img');
                if (i < careElements.length) {
                    careElements[i].src = careImages[0].src.large;
                    careElements[i].alt = careImages[0].alt || `${careQueries[i]} example`;
                }
            }
        }
    } catch (error) {
        console.error('Error fetching care images:', error);
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
 * Create a product card element
 */
function createProductCard(id, imageSrc, imageAlt, title, price) {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.dataset.productId = id;
    
    article.innerHTML = `
        <figure class="product-card__image">
            <img src="${imageSrc}" alt="${imageAlt}" loading="lazy">
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
function getFallbackImages(category, count) {
    const fallbackImages = [];
    
    // Category-specific fallback images
    const fallbackUrls = {
        necklaces: [
            'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1458868/pexels-photo-1458868.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1458869/pexels-photo-1458869.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        bracelets: [
            'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1191532/pexels-photo-1191532.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1191533/pexels-photo-1191533.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1191534/pexels-photo-1191534.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        rings: [
            'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1457802/pexels-photo-1457802.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1457803/pexels-photo-1457803.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1457804/pexels-photo-1457804.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        earrings: [
            'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1413421/pexels-photo-1413421.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1413422/pexels-photo-1413422.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1413423/pexels-photo-1413423.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
    };
    
    // Use category-specific fallbacks if available, otherwise use generic ones
    const urls = fallbackUrls[category] || [
        'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=800'
    ];
    
    for (let i = 0; i < count; i++) {
        fallbackImages.push({
            src: {
                original: urls[i % urls.length],
                large: urls[i % urls.length],
                medium: urls[i % urls.length]
            },
            alt: `${category} jewelry piece ${i + 1}`
        });
    }
    
    return fallbackImages;
}

/**
 * Get fallback videos if Pexels API fails
 */
function getFallbackVideos(query, count) {
    const fallbackVideos = [];
    
    const videoUrls = [
        'https://player.vimeo.com/external/328240392.hd.mp4?s=7e3f091c915a0c11e9c9cf31342b2835fc83d0bb&profile_id=175',
        'https://player.vimeo.com/external/328240393.hd.mp4?s=7e3f091c915a0c11e9c9cf31342b2835fc83d0bb&profile_id=175'
    ];
    
    for (let i = 0; i < count; i++) {
        fallbackVideos.push({
            video_files: [
                {
                    link: videoUrls[i % videoUrls.length],
                    height: 720
                }
            ],
            image: 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=800'
        });
    }
    
    return fallbackVideos;
}