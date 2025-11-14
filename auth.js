

// const userAuth = {
//   getCurrentUser() {
//     const user = localStorage.getItem("currentUser");
//     return user ? JSON.parse(user) : null;
//   },

//   isLoggedIn() {
//     return !!localStorage.getItem("currentUser");
//   },

//   login(userData) {
//     localStorage.setItem("currentUser", JSON.stringify(userData));
//   },

//   logout() {
//     localStorage.removeItem("currentUser");
//     alert("You have been logged out!");
//     window.location.href = "login copy.html";
//   },
// };

// // ✅ WhatsApp validation
// function isValidWhatsApp(number) {
//   const clean = number.replace(/\D/g, "");
//   return /^(\+?234|0)?[789][01]\d{8}$/.test(clean);
// }

// // ✅ Page protection
// (function () {
//   if (window.authCheckComplete) return;
//   window.authCheckComplete = true;

//   function performAuthCheck() {
//     const currentPage =
//       window.location.pathname.split("/").pop().toLowerCase() || "index.html";
//     const loggedInUser = localStorage.getItem("currentUser");
//     const publicPages = ["login copy.html", "signup.html"];
//     const isPublicPage = publicPages.includes(currentPage);

//     if (!loggedInUser && !isPublicPage) {
//       window.location.href = "login copy.html";
//     } else if (loggedInUser && isPublicPage) {
//       window.location.href = "index.html";
//     }
//   }

//   if (document.readyState === "loading") {
//     document.addEventListener("DOMContentLoaded", performAuthCheck);
//   } else {
//     performAuthCheck();
//   }
// })();

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
    alert("You have been logged out!");
    window.location.href = "login copy.html";
  },
};

// ✅ WhatsApp validation
function isValidWhatsApp(number) {
  const clean = number.replace(/\D/g, "");
  return /^(\+?234|0)?[789][01]\d{8}$/.test(clean);
}

// ✅ Page protection
(function () {
  if (window.authCheckComplete) return;
  window.authCheckComplete = true;

  function performAuthCheck() {
    const currentPage =
      window.location.pathname.split("/").pop().toLowerCase() || "index.html";
    const loggedInUser = localStorage.getItem("currentUser");
    const publicPages = ["login copy.html", "signup.html"];
    const isPublicPage = publicPages.includes(currentPage);

    if (!loggedInUser && !isPublicPage) {
      window.location.replace("signup.html");
    } else if (loggedInUser && isPublicPage) {
      window.location.replace("index.html");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", performAuthCheck);
  } else {
    performAuthCheck();
  }
})();


