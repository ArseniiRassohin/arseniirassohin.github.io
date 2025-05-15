'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');

            let hasError = false;

            if (!emailInput.value) {
                emailError.style.display = 'block';
                hasError = true;
            } else {
                emailError.style.display = 'none';
            }

            if (!passwordInput.value) {
                passwordError.style.display = 'block';
                passwordError.textContent = 'Please enter your password.';
                hasError = true;
            } else if (passwordInput.value.length < 8) {
                passwordError.style.display = 'block';
                passwordError.textContent = 'Password must be at least 8 characters long.';
                hasError = true;
            } else {
                passwordError.style.display = 'none';
            }

            if (!hasError) {
                const modal = document.getElementById('modal');
                if (modal) {
                    modal.style.display = 'flex';
                    registerForm.reset();
                }
            }
        });
    }

    // Form input error clearing
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            document.getElementById('emailError').style.display = 'none';
        });
    }

    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', () => {
            document.getElementById('passwordError').style.display = 'none';
        });
    }

    // Modal close
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            document.getElementById('modal').style.display = 'none';
        });
    }

    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = anchor.getAttribute('href');
            const section = document.querySelector(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Carousel functionality
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.product-card');
    const totalCards = cards.length;
    let currentIndex = 0;

    if (!track || !cards.length) {
        console.error('Carousel elements not found');
        return;
    }

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + 30; // Card width + margin
        const cardsToShow = window.innerWidth >= 600 ? 3 : 1; // 3 cards on desktop, 1 on mobile
        const maxIndex = Math.max(0, totalCards - cardsToShow);
        if (currentIndex > maxIndex) {
            currentIndex = 0; // Reset to start
        }
        const offset = cardWidth * currentIndex;
        track.style.transform = `translateX(-${offset}px)`;
    }

    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const cardsToShow = window.innerWidth >= 600 ? 3 : 1;
            currentIndex = (currentIndex + 1) % totalCards;
            if (currentIndex > totalCards - cardsToShow) {
                currentIndex = 0;
            }
            updateCarousel();
        });
    }

    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCarousel();
        });
    }

    // Mouse swipe functionality (desktop)
    let isDragging = false;
    let startX;
    let startTransform = 0;

    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        startTransform = currentIndex * (cards[0].offsetWidth + 30);
        track.style.transition = 'none';
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const diffX = e.pageX - startX;
        track.style.transform = `translateX(-${startTransform - diffX}px)`;
    });

    track.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = 'transform 0.5s ease-in-out';
        const diffX = e.pageX - startX;
        const cardWidth = cards[0].offsetWidth + 30;
        const threshold = cardWidth / 3;
        const cardsToShow = window.innerWidth >= 600 ? 3 : 1;

        if (diffX > threshold) {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        } else if (diffX < -threshold) {
            currentIndex = (currentIndex + 1) % totalCards;
            if (currentIndex > totalCards - cardsToShow) {
                currentIndex = 0;
            }
        }
        updateCarousel();
    });

    track.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            track.style.transition = 'transform 0.5s ease-in-out';
            updateCarousel();
        }
    });

    // Touch swipe functionality (mobile)
    track.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX;
        startTransform = currentIndex * (cards[0].offsetWidth + 30);
        track.style.transition = 'none';
    });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const diffX = e.touches[0].pageX - startX;
        track.style.transform = `translateX(-${startTransform - diffX}px)`;
    });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = 'transform 0.5s ease-in-out';
        const diffX = e.changedTouches[0].pageX - startX;
        const cardWidth = cards[0].offsetWidth + 30;
        const threshold = cardWidth / 3;
        const cardsToShow = window.innerWidth >= 600 ? 3 : 1;

        if (diffX > threshold) {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        } else if (diffX < -threshold) {
            currentIndex = (currentIndex + 1) % totalCards;
            if (currentIndex > totalCards - cardsToShow) {
                currentIndex = 0;
            }
        }
        updateCarousel();
    });

    // Adjust carousel on window resize
    window.addEventListener('resize', updateCarousel);

    // Initialize carousel
    updateCarousel();
});