// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mainNav.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// Carousel functionality for the products section
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded - starting carousel setup');
    
    const productGrid = document.querySelector('.product-grid');
    const prevButton = document.querySelector('.carousel-nav.prev');
    const nextButton = document.querySelector('.carousel-nav.next');
    
    if (!productGrid || !prevButton || !nextButton) {
        console.error('Missing carousel elements!');
        return;
    }
    
    const products = [
        'blueberry.png', 'cookie.png', 'green.png', 'pink.png',
        'pulse.png', 'rainbow.png', 'soap.png', 'strawberry.png'
    ];
    
    let startIndex = 0; // Which product to start showing from
    
    function updateCarousel() {
        const productItems = document.querySelectorAll('.product-item');
        
        // Add fade out effect
        productItems.forEach(item => {
            item.style.opacity = '0.3';
            item.style.transform = 'scale(0.95)';
        });
        
        // After a short delay, update images and fade back in
        setTimeout(() => {
            productItems.forEach((item, index) => {
                const productIndex = (startIndex + index) % products.length;
                const img = item.querySelector('img');
                if (img) {
                    img.src = `assets/${products[productIndex]}`;
                    img.alt = `Capsule ${products[productIndex].split('.')[0]}`;
                }
                
                // Fade back in
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            });
        }, 150);
        
        console.log('Showing products starting from index:', startIndex);
    }
    
    prevButton.addEventListener('click', function() {
        console.log('Prev clicked');
        startIndex = (startIndex - 1 + products.length) % products.length;
        updateCarousel();
    });
    
    nextButton.addEventListener('click', function() {
        console.log('Next clicked');  
        startIndex = (startIndex + 1) % products.length;
        updateCarousel();
    });
    
    // Initialize
    updateCarousel();
    
    // Add smooth scrolling for anchor links
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
    
    // Add hover effects for product items
    const allProductItems = document.querySelectorAll('.product-item');
    allProductItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add floating animation to some elements
    function addFloatingAnimation() {
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage) {
            let angle = 0;
            setInterval(() => {
                angle += 0.02;
                const offset = Math.sin(angle) * 3;
                heroImage.style.transform = `translateY(${offset}px)`;
            }, 50);
        }
    }
    
    addFloatingAnimation();
    
    // Add sparkle effect to the hero section
    function createSparkle() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '20px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '2';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animation = 'sparkleFloat 3s ease-out forwards';
        
        hero.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 3000);
    }
    
    // Add sparkle animation CSS
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkleFloat {
            0% {
                opacity: 0;
                transform: translateY(20px) scale(0);
            }
            50% {
                opacity: 1;
                transform: translateY(-10px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-30px) scale(0);
            }
        }
    `;
    document.head.appendChild(sparkleStyle);
    
    // Create sparkles periodically
    setInterval(createSparkle, 2000);
    
    // Add cart interaction
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add a little animation
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // You would typically open a cart modal or redirect here
            console.log('Cart clicked!');
        });
    }
});
