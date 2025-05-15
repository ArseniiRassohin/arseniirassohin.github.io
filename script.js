document.getElementById('registerForm').addEventListener('submit', function(event) {
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
        document.getElementById('modal').style.display = 'flex';
        document.getElementById('registerForm').reset();
    }
});

document.getElementById('email').addEventListener('input', function() {
    document.getElementById('emailError').style.display = 'none';
});

document.getElementById('password').addEventListener('input', function() {
    document.getElementById('passwordError').style.display = 'none';
});

document.getElementById('modalClose').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('href');
        document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Carousel functionality
const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.product-card');
const totalCards = cards.length;
let currentIndex = 0;

function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + 20; // Card width + margin
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalCards; // Cycle to start
    updateCarousel();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards; // Cycle to end
    updateCarousel();
});

// Adjust carousel on window resize
window.addEventListener('resize', updateCarousel);