/**
 * Note: Move the tailwind.config block to a <script> tag 
 * in the <head> of index.html for it to work properly.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when a link is clicked
        const navLinks = mobileMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 2. FAQ Accordion Logic
    // Uses event delegation for better performance
    document.addEventListener('click', function (e) {
        const toggle = e.target.closest('.faq-toggle');
        if (!toggle) return;

        const content = toggle.nextElementSibling;
        const icon = toggle.querySelector('svg');

        if (!content) return;

        // Toggle current item
        if (content.style.maxHeight && content.style.maxHeight !== '0px') {
            content.style.maxHeight = '0px';
            if (icon) icon.style.transform = 'rotate(0deg)';
        } else {
            // Optional: Close all other FAQs first (Accordion Style)
            document.querySelectorAll('.faq-content').forEach(c => c.style.maxHeight = '0px');
            document.querySelectorAll('.faq-toggle svg').forEach(i => i.style.transform = 'rotate(0deg)');

            // Open this one
            content.style.maxHeight = content.scrollHeight + "px";
            if (icon) icon.style.transform = 'rotate(180deg)';
        }
    });

    // 3. Form Submission & Success Alert
    const contactForm = document.getElementById('contact-form');
    const successAlert = document.getElementById('success-alert');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && successAlert && submitBtn) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action || '#', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok || contactForm.action.includes('formspree')) {
                    // Show success alert (assuming it uses translate-y for animation)
                    successAlert.classList.remove('hidden');
                    setTimeout(() => {
                        successAlert.classList.remove('translate-y-32');
                        successAlert.classList.add('translate-y-0');
                    }, 10);

                    contactForm.reset();

                    // Hide the box after 5 seconds
                    setTimeout(() => {
                        successAlert.classList.add('translate-y-32');
                        successAlert.classList.remove('translate-y-0');
                        setTimeout(() => successAlert.classList.add('hidden'), 500);
                    }, 5000);
                } else {
                    throw new Error("Form submission failed");
                }
            } catch (error) {
                console.error(error);
                alert("There was a problem submitting your form. Please try again.");
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // 4. Portfolio & Testimonial Sliders
    const setupSlider = (trackId, leftBtnId, rightBtnId) => {
        const track = document.getElementById(trackId);
        const leftBtn = document.getElementById(leftBtnId);
        const rightBtn = document.getElementById(rightBtnId);

        if (track && leftBtn && rightBtn) {
            leftBtn.addEventListener('click', () => {
                const amount = trackId.includes('testimonial') ? track.offsetWidth : 450;
                track.scrollBy({ left: -amount, behavior: 'smooth' });
            });
            rightBtn.addEventListener('click', () => {
                const amount = trackId.includes('testimonial') ? track.offsetWidth : 450;
                track.scrollBy({ left: amount, behavior: 'smooth' });
            });
        }
    };

    setupSlider('portfolio-track', 'slide-left', 'slide-right');
    setupSlider('testimonial-track', 'testi-left', 'testi-right');

    // 5. Scroll Reveal Animations
    const targets = document.querySelectorAll(`
        section > div, 
        .service-card, 
        #portfolio-track > div, 
        #testimonial-track > div,
        #benefits .group,
        .faq-item
    `);

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        targets.forEach((el, index) => {
            el.classList.add('reveal-on-scroll');
            if (el.classList.contains('service-card') || el.closest('#benefits')) {
                const remainder = index % 3;
                if (remainder === 1) el.classList.add('stagger-1');
                if (remainder === 2) el.classList.add('stagger-2');
            }
            observer.observe(el);
        });
    }

    // Hero Section Immediate Animation
    const heroElements = document.querySelectorAll('section:first-of-type h1, section:first-of-type p, section:first-of-type a');
    heroElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.8s ease-out ${i * 0.2}s`;
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });
});document.addEventListener('DOMContentLoaded', () => {
    // Ensure Lottie starts correctly
    const player = document.querySelector("lottie-player");
    if (player) {
        player.addEventListener("ready", () => {
            console.log("Lottie Animation is ready");
        });
    }
});
