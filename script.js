/* ═══════════════════════════════════════════════════════════
   CREATOR PRO — Formação UGC Creator Landing Page
   JavaScript: Animations, Interactions & Micro-effects
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    
    // ── NAVBAR SCROLL ──────────────────────────────────────
    const navbar = document.getElementById('navbar');
    const floatingCta = document.getElementById('floatingCta');
    let lastScrollY = 0;

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Floating CTA visibility (show after scrolling past hero)
        const heroHeight = document.getElementById('hero').offsetHeight;
        if (scrollY > heroHeight * 0.6) {
            floatingCta.classList.add('visible');
        } else {
            floatingCta.classList.remove('visible');
        }

        lastScrollY = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ── INTERSECTION OBSERVER (Scroll Animations) ──────────
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observerCallback = (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations for siblings
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    animatedElements.forEach((el, i) => {
        el.dataset.delay = i * 50; // slight stagger
        observer.observe(el);
    });

    // ── COUNTER ANIMATION ──────────────────────────────────
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                const duration = 2000;
                const start = performance.now();

                const animate = (now) => {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(eased * target);
                    
                    el.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };

                requestAnimationFrame(animate);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ── MODULE ACCORDION ───────────────────────────────────
    const moduleToggles = document.querySelectorAll('.module__toggle');

    moduleToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const moduleNum = toggle.dataset.module;
            const content = document.getElementById(`module-${moduleNum}`);
            const isOpen = content.classList.contains('open');

            // Close all modules
            document.querySelectorAll('.module__content').forEach(c => c.classList.remove('open'));
            document.querySelectorAll('.module__toggle').forEach(t => t.classList.remove('active'));

            // Toggle current
            if (!isOpen) {
                content.classList.add('open');
                toggle.classList.add('active');
            }
        });
    });

    // Also allow clicking the header
    document.querySelectorAll('.module__header').forEach(header => {
        header.addEventListener('click', () => {
            const toggle = header.querySelector('.module__toggle');
            toggle.click();
        });
    });

    // ── FAQ ACCORDION ──────────────────────────────────────
    const faqQuestions = document.querySelectorAll('.faq__question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = answer.classList.contains('open');

            // Close all
            document.querySelectorAll('.faq__answer').forEach(a => a.classList.remove('open'));
            document.querySelectorAll('.faq__question').forEach(q => q.setAttribute('aria-expanded', 'false'));

            // Toggle current
            if (!isOpen) {
                answer.classList.add('open');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ── SMOOTH SCROLL ──────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ── MAGNETIC BUTTON EFFECT ─────────────────────────────
    const magneticBtns = document.querySelectorAll('.btn--primary');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // ── PARALLAX GRAIN EFFECT ──────────────────────────────
    const grain = document.querySelector('.hero__grain');
    if (grain) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            grain.style.transform = `translate(${x}px, ${y}px)`;
        }, { passive: true });
    }

    // ── GALLERY PAUSE ON HOVER ─────────────────────────────
    const galleryTrack = document.querySelector('.gallery__track');
    if (galleryTrack) {
        galleryTrack.addEventListener('mouseenter', () => {
            galleryTrack.style.animationPlayState = 'paused';
        });
        galleryTrack.addEventListener('mouseleave', () => {
            galleryTrack.style.animationPlayState = 'running';
        });
    }

    // ── HERO TEXT REVEAL ───────────────────────────────────
    const heroContent = document.querySelector('.hero__content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }

    const heroImage = document.querySelector('.hero__image-wrapper');
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(30px)';

        setTimeout(() => {
            heroImage.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, transform 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 400);
    }

    // ── OPEN FIRST MODULE BY DEFAULT ───────────────────────
    const firstModuleToggle = document.querySelector('.module__toggle[data-module="1"]');
    if (firstModuleToggle) {
        const firstContent = document.getElementById('module-1');
        firstContent.classList.add('open');
        firstModuleToggle.classList.add('active');
    }

    // ── CTA PULSE ANIMATION ON SCROLL ──────────────────────
    const ctaButtons = document.querySelectorAll('#heroCta, #checkoutCta, #finalCta');
    
    const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'ctaPulse 2s ease-in-out 1';
            }
        });
    }, { threshold: 0.8 });

    ctaButtons.forEach(btn => ctaObserver.observe(btn));

    // Add pulse keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ctaPulse {
            0%, 100% { box-shadow: 0 4px 20px rgba(78, 46, 28, 0.3); }
            50% { box-shadow: 0 4px 30px rgba(78, 46, 28, 0.5), 0 0 0 8px rgba(78, 46, 28, 0.08); }
        }
    `;
    document.head.appendChild(style);

});
