// 1. Typing Effect Logic
const textElement = document.getElementById('typing-text');
const phrases = ["Digital Innovator", "IT Student", "Tech Enthusiast"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if(!textElement) return;
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, 1500); 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}
document.addEventListener('DOMContentLoaded', type);

// 2. Navigation Active State Logic
const observerOptions = { 
    threshold: 0.15 // 🚨 FIX: Lowered to 15% so tall sections trigger perfectly
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, observerOptions);

// 🚨 FIX: Added 'footer' so it tracks your Contact page too! 🚨
document.querySelectorAll('section, footer').forEach(element => {
    observer.observe(element);
});
// 3. Dynamic Cursor-following Label Logic
document.addEventListener('DOMContentLoaded', () => {
    const hintLabel = document.getElementById('cursor-tap-hint');
    if(!hintLabel) return;

    function updateCursorPosition(event) {
        const offset = 15;
        hintLabel.style.top = (event.clientY + offset) + 'px';
        hintLabel.style.left = (event.clientX + offset) + 'px';
    }

    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            hintLabel.textContent = "TAP TO FLIP";
            hintLabel.style.opacity = '1';
        });
        card.addEventListener('mouseleave', () => hintLabel.style.opacity = '0');
        card.addEventListener('mousemove', updateCursorPosition);
    });

    const contactLinks = document.querySelectorAll('.hover-target');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            hintLabel.textContent = e.target.getAttribute('data-cursor');
            hintLabel.style.opacity = '1';
        });
        link.addEventListener('mouseleave', () => hintLabel.style.opacity = '0');
        link.addEventListener('mousemove', updateCursorPosition);
    });
});

// 4. 🚨 FIX: View More Projects Button Logic 🚨
document.addEventListener('DOMContentLoaded', () => {
    const viewMoreBtn = document.getElementById('view-more-btn');
    const archiveContent = document.getElementById('archive-content');

    if (viewMoreBtn && archiveContent) {
        // Ensure it starts hidden
        archiveContent.style.display = 'none';
        
        viewMoreBtn.addEventListener('click', () => {
            if (archiveContent.style.display === 'none') {
                archiveContent.style.display = 'block';
                // Small delay to allow CSS animation to trigger if needed
                setTimeout(() => archiveContent.style.opacity = '1', 10);
                viewMoreBtn.innerHTML = "Show Less ↑";
            } else {
                archiveContent.style.display = 'none';
                archiveContent.style.opacity = '0';
                viewMoreBtn.innerHTML = "View More Projects ↓";
            }
        });
    }
});