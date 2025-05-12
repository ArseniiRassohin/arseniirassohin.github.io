document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    alert(`Регистрация: Email - ${email}, Пароль - ${password}`);
    // Здесь можно добавить логику для отправки данных на сервер
});