// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function() {
      const menu = document.getElementById('mobile-menu');
      const icon = this.querySelector('i');
      
      if (menu && icon) {
        menu.classList.toggle('hidden');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }
});

// Counter Animation
const animateCounter = (element, target, duration = 2000) => {
  if (!element || isNaN(target)) return;
  
  let start = 0;
  const increment = target / (duration / 16); // 60fps
  
  const updateCounter = () => {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  
  updateCounter();
};

// Intersection Observer for counter animation
if (typeof IntersectionObserver !== 'undefined') {
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        if (!isNaN(target)) {
          animateCounter(counter, target);
          observer.unobserve(counter); // Stop observing after animation
        }
      }
    });
  }, observerOptions);

  // Start observing all counters
  document.querySelectorAll('.counter').forEach(counter => {
    observer.observe(counter);
  });
}

// Scroll Reveal Animation
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

const revealOnScroll = () => {
  scrollRevealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Smooth hover effects for cards
document.querySelectorAll('.hover-lift').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
}); 

// Tab Switching Functionality
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => {
          btn.classList.remove('active', 'text-primary', 'border-primary');
          btn.classList.add('text-gray-500', 'border-transparent');
        });
        tabContents.forEach(content => content.classList.add('hidden'));

        // Add active class to clicked button
        button.classList.add('active', 'text-primary', 'border-primary');
        button.classList.remove('text-gray-500', 'border-transparent');

        // Show corresponding content
        const tabId = button.getAttribute('data-tab');
        const targetTab = document.getElementById(`${tabId}-tab`);
        if (targetTab) {
          targetTab.classList.remove('hidden');
        }
      });
    });
  }
});

// Resource Tab Switching
document.addEventListener('DOMContentLoaded', function() {
  const resourceTabButtons = document.querySelectorAll('.tab-btn');
  const resourceItems = document.querySelectorAll('.resource-item');

  resourceTabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      resourceTabButtons.forEach(btn => {
        btn.classList.remove('active', 'border-primary');
        btn.classList.add('border-transparent');
      });

      // Add active class to clicked button
      button.classList.add('active', 'border-primary');
      button.classList.remove('border-transparent');

      // Show/hide resources based on category
      const selectedCategory = button.getAttribute('data-tab');
      
      resourceItems.forEach(item => {
        if (selectedCategory === 'all' || item.getAttribute('data-category') === selectedCategory) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});

// Contact Form Handler
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const successMessage = document.getElementById('successMessage');
  
  // Simple form validation
  const formData = new FormData(form);
  let isValid = true;
  
  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add('border-red-500');
    } else {
      field.classList.remove('border-red-500');
    }
  });
  
  if (isValid) {
    // Show success message
    if (successMessage) {
      successMessage.classList.remove('hidden');
      form.reset();
      
      // Hide message after 5 seconds
      setTimeout(() => {
        successMessage.classList.add('hidden');
      }, 5000);
    }
    
    // In a real application, you would send the form data to a server here
    console.log('Form submitted:', Object.fromEntries(formData));
  }
  
  return false;
}

// FAQ Toggle Function
function toggleFAQ(button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector('i');
  
  if (content && icon) {
    const isHidden = content.classList.contains('hidden');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-content').forEach(item => {
      if (item !== content) {
        item.classList.add('hidden');
        const otherIcon = item.previousElementSibling.querySelector('i');
        if (otherIcon) {
          otherIcon.classList.remove('fa-chevron-up');
          otherIcon.classList.add('fa-chevron-down');
        }
      }
    });
    
    // Toggle current FAQ item
    if (isHidden) {
      content.classList.remove('hidden');
      icon.classList.remove('fa-chevron-down');
      icon.classList.add('fa-chevron-up');
    } else {
      content.classList.add('hidden');
      icon.classList.remove('fa-chevron-up');
      icon.classList.add('fa-chevron-down');
    }
  }
}