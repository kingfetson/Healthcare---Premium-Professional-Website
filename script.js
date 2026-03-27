/**
 * AMERICAN HEALTHCARE PARTNERS
 * Professional Healthcare Website - Vanilla JavaScript
 * Accessible, HIPAA-conscious, conversion-focused interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===== DOM ELEMENTS =====
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileClose = document.getElementById('mobile-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinks = document.querySelectorAll('.nav-link');
    const appointmentForm = document.getElementById('appointment-form');
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');
    const pageLoader = document.getElementById('page-loader');
    const floatingCta = document.querySelector('.floating-cta');
    const yearEl = document.getElementById('year');
    const portalBtn = document.getElementById('portal-btn');
    const portalModal = document.getElementById('portal-modal');
    const portalClose = document.getElementById('portal-close');
    const portalOverlay = document.getElementById('portal-overlay');
    
    // ===== INITIAL SETUP =====
    // Set current year in footer
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
    
    // Set min date for appointment form to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
    
    // Hide page loader after content is ready
    setTimeout(() => {
        pageLoader?.classList.add('hidden');
        // Announce to screen readers
        if (pageLoader) {
            pageLoader.setAttribute('aria-hidden', 'true');
        }
    }, 1000);
    
    // ===== STICKY HEADER =====
    const handleHeaderScroll = () => {
        if (window.scrollY > 100) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll(); // Initial check
    
    // ===== MOBILE MENU TOGGLE =====
    const toggleMobileMenu = (show) => {
        if (show) {
            mobileMenu?.classList.add('active');
            mobileOverlay?.classList.add('active');
            mobileOverlay?.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            hamburger?.setAttribute('aria-expanded', 'true');
            // Focus first nav link for accessibility
            const firstLink = mobileMenu?.querySelector('.mobile-nav-link');
            firstLink?.focus();
        } else {
            mobileMenu?.classList.remove('active');
            mobileOverlay?.classList.remove('active');
            mobileOverlay?.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            hamburger?.setAttribute('aria-expanded', 'false');
            // Return focus to hamburger
            hamburger?.focus();
        }
    };
    
    hamburger?.addEventListener('click', () => toggleMobileMenu(true));
    mobileClose?.addEventListener('click', () => toggleMobileMenu(false));
    mobileOverlay?.addEventListener('click', () => toggleMobileMenu(false));
    
    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Allow hash links to work first
            setTimeout(() => toggleMobileMenu(false), 300);
        });
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
            toggleMobileMenu(false);
        }
    });
    
    // Trap focus in mobile menu when open
    mobileMenu?.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        
        const focusableElements = mobileMenu.querySelectorAll(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
    
    // ===== SMOOTH SCROLLING FOR NAVIGATION =====
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (!element) return;
        
        // Account for fixed header + emergency banner
        const headerHeight = (header?.offsetHeight || 0) + 44;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    };
    
    // Desktop nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Mobile nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href?.startsWith('#')) {
                e.preventDefault();
                setTimeout(() => smoothScroll(href), 300);
            }
        });
    });
    
    // Scroll indicator in hero
    const scrollIndicator = document.querySelector('.scroll-down');
    scrollIndicator?.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScroll('#services');
    });
    
    // ===== SCROLL REVEAL ANIMATIONS (Intersection Observer) =====
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // ===== PATIENT PORTAL MODAL =====
    const openPortalModal = () => {
        if (!portalModal) return;
        portalModal.hidden = false;
        document.body.style.overflow = 'hidden';
        portalClose?.focus();
        
        // Trap focus in modal
        const focusableElements = portalModal.querySelectorAll(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        const trapFocus = (e) => {
            if (e.key !== 'Tab') return;
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };
        
        portalModal.addEventListener('keydown', trapFocus);
        portalModal._trapFocus = trapFocus;
    };
    
    const closePortalModal = () => {
        if (!portalModal) return;
        portalModal.hidden = true;
        document.body.style.overflow = '';
        
        // Remove focus trap
        if (portalModal._trapFocus) {
            portalModal.removeEventListener('keydown', portalModal._trapFocus);
            delete portalModal._trapFocus;
        }
        
        // Return focus to trigger button
        portalBtn?.focus();
    };
    
    portalBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        openPortalModal();
    });
    
    portalClose?.addEventListener('click', closePortalModal);
    portalOverlay?.addEventListener('click', closePortalModal);
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !portalModal?.hidden) {
            closePortalModal();
        }
    });
    
    // ===== APPOINTMENT FORM VALIDATION & SUBMISSION =====
    if (appointmentForm) {
        const formFields = {
            firstName: document.getElementById('firstName'),
            lastName: document.getElementById('lastName'),
            dob: document.getElementById('dob'),
            phone: document.getElementById('phone'),
            email: document.getElementById('email'),
            service: document.getElementById('service'),
            reason: document.getElementById('reason'),
            consent: document.getElementById('consent'),
            hipaa: document.getElementById('hipaa')
        };
        
        const errorMessages = {
            firstName: 'Please enter your first name',
            lastName: 'Please enter your last name',
            dob: 'Please enter your date of birth',
            phone: 'Please enter a valid US phone number (e.g., (555) 123-4567)',
            email: 'Please enter a valid email address',
            service: 'Please select a service',
            reason: 'Please briefly describe your reason for visit',
            consent: 'Please consent to receive communications',
            hipaa: 'Please acknowledge the HIPAA notice'
        };
        
        // Real-time validation
        Object.entries(formFields).forEach(([field, element]) => {
            if (!element) return;
            
            // Validate on blur for text inputs
            if (['firstName', 'lastName', 'phone', 'email', 'reason'].includes(field)) {
                element.addEventListener('blur', () => validateField(field, element));
            }
            
            // Validate on change for selects/checkboxes
            if (['service', 'consent', 'hipaa'].includes(field)) {
                element.addEventListener('change', () => validateField(field, element));
            }
            
            // Clear error on input
            element.addEventListener('input', () => {
                if (element.classList.contains('error')) {
                    element.classList.remove('error');
                    const errorEl = document.getElementById(`${field}-error`);
                    errorEl?.classList.remove('show');
                }
            });
        });
        
        // Validate individual field
        const validateField = (fieldName, element) => {
            const errorEl = document.getElementById(`${fieldName}-error`);
            let isValid = true;
            
            // Remove previous error state
            element.classList.remove('error');
            errorEl?.classList.remove('show');
            
            const value = element.value?.trim();
            
            // Validation rules
            switch(fieldName) {
                case 'firstName':
                case 'lastName':
                    if (value.length < 2) {
                        isValid = false;
                    }
                    break;
                    
                case 'dob':
                    if (!value) {
                        isValid = false;
                    } else {
                        // Check age is reasonable (1-120 years)
                        const birthDate = new Date(value);
                        const today = new Date();
                        let age = today.getFullYear() - birthDate.getFullYear();
                        const monthDiff = today.getMonth() - birthDate.getMonth();
                        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                            age--;
                        }
                        if (age < 1 || age > 120) {
                            isValid = false;
                            errorMessages.dob = 'Please enter a valid date of birth';
                        }
                    }
                    break;
                    
                case 'phone':
                    // US phone format validation
                    const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
                    if (!phoneRegex.test(value)) {
                        isValid = false;
                    }
                    break;
                    
                case 'email':
                    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                        isValid = false;
                    }
                    break;
                    
                case 'service':
                    if (!value) {
                        isValid = false;
                    }
                    break;
                    
                case 'reason':
                    if (value.length < 10) {
                        isValid = false;
                    }
                    break;
                    
                case 'consent':
                case 'hipaa':
                    if (!element.checked) {
                        isValid = false;
                    }
                    break;
            }
            
            // Show error if invalid
            if (!isValid && errorEl) {
                element.classList.add('error');
                errorEl.textContent = errorMessages[fieldName];
                errorEl.classList.add('show');
            }
            
            return isValid;
        };
        
        // Form submission
        appointmentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate all required fields
            const requiredFields = ['firstName', 'lastName', 'dob', 'phone', 'service', 'reason', 'consent', 'hipaa'];
            let isFormValid = true;
            
            requiredFields.forEach(fieldName => {
                const element = formFields[fieldName];
                if (element && !validateField(fieldName, element)) {
                    isFormValid = false;
                }
            });
            
            if (!isFormValid) {
                // Focus first invalid field
                const firstError = appointmentForm.querySelector('.error');
                firstError?.focus();
                
                // Announce error to screen readers
                formMessage.textContent = 'Please correct the errors in the form.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                formMessage.setAttribute('role', 'alert');
                return;
            }
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            formMessage.className = 'form-message';
            formMessage.style.display = 'none';
            
            try {
                // Simulate API call (replace with actual backend endpoint)
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Success handling
                formMessage.textContent = '✅ Thank you! Our care team will contact you within 1 business hour to confirm your appointment.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                formMessage.setAttribute('role', 'status');
                
                // Reset form
                appointmentForm.reset();
                
                // Optional: Send confirmation to analytics
                if (typeof gtag === 'function') {
                    gtag('event', 'appointment_request', {
                        'event_category': 'conversion',
                        'event_label': 'web_form'
                    });
                }
                
            } catch (error) {
                // Error handling
                console.error('Form submission error:', error);
                formMessage.textContent = '❌ We encountered an issue. Please call us directly at 1-800-555-1234 to schedule.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                formMessage.setAttribute('role', 'alert');
                
            } finally {
                // Hide loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                // Auto-hide success message after 15 seconds
                if (formMessage.classList.contains('success')) {
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 15000);
                }
            }
        });
    }
    
    // ===== FLOATING CTA ENHANCEMENTS =====
    // Hide floating CTA when user is in appointment section to avoid redundancy
    const appointmentSection = document.getElementById('appointment');
    if (floatingCta && appointmentSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    floatingCta.style.opacity = '0';
                    floatingCta.style.pointerEvents = 'none';
                    floatingCta.setAttribute('aria-hidden', 'true');
                } else {
                    floatingCta.style.opacity = '1';
                    floatingCta.style.pointerEvents = 'auto';
                    floatingCta.setAttribute('aria-hidden', 'false');
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(appointmentSection);
    }
    
    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    
    const updateActiveNav = () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    
    // Debounce scroll handler for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = requestAnimationFrame(updateActiveNav);
    }, { passive: true });
    
    // ===== UTILITY: Format Phone Number as User Types =====
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length >= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            } else if (value.length >= 3) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            }
            
            e.target.value = value;
        });
    }
    
    // ===== CONVERSION TRACKING HOOKS (Optional Analytics) =====
    // Track call button clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', () => {
            if (typeof gtag === 'function') {
                gtag('event', 'click', {
                    'event_category': 'phone',
                    'event_label': link.href
                });
            }
        });
    });
    
    // Track telehealth button clicks
    document.querySelectorAll('a[href="#telehealth"]').forEach(link => {
        link.addEventListener('click', () => {
            if (typeof gtag === 'function') {
                gtag('event', 'telehealth_click', {
                    'event_category': 'conversion',
                    'event_label': 'hero_cta'
                });
            }
        });
    });
    
    // ===== KEYBOARD NAVIGATION SUPPORT =====
    // Improve accessibility for hamburger button
    hamburger?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMobileMenu(true);
        }
    });
    
    // ===== ERROR HANDLING: GLOBAL =====
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
        // Could send to error tracking service like Sentry
    });
    
    // ===== CONSOLE WELCOME MESSAGE (For Developers) =====
    console.log('%c🏥 American Healthcare Partners', 'color: #1e40af; font-size: 16px; font-weight: bold;');
    console.log('%cCompassionate care, advanced medicine. Need help? Call 1-800-555-1234', 'color: #0d9488; font-size: 12px;');
    
    // ===== HIPAA REMINDER FOR DEVELOPERS =====
    console.warn('%c⚠️ HIPAA Compliance Notice', 'color: #dc2626; font-weight: bold;');
    console.warn('This frontend form is NOT HIPAA-compliant for transmitting PHI.');
    console.warn('All protected health information must be handled through secure, encrypted backend systems.');
});
