document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    const passwordToggle = document.getElementById("togglePassword");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        passwordToggle.innerHTML = '<i class="fa-solid fa-eye"></i>';
    } else {
        passwordField.type = "password";
        passwordToggle.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    }
});

document.getElementById("toggleConfirmPassword").addEventListener("click", function () {
    const confirmPasswordField = document.getElementById("confirm_password");
    const confirmPasswordToggle = document.getElementById("toggleConfirmPassword");

    if (confirmPasswordField.type === "password") {
        confirmPasswordField.type = "text";
        confirmPasswordToggle.innerHTML = '<i class="fa-solid fa-eye"></i>';
    } else {
        confirmPasswordField.type = "password";
        confirmPasswordToggle.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    }
});




const nameInput = document.getElementById('full_name');
const nameError = document.getElementById('name-error');

nameInput.addEventListener('input', function () {
    if (/\d/.test(nameInput.value)) {
        nameError.textContent = "Numbers are not allowed!";
    } else {
        nameError.textContent = "";
    }
});

function validateForm() {
    if (/\d/.test(nameInput.value)) {
        nameError.textContent = "Numbers are not allowed!";
        return false;
    }
    nameError.textContent = "";
    return true;
}




function validateUsername() {
    var usernameInput = document.getElementById("username");
    var usernameError = document.getElementById("username-error");

    if (usernameInput.value.includes(" ")) {
        usernameError.textContent = "Username cannot contain spaces.";
        usernameInput.setCustomValidity("Username cannot contain spaces.");
    } else {
        usernameError.textContent = "";
        usernameInput.setCustomValidity("");
    }
}





const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function () {
    // Remove any non-digit characters from the input
    this.value = this.value.replace(/\D/g, '');
    // Limit the input to 10 digits
    if (this.value.length >= 10) {
        this.value = this.value.slice(0, 11);
    }
});




const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');

emailInput.addEventListener('input', function () {
    const email = emailInput.value.toLowerCase();
    if (!validateEmail(email)) {
        emailError.textContent = "Invalid email address (e.g., abc@gmail.com).";
    } else {
        emailError.textContent = "";
    }
});

function validateEmail(email) {
    // Check if the email matches Gmail, Yahoo Mail, or other allowed domains
    const allowedDomains = ['gmail.com', 'yahoo.com', 'mail.com'];
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
}

function validateForm() {
    const email = emailInput.value.toLowerCase();
    if (!validateEmail(email)) {
        emailError.textContent = "Invalid email address (e.g., abc@gmail.com)!";
        return false;
    }
    emailError.textContent = "";
    return true;
}




