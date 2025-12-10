// Utility functions
export const utils = {
  logError: function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
    return false;
  },
  
  debounce: function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Image error handling
  handleImageError: function(imgElement) {
    if (!imgElement) return;
    
    const parent = imgElement.parentElement;
    if (!parent) return;

    parent.classList.remove('loading');
    parent.classList.add('image-error');
    
    // Create error content
    const errorContent = document.createElement('div');
    errorContent.className = 'flex flex-col items-center justify-center h-full';
    
    const icon = document.createElement('i');
    icon.className = 'fas fa-image text-4xl text-gray-400 mb-2';
    
    const text = document.createElement('p');
    text.className = 'text-gray-500';
    text.textContent = 'Image not available';
    
    errorContent.appendChild(icon);
    errorContent.appendChild(text);
    parent.innerHTML = '';
    parent.appendChild(errorContent);
  },

  // Form validation
  validateEmail: function(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Smooth scroll
  smoothScroll: function(targetElement, offset = 0) {
    if (!targetElement) return;
    
    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}; 