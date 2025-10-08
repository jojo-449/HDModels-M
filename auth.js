// -----------------------------
// AUTH.JS – FINAL NON-FLICKER VERSION (for login copy.html)
// -----------------------------

const userAuth = {
  getCurrentUser() {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  },

  isLoggedIn() {
    return !!localStorage.getItem("currentUser");
  },

  login(userData) {
    localStorage.setItem("currentUser", JSON.stringify(userData));
  },

  logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login copy.html";
  }
};

// -----------------------------
// PAGE ACCESS CONTROL (stable, no flicker)
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname.split("/").pop().toLowerCase();
  const user = userAuth.getCurrentUser();

  // Explicit page names
  const isLogin  = page === "login copy.html";
  const isSignup = page === "signup.html";

//   // 1️⃣ Only redirect if we are NOT on login or signup already
//   if (!user && !isLogin && !isSignup) {
//     console.log("Not logged in → redirecting to login copy.html");
//     window.location.replace("login copy.html");
//     return;
//   }

  // 2️⃣ Logged-in user trying to see login or signup → send home
  if (user && (isLogin || isSignup)) {
    console.log("Already logged in → redirecting to home.html");
    window.location.replace("home.html");
    return;
  }
});

// -----------------------------
// SIMPLE PHONE VALIDATION (WhatsApp)
// -----------------------------
function isValidWhatsApp(number) {
  const clean = number.replace(/\D/g, "");
  // Nigerian number (with or without +234) or international format (10–15 digits)
  return /^(\+?234|0)?[789][01]\d{8}$/.test(clean);
}