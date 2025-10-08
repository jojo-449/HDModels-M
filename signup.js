// SIGNUP.JS – HDMODELS

document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");

    if (!signupForm) return;

    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const instagram = document.getElementById("signupInstagram").value.trim();
        const whatsapp = document.getElementById("signupWhatsapp").value.trim();
        const password = document.getElementById("signupPassword").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        // Reset errors
        document.getElementById("instagramError").style.display = "none";
        document.getElementById("whatsappError").style.display = "none";
        document.getElementById("passwordError").style.display = "none";
        document.getElementById("confirmPasswordError").style.display = "none";

        // Validation checks
        if (instagram === "") {
            document.getElementById("instagramError").textContent = "Instagram handle is required.";
            document.getElementById("instagramError").style.display = "block";
            return;
        }

        if (!isValidWhatsApp(whatsapp)) {
            document.getElementById("whatsappError").textContent = "Please enter a valid WhatsApp number (e.g., 2349012345678).";
            document.getElementById("whatsappError").style.display = "block";
            return;
        }

        if (password.length < 6) {
            document.getElementById("passwordError").textContent = "Password must be at least 6 characters.";
            document.getElementById("passwordError").style.display = "block";
            return;
        }

        if (password !== confirmPassword) {
            document.getElementById("confirmPasswordError").textContent = "Passwords do not match.";
            document.getElementById("confirmPasswordError").style.display = "block";
            return;
        }

        // Save user data
        const newUser = {
            instagram,
            whatsapp,
            password
        };

        localStorage.setItem("currentUser", JSON.stringify(newUser));
        userAuth.login(newUser);

        alert("Signup successful! Redirecting...");
        window.location.href = "home.html";
    });
});