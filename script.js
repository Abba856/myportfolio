// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// Apply theme preference on page load
if (currentTheme) {
    if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    updateThemeIcon();
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // User prefers dark mode
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    updateThemeIcon();
} else {
    // Default to light mode
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    const moonIcon = document.querySelector('.fa-moon');
    const sunIcon = document.querySelector('.fa-sun');
    
    if (moonIcon && sunIcon) {
        if (isDark) {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        } else {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon();
    });
}

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
        // Animate hamburger icon
        const bars = navToggle.querySelectorAll('span');
        bars[0].classList.toggle('rotate-45', !navMenu.classList.contains('hidden'));
        bars[1].classList.toggle('opacity-0', !navMenu.classList.contains('hidden'));
        bars[2].classList.toggle('-rotate-45', !navMenu.classList.contains('hidden'));
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for fixed header
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (!navMenu.classList.contains('hidden')) {
                navMenu.classList.add('hidden');
                // Reset hamburger icon
                const bars = navToggle.querySelectorAll('span');
                bars[0].classList.remove('rotate-45');
                bars[1].classList.remove('opacity-0');
                bars[2].classList.remove('-rotate-45');
            }
        }
    });
});

// Update current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Note: Form submission is now handled by send_email.php
// The JavaScript validation can be added here if needed

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white/90', 'dark:bg-darker/90', 'shadow-xl');
        navbar.classList.remove('bg-transparent');
    } else {
        navbar.classList.remove('bg-white/90', 'dark:bg-darker/90', 'shadow-xl');
        navbar.classList.add('bg-transparent');
    }
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp', 'opacity-100');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('.card-hover, .team-member, .service-card, .project-card').forEach(el => {
    observer.observe(el);
});