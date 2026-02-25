// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLink = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when a link is clicked
navLink.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Video Modal functionality
const videoModal = document.getElementById('videoModal');
const modalIframe = document.getElementById('modalIframe');
const videoModalClose = document.querySelector('.video-modal-close');
const playButtons = document.querySelectorAll('.play-btn');

// Helper function to convert video URL to embed URL
function getEmbedUrl(videoType, videoSrc) {
    if (videoType === 'youtube') {
        // Handle YouTube URLs
        let videoId = '';
        
        if (videoSrc.includes('youtube.com/embed/')) {
            // Already in embed format
            return videoSrc;
        } else if (videoSrc.includes('youtu.be/')) {
            videoId = videoSrc.split('youtu.be/')[1].split('?')[0];
        } else if (videoSrc.includes('youtube.com/watch?v=')) {
            videoId = videoSrc.split('v=')[1].split('&')[0];
        } else {
            // Assume it's already an ID
            videoId = videoSrc;
        }
        
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`;
    } else if (videoType === 'vimeo') {
        // Handle Vimeo URLs
        let videoId = '';
        
        if (videoSrc.includes('vimeo.com/embed/')) {
            // Already in embed format
            return videoSrc;
        } else if (videoSrc.includes('vimeo.com/')) {
            videoId = videoSrc.split('vimeo.com/')[1].split('?')[0];
        } else {
            // Assume it's already an ID
            videoId = videoSrc;
        }
        
        return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    
    return videoSrc;
}

// Open video in modal
playButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const videoType = btn.getAttribute('data-video-type');
        const videoSrc = btn.getAttribute('data-video-src');
        
        const embedUrl = getEmbedUrl(videoType, videoSrc);
        
        modalIframe.src = embedUrl;
        videoModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
videoModalClose.addEventListener('click', () => {
    videoModal.style.display = 'none';
    modalIframe.src = ''; // Stop video
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.style.display = 'none';
        modalIframe.src = ''; // Stop video
        document.body.style.overflow = 'auto';
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.style.display === 'flex') {
        videoModal.style.display = 'none';
        modalIframe.src = ''; // Stop video
        document.body.style.overflow = 'auto';
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            const offsetTop = element.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.video-gallery-item, .cta-section').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});