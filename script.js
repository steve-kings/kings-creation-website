// Modal functions
        function openModal(modalId) {
            document.getElementById(modalId).classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        }
        
        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
        
        // Close modal when clicking outside the modal content
        document.addEventListener('click', function(event) {
            const modals = document.querySelectorAll('.modal-overlay');
            modals.forEach(modal => {
                if (event.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                const activeModals = document.querySelectorAll('.modal-overlay.active');
                if (activeModals.length > 0) {
                    activeModals.forEach(modal => {
                        modal.classList.remove('active');
                    });
                    document.body.style.overflow = '';
                }
            }
        });
        
        document.addEventListener('DOMContentLoaded', function() {
            // Page Preloader
            const preloader = document.querySelector('.preloader');
            window.addEventListener('load', function() {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 600);
            });
            
            // Initialize AOS animations
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false,
                disable: window.innerWidth < 768 // Disable on mobile for better performance
            });
            
            // Custom scroll animation implementation
            const scrollAnimationElements = document.querySelectorAll('.scroll-animation, .scroll-animation-fade-in, .scroll-animation-slide-left, .scroll-animation-slide-right, .scroll-animation-zoom');
            
            function checkScrollAnimations() {
                scrollAnimationElements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    
                    // Add delay if specified
                    const delay = element.getAttribute('data-delay') || 0;
                    
                    // Check if element is in viewport
                    if (elementPosition.top < windowHeight * 0.9 && elementPosition.bottom > 0) {
                        setTimeout(() => {
                            element.classList.add('active');
                        }, delay);
                    }
                });
            }
            
            // Check animations on scroll
            window.addEventListener('scroll', checkScrollAnimations);
            // Initial check for animations
            checkScrollAnimations();
            
            // Initialize Hero Slider
            const heroSwiper = new Swiper('.hero-slider', {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                speed: 1000,
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: false,
                },
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            });
            
            // Initialize Testimonial Swiper
            const testimonialSwiper = new Swiper('.testimonial-container', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    }
                }
            });
            
            // Navbar scroll effect
            const navbar = document.querySelector('.navbar');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
            
            // Counter Animation
            const counterElements = document.querySelectorAll('.stat-number');
            const counterSection = document.querySelector('.stats-container');
            
            let counted = false;
            
            function startCounting() {
                if (!counted) {
                    counterElements.forEach(counter => {
                        const target = +counter.getAttribute('data-count');
                        const duration = 2000;
                        const increment = target / (duration / 20);
                        let current = 0;
                        
                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                counter.textContent = Math.ceil(current);
                                setTimeout(updateCounter, 20);
                            } else {
                                counter.textContent = target;
                            }
                        };
                        
                        updateCounter();
                    });
                    counted = true;
                }
            }
            
            // Check if counterSection is in viewport
            function isInViewport(element) {
                if (!element) return false;
                const rect = element.getBoundingClientRect();
                return (
                    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.bottom >= 0
                );
            }
            
            // Check on scroll
            document.addEventListener('scroll', function() {
                if (counterSection && isInViewport(counterSection)) {
                    startCounting();
                }
                
                // Scroll to top button visibility
                const scrollToTopBtn = document.getElementById('scrollToTop');
                if (window.pageYOffset > 300) {
                    scrollToTopBtn.classList.add('active');
                } else {
                    scrollToTopBtn.classList.remove('active');
                }
            });
            
            // Scroll to top functionality
            const scrollToTopBtn = document.getElementById('scrollToTop');
            if (scrollToTopBtn) {
                scrollToTopBtn.addEventListener('click', function() {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }
            
            // Portfolio filtering
            const portfolioFilters = document.querySelectorAll('.portfolio-filter');
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            
            portfolioFilters.forEach(filter => {
                filter.addEventListener('click', function() {
                    // Remove active class from all filters
                    portfolioFilters.forEach(f => f.classList.remove('active'));
                    // Add active class to clicked filter
                    this.classList.add('active');
                    
                    const filterValue = this.getAttribute('data-filter');
                    
                    portfolioItems.forEach(item => {
                        const itemCategory = item.getAttribute('data-category');
                        
                        if (filterValue === 'all' || filterValue === itemCategory) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 200);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 500);
                        }
                    });
                });
            });
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const headerHeight = document.querySelector('.navbar').offsetHeight;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu if open
                        const navbarCollapse = document.querySelector('.navbar-collapse');
                        if (navbarCollapse.classList.contains('show')) {
                            document.querySelector('.navbar-toggler').click();
                        }
                    }
                });
            });
            
            // IMPROVED CONTACT FORM HANDLING
            const contactForm = document.getElementById('contactForm');
            const formSuccessMessage = document.getElementById('formSuccessMessage');
            const formErrorMessage = document.getElementById('formErrorMessage');
            const errorText = document.getElementById('errorText');
            const submitBtn = document.getElementById('submit-btn');
            const submitText = document.getElementById('submit-text');
            const submitSpinner = document.getElementById('submit-spinner');
            
            // Form validation function
            function validateForm() {
                let isValid = true;
                const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
                
                inputs.forEach(input => {
                    // Reset validation state
                    input.classList.remove('is-invalid');
                    input.classList.remove('is-valid');
                    
                    if (!input.value.trim()) {
                        input.classList.add('is-invalid');
                        isValid = false;
                    } else {
                        // Email validation
                        if (input.type === 'email') {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailRegex.test(input.value.trim())) {
                                input.classList.add('is-invalid');
                                isValid = false;
                            } else {
                                input.classList.add('is-valid');
                            }
                        } else {
                            input.classList.add('is-valid');
                        }
                    }
                });
                
                return isValid;
            }
            
            // Real-time validation as user types
            if (contactForm) {
                contactForm.querySelectorAll('input, textarea').forEach(field => {
                    field.addEventListener('blur', function() {
                        if (field.required) {
                            if (!field.value.trim()) {
                                field.classList.add('is-invalid');
                                field.classList.remove('is-valid');
                            } else {
                                if (field.type === 'email') {
                                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                    if (!emailRegex.test(field.value.trim())) {
                                        field.classList.add('is-invalid');
                                        field.classList.remove('is-valid');
                                    } else {
                                        field.classList.add('is-valid');
                                        field.classList.remove('is-invalid');
                                    }
                                } else {
                                    field.classList.add('is-valid');
                                    field.classList.remove('is-invalid');
                                }
                            }
                        }
                    });
                    
                    field.addEventListener('input', function() {
                        // Hide error messages when user starts typing again
                        formErrorMessage.style.display = 'none';
                        formSuccessMessage.style.display = 'none';
                    });
                });
                
                // Form submission handler with Web3Forms
                contactForm.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    
                    // Hide any existing messages
                    formSuccessMessage.style.display = 'none';
                    formErrorMessage.style.display = 'none';
                    
                    // Validate form
                    if (!validateForm()) {
                        return false;
                    }
                    
                    // Show loading spinner
                    submitText.style.display = 'none';
                    submitSpinner.style.display = 'inline-block';
                    submitBtn.disabled = true;
                    
                    try {
                        const formData = new FormData(contactForm);
                        
                        const response = await fetch(contactForm.action, {
                            method: 'POST',
                            body: formData
                        });
                        
                        const data = await response.json();
                        
                        if (response.status === 200) {
                            // Success
                            formSuccessMessage.style.display = 'flex';
                            contactForm.reset();
                            
                            // Reset validation styles
                            contactForm.querySelectorAll('.is-valid').forEach(el => {
                                el.classList.remove('is-valid');
                            });
                            
                            // Show toast notification
                            showToast('success', 'Your message has been sent successfully!');
                        } else {
                            // API Error
                            errorText.textContent = data.message || 'Something went wrong. Please try again.';
                            formErrorMessage.style.display = 'flex';
                        }
                    } catch (error) {
                        // Network or other error
                        errorText.textContent = 'Network error. Please check your connection and try again.';
                        formErrorMessage.style.display = 'flex';
                    } finally {
                        // Hide loading spinner
                        submitText.style.display = 'inline';
                        submitSpinner.style.display = 'none';
                        submitBtn.disabled = false;
                    }
                });
            }
            
            // Toast notification functionality
            function showToast(type, message) {
                const toast = document.getElementById('toastNotification');
                const icon = toast.querySelector('.icon i');
                const content = toast.querySelector('.content p');
                
                // Set icon based on type
                if (type === 'success') {
                    icon.className = 'fas fa-check-circle';
                    toast.classList.add('success');
                    toast.classList.remove('error');
                } else {
                    icon.className = 'fas fa-exclamation-circle';
                    toast.classList.add('error');
                    toast.classList.remove('success');
                }
                
                // Set message
                content.textContent = message;
                
                // Show toast
                toast.classList.add('show');
                
                // Hide toast after 5 seconds
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 5000);
            }
            
            // Close toast on button click
            document.querySelector('.toast-notification .close-btn').addEventListener('click', function() {
                document.getElementById('toastNotification').classList.remove('show');
            });
            
            // Newsletter form submission
            const newsletterForm = document.querySelector('.newsletter-form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const emailInput = this.querySelector('.newsletter-input');
                    if (emailInput.value.trim() !== '') {
                        showToast('success', 'Thank you for subscribing to our newsletter!');
                        emailInput.value = '';
                    }
                });
            }
            
            // Set current year in copyright
            const currentYearElements = document.querySelectorAll('#current-year');
            currentYearElements.forEach(element => {
                element.textContent = new Date().getFullYear();
            });
            
            // Lazy Loading Images
            const lazyImages = document.querySelectorAll('.lazy-image');
            
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        }
                    });
                });
                
                lazyImages.forEach(img => {
                    imageObserver.observe(img);
                });
            } else {
                // Fallback for browsers that don't support IntersectionObserver
                lazyImages.forEach(img => {
                    img.classList.add('loaded');
                });
            }
            s
        });