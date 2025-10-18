// // -----------------------------
// // SERVER.JS – Works when all files are in the same folder
// // -----------------------------

// const express = require("express");
// const session = require("express-session");
// const path = require("path");

// const app = express();

// // 🧰 Serve your website files (HTML, CSS, JS) directly from this same folder
// app.use(express.static(__dirname));

// // 🗝 Set up a basic session
// app.use(session({
//   secret: "mySuperSecretKey", // 👉 change this to any random secret string
//   resave: false,
//   saveUninitialized: false
// }));

// // 🧱 Protect pages that shouldn’t be seen unless logged in
// function protectPage(req, res, next) {
//   if (!req.session.user) {
//     return res.redirect("/login copy.html");
//   }
//   next();
// }

// // ✅ Protected pages (add all that need protection)
// app.get("/index.html", protectPage, (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// app.get("/models.html", protectPage, (req, res) => {
//   res.sendFile(path.join(__dirname, "models.html"));
// });

// app.get("/about.html", protectPage, (req, res) => {
//   res.sendFile(path.join(__dirname, "about.html"));
// });

// app.get("/booking-history.html", protectPage, (req, res) => {
//   res.sendFile(path.join(__dirname, "booking-history.html"));
// });

// app.get("/model-enquiry.html", protectPage, (req, res) => {
//   res.sendFile(path.join(__dirname, "model-enquiry.html"));
// });

// app.get("/terms.html", protectPage, (req, res) => {
//   res.sendFile(path.join(__dirname, "terms.html"));
// });

// // 🆓 Public pages (no protection)
// app.get("/login copy.html", (req, res) => {
//   res.sendFile(path.join(__dirname, "login copy.html"));
// });

// // app.get("/signup.html", (req, res) => {
//   res.sendFile(path.join(__dirname, "signup.html"));
// });

// // 🚪 Logout route (clears server session)
// app.get("/logout", (req, res) => {
//   req.session.destroy(() => {
//     res.redirect("/login copy.html");
//   });
// });

// // 🚀 Start the backend server
// app.listen(3000, () => {
//   console.log("✅ Server running at: http://localhost:3000");
// });