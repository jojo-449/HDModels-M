// // // SIGNUP.JS - Handles signup form

// document.addEventListener("DOMContentLoaded", function () {
//   const signupForm = document.getElementById("signupForm");
//   if (!signupForm) return;

//   signupForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const instagram = document.getElementById("signupInstagram").value.trim();
//     const whatsapp = document.getElementById("signupWhatsapp").value.trim();
//     const password = document.getElementById("signupPassword").value.trim();
//     const confirmPassword = document.getElementById("confirmPassword").value.trim();

//     // Hide old errors
//     document.getElementById("instagramError").style.display = "none";
//     document.getElementById("whatsappError").style.display = "none";
//     document.getElementById("passwordError").style.display = "none";
//     document.getElementById("confirmPasswordError").style.display = "none";

//     // Validation
//     if (instagram === "") {
//       document.getElementById("instagramError").textContent = "Instagram handle is required.";
//       document.getElementById("instagramError").style.display = "block";
//       return;
//     }

//     if (!isValidWhatsApp(whatsapp)) {
//       document.getElementById("whatsappError").textContent =
//         "Please enter a valid WhatsApp number (e.g., 2349012345678).";
//       document.getElementById("whatsappError").style.display = "block";
//       return;
//     }

//     if (password.length < 6) {
//       document.getElementById("passwordError").textContent =
//         "Password must be at least 6 characters.";
//       document.getElementById("passwordError").style.display = "block";
//       return;
//     }

//     if (password !== confirmPassword) {
//       document.getElementById("confirmPasswordError").textContent = "Passwords do not match.";
//       document.getElementById("confirmPasswordError").style.display = "block";
//       return;
//     }

//     // ✅ Save user data (support multiple users)
//     const newUser = { instagram, whatsapp, password };

//     let users = JSON.parse(localStorage.getItem("users")) || [];

//     // ✅ Check if user already exists
//     const userExists = users.some(
//       (u) => u.instagram === instagram || u.whatsapp === whatsapp
//     );

//     if (userExists) {
//       alert("An account with this Instagram or WhatsApp already exists. Please log in instead.");
//       window.location.href = "login copy.html";
//       return;
//     }

//     // ✅ Add new user and save
//     users.push(newUser);
//     localStorage.setItem("users", JSON.stringify(users));

//     alert("Signup successful! Redirecting to login page...");
//     window.location.href = "login copy.html";
//   });
// });


document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  if (!signupForm) return;

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const instagram = document.getElementById("signupInstagram").value.trim();
    const whatsapp = document.getElementById("signupWhatsapp").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Hide old errors
    document.getElementById("instagramError").style.display = "none";
    document.getElementById("whatsappError").style.display = "none";
    document.getElementById("passwordError").style.display = "none";
    document.getElementById("confirmPasswordError").style.display = "none";

    // Validation
    if (instagram === "") {
      document.getElementById("instagramError").textContent = "Instagram handle is required.";
      document.getElementById("instagramError").style.display = "block";
      return;
    }

    if (!isValidWhatsApp(whatsapp)) {
      document.getElementById("whatsappError").textContent =
        "Please enter a valid WhatsApp number (e.g., 2349012345678).";
      document.getElementById("whatsappError").style.display = "block";
      return;
    }

    if (password.length < 6) {
      document.getElementById("passwordError").textContent =
        "Password must be at least 6 characters.";
      document.getElementById("passwordError").style.display = "block";
      return;
    }

    if (password !== confirmPassword) {
      document.getElementById("confirmPasswordError").textContent = "Passwords do not match.";
      document.getElementById("confirmPasswordError").style.display = "block";
      return;
    }

    // ✅ Save user data (support multiple users)
    const newUser = { instagram, whatsapp, password };

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Check if user already exists
    const userExists = users.some(
      (u) => u.instagram === instagram || u.whatsapp === whatsapp
    );

    if (userExists) {
      alert("An account with this Instagram or WhatsApp already exists. Please log in instead.");
      window.location.href = "login copy.html";
      return;
    }

    // ✅ Add new user and save
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Redirecting to login page...");
    window.location.href = "login copy.html";
  });
});