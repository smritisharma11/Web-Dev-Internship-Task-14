// Toggle between Register and Login UI
function toggleForm() {
    const regForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    regForm.style.display = regForm.style.display === 'none' ? 'block' : 'none';
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    document.getElementById('message').innerText = "";
}

// 1. Capture and Store User Data (Registration)
function register() {
    const user = document.getElementById('reg-username').value;
    const pass = document.getElementById('reg-password').value;

    if (user && pass) {
        localStorage.setItem('storedUser', user);
        localStorage.setItem('storedPass', pass);
        showMessage("Registration Successful! Please Login.", "green");
        toggleForm();
    } else {
        showMessage("Please fill in all fields.", "red");
    }
}

// 2. Validate Credentials (Login)
function login() {
    const userInput = document.getElementById('login-username').value;
    const passInput = document.getElementById('login-password').value;
    
    const savedUser = localStorage.getItem('storedUser');
    const savedPass = localStorage.getItem('storedPass');

    if (userInput === savedUser && passInput === savedPass) {
        // Set session status
        localStorage.setItem('isLoggedIn', 'true');
        showProtectedPage();
    } else {
        showMessage("Invalid Credentials!", "red");
    }
}

// 3. Restrict Access & Redirect
function showProtectedPage() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('protected-page').style.display = 'block';
    showMessage("Login Success!", "green");
}

// 4. Logout (Clear Session Data)
function logout() {
    localStorage.removeItem('isLoggedIn');
    location.reload(); // Refresh page to reset UI
}

// Helper function for messages
function showMessage(text, color) {
    const msg = document.getElementById('message');
    msg.innerText = text;
    msg.style.color = color;
}

// Check login status on page load
window.onload = function() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showProtectedPage();
    }
}
