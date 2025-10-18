// LOGIN.JS - Handles login form

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const identifier = document.getElementById("loginIdentifier").value.trim();
        const password = document.getElementById("loginPassword").value.trim();
        const identifierError = document.getElementById("identifierError");
        const passwordError = document.getElementById("loginPasswordError");

        // Hide old errors
        identifierError.style.display = "none";
        passwordError.style.display = "none";

        // Check if fields are empty
        if (identifier === "") {
            identifierError.textContent = "Please enter your Instagram handle or WhatsApp number.";
            identifierError.style.display = "block";
            return;
        }

        if (password === "") {
            passwordError.textContent = "Password is required.";
            passwordError.style.display = "block";
            return;
        }

        // Get stored user from browser
        const storedUser = JSON.parse(localStorage.getItem("currentUser"));

        // Check if user exists
        if (!storedUser) {
            alert("No account found. Redirecting to signup page...");
            window.location.href = "signup.html";
            return;
        }

        // Check if login details match
        if (
            (storedUser.instagram === identifier || storedUser.whatsapp === identifier) &&
            storedUser.password === password
        ) {
            alert("Login successful!");
            userAuth.login(storedUser);
            window.location.href = "index.html";
        } else {
            passwordError.textContent = "Invalid login credentials. Please check your details.";
            passwordError.style.display = "block";
        }
    });
});