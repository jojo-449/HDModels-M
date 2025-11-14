// // // LOGIN.JS - Handles login form

// document.addEventListener("DOMContentLoaded", function () {
//   const loginForm = document.getElementById("loginForm");
//   if (!loginForm) return;

//   loginForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const identifier = document.getElementById("loginIdentifier").value.trim();
//     const password = document.getElementById("loginPassword").value.trim();
//     const identifierError = document.getElementById("identifierError");
//     const passwordError = document.getElementById("loginPasswordError");

//     identifierError.style.display = "none";
//     passwordError.style.display = "none";

//     if (identifier === "") {
//       identifierError.textContent = "Please enter your Instagram handle or WhatsApp number.";
//       identifierError.style.display = "block";
//       return;
//     }

//     if (password === "") {
//       passwordError.textContent = "Password is required.";
//       passwordError.style.display = "block";
//       return;
//     }

//     // ✅ Get all users
//     let users = JSON.parse(localStorage.getItem("users")) || [];

//     // ✅ Find user
//     const foundUser = users.find(
//       (u) =>
//         (u.instagram === identifier || u.whatsapp === identifier) &&
//         u.password === password
//     );

//     if (!foundUser) {
//       passwordError.textContent = "Invalid login credentials. Please check your details.";
//       passwordError.style.display = "block";
//       return;
//     }

//     // ✅ Successful login
//     alert("Login successful!");
//     userAuth.login(foundUser);
//     window.location.href = "index.html";
//   });
// });



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

    // ✅ Get all users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Find user
    const foundUser = users.find(
      (u) =>
        (u.instagram === identifier || u.whatsapp === identifier) &&
        u.password === password
    );

    if (!foundUser) {
      passwordError.textContent = "Invalid login credentials. Please check your details.";
      passwordError.style.display = "block";
      return;
    }

    // ✅ Successful login
    alert("Login successful!");
    userAuth.login(foundUser);
    window.location.href = "index.html";
  });
});