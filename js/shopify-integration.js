/**
 * Luxe Gems - Shopify Integration
 * Handles inventory management and product synchronization with Shopify
 */

// Initialize Shopify Buy SDK
const shopifyClient = ShopifyBuy.buildClient({
  domain: 'your-store.myshopify.com',
  storefrontAccessToken: 'your-storefront-access-token',
  apiVersion: '2023-07'
});

document.addEventListener('DOMContentLoaded', () => {
  // Initialize product data
  initShopify();
});

/**
 * Initialize Shopify integration
 */
async function initShopify() {
  try {
    // Fetch products from Shopify
    const products = await fetchShopifyProducts();
    
    // Update product displays with inventory information
    updateProductInventory(products);
    
    // Set up inventory tracking for limited edition items
    trackLimitedEditionInventory(products);
    
    // Initialize add to cart functionality
    initAddToCartButtons();
  } catch (error) {
    console.error('Error initializing Shopify integration:', error);
  }
}

/**
 * Fetch products from Shopify
 * @returns {Promise} - Promise resolving to array of products
 */
async function fetchShopifyProducts() {
  try {
    // In a real implementation, this would fetch from Shopify API
    // For this demo, we'll simulate the response
    return simulateShopifyProducts();
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    throw error;
  }
}

/**
 * Update product displays with inventory information
 * @param {Array} products - Array of product objects
 */
function updateProductInventory(products) {
  const productElements = document.querySelectorAll('[data-product-id]');
  
  productElements.forEach(element => {
    const productId = element.dataset.productId;
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Update inventory count
    const inventoryElement = element.querySelector('.product-card__inventory');
    if (inventoryElement) {
      if (product.availableForSale) {
        if (product.totalInventory <= 10) {
          inventoryElement.textContent = `Only ${product.totalInventory} left`;
          inventoryElement.classList.add('product-card__inventory--low');
        } else {
          inventoryElement.textContent = 'In Stock';
        }
      } else {
        inventoryElement.textContent = 'Sold Out';
        inventoryElement.classList.add('product-card__inventory--sold-out');
        
        // Disable add to cart button
        const addToCartBtn = element.querySelector('.product-card__btn');
        if (addToCartBtn) {
          addToCartBtn.disabled = true;
          addToCartBtn.textContent = 'Sold Out';
          addToCartBtn.classList.add('btn--disabled');
        }
      }
    }
    
    // Update price
    const priceElement = element.querySelector('.product-card__price');
    if (priceElement && product.price) {
      priceElement.textContent = formatCurrency(product.price);
    }
  });
}

/**
 * Track inventory for limited edition items
 * @param {Array} products - Array of product objects
 */
function trackLimitedEditionInventory(products) {
  // Find limited edition products
  const limitedEditionProducts = products.filter(product => 
    product.tags && product.tags.includes('limited-edition')
  );
  
  // Set up real-time inventory tracking
  if (limitedEditionProducts.length > 0) {
    // In a real implementation, this would use Shopify webhooks
    // For this demo, we'll simulate periodic checks
    setInterval(() => {
      checkLimitedEditionInventory(limitedEditionProducts);
    }, 60000); // Check every minute
  }
}

/**
 * Check inventory levels for limited edition products
 * @param {Array} products - Array of limited edition product objects
 */
async function checkLimitedEditionInventory(products) {
  try {
    // In a real implementation, this would fetch fresh data from Shopify
    // For this demo, we'll simulate inventory changes
    const updatedProducts = simulateInventoryChanges(products);
    
    // Update displays with new inventory information
    updateProductInventory(updatedProducts);
    
    // Update collection availability counters
    updateCollectionAvailability(updatedProducts);
  } catch (error) {
    console.error('Error checking limited edition inventory:', error);
  }
}

/**
 * Update collection availability counters
 * @param {Array} products - Array of product objects
 */
function updateCollectionAvailability(products) {
  const collectionElements = document.querySelectorAll('[data-collection-id]');
  
  collectionElements.forEach(element => {
    const collectionId = element.dataset.collectionId;
    const collectionProducts = products.filter(p => 
      p.collections && p.collections.includes(collectionId)
    );
    
    if (collectionProducts.length === 0) return;
    
    // Calculate available items
    const availableItems = collectionProducts.filter(p => p.availableForSale);
    const totalInventory = collectionProducts.reduce((sum, p) => sum + p.totalInventory, 0);
    
    // Update availability text
    const availabilityElement = element.querySelector('.limited-collection__availability-remaining');
    if (availabilityElement) {
      if (totalInventory > 0) {
        availabilityElement.textContent = `Only ${totalInventory} items remaining`;
      } else {
        const availabilityTextElement = element.querySelector('.limited-collection__availability-text');
        if (availabilityTextElement) {
          availabilityTextElement.textContent = 'Sold Out';
          availabilityTextElement.classList.add('limited-collection__availability-text--sold-out');
        }
      }
    }
  });
}

/**
 * Initialize add to cart buttons
 */
function initAddToCartButtons() {
  const addToCartButtons = document.querySelectorAll('.product-card__btn');
  
  addToCartButtons.forEach(button => {
    if (button.disabled) return;
    
    button.addEventListener('click', async function() {
      const productCard = this.closest('[data-product-id]');
      if (!productCard) return;
      
      const productId = productCard.dataset.productId;
      
      try {
        // Show loading state
        button.classList.add('btn--loading');
        button.disabled = true;
        
        // In a real implementation, this would add to Shopify cart
        // For this demo, we'll simulate the process
        await simulateAddToCart(productId);
        
        // Update cart count
        updateCartCount();
        
        // Show success message
        const productTitle = productCard.querySelector('.product-card__title').textContent;
        showToast(`${productTitle} added to cart`);
      } catch (error) {
        console.error('Error adding to cart:', error);
        showToast('Error adding to cart. Please try again.');
      } finally {
        // Reset button state
        button.classList.remove('btn--loading');
        button.disabled = false;
      }
    });
  });
}

/**
 * Update cart count in header
 */
function updateCartCount() {
  const cartCountElement = document.querySelector('.header__cart-count');
  if (!cartCountElement) return;
  
  // In a real implementation, this would fetch from Shopify cart
  // For this demo, we'll use localStorage
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
 * Format currency value
 * @param {number} value - Price value
 * @returns {string} - Formatted price string
 */
function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(value);
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
 * Simulate Shopify products (for demo purposes)
 * @returns {Array} - Array of simulated product objects
 */
function simulateShopifyProducts() {
  return [
    {
      id: 'celestial-necklace',
      title: 'Constellation Necklace',
      price: 3250,
      availableForSale: true,
      totalInventory: 8,
      tags: ['limited-edition', 'necklace'],
      collections: ['celestial']
    },
    {
      id: 'celestial-earrings',
      title: 'Star & Moon Earrings',
      price: 2450,
      availableForSale: true,
      totalInventory: 5,
      tags: ['limited-edition', 'earrings'],
      collections: ['celestial']
    },
    {
      id: 'celestial-bracelet',
      title: 'Shooting Star Bracelet',
      price: 4150,
      availableForSale: true,
      totalInventory: 3,
      tags: ['limited-edition', 'bracelet'],
      collections: ['celestial']
    },
    {
      id: 'celestial-ring',
      title: 'Midnight Sky Ring',
      price: 3850,
      availableForSale: true,
      totalInventory: 4,
      tags: ['limited-edition', 'ring'],
      collections: ['celestial']
    },
    {
      id: 'ocean-necklace',
      title: 'Aquamarine Pendant Necklace',
      price: 2450,
      availableForSale: false, // Coming soon
      totalInventory: 50,
      tags: ['limited-edition', 'necklace', 'coming-soon'],
      collections: ['ocean-treasures']
    },
    {
      id: 'ocean-earrings',
      title: 'Blue Topaz Drop Earrings',
      price: 1890,
      availableForSale: false, // Coming soon
      totalInventory: 50,
      tags: ['limited-edition', 'earrings', 'coming-soon'],
      collections: ['ocean-treasures']
    }
  ];
}

/**
 * Simulate inventory changes (for demo purposes)
 * @param {Array} products - Array of product objects
 * @returns {Array} - Updated array of product objects
 */
function simulateInventoryChanges(products) {
  // Create a copy of products to avoid modifying the original
  const updatedProducts = JSON.parse(JSON.stringify(products));
  
  // Randomly decrease inventory for some products
  updatedProducts.forEach(product => {
    if (product.availableForSale && product.totalInventory > 0) {
      // 20% chance of inventory change
      if (Math.random() < 0.2) {
        product.totalInventory = Math.max(0, product.totalInventory - 1);
        
        // If inventory reaches 0, mark as sold out
        if (product.totalInventory === 0) {
          product.availableForSale = false;
        }
      }
    }
  });
  
  return updatedProducts;
}

/**
 * Simulate adding product to cart (for demo purposes)
 * @param {string} productId - Product ID
 * @returns {Promise} - Promise resolving after simulated API call
 */
async function simulateAddToCart(productId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Get product details
        const products = simulateShopifyProducts();
        const product = products.find(p => p.id === productId);
        
        if (!product) {
          throw new Error('Product not found');
        }
        
        // Get existing cart or initialize empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already exists in cart
        const existingProductIndex = cart.findIndex(item => item.id === productId);
        
        if (existingProductIndex >= 0) {
          // Increment quantity if product already in cart
          cart[existingProductIndex].quantity += 1;
        } else {
          // Add new product to cart
          cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1
          });
        }
        
        // Save updated cart
        localStorage.setItem('cart', JSON.stringify(cart));
        
        resolve();
      } catch (error) {
        reject(error);
      }
    }, 500); // Simulate network delay
  });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    updateProductInventory,
    trackLimitedEditionInventory,
    formatCurrency
  };
}