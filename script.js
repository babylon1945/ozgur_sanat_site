// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu button
    const menuClose = document.getElementById('menuClose');
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Toggle body overflow when menu opens/closes
    hamburger.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = '';
        } else {
            document.body.style.overflow = 'hidden';
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Navbar height
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
    
    lastScroll = currentScroll;
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollY = window.pageYOffset;
    const offset = 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - offset && scrollY < sectionTop + sectionHeight - offset) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}` || (current === 'anasayfa' && href === '#anasayfa')) {
            link.classList.add('active');
        }
    });
}

// Initialize active link on page load
window.addEventListener('load', () => {
    updateActiveNavLink();
    
    // Set home as active if at top of page
    if (window.pageYOffset < 100) {
        const homeLink = document.querySelector('.nav-link[href="#anasayfa"]');
        if (homeLink) {
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            homeLink.classList.add('active');
        }
    }
});

// Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImageIndex = 0;
let images = [];

// Collect all gallery images
galleryItems.forEach((item, index) => {
    const imgSrc = item.getAttribute('data-image');
    if (imgSrc) {
        images.push(imgSrc);
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    }
});

function openLightbox(index) {
    currentImageIndex = index;
    lightboxImage.src = images[index];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    lightboxImage.src = images[currentImageIndex];
    lightboxImage.style.animation = 'none';
    setTimeout(() => {
        lightboxImage.style.animation = 'zoomIn 0.3s ease';
    }, 10);
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    lightboxImage.src = images[currentImageIndex];
    lightboxImage.style.animation = 'none';
    setTimeout(() => {
        lightboxImage.style.animation = 'zoomIn 0.3s ease';
    }, 10);
}

// Event listeners for lightbox
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', showNextImage);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', showPrevImage);
}

// Close lightbox when clicking on background
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    }
});

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const body = document.body;
    
    // Add loading class to body
    body.classList.add('loading');
    
    // Hide loading screen after page fully loads
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            
            // Remove loading screen from DOM after transition
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                body.classList.remove('loading');
            }, 600);
        }
    }, 1500); // Show loading for minimum 1.5 seconds
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in effect
document.querySelectorAll('section > .container > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
