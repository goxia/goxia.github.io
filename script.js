// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !navMenu.contains(event.target)) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.expertise-card, .blog-card, .highlight-item, .cert-item, .contact-item, .charity-item, .charity-quote');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isNumber = /^\d+/.test(target);
        
        if (isNumber) {
            const numValue = parseInt(target.match(/\d+/)[0]);
            const suffix = target.replace(/^\d+/, '');
            let current = 0;
            const increment = numValue / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= numValue) {
                    counter.textContent = numValue + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 30);
        }
    });
}

// Trigger counter animation when hero section is visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    heroObserver.observe(heroSection);
}

// Typing animation restart
function restartTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        typingText.style.animation = 'none';
        typingText.offsetHeight; // Trigger reflow
        typingText.style.animation = 'typing 3s steps(40, end)';
    }
}

// Restart typing animation when scrolling back to top
window.addEventListener('scroll', function() {
    if (window.scrollY === 0) {
        setTimeout(restartTypingAnimation, 100);
    }
});

// Add loading animation
document.addEventListener('DOMContentLoaded', function() {
    // Fade in page content
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// External link handling
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a small delay for better UX
            e.preventDefault();
            setTimeout(() => {
                window.open(this.href, '_blank', 'noopener,noreferrer');
            }, 150);
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.querySelector('.nav-menu');
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
}, 16);

window.addEventListener('scroll', debouncedScrollHandler);

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a placeholder if image fails to load
            this.style.display = 'none';
            
            // Only create placeholder for profile image
            if (this.alt === 'gOxiA Profile') {
                const placeholder = document.createElement('div');
                placeholder.className = 'profile-placeholder';
                placeholder.style.cssText = `
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #0078d4, #00bcf2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 3rem;
                    font-weight: bold;
                    color: white;
                    border-radius: 50%;
                `;
                placeholder.textContent = 'gOxiA';
                this.parentNode.appendChild(placeholder);
            }
        });
    });
});

// Console message for developers
console.log(`
🚀 Welcome to gOxiA's Personal Website
👨‍💻 Built with modern web technologies
🔧 Microsoft MVP | Windows & Devices for IT
📧 Contact: https://goxia.maytide.net

Feel free to explore the code and learn!
`);

// Add a subtle parallax effect to hero section
window.addEventListener('scroll', debounce(function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${rate}px)`;
    }
}, 16));

// Projects Filter functionality
function initProjectsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            filterProjects(category, projectCards);
            
            // Track filter usage
            trackClick('Projects', 'Filter', category);
        });
    });
}

function filterProjects(category, projectCards) {
    projectCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category');
        const shouldShow = category === 'all' || cardCategories.includes(category);
        
        if (shouldShow) {
            card.style.display = 'block';
            card.classList.remove('fade-out');
            card.classList.add('fade-in');
        } else {
            card.classList.remove('fade-in');
            card.classList.add('fade-out');
            setTimeout(() => {
                if (card.classList.contains('fade-out')) {
                    card.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Update projects grid layout after filter
    setTimeout(() => {
        const visibleCards = Array.from(projectCards).filter(card => 
            card.style.display !== 'none' && !card.classList.contains('fade-out')
        );
        
        // Add stagger animation for visible cards
        visibleCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }, index * 100);
        });
    }, 300);
}

// Project card interactions
function initProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add hover sound effect (visual feedback)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Track project card clicks
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                const projectTitle = this.querySelector('.project-title').textContent;
                const githubLink = this.querySelector('.github-link');
                if (githubLink) {
                    trackClick('Projects', 'Card Click', projectTitle);
                    // Optional: Open GitHub link when clicking anywhere on card
                    // githubLink.click();
                }
            }
        });
    });
}

// Add project search functionality
function initProjectSearch() {
    // Create search input (could be added to HTML later)
    const projectsSection = document.querySelector('.projects .container');
    const searchContainer = document.createElement('div');
    searchContainer.className = 'projects-search';
    searchContainer.innerHTML = `
        <div class="search-input-container">
            <i class="fas fa-search search-icon"></i>
            <input type="text" class="search-input" placeholder="搜索项目..." />
            <button class="clear-search" style="display: none;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Insert search before filter buttons
    const filterContainer = projectsSection.querySelector('.projects-filter');
    projectsSection.insertBefore(searchContainer, filterContainer);
    
    const searchInput = searchContainer.querySelector('.search-input');
    const clearButton = searchContainer.querySelector('.clear-search');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm.length > 0) {
            clearButton.style.display = 'block';
            searchProjects(searchTerm, projectCards);
        } else {
            clearButton.style.display = 'none';
            // Reset to current filter
            const activeFilter = document.querySelector('.filter-btn.active');
            const category = activeFilter.getAttribute('data-category');
            filterProjects(category, projectCards);
        }
    });
    
    // Clear search
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        clearButton.style.display = 'none';
        const activeFilter = document.querySelector('.filter-btn.active');
        const category = activeFilter.getAttribute('data-category');
        filterProjects(category, projectCards);
        searchInput.focus();
    });
}

function searchProjects(searchTerm, projectCards) {
    projectCards.forEach(card => {
        const title = card.querySelector('.project-title').textContent.toLowerCase();
        const description = card.querySelector('.project-description').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
        
        const matches = title.includes(searchTerm) || 
                       description.includes(searchTerm) || 
                       tags.includes(searchTerm);
        
        if (matches) {
            card.style.display = 'block';
            card.classList.remove('fade-out');
            card.classList.add('fade-in');
        } else {
            card.classList.remove('fade-in');
            card.classList.add('fade-out');
            setTimeout(() => {
                if (card.classList.contains('fade-out')) {
                    card.style.display = 'none';
                }
            }, 300);
        }
    });
}

// Initialize projects functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize projects filter
    if (document.querySelector('.projects-filter')) {
        initProjectsFilter();
        initProjectInteractions();
        // Uncomment the line below to add search functionality
        // initProjectSearch();
    }
});

// Add click analytics (placeholder for future implementation)
function trackClick(category, action, label) {
    // Placeholder for analytics tracking
    console.log(`Analytics: ${category} - ${action} - ${label}`);
}

// Track important interactions
document.addEventListener('DOMContentLoaded', function() {
    // Track navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            trackClick('Navigation', 'Click', this.textContent.trim());
        });
    });
    
    // Track external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            trackClick('External Link', 'Click', this.href);
        });
    });
    
    // Track CTA button clicks
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            trackClick('CTA', 'Click', this.textContent.trim());
        });
    });
});