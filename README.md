# Luxe Gems - Jewelry E-commerce Website

live website URL : https://luxegems.netlify.app/

A comprehensive, professional jewelry e-commerce website for a luxury brand focused on limited edition collections, artisan craftsmanship, and custom orders.

## Project Overview

Luxe Gems is a high-end jewelry e-commerce website that showcases artisan craftsmanship, provides style inspiration, educates customers on jewelry care, highlights limited editions, and offers custom order capabilities. The website features responsive design, accessibility features, and Shopify integration for inventory management.

## Key Features

- **Five Key Pages:**
  - Artisan Spotlight: Profiles of artisans with their stories and craftsmanship process
  - Style & Inspiration: Curated looks pairing jewelry with clothing and styling tips
  - Jewelry Care Guide: How-to articles and downloadable care guides
  - Limited Editions: Countdown timers and scarcity-driven messaging for exclusive collections
  - Custom Orders: Form for personalized requests and gallery of past custom pieces

- **Responsive Design:**
  - Mobile-first approach with adaptive breakpoints
  - Optimized layouts for mobile, tablet, and desktop
  - Touch-friendly interactions for mobile users

- **Accessibility Features:**
  - Semantic HTML5 structure
  - ARIA roles and labels
  - Keyboard navigation support
  - High contrast color scheme
  - Screen reader compatibility

- **Luxury Aesthetic:**
  - Clean, sophisticated design inspired by Tiffany.com
  - BEM methodology for CSS organization
  - Subtle animations and micro-interactions
  - Ample white space and elegant typography

- **Shopify Integration:**
  - Real-time inventory management
  - Product synchronization
  - Limited edition tracking

## Technologies Used

- HTML5
- CSS3 (BEM methodology)
- JavaScript (ES6+)
- Shopify Buy SDK
- Responsive Design
- Web Accessibility (WCAG 2.1)

## Project Structure

```
/
├── css/
│   ├── main.css          # Main stylesheet
│   └── page-styles.css   # Page-specific styles
├── images/
│   ├── products/         # Product images
│   ├── artisans/         # Artisan profile images
│   ├── care/             # Jewelry care guide images
│   ├── limited/          # Limited edition collection images
│   ├── style/            # Style inspiration images
│   └── custom/           # Custom order gallery images
├── js/
│   ├── main.js           # Main JavaScript functionality
│   └── shopify-integration.js # Shopify inventory management
├── pages/
│   ├── artisan-spotlight.html
│   ├── style-inspiration.html
│   ├── jewelry-care.html
│   ├── limited-editions.html
│   └── custom-orders.html
└── index.html            # Homepage
```

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/luxe-gems.git
   ```

2. Open the project in your preferred code editor.

3. To view the website locally, open `index.html` in a web browser.

## Shopify Integration

To enable Shopify integration:

1. Create a Shopify account and set up your store.
2. Generate a Storefront API access token.
3. Update the configuration in `js/shopify-integration.js` with your store domain and access token.

## Deployment

The website can be deployed using various methods:

- **GitHub Pages:** Simple static site hosting
- **Netlify:** CI/CD and form handling capabilities
- **Vercel:** Optimized for performance
- **Shopify:** For full e-commerce functionality

## Performance Optimization

- Lazy loading of images
- Minified CSS and JavaScript
- WebP image format for optimal compression
- Efficient asset caching

## Accessibility Compliance

This website follows WCAG 2.1 guidelines for accessibility:

- Proper heading hierarchy
- Alt text for all images
- ARIA attributes for interactive elements
- Keyboard navigation support
- Color contrast meeting AA standards

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Future Enhancements

- Product filtering and search functionality
- User accounts and wishlist features
- Blog section for jewelry trends and education
- Virtual try-on using AR technology
- International shipping and multi-currency support

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from Tiffany.com
- Placeholder images from Pexels API
- Icons from Feather Icons