document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
        
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        // Close menu when a nav link is clicked
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS (robust) =====
document.querySelectorAll('a[href*="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        // Resolve absolute URL so we can compare paths reliably
        const url = new URL(href, window.location.href);
        if (!url.hash) return;
        if (url.origin !== window.location.origin) return;

        const linkPath = url.pathname.replace(/\/?$/, '');
        const currentPath = window.location.pathname.replace(/\/?$/, '');
        if (linkPath !== currentPath) return;

        const targetId = url.hash;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();

            window.scrollTo({
                top: targetElement.offsetTop - 80, // adjust -80 to match your header height
                behavior: 'smooth'
            });

            // Update address bar without jump
            history.pushState(null, '', targetId);

            // Close mobile menu if open
            if (typeof navMenu !== 'undefined' && navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (navToggle) {
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        }
    });
});

// Smooth-scroll on page load if URL has a hash
if (window.location.hash) {
    const targetOnLoad = document.querySelector(window.location.hash);
    if (targetOnLoad) {
        setTimeout(() => {
            window.scrollTo({
                top: targetOnLoad.offsetTop - 80,
                behavior: 'smooth'
            });
        }, 50);
    }
}

    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    const pageHeader = document.querySelector('.page-header');

    window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const headerHeight = pageHeader ? pageHeader.offsetHeight : 0;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scroll down - hide navbar
        navbar.style.transform = 'translateY(-100%)';
    } else if (currentScroll < (headerHeight + 100)) {
        // Near page header - show navbar
        navbar.style.transform = 'translateY(0)';
    } else if (currentScroll < lastScroll) {
        // Scroll up (but not near header) - show navbar
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveNavLink();

    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            const inputs = this.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                   
                    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('small');
                        errorMsg.classList.add('error-message');
                        errorMsg.textContent = 'This field is required';
                        errorMsg.style.color = '#dc3545';
                        errorMsg.style.display = 'block';
                        errorMsg.style.marginTop = '5px';
                        input.parentNode.insertBefore(errorMsg, input.nextSibling);
                    }
                } else {
                    input.style.borderColor = '#ddd';
                    
                    if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                        input.nextElementSibling.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }

    // Dynamic product type dropdown based on category selection
    const categorySelect = document.getElementById('category');
    const productTypeGroup = document.getElementById('productTypeGroup');
    const productSelect = document.getElementById('product');
    const insulationGroup = document.getElementById('insulationGroup');
    const insulationSelect = document.getElementById('insulation');

    if (categorySelect && productTypeGroup && productSelect && insulationGroup && insulationSelect) {
        categorySelect.addEventListener('change', function() {
            const selectedCategory = this.value;
            const productOptions = productSelect.querySelectorAll('option');
            
            // Clear existing options except the first one
            productOptions.forEach((option, index) => {
                if (index > 0) option.remove();
            });

            insulationGroup.style.display = 'none';
            insulationSelect.required = false;

            if (selectedCategory === 'RUD') {
                productTypeGroup.style.display = 'block';
                productSelect.required = true;
                
                const rudOptions = [
                    { value: 'StandardRUD', text: 'Standard Roll-Up Door' },
                    { value: 'GrilleRUD', text: 'Grille Roll-Up Door' },
                    { value: 'PolyRUD', text: 'Polycarbonate Roll-Up Door' },
                    { value: 'NoiselessRUD', text: 'Noiseless Roll-Up Door' }
                ];
                rudOptions.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.text;
                    productSelect.appendChild(optionElement);
                });
            } else if (selectedCategory === 'Metal Door') {
                productTypeGroup.style.display = 'block';
                productSelect.required = true;
                
                insulationGroup.style.display = 'block';
                insulationSelect.required = true;

                const metalDoorOptions = [
                    { value: 'PlainType', text: 'Plain Type Metal Door' },
                    { value: 'HalfLouver', text: 'Half Louver Metal Door' },
                    { value: 'BottomLouver', text: 'Bottom Louver Metal Door' },
                    { value: 'Narrowlite', text: 'Narrowlite Viewing Glass Metal Door' },
                    { value: 'HalfGlass', text: 'Half Viewing Glass Metal Door' },
                    { value: 'HalfGlass&Louvers', text: 'Half Glass & Louver Metal Door' },
                    { value: 'NarrowliteBottomLouver', text: 'Narrowlite & Bottom Louvers Metal Door' },
                    { value: 'FullyLouvered', text: 'Fully Louvered Metal Door' }
                ];

                const insulationOptions = [
                    { value: 'None', text: 'No Insulation' },
                    { value: 'Honey Comb', text: 'Honey Comb Insulation' },
                    { value: 'Rock wool', text: 'Rockwool Mineral Wool Insulation' }
                ];
                
                    metalDoorOptions.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.text;
                    productSelect.appendChild(optionElement);
                });
            } else if (selectedCategory === 'Louver Window') {
                productTypeGroup.style.display = 'block';
                productSelect.required = true;
                
                const louverOptions = [
                    { value: 'Acoustic', text: 'Acoustic Louver Window' },
                    { value: 'Z-Type', text: 'Z Type Louver Window' },
                    { value: 'StormType', text: 'Storm Type Louver Window' }
                ];
                
                louverOptions.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.text;
                    productSelect.appendChild(optionElement);
                });
            } else if (selectedCategory === 'Architectural') {
                productTypeGroup.style.display = 'block';
                productSelect.required = true;
                
                const architecturalOptions = [
                    { value: 'Ballustrade', text: 'Steel Ballustrade' },
                    { value: 'StainlessRailing', text: 'Stainless Railing' },
                    { value: 'GlassRailing', text: 'Glass Railing' },
                    { value: 'ACP', text: 'ACP Cladding' },
                    { value: 'Swing/Slide', text: 'Sliding/Swing Gate' }
                ];
                
                architecturalOptions.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.text;
                    productSelect.appendChild(optionElement);
                });
            } else if (selectedCategory === 'Other') {
                productTypeGroup.style.display = 'block';
                productSelect.required = true;
                
                const otherOption = [
                    { value: 'Maintenance', text: 'Maintenance Service' },
                    { value: 'Repair', text: 'Repair Service' },
                    { value: 'Construction', text: 'Construction Service' },
                    { value: 'Consultation', text: 'Technical Consultation' }
                ]
                otherOption.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.text;
                    productSelect.appendChild(optionElement);
                });

            } else {
                productTypeGroup.style.display = 'none';
                productSelect.required = false;
            }
            categorySelect.removeEventListener('change', categoryChangeHandler);
            categorySelect.addEventListener('change', categoryChangeHandler);
        });
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        const productParam = urlParams.get('product');

        if (categoryParam && categorySelect) {
            categorySelect.value = categoryParam;
            categorySelect.dispatchEvent(new Event('change'));
            
            if (productParam && productSelect) {
                setTimeout(() => {
                    productSelect.value = productParam;
                }, 100);
            }
        }
    }
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                const imgAlt = this.querySelector('img').getAttribute('alt');
                
                // Create lightbox modal
                const lightbox = document.createElement('div');
                lightbox.classList.add('lightbox');
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="lightbox-close">&times;</span>
                        <img src="${imgSrc}" alt="${imgAlt}">
                        <p>${imgAlt}</p>
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                // Close lightbox
                lightbox.querySelector('.lightbox-close').addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                });
                
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = 'auto';
                    }
                });
            });
        });
        
        // Image cycling on hover
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const imageTrack = card.querySelector('.image-track');
        const images = card.querySelectorAll('.project-image-carousel img');
        
        if (images.length > 1) {
            let currentImage = 0;
            let interval;
            
            // Start cycling on hover
            card.addEventListener('mouseenter', () => {
                interval = setInterval(() => {
                    currentImage = (currentImage + 1) % images.length;
                    imageTrack.style.transform = `translateX(-${currentImage * (100 / images.length)}%)`;
                }, 2000); // Change image every 2 seconds
            });
            
            // Stop cycling on mouse leave
            card.addEventListener('mouseleave', () => {
                clearInterval(interval);
                // Reset to first image
                currentImage = 0;
                imageTrack.style.transform = 'translateX(0)';
            });
        }
    });
});

        // Add lightbox styles dynamically
        const lightboxStyles = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            
            .lightbox-content img {
                max-width: 100%;
                max-height: 70vh;
                display: block;
                margin: 0 auto;
            }
            
            .lightbox-content p {
                color: white;
                text-align: center;
                margin-top: 15px;
                font-size: 1.1rem;
            }
            
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                background: none;
                border: none;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = lightboxStyles;
        document.head.appendChild(styleSheet);
    }
});

// ===== SIMPLE CAROUSEL WITH TOUCH SWIPE =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing carousels...');
    
    // Find all carousel containers
    const carousels = document.querySelectorAll('.project-image');
    
    if (carousels.length === 0) {
        console.log('No carousels found on this page');
        return;
    }
    
    console.log('Found', carousels.length, 'carousel(s)');
    
    carousels.forEach((carouselContainer, index) => {
        console.log('Setting up carousel', index + 1);
        
        const track = carouselContainer.querySelector('.image-track');
        const images = track.querySelectorAll('img');
        const dots = carouselContainer.querySelectorAll('.carousel-dot');
        
        if (images.length <= 1) {
            console.log('Only 1 image, no carousel needed');
            return; // Skip if only one image
        }
        
        let currentIndex = 0;
        const totalImages = images.length;
        
        // Variables for touch/swipe
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        // 1. First, fix the display issue
        track.style.display = 'flex';
        track.style.transition = 'transform 0.5s ease';
        
        // 2. Set initial widths properly
        function updateTrackWidth() {
            const containerWidth = carouselContainer.offsetWidth;
            console.log('Container width:', containerWidth);
            
            // Set total track width
            track.style.width = `${containerWidth * totalImages}px`;
            
            // Set each image width
            images.forEach(img => {
                img.style.width = `${containerWidth}px`;
                img.style.flexShrink = '0';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
            });
            
            // Move to current slide
            moveToSlide(currentIndex, false);
        }
        
        // 3. Function to move to a specific slide
        function moveToSlide(slideIndex, animate = true) {
            if (slideIndex < 0) slideIndex = totalImages - 1;
            if (slideIndex >= totalImages) slideIndex = 0;
            
            const containerWidth = carouselContainer.offsetWidth;
            
            if (animate) {
                track.style.transition = 'transform 0.3s ease';
            } else {
                track.style.transition = 'none';
            }
            
            track.style.transform = `translateX(-${slideIndex * containerWidth}px)`;
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === slideIndex);
            });
            
            currentIndex = slideIndex;
        }
        
        // 4. Next/Previous functions
        function nextSlide() {
            moveToSlide(currentIndex + 1);
        }
        
        function prevSlide() {
            moveToSlide(currentIndex - 1);
        }
        
        // 5. TOUCH/SWIPE HANDLERS
        
        // Touch start
        function handleTouchStart(e) {
            isDragging = true;
            startX = e.touches ? e.touches[0].clientX : e.clientX;
            currentX = startX;
            track.style.transition = 'none';
        }
        
        // Touch move
        function handleTouchMove(e) {
            if (!isDragging) return;
            
            currentX = e.touches ? e.touches[0].clientX : e.clientX;
            const diff = currentX - startX;
            const containerWidth = carouselContainer.offsetWidth;
            const dragOffset = -currentIndex * containerWidth + diff;
            
            track.style.transform = `translateX(${dragOffset}px)`;
            
            // Prevent page scroll while dragging
            if (Math.abs(diff) > 10) {
                e.preventDefault();
            }
        }
        
        // Touch end
        function handleTouchEnd(e) {
            if (!isDragging) return;
            
            isDragging = false;
            const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
            const diff = endX - startX;
            const containerWidth = carouselContainer.offsetWidth;
            const threshold = containerWidth * 0.15; // 15% threshold for swipe
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swiped RIGHT - go to previous slide
                    prevSlide();
                } else {
                    // Swiped LEFT - go to next slide
                    nextSlide();
                }
            } else {
                // Not enough swipe - return to current slide
                moveToSlide(currentIndex);
            }
            
            track.style.transition = 'transform 0.3s ease';
        }
        
        // 6. Add event listeners for touch
        track.addEventListener('touchstart', handleTouchStart, { passive: false });
        track.addEventListener('touchmove', handleTouchMove, { passive: false });
        track.addEventListener('touchend', handleTouchEnd, { passive: false });
        
        // 7. Add event listeners for mouse (for desktop testing)
        track.addEventListener('mousedown', handleTouchStart);
        track.addEventListener('mousemove', function(e) {
            if (isDragging) {
                handleTouchMove(e);
            }
        });
        track.addEventListener('mouseup', handleTouchEnd);
        track.addEventListener('mouseleave', handleTouchEnd);
        
        // 8. Click handlers for dots
        dots.forEach((dot, i) => {
            dot.addEventListener('click', function() {
                console.log('Clicked dot', i);
                moveToSlide(i);
                
                // Restart auto-rotate after manual click
                if (autoRotateInterval) {
                    clearInterval(autoRotateInterval);
                    startAutoRotate();
                }
            });
        });
        
        // 9. Auto-rotate functionality
        let autoRotateInterval;
        
        function startAutoRotate() {
            if (autoRotateInterval) clearInterval(autoRotateInterval);
            
            autoRotateInterval = setInterval(() => {
                let nextIndex = (currentIndex + 1) % totalImages;
                moveToSlide(nextIndex);
            }, 4000); // Change every 4 seconds
        }
        
        function stopAutoRotate() {
            if (autoRotateInterval) {
                clearInterval(autoRotateInterval);
                autoRotateInterval = null;
            }
        }
        
        // Pause on hover/drag
        carouselContainer.addEventListener('mouseenter', stopAutoRotate);
        carouselContainer.addEventListener('mouseleave', startAutoRotate);
        
        // Pause on touch
        track.addEventListener('touchstart', stopAutoRotate);
        track.addEventListener('touchend', () => {
            setTimeout(startAutoRotate, 3000); // Resume after 3 seconds
        });
        
        // 10. Add visual swipe hint for mobile
        if (window.innerWidth <= 768) {
            // Create swipe hint
            const swipeHint = document.createElement('div');
            swipeHint.className = 'swipe-hint';
            swipeHint.innerHTML = '<i class="fas fa-arrows-left-right"></i> Swipe';
            swipeHint.style.cssText = `
                position: absolute;
                top: 50%;
                right: 10px;
                transform: translateY(-50%);
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 0.8rem;
                z-index: 10;
                display: flex;
                align-items: center;
                gap: 5px;
                animation: pulse 2s infinite;
            `;
            
            // Add CSS for animation
            if (!document.querySelector('#swipeHintStyle')) {
                const style = document.createElement('style');
                style.id = 'swipeHintStyle';
                style.textContent = `
                    @keyframes pulse {
                        0%, 100% { opacity: 0.7; }
                        50% { opacity: 1; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            carouselContainer.style.position = 'relative';
            carouselContainer.appendChild(swipeHint);
            
            // Remove hint after 5 seconds or on first interaction
            setTimeout(() => {
                swipeHint.style.opacity = '0';
                setTimeout(() => {
                    if (swipeHint.parentNode) {
                        swipeHint.parentNode.removeChild(swipeHint);
                    }
                }, 300);
            }, 5000);
            
            track.addEventListener('touchstart', () => {
                if (swipeHint.parentNode) {
                    swipeHint.style.opacity = '0';
                    setTimeout(() => {
                        if (swipeHint.parentNode) {
                            swipeHint.parentNode.removeChild(swipeHint);
                        }
                    }, 300);
                }
            });
        }
        
        // 11. Initialize everything when images load
        let loadedCount = 0;
        
        images.forEach(img => {
            // Check if image is already loaded
            if (img.complete) {
                loadedCount++;
                console.log('Image already loaded:', img.src);
            } else {
                img.addEventListener('load', () => {
                    loadedCount++;
                    console.log('Image loaded:', img.src);
                    
                    if (loadedCount === totalImages) {
                        console.log('All images loaded, initializing carousel');
                        updateTrackWidth();
                        startAutoRotate();
                    }
                });
                
                img.addEventListener('error', () => {
                    loadedCount++;
                    console.error('Failed to load image:', img.src);
                    img.style.backgroundColor = '#e0e0e0'; // Gray fallback
                    
                    if (loadedCount === totalImages) {
                        console.log('All images processed, initializing carousel');
                        updateTrackWidth();
                        startAutoRotate();
                    }
                });
            }
        });
        
        // If all images are already loaded
        if (loadedCount === totalImages) {
            console.log('All images were already loaded');
            updateTrackWidth();
            startAutoRotate();
        }
        
        // Handle window resize
        window.addEventListener('resize', updateTrackWidth);
    });
    
    console.log('Carousel setup complete with swipe support');
});
        
        // FAQ Toggle Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const faqQuestions = document.querySelectorAll('.faq-question');
            
            faqQuestions.forEach(question => {
                question.addEventListener('click', function() {
                    const faqItem = this.parentElement;
                    const faqAnswer = this.nextElementSibling;
                    const icon = this.querySelector('i');
                    
                    // Toggle active class
                    faqItem.classList.toggle('active');
                    
                    // Toggle answer visibility
                    if (faqItem.classList.contains('active')) {
                        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                        faqAnswer.style.padding = '15px 0';
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-up');
                    } else {
                        faqAnswer.style.maxHeight = '0';
                        faqAnswer.style.padding = '0';
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                    }
                });
            });
            
            // Initialize FAQ answers as closed
            document.querySelectorAll('.faq-answer').forEach(answer => {
                answer.style.maxHeight = '0';
                answer.style.overflow = 'hidden';
                answer.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
            });
            
            // Enhanced form validation
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    let isValid = true;
                    const requiredFields = this.querySelectorAll('[required]');
                    
                    // Clear previous error messages
                    this.querySelectorAll('.error-message').forEach(error => error.remove());
                    this.querySelectorAll('.form-group').forEach(group => group.classList.remove('error'));
                    
                    // Validate required fields
                    requiredFields.forEach(field => {
                        if (!field.value.trim()) {
                            isValid = false;
                            showError(field, 'This field is required');
                        } else if (field.type === 'email' && !isValidEmail(field.value)) {
                            isValid = false;
                            showError(field, 'Please enter a valid email address');
                        } else if (field.id === 'phone' && !isValidPhone(field.value)) {
                            isValid = false;
                            showError(field, 'Please enter a valid Philippine phone number');
                        }
                    });
                    
                    if (isValid) {
                        // In a real application, you would send the form data to a server
                        alert('Thank you for your quote request! We will contact you within 24 hours.');
                        contactForm.reset();
                    }
                });
            }
            
            // Helper functions for validation
            function showError(field, message) {
                const formGroup = field.closest('.form-group');
                formGroup.classList.add('error');
                
                const errorMsg = document.createElement('small');
                errorMsg.classList.add('error-message');
                errorMsg.textContent = message;
                errorMsg.style.color = '#dc3545';
                errorMsg.style.display = 'block';
                errorMsg.style.marginTop = '5px';
                errorMsg.style.fontSize = '0.85rem';
                
                formGroup.appendChild(errorMsg);
            }
            
            function isValidEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }
            
            function isValidPhone(phone) {
                const re = /^(09|\+639)\d{9}$/;
                return re.test(phone.replace(/\s/g, ''));
            }
        });

        // How It Works - Sequential Hover Effect
document.addEventListener('DOMContentLoaded', function() {
    const stepItems = document.querySelectorAll('.step-item');
    const stepConnectors = document.querySelectorAll('.step-connector');
    
    // Reset all to default
    function resetSteps() {
        stepItems.forEach((item, index) => {
            const number = item.querySelector('.step-number');
            const title = item.querySelector('h4');
            const desc = item.querySelector('p');
            
            number.style.background = 'white';
            number.style.borderColor = '#e0e0e0';
            number.style.color = '#999';
            if (title) title.style.color = '#666';
            if (desc) desc.style.color = '#999';
        });
        
        stepConnectors.forEach(connector => {
            connector.style.background = '#e0e0e0';
        });
    }
    
    // Highlight steps up to the hovered index
    function highlightUpTo(index) {
        resetSteps();
        
        // Highlight steps 0 through index
        for (let i = 0; i <= index; i++) {
            const step = stepItems[i];
            const number = step.querySelector('.step-number');
            const title = step.querySelector('h4');
            const desc = step.querySelector('p');
            
            number.style.background = '#2e8b57';
            number.style.borderColor = '#2e8b57';
            number.style.color = 'white';
            if (title) title.style.color = '#2e8b57';
            if (desc) desc.style.color = '#666';
        }
        
        // Highlight connectors up to index-1
        for (let i = 0; i < index; i++) {
            if (stepConnectors[i]) {
                stepConnectors[i].style.background = '#2e8b57';
            }
        }
    }
    
    // Add hover events
    stepItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            highlightUpTo(index);
        });
        
        item.addEventListener('mouseleave', resetSteps);
    });
});