// Form validation for Registration Page
document.getElementById('registerForm').addEventListener('submit', function(event) {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (!name || !email || !password) {
        event.preventDefault();
        alert('Please fill out all fields.');
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (!email || !password) {
        event.preventDefault();
        alert('Please fill out all fields.');
    }
});


// Form validation for Login Page
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Simulate checking credentials (use MongoDB Shell for real data query)
    console.log('Logging in with', email, password);
    if (email === 'test@aihub.com' && password === '1234') {
        alert('Login successful!');
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials. Try again.');
    }
});
