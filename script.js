document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordError = document.getElementById('passwordError');
    
    // Check password length
    if (password.length < 8) {
        passwordError.style.display = 'block';
        return;
    } else {
        passwordError.style.display = 'none';
    }
    
    // Show success modal
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
    
    // Clear form
    document.getElementById('registerForm').reset();
});

// Close modal
document.getElementById('modalClose').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});