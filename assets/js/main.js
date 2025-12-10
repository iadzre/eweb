import { utils } from './utils.js';
import { mobileMenu, numberAnimation, newsletterForm, imageHandler, responsiveNav } from './components.js';

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Set up error handling
  utils.setupErrorHandling();
  
  // Initialize components
  mobileMenu.init();
  numberAnimation.init();
  newsletterForm.init();
  imageHandler.init();
  responsiveNav.init();
  
  // Set up smooth scrolling for anchor links
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
}); 