// AUTH.JS - Clean version with NO flickering

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
    window.location.href = "signup.html";
  }
};

// PHONE VALIDATION - Must be OUTSIDE the event listener
function isValidWhatsApp(number) {
  const clean = number.replace(/\D/g, "");
  return /^(\+?234|0)?[789][01]\d{8}$/.test(clean);
}

// PAGE PROTECTION - Runs ONCE when page loads
(function() {
  // Flag to prevent multiple executions
  if (window.authCheckComplete) return;
  window.authCheckComplete = true;

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', performAuthCheck);
  } else {
    performAuthCheck();
  }

  function performAuthCheck() {
    const currentPage = window.location.pathname.split("/").pop().toLowerCase() || "index.html";
    const loggedInUser = localStorage.getItem("currentUser");
    const publicPages = ["login copy.html", "signup.html"];
    const isPublicPage = publicPages.includes(currentPage);

    if (!loggedInUser && !isPublicPage) {
      // Not logged in, need login
      window.location.replace("signup.html");
    } else if (loggedInUser && isPublicPage) {
      // Already logged in, go to home
      window.location.replace("index.html");
    }
  }
})();