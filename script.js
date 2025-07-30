document.addEventListener('DOMContentLoaded', () => {
  
  // Mobile hamburger menu functionality
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking on a nav link (mobile)
  document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close menu when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  // Scroll reveal animation
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        card.classList.add('visible');
      }
    });
  });

  // Enhanced counter animation for stats
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 20);
  }

  // Stats section animation with Intersection Observer
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statsCards = entry.target.querySelectorAll('.card p');
        statsCards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.5)';
            
            // Extract number from text content
            const text = card.textContent;
            const number = parseInt(text.match(/\d+/)?.[0] || '0');
            
            // Animate the counter
            let current = 0;
            const timer = setInterval(() => {
              current += Math.ceil(number / 50);
              if (current >= number) {
                current = number;
                clearInterval(timer);
              }
              card.textContent = text.replace(/\d+/, current);
            }, 30);

            // Animate the appearance
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 100);
          }, index * 200);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Enhanced modal functionality
  window.openModal = () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    setTimeout(() => {
      modal.querySelector('.modal-content').style.transform = 'scale(1)';
      modal.querySelector('.modal-content').style.opacity = '1';
    }, 10);
  };

  window.closeModal = () => {
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.style.transform = 'scale(0.8)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  };

  // Close modal when clicking outside
  document.getElementById('modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
      closeModal();
    }
  });

  // Enhanced form submissions with animations
  function handleFormSubmission(formId, successMessage) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const button = this.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      
      // Loading animation
      button.textContent = 'Processing...';
      button.style.background = 'linear-gradient(135deg, #ffa726, #ff7043)';
      
      setTimeout(() => {
        // Success animation
        button.textContent = '✓ Success!';
        button.style.background = 'linear-gradient(135deg, #66bb6a, #43a047)';
        
        // Show success message with animation
        showNotification(successMessage, 'success');
        
        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = '';
          this.reset();
        }, 2000);
      }, 1000);
    });
  }

  // Notification system
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span>${message}</span>
        <button onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 3000;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 15px;
      padding: 1rem 1.5rem;
      color: white;
      transform: translateX(400px);
      transition: all 0.3s ease;
      max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  // ESG Calculator with enhanced animation
  const esgForm = document.getElementById('esgCalc');
  if (esgForm) {
    esgForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const electricity = +document.getElementById('electricity')?.value || 0;
      const transport = +document.getElementById('transport')?.value || 0;
      const waste = +document.getElementById('waste')?.value || 0;
      
      const score = Math.max(0, 100 - (electricity * 0.2 + transport * 0.3 + waste * 0.5));
      const resultElement = document.getElementById('esgResult');
      
      if (resultElement) {
        resultElement.style.opacity = '0';
        resultElement.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
          resultElement.innerHTML = `
            <div style="
              background: linear-gradient(135deg, #667eea, #764ba2);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-size: 1.5rem;
              font-weight: bold;
              margin-top: 1rem;
            ">
              Your ESG Score: ${score.toFixed(1)}/100
            </div>
          `;
          resultElement.style.opacity = '1';
          resultElement.style.transform = 'scale(1)';
        }, 200);
      }
    });
  }

  // Handle other forms
  handleFormSubmission('pledgeForm', 'Thank you for taking the pledge! 🌱');
  handleFormSubmission('feedbackForm', 'Feedback submitted successfully! 💬');
  handleFormSubmission('contactForm', 'Message sent! We\'ll get back to you soon. 📧');

  // Pledge wall functionality
  const pledgeForm = document.getElementById('pledgeForm');
  if (pledgeForm) {
    pledgeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const nameInput = document.getElementById('pledgeName');
      const name = nameInput?.value.trim();
      const checkboxes = document.querySelectorAll('#pledgeForm input[type="checkbox"]:checked');
      const pledges = Array.from(checkboxes).map(cb => cb.value);
      
      if (name && pledges.length > 0) {
        const pledgeWall = document.getElementById('pledgeWall');
        if (pledgeWall) {
          const pledgeItem = document.createElement('div');
          pledgeItem.style.cssText = `
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 10px;
            padding: 1rem;
            margin: 1rem 0;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transform: translateY(20px);
            opacity: 0;
            transition: all 0.3s ease;
          `;
          pledgeItem.innerHTML = `
            <strong style="color: #667eea;">${name}</strong> 
            <span style="color: rgba(255, 255, 255, 0.8);">pledged to:</span> 
            <em style="color: #764ba2;">${pledges.join(', ')}</em>
          `;
          
          pledgeWall.appendChild(pledgeItem);
          
          setTimeout(() => {
            pledgeItem.style.transform = 'translateY(0)';
            pledgeItem.style.opacity = '1';
          }, 10);
        }
      } else {
        showNotification("Please enter your name and select at least one pledge.", 'error');
      }
    });
  }

  // Enhanced theme toggle
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      
      // Add rotation animation to the toggle button
      themeToggle.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
      }, 300);
      
      // Save theme preference
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.add('light');
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('#navbar a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Parallax effect for header
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('header');
    if (header) {
      header.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Add floating particles
  function createFloatingParticles() {
    for (let i = 0; i < 3; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-element';
      particle.style.cssText = `
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: -1;
      `;
      document.body.appendChild(particle);
    }
  }

  createFloatingParticles();
});

