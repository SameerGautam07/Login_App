// Simulated user data for demonstration purposes
const validUser  = {
    username: 'emilys',
    password: 'password123', // Example password
};

// Function to handle form submission
document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Clear previous error messages
    document.getElementById('username-error').textContent = '';
    document.getElementById('password-error').textContent = '';

    // Validate input
    let valid = true;

    if (username !== validUser .username) {
        document.getElementById('username-error').textContent = 'Invalid username';
        valid = false;
    }

    if (password !== validUser .password) {
        document.getElementById('password-error').textContent = 'Invalid password';
        valid = false;
    }

    // If validation fails, return early
    if (!valid) return;

    // Simulate an API call
    const response = await fakeApiLogin(username, password);
    
    if (response.success) {
        // Store user data in local storage if "Remember Me" is checked
        if (document.getElementById('remember-me').checked) {
            localStorage.setItem('userData', JSON.stringify(response.user));
        }

        // Show the main container and hide the login container
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-container').style.display = 'block';
        document.getElementById('welcome-message').textContent = `Welcome, ${response.user.username}!`;
    } else {
        // Handle login failure
        alert('Login failed. Please check your credentials.');
    }
});

// Simulated API login function
async function fakeApiLogin(username, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (username === validUser .username && password === validUser .password) {
                resolve({
                    success: true,
                    user: validUser ,
                });
            } else {
                resolve({ success: false });
            }
        }, 1000); // Simulate network delay
    });
}

// Logout functionality
document.getElementById('logout-button').addEventListener('click', function () {
    // Clear user data from local storage
    localStorage.removeItem('userData');

    // Show the login container and hide the main container
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';

    // Clear input fields
    document.getElementById('login-form').reset();
});