document.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.getElementById('loginForm');

    if (loginForm === null) {
        return;
    }

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var username = document.getElementById('username').value.trim();
        var password = document.getElementById('password').value.trim();

        if (password === '1234') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            window.location.href = 'pages/dashboard.html';
        } else {
            errorMessage.textContent = 'Invalid username or password.';
        }
    });
});