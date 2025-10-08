// LOGIN.JS – HDMODELS

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const identifier = document.getElementById("loginIdentifier").value.trim();
        const password = document.getElementById("loginPassword").value.trim();
        const identifierError = document.getElementById("identifierError");
        const passwordError = document.getElementById("loginPasswordError");

        identifierError.style.display = "none";
        passwordError.style.display = "none";

        // Basic validation
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

        // Get stored user
        const storedUser = JSON.parse(localStorage.getItem("currentUser"));

        if (!storedUser) {
            alert("No account found. Please sign up first.");
            window.location.href = "signup.html";
            return;
        }

        // Match user
        if (
            (storedUser.instagram === identifier ||
                storedUser.whatsapp === identifier) &&
            storedUser.password === password
        ) {
            alert("Login successful!");
            userAuth.login(storedUser); // store session
            window.location.href = "home.html";
        } else {
            alert("Invalid login credentials. Please check your details.");
        }
    });
});