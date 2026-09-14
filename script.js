// ---------- Mobile menu toggle ----------
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.nav-mobile');

function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
}

function openMenu() {
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
}

if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        isOpen ? closeMenu() : openMenu();
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    // Close automatically if resized back to desktop width
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) closeMenu();
    });
}

// ---------- Custom cursor (desktop / fine-pointer only) ----------
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (isFinePointer && !prefersReducedMotion) {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
        document.body.classList.add('cursor-ready');
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Magnetic hover effect on interactive elements
    const magneticEls = document.querySelectorAll('a, button, .tag');
    magneticEls.forEach((el) => {
        el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
    });
}
