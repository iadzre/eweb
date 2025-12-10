import { utils } from './utils.js';

// Mobile Menu Component
export const mobileMenu = {
  init: function() {
    const button = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    
    if (button && menu) {
      // Handle menu toggle
      button.addEventListener('click', () => {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
        menu.classList.toggle('hidden');
        
        const icon = button.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-bars');
          icon.classList.toggle('fa-times');
        }
      });

      // Handle window resize
      const handleResize = utils.debounce(() => {
        if (window.innerWidth >= 768) { // md breakpoint
          menu.classList.add('hidden');
          button.setAttribute('aria-expanded', 'false');
          const icon = button.querySelector('i');
          if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
          }
        }
      }, 250);

      window.addEventListener('resize', handleResize);
    }
  }
};

// Number Animation Component
export const numberAnimation = {
  animate: function(element) {
    const target = parseInt(element.getAttribute('data-count'));
    if (isNaN(target)) return;
    
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateNumber = () => {
      current += step;
      if (current < target) {
        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        requestAnimationFrame(updateNumber);
      } else {
        element.textContent = target + (element.textContent.includes('+') ? '+' : '');
      }
    };
    
    updateNumber();
  },
  
  init: function() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const numberElements = entry.target.querySelectorAll('[data-count]');
            numberElements.forEach(this.animate);
            observer.unobserve(entry.target);
          }
        });
      }, { 
        threshold: 0.5,
        rootMargin: '50px'
      });

      const statsSection = document.querySelector('.stats-section');
      if (statsSection) {
        observer.observe(statsSection);
      }
    } else {
      const numberElements = document.querySelectorAll('[data-count]');
      numberElements.forEach(this.animate);
    }
  }
};

// Newsletter Form Component
export const newsletterForm = {
  init: function() {
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
          if (utils.validateEmail(emailInput.value)) {
            // Here you would typically send the email to your server
            console.log('Newsletter subscription:', emailInput.value);
            emailInput.value = '';
            alert('Thank you for subscribing!');
          } else {
            alert('Please enter a valid email address');
          }
        }
      });
    }
  }
};

// Image Handler Component
export const imageHandler = {
  init: function() {
    document.querySelectorAll('img').forEach(img => {
      // Handle image errors
      img.addEventListener('error', () => {
        utils.handleImageError(img);
      });

      // Handle responsive images
      if (img.dataset.src) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              img.src = img.dataset.src;
              observer.unobserve(img);
            }
          });
        });
        observer.observe(img);
      }
    });
  }
};

// Responsive Navigation Component
export const responsiveNav = {
  init: function() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    const handleScroll = utils.debounce(() => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
      }
      
      if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scrolling down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
      } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scrolling up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
      }
      
      lastScroll = currentScroll;
    }, 100);

    window.addEventListener('scroll', handleScroll);
  }
}; 