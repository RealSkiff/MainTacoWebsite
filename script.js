document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Here you would typically send the form data to your server
            // For now, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Carousel functionality
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.food-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let autoplayInterval;
    const itemWidth = items.length > 0 ? items[0].offsetWidth + 24 : 0; // Including gap
    
    // Clone first and last items for infinite effect
    if (track && items.length > 0) {
        const itemsToClone = 3; // Number of items to clone on each side
        
        // Clone last items to beginning
        for (let i = items.length - 1; i >= Math.max(0, items.length - itemsToClone); i--) {
            const clone = items[i].cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            track.insertBefore(clone, track.firstChild);
        }
        
        // Clone first items to end
        for (let i = 0; i < Math.min(itemsToClone, items.length); i++) {
            const clone = items[i].cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            track.appendChild(clone);
        }
        
        // Position at first real item
        updateCarousel(itemsToClone);
    }
    
    function updateCarousel(index) {
        if (!track) return;
        
        const translateX = -index * itemWidth;
        track.style.transform = `translateX(${translateX}px)`;
    }
    
    function moveToNext() {
        if (!track || !items.length) return;
        
        currentIndex++;
        updateCarousel(currentIndex + 3); // +3 for the cloned items at beginning
        
        // Reset to first real item when reaching end
        if (currentIndex >= items.length) {
            setTimeout(() => {
                track.style.transition = 'none';
                currentIndex = 0;
                updateCarousel(currentIndex + 3);
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s ease';
                }, 10);
            }, 500);
        }
    }
    
    function moveToPrev() {
        if (!track || !items.length) return;
        
        currentIndex--;
        updateCarousel(currentIndex + 3); // +3 for the cloned items at beginning
        
        // Reset to last real item when reaching beginning
        if (currentIndex < 0) {
            setTimeout(() => {
                track.style.transition = 'none';
                currentIndex = items.length - 1;
                updateCarousel(currentIndex + 3);
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s ease';
                }, 10);
            }, 500);
        }
    }
    
    // Event listeners for carousel
    if (nextBtn) {
        nextBtn.addEventListener('click', moveToNext);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', moveToPrev);
    }
    
    // Autoplay functionality
    function startAutoplay() {
        autoplayInterval = setInterval(moveToNext, 3000);
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Start autoplay on page load
    if (track) {
        startAutoplay();
        
        // Pause on hover
        track.addEventListener('mouseenter', stopAutoplay);
        track.addEventListener('mouseleave', startAutoplay);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Service option hover effects
    const serviceOptions = document.querySelectorAll('.service-option');
    serviceOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.service-option, .menu-section, .contact-section').forEach(section => {
        observer.observe(section);
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-menu-toggle') && 
            !event.target.closest('.nav-links') && 
            navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
    
    // Close menu when clicking a link
    const menuLinks = document.querySelectorAll('.nav-links a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}); 