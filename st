// ===== SIGNUP & LOGIN AUTHENTICATION SYSTEM - ADDED BY USER REQUEST =====

// Instagram Handle Validation Function
function validateInstagramHandle(handle) {
    // Remove @ if present
    const cleanHandle = handle.replace('@', '');
    
    // Instagram handle rules: 1-30 characters, alphanumeric, periods, underscores
    const instagramRegex = /^[a-zA-Z0-9._]{1,30}$/;
    
    // Cannot start or end with period
    // Cannot have consecutive periods
    if (cleanHandle.startsWith('.') || cleanHandle.endsWith('.') || cleanHandle.includes('..')) {
        return false;
    }
    
    return instagramRegex.test(cleanHandle);
}

// Password validation
function validatePassword(password) {
    return password && password.length >= 6;
}

// User Authentication System with Password Support
class BUserAuth {
    constructor() {
        this.currentUser = this.loadUserFromStorage();
        this.users = this.loadUsersFromStorage();
    }

    signup(instagramHandle, whatsappNumber, password) {
        const cleanInstagram = instagramHandle.replace('@', '');
        const cleanWhatsapp = formatPhoneNumber(whatsappNumber);
        
        // Check if user already exists
        const existingUser = this.users.find(user => 
            user.instagram === cleanInstagram || user.whatsapp === cleanWhatsapp
        );
        
        if (existingUser) {
            return { success: false, message: 'User already exists with this Instagram handle or WhatsApp number' };
        }
        
        const user = {
            id: this.generateUserId(whatsappNumber),
            instagram: cleanInstagram,
            whatsapp: cleanWhatsapp,
            password: password, // In real app, this should be hashed
            createdAt: new Date().toISOString()
        };
        
        this.users.push(user);
        this.saveUsersToStorage();
        return { success: true, user: user };
    }

    login(identifier, password) {
        const cleanIdentifier = identifier.replace('@', '');
        
        // Find user by Instagram handle or WhatsApp number
        const user = this.users.find(user => 
            user.instagram === cleanIdentifier || 
            user.whatsapp === cleanIdentifier ||
            user.whatsapp === formatPhoneNumber(cleanIdentifier)
        );
        
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        
        if (user.password !== password) {
            return { success: false, message: 'Incorrect password' };
        }
        
        // Set current user
        const loginUser = {
            id: user.id,
            instagram: user.instagram,
            whatsapp: user.whatsapp,
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('hdmodels_user', JSON.stringify(loginUser));
        this.currentUser = loginUser;
        
        return { success: true, user: loginUser };
    }

    logout() {
        localStorage.removeItem('hdmodels_user');
        localStorage.removeItem('hdmodels_bookings');
        this.currentUser = null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    loadUserFromStorage() {
        const stored = localStorage.getItem('hdmodels_user');
        return stored ? JSON.parse(stored) : null;
    }

    loadUsersFromStorage() {
        const stored = localStorage.getItem('hdmodels_users');
        return stored ? JSON.parse(stored) : [];
    }

    saveUsersToStorage() {
        localStorage.setItem('hdmodels_users', JSON.stringify(this.users));
    }

    generateUserId(whatsappNumber) {
        return btoa(whatsappNumber).replace(/[^a-zA-Z0-9]/g, '').substring(0, 8);
    }
}

const auth = new BUserAuth();

// Signup Form Handler - Added for user authentication system
function handleSignup(e) {
    e.preventDefault();
    
    const instagramHandle = document.getElementById('signupInstagram').value;
    const whatsappNumber = document.getElementById('signupWhatsapp').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Clear previous errors
    document.getElementById('instagramError').style.display = 'none';
    document.getElementById('whatsappError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';
    document.getElementById('confirmPasswordError').style.display = 'none';
    
    let hasErrors = false;
    
    // Validate Instagram handle
    if (!instagramHandle) {
        document.getElementById('instagramError').textContent = 'Business Instagram handle is required';
        document.getElementById('instagramError').style.display = 'block';
        hasErrors = true;
    } else if (!validateInstagramHandle(instagramHandle)) {
        document.getElementById('instagramError').textContent = 'Please enter a valid Instagram handle (e.g., @your_business)';
        document.getElementById('instagramError').style.display = 'block';
        hasErrors = true;
    }
    
    // Validate WhatsApp number
    if (!whatsappNumber) {
        document.getElementById('whatsappError').textContent = 'WhatsApp number is required';
        document.getElementById('whatsappError').style.display = 'block';
        hasErrors = true;
    } else if (!validateWhatsAppNumber(whatsappNumber)) {
        document.getElementById('whatsappError').textContent = 'Please enter a valid WhatsApp number (10-15 digits)';
        document.getElementById('whatsappError').style.display = 'block';
        hasErrors = true;
    }
    
    // Validate password
    if (!password) {
        document.getElementById('passwordError').textContent = 'Password is required';
        document.getElementById('passwordError').style.display = 'block';
        hasErrors = true;
    } else if (!validatePassword(password)) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long';
        document.getElementById('passwordError').style.display = 'block';
        hasErrors = true;
    }
    
    // Validate confirm password
    if (!confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Please confirm your password';
        document.getElementById('confirmPasswordError').style.display = 'block';
        hasErrors = true;
    } else if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        document.getElementById('confirmPasswordError').style.display = 'block';
        hasErrors = true;
    }
    
    if (hasErrors) {
        return;
    }
    
    const result = userAuth.signup(instagramHandle, whatsappNumber, password);
    
    if (result.success) {
        alert('Account created successfully! Please login to continue.');
        window.location.href = 'login.html';
    } else {
        alert('Failed to create account: ' + result.message);
    }
}

// Login Form Handler - Added for user authentication system
function handleLogin(e) {
    e.preventDefault();
    
    const identifier = document.getElementById('loginIdentifier').value;
    const password = document.getElementById('loginPassword').value;
    
    // Clear previous errors
    document.getElementById('identifierError').style.display = 'none';
    document.getElementById('loginPasswordError').style.display = 'none';
    
    let hasErrors = false;
    
    // Validate identifier
    if (!identifier) {
        document.getElementById('identifierError').textContent = 'Instagram handle or WhatsApp number is required';
        document.getElementById('identifierError').style.display = 'block';
        hasErrors = true;
    }
    
    // Validate password
    if (!password) {
        document.getElementById('loginPasswordError').textContent = 'Password is required';
        document.getElementById('loginPasswordError').style.display = 'block';
        hasErrors = true;
    }
    
    if (hasErrors) {
        return;
    }
    
    const result = userAuth.login(identifier, password);
    
    if (result.success) {
        alert('Welcome! You are now logged in.');
        window.location.href = 'index.html';
    } else {
        alert('Login failed: ' + result.message);
    }
}

// Booking Management System - Added for user booking history
class BookingManager {
    constructor() {
        this.bookings = this.loadBookingsFromStorage();
    }

    addBooking(bookingData) {
        const booking = {
            id: this.generateBookingId(),
            ...bookingData,
            status: 'pending',
            createdAt: new Date().toISOString(),
            userId: userAuth.getCurrentUser()?.id
        };
        
        this.bookings.push(booking);
        this.saveBookingsToStorage();
        return booking;
    }

    getUserBookings(userId) {
        return this.bookings.filter(booking => booking.userId === userId);
    }

    updateBookingStatus(bookingId, status) {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
            booking.status = status;
            booking.updatedAt = new Date().toISOString();
            this.saveBookingsToStorage();
        }
        return booking;
    }

    loadBookingsFromStorage() {
        const stored = localStorage.getItem('hdmodels_bookings');
        return stored ? JSON.parse(stored) : [];
    }

    saveBookingsToStorage() {
        localStorage.setItem('hdmodels_bookings', JSON.stringify(this.bookings));
    }

    generateBookingId() {
        return 'BK' + Date.now().toString(36).toUpperCase();
    }
}

const BookingManager = new BookingManager();

// Booking Page Access Control - Added for user authentication system
function initializeBookingsPage() {
    const user = userAuth.getCurrentUser();
    
    if (!user) {
        // Show login required message, hide content
        document.getElementById('loginRequired').style.display = 'block';
        document.getElementById('bookingsContent').style.display = 'none';
        return;
    }
    
    // User is logged in, show content
    document.getElementById('loginRequired').style.display = 'none';
    document.getElementById('bookingsContent').style.display = 'block';
    
    // Update user info
    document.getElementById('userInfo').textContent = `Welcome back, @${user.instagram}!`;
    
    // Load and display user's booking history
    const userBookings = bookingManager.getUserBookings(user.id);
    
    if (userBookings.length === 0) {
        document.getElementById('noBookingsMessage').style.display = 'block';
        document.getElementById('bookingsList').style.display = 'none';
    } else {
        document.getElementById('noBookingsMessage').style.display = 'none';
        document.getElementById('bookingsList').style.display = 'block';
        renderBookingHistory(userBookings);
    }
}

// Render Booking History - Added for user booking history display
function renderBookingHistory(bookings) {
    const bookingsList = document.getElementById('bookingsList');
    
    bookingsList.innerHTML = bookings.map(booking => `
        <div class="booking-item">
            <div class="booking-header">
                <span class="booking-id">Booking #${booking.id}</span>
                <span class="booking-status status-${booking.status}">${booking.status}</span>
            </div>
            <div class="booking-details">
                <div class="booking-detail">
                    <div class="booking-detail-label">Model Category</div>
                    <div class="booking-detail-value">${booking.modelCategory || 'N/A'}</div>
                </div>
                <div class="booking-detail">
                    <div class="booking-detail-label">Shoot Date</div>
                    <div class="booking-detail-value">${booking.shootDate || 'N/A'}</div>
                </div>
                <div class="booking-detail">
                    <div class="booking-detail-label">Duration</div>
                    <div class="booking-detail-value">${booking.duration || 'N/A'}</div>
                </div>
                <div class="booking-detail">
                    <div class="booking-detail-label">Total Cost</div>
                    <div class="booking-detail-value">${booking.totalCost || 'N/A'}</div>
                </div>
                <div class="booking-detail">
                    <div class="booking-detail-label">Booked On</div>
                    <div class="booking-detail-value">${new Date(booking.createdAt).toLocaleDateString()}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Page Initialization - Added for signup/login form handling
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'signup.html') {
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', handleSignup);
        }
    } else if (currentPage === 'login.html') {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
    } else if (currentPage === 'bookings.html') {
        initializeBookingsPage();
    }
});

// ===== END OF SIGNUP & LOGIN AUTHENTICATION SYSTEM =====