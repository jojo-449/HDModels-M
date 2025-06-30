// HDMODELS Website JavaScript

// WhatsApp Integration
function generateWhatsAppURL(phoneNumber, message) {
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

// Phone number validation
function validateWhatsAppNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/[^0-9]/g, '');
    return cleaned.length >= 10 && cleaned.length <= 15;
}

// Format phone number
function formatPhoneNumber(phoneNumber) {
    let cleaned = phoneNumber.replace(/[^0-9]/g, '');
    if (!cleaned.startsWith('234') && cleaned.length === 11) {
        cleaned = '234' + cleaned.substring(1);
    }
    return cleaned;
}

// Model category navigation
function openCategory(category) {
    // In a real implementation, this would navigate to a model listing page
    alert(`Opening ${category} models category. This would show models in that category.`);
}

// Booking form handling
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
});

function handleBookingSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        clientName: document.getElementById('clientName').value,
        clientWhatsapp: document.getElementById('clientWhatsapp').value,
        instagramHandle: document.getElementById('instagramHandle').value,
        bookingDate: document.getElementById('bookingDate').value,
        bookingTime: document.getElementById('bookingTime').value,
        duration: document.getElementById('duration').value,
        modelCategory: document.getElementById('modelCategory').value,
        shootType: document.getElementById('shootType').value,
        location: document.getElementById('location').value,
        requirements: document.getElementById('requirements').value,
        // Model specifications
        preferredHeight: document.getElementById('preferredHeight')?.value || '',
        preferredSize: document.getElementById('preferredSize')?.value || '',
        preferredBust: document.getElementById('preferredBust')?.value || '',
        preferredWaist: document.getElementById('preferredWaist')?.value || '',
        preferredHips: document.getElementById('preferredHips')?.value || '',
        preferredShoeSize: document.getElementById('preferredShoeSize')?.value || '',
        preferredHairColor: document.getElementById('preferredHairColor')?.value || '',
        preferredAge: document.getElementById('preferredAge')?.value || ''
    };
    
    // Validate required fields
    if (!formData.clientName || !formData.clientWhatsapp || !formData.instagramHandle || 
        !formData.bookingDate || !formData.bookingTime || !formData.duration || 
        !formData.modelCategory || !formData.shootType || !formData.location) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Validate WhatsApp number
    if (!validateWhatsAppNumber(formData.clientWhatsapp)) {
        alert('Please enter a valid WhatsApp number.');
        return;
    }
    
    // Format the booking date and time
    const bookingDateTime = new Date(formData.bookingDate + 'T' + formData.bookingTime);
    const formattedDate = bookingDateTime.toLocaleDateString('en-GB');
    const formattedTime = bookingDateTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
    
    // Calculate estimated price
    const pricing = {
        'basic': { min: 15000, max: 25000 },
        'top': { min: 30000, max: 45000 },
        'featured': { min: 50000, max: 70000 },
        'premium': { min: 75000, max: 100000 }
    };
    
    const categoryPricing = pricing[formData.modelCategory];
    const basePrice = categoryPricing ? categoryPricing.min : 25000;
    const durationMultiplier = parseInt(formData.duration) / 5; // Base is 5 hours
    const estimatedPrice = Math.round(basePrice * durationMultiplier);
    
    // Build model requirements text
    let modelRequirements = '';
    if (formData.preferredHeight || formData.preferredSize || formData.preferredBust || 
        formData.preferredWaist || formData.preferredHips || formData.preferredShoeSize || 
        formData.preferredHairColor || formData.preferredAge) {
        
        modelRequirements = '\n*MODEL SPECIFICATIONS:*\n';
        if (formData.preferredHeight) modelRequirements += `Height: ${formData.preferredHeight}cm\n`;
        if (formData.preferredSize) modelRequirements += `Size: ${formData.preferredSize}\n`;
        if (formData.preferredBust) modelRequirements += `Bust: ${formData.preferredBust} inches\n`;
        if (formData.preferredWaist) modelRequirements += `Waist: ${formData.preferredWaist} inches\n`;
        if (formData.preferredHips) modelRequirements += `Hips: ${formData.preferredHips} inches\n`;
        if (formData.preferredShoeSize) modelRequirements += `Shoe Size: ${formData.preferredShoeSize}\n`;
        if (formData.preferredHairColor) modelRequirements += `Hair Color: ${formData.preferredHairColor}\n`;
        if (formData.preferredAge) modelRequirements += `Age Range: ${formData.preferredAge}\n`;
        modelRequirements += '\n';
    }

    // Create WhatsApp message
    const message = `Hi! I'd like to book a model for a professional shoot.

*BOOKING DETAILS:*
👤 Client: ${formData.clientName}
📱 WhatsApp: +${formatPhoneNumber(formData.clientWhatsapp)}
📸 Instagram: ${formData.instagramHandle}
📅 Date: ${formattedDate}
⏰ Time: ${formattedTime}
⏱️ Duration: ${formData.duration} hours
🎭 Category: ${formData.modelCategory.charAt(0).toUpperCase() + formData.modelCategory.slice(1)} Models
🎬 Shoot Type: ${formData.shootType}
📍 Location: ${formData.location}
💰 Estimated Price: ₦${estimatedPrice.toLocaleString()}
${modelRequirements}${formData.requirements ? `*ADDITIONAL REQUIREMENTS:*\n${formData.requirements}\n\n` : ''}*Please confirm availability and exact pricing.*

Thank you!`;
    
    // Agency WhatsApp number (replace with actual number)
    const agencyWhatsApp = '2349018912194'; // Your WhatsApp number
    
    // Generate WhatsApp URL and open
    const whatsappURL = generateWhatsAppURL(agencyWhatsApp, message);
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Show confirmation
    alert('Booking request sent! You will be redirected to WhatsApp and Instagram to complete your booking.');
    
    // Reset form
    bookingForm.reset();
}

// Model Application Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const modelApplicationForm = document.getElementById('modelApplicationForm');
    
    if (modelApplicationForm) {
        modelApplicationForm.addEventListener('submit', handleModelApplicationSubmit);
    }
});

function handleModelApplicationSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        whatsappNumber: document.getElementById('whatsappNumber').value,
        instagramHandle: document.getElementById('instagramHandle').value || 'Not provided',
        dateOfBirth: document.getElementById('dateOfBirth').value,
        location: document.getElementById('location').value,
        height: document.getElementById('height').value,
        dressSize: document.getElementById('dressSize').value,
        bust: document.getElementById('bust').value,
        waist: document.getElementById('waist').value,
        hips: document.getElementById('hips').value,
        shoeSize: document.getElementById('shoeSize').value,
        hairColor: document.getElementById('hairColor').value,
        eyeColor: document.getElementById('eyeColor').value || 'Not specified',
        experience: document.getElementById('experience').value || 'Not specified',
        portfolioLink: document.getElementById('portfolioLink').value || 'Not provided',
        previousWork: document.getElementById('previousWork').value || 'None provided',
        motivation: document.getElementById('motivation').value || 'Not provided',
        availability: document.getElementById('availability').value
    };
    
    // Get selected shoot types
    const shootTypes = [];
    const shootTypeCheckboxes = document.querySelectorAll('input[name="shootTypes"]:checked');
    shootTypeCheckboxes.forEach(checkbox => {
        shootTypes.push(checkbox.value);
    });
    
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.whatsappNumber || 
        !formData.dateOfBirth || !formData.location || !formData.height || 
        !formData.dressSize || !formData.bust || !formData.waist || 
        !formData.hips || !formData.shoeSize || !formData.hairColor || 
        !formData.availability || shootTypes.length === 0) {
        alert('Please fill in all required fields and select at least one shoot type.');
        return;
    }
    
    // Validate WhatsApp number
    if (!validateWhatsAppNumber(formData.whatsappNumber)) {
        alert('Please enter a valid WhatsApp number.');
        return;
    }
    
    // Calculate age
    const birthDate = new Date(formData.dateOfBirth);
    const age = Math.floor((new Date() - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
    
    // Create application message
    const message = `Hi! I'm interested in joining HDMODELS as a professional model.

*PERSONAL INFORMATION:*
👤 Name: ${formData.fullName}
✉️ Email: ${formData.email}
📱 WhatsApp: +${formatPhoneNumber(formData.whatsappNumber)}
📸 Instagram: ${formData.instagramHandle}
🎂 Age: ${age} years
📍 Location: ${formData.location}

*PHYSICAL MEASUREMENTS:*
📏 Height: ${formData.height}cm
👗 Dress Size: ${formData.dressSize}
📐 Bust: ${formData.bust}" | Waist: ${formData.waist}" | Hips: ${formData.hips}"
👠 Shoe Size: ${formData.shoeSize}
💇 Hair Color: ${formData.hairColor}
👁️ Eye Color: ${formData.eyeColor}

*SHOOTING PREFERENCES:*
🎬 Interested in: ${shootTypes.join(', ')}

*EXPERIENCE & PORTFOLIO:*
🎭 Experience Level: ${formData.experience}
🔗 Portfolio: ${formData.portfolioLink}
📋 Previous Work: ${formData.previousWork}

*AVAILABILITY:*
⏰ ${formData.availability}

*MOTIVATION:*
${formData.motivation}

Looking forward to hearing from you!`;
    
    // Agency WhatsApp number
    const agencyWhatsApp = '2349018912194';
    
    // Send to Gmail instead of WhatsApp for model applications
    sendModelApplicationToGmail({
        name: formData.fullName,
        email: formData.email,
        whatsapp: formatPhoneNumber(formData.whatsappNumber),
        instagram: formData.instagramHandle,
        age: age,
        location: formData.location,
        height: formData.height,
        dressSize: formData.dressSize,
        bust: formData.bust,
        waist: formData.waist,
        hips: formData.hips,
        shoeSize: formData.shoeSize,
        hairColor: formData.hairColor,
        eyeColor: formData.eyeColor,
        shootTypes: shootTypes,
        experience: formData.experience,
        portfolio: formData.portfolioLink,
        previousWork: formData.previousWork,
        availability: formData.availability,
        motivation: formData.motivation
    });
    
    // Reset form
    modelApplicationForm.reset();
}

// Cookie Management
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already made a choice about cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        // Show cookie banner after 2 seconds
        setTimeout(() => {
            document.getElementById('cookieConsent').style.display = 'block';
        }, 2000);
    }
});

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookieConsent').style.display = 'none';
    
    // Initialize analytics or other cookie-dependent services here
    console.log('Cookies accepted - Analytics initialized');
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    document.getElementById('cookieConsent').style.display = 'none';
    
    console.log('Cookies declined - Basic functionality only');
}

// Navigation active state management
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for internal links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Form input animations and validation
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        // Add focus animations
        input.addEventListener('focus', function() {
            this.style.borderColor = '#be185d';
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = 'rgba(190, 24, 93, 0.3)';
            this.style.transform = 'scale(1)';
        });
        
        // Phone number formatting
        if (input.type === 'tel' || input.id === 'clientWhatsapp') {
            input.addEventListener('input', function() {
                let value = this.value.replace(/[^0-9]/g, '');
                
                // Format Nigerian numbers
                if (value.startsWith('0')) {
                    value = '234' + value.substring(1);
                } else if (!value.startsWith('234') && value.length > 10) {
                    value = '234' + value;
                }
                
                this.value = value;
            });
        }
    });
});

// Mobile menu toggle (if needed for responsive design)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Loading animation for external links
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            this.innerHTML = this.innerHTML + ' <span style="font-size: 12px;">↗</span>';
        });
    });
});

// Auto-fill today's date as minimum booking date
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});

// Price calculator
function calculatePrice(category, duration) {
    const pricing = {
        'basic': { min: 15000, max: 25000 },
        'top': { min: 30000, max: 45000 },
        'featured': { min: 50000, max: 70000 },
        'premium': { min: 75000, max: 100000 }
    };
    
    const categoryPricing = pricing[category];
    if (!categoryPricing) return 0;
    
    const basePrice = categoryPricing.min;
    const durationMultiplier = duration / 5; // Base is 5 hours
    return Math.round(basePrice * durationMultiplier);
}

// Real-time price update
document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('modelCategory');
    const durationSelect = document.getElementById('duration');
    
    function updatePrice() {
        if (categorySelect && durationSelect && categorySelect.value && durationSelect.value) {
            const price = calculatePrice(categorySelect.value, parseInt(durationSelect.value));
            
            // Find or create price display element
            let priceDisplay = document.getElementById('priceDisplay');
            if (!priceDisplay) {
                priceDisplay = document.createElement('div');
                priceDisplay.id = 'priceDisplay';
                priceDisplay.style.cssText = `
                    background: rgba(190, 24, 93, 0.1);
                    border: 2px solid #be185d;
                    border-radius: 12px;
                    padding: 16px;
                    margin: 16px 0;
                    text-align: center;
                    font-weight: bold;
                    color: #be185d;
                `;
                
                // Insert after duration select
                durationSelect.closest('.form-group').after(priceDisplay);
            }
            
            priceDisplay.innerHTML = `
                <span style="font-size: 14px;">Estimated Price:</span><br>
                <span style="font-size: 24px;">₦${price.toLocaleString()}</span>
                <br><span style="font-size: 12px;">for ${durationSelect.value} hours</span>
            `;
        }
    }
    
    if (categorySelect && durationSelect) {
        categorySelect.addEventListener('change', updatePrice);
        durationSelect.addEventListener('change', updatePrice);
    }
});

// ===== NEW FUNCTIONALITY =====

// Model Application Email Service
function sendModelApplicationToGmail(applicationData) {
    const submitBtn = document.querySelector('#modelApplicationForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending Application...';
    submitBtn.disabled = true;

    fetch('http://localhost:3001/api/model-application', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Application submitted successfully! The agency will review your application and contact you via email or WhatsApp within 24-48 hours.');
        } else {
            throw new Error(data.message || 'Failed to submit application');
        }
    })
    .catch(error => {
        console.error('Error submitting application:', error);
        alert('There was an error submitting your application. Please try again or contact us directly at +2349018912194.');
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// User Authentication System
class UserAuth {
    constructor() {
        this.currentUser = this.loadUserFromStorage();
    }

    login(whatsappNumber, businessInstagram) {
        const user = {
            whatsapp: formatPhoneNumber(whatsappNumber),
            businessInstagram: businessInstagram,
            loginTime: new Date().toISOString(),
            id: this.generateUserId(whatsappNumber)
        };
        
        localStorage.setItem('hdmodels_user', JSON.stringify(user));
        this.currentUser = user;
        return user;
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

    generateUserId(whatsappNumber) {
        return btoa(whatsappNumber).replace(/[^a-zA-Z0-9]/g, '').substring(0, 8);
    }
}

const userAuth = new UserAuth();

// Login Form Handler
function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const whatsappNumber = formData.get('loginWhatsapp');
    const businessInstagram = formData.get('businessInstagram');
    
    if (!whatsappNumber || !businessInstagram) {
        alert('Please fill in all required fields.');
        return;
    }
    
    if (!validateWhatsAppNumber(whatsappNumber)) {
        alert('Please enter a valid WhatsApp number.');
        return;
    }
    
    const user = userAuth.login(whatsappNumber, businessInstagram);
    alert(`Welcome! You are now logged in.`);
    
    window.location.href = 'booking-history.html';
}

// Booking Management System
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

const bookingManager = new BookingManager();

// MANUAL MODEL DATA - INPUT YOUR MODELS HERE
const modelGalleryData = {
    basic: [
        // ADD YOUR BASIC MODELS HERE - EXAMPLE:
        {
            id: 'basic_1',
            name: 'Sophia Grace',
            image: 'path/to/sophia-main.jpg', // Replace with your model's main image
            additionalImages: [
                'path/to/sophia-2.jpg', // Replace with additional images/videos
                'path/to/sophia-3.jpg',
                'path/to/sophia-4.jpg',
                'path/to/sophia-video.mp4'
            ],
            height: '165cm',
            size: 'S',
            bust: '32"',
            waist: '24"',
            hips: '34"',
            shoeSize: '7',
            hairColor: 'Brown',
            eyeColor: 'Hazel',
            about: 'Professional model with 2 years experience in fashion and beauty shoots.',
            shootTypes: ['Fashion', 'Beauty', 'Skincare'],
            price: '₦50,000 - ₦75,000',
            availability: 'Monday - Friday: 9AM - 6PM'
        }
        // ADD MORE MODELS BY COPYING THE STRUCTURE ABOVE
    ],
    top: [
        // ADD YOUR TOP MODELS HERE - EXAMPLE:
        {
            id: 'top_1',
            name: 'Isabella Rose',
            image: 'path/to/isabella-main.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
            height: '168cm',
            size: 'S',
            bust: '34"',
            waist: '25"',
            hips: '35"',
            shoeSize: '8',
            hairColor: 'Blonde',
            eyeColor: 'Blue',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen'],
            price: '₦100,000 - ₦150,000',
            availability: 'Monday - Saturday: 10AM - 8PM'
        }
        // ADD MORE MODELS HERE
    ],
    premium: [
        // ADD YOUR PREMIUM MODELS HERE - EXAMPLE:
        {
            id: 'premium_1',
            name: 'Victoria Elegant',
            image: 'path/to/victoria-main.jpg',
            additionalImages: [
                'path/to/victoria-2.jpg',
                'path/to/victoria-3.jpg',
                'path/to/victoria-4.jpg',
                'path/to/victoria-video.mp4'
            ],
            height: '170cm',
            size: 'XS',
            bust: '34"',
            waist: '24"',
            hips: '35"',
            shoeSize: '8',
            hairColor: 'Black',
            eyeColor: 'Brown',
            about: 'Premium model specializing in luxury brand campaigns and high-end fashion.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Lingerie', 'Video Vixen'],
            price: '₦200,000 - ₦300,000',
            availability: 'Monday - Saturday: 11AM - 9PM'
        }
        // ADD MORE MODELS HERE
    ],
    elite: [
        // ADD YOUR ELITE MODELS HERE - EXAMPLE:
        {
            id: 'elite_1',
            name: 'Anastasia Divine',
            image: 'path/to/anastasia-main.jpg',
            additionalImages: [
                'path/to/anastasia-2.jpg',
                'path/to/anastasia-3.jpg',
                'path/to/anastasia-4.jpg',
                'path/to/anastasia-video.mp4'
            ],
            height: '175cm',
            size: 'XS',
            bust: '34"',
            waist: '23"',
            hips: '34"',
            shoeSize: '8',
            hairColor: 'Auburn',
            eyeColor: 'Green',
            about: 'Elite supermodel with international campaign experience and runway expertise.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Lingerie', 'Video Vixen'],
            price: '₦500,000 - ₦1,000,000',
            availability: 'By Appointment: 12PM - 10PM'
        }
        // ADD MORE MODELS HERE
    ]
};

// Model Gallery Functions
function initializeModelGallery() {
    const currentPage = window.location.pathname.split('/').pop();
    let category = '';
    
    if (currentPage.includes('basic-model')) category = 'basic';
    else if (currentPage.includes('top-model')) category = 'top';
    else if (currentPage.includes('premium-model')) category = 'premium';
    else if (currentPage.includes('elite-model')) category = 'elite';
    
    if (category) {
        renderModelGallery(category);
    }
}

function renderModelGallery(category) {
    const galleryContainer = document.getElementById(`${category}ModelGallery`);
    if (!galleryContainer) return;
    
    const models = modelGalleryData[category];
    
    galleryContainer.innerHTML = models.map(model => `
        <div class="model-card" onclick="openModelModal('${model.id}', '${category}')">
            <img src="${model.image}" alt="${model.name}" class="model-image">
            <div class="model-info">
                <div class="model-name">${model.name}</div>
                <div class="model-quick-info">${model.height} • ${model.size} • ${model.hairColor}</div>
                <div class="model-price">${model.price}</div>
            </div>
        </div>
    `).join('');
}

function openModelModal(modelId, category) {
    const model = modelGalleryData[category].find(m => m.id === modelId);
    if (!model) return;
    
    // Create enhanced modal with booking form
    const modalHTML = `
        <div id="enhancedModelModal" class="modal-overlay" onclick="closeEnhancedModal(event)">
            <div class="enhanced-modal-content" onclick="event.stopPropagation()">
                <span class="close-modal" onclick="closeEnhancedModal()">&times;</span>
                
                <!-- Model Images Section -->
                <div class="model-images-section">
                    <div class="main-image">
                        <img src="${model.image}" alt="${model.name}" id="mainModelImage">
                    </div>
                    <div class="additional-images">
                        ${model.additionalImages ? model.additionalImages.map((img, index) => `
                            <img src="${img}" alt="${model.name} ${index + 2}" onclick="changeMainImage('${img}')" class="thumb-image">
                        `).join('') : '<p>No additional images available</p>'}
                    </div>
                </div>
                
                <!-- Model Details Section -->
                <div class="model-details-section">
                    <h2>${model.name}</h2>
                    <div class="model-measurements">
                        <div class="measurement-row">
                            <span>Height:</span> <span>${model.height}</span>
                        </div>
                        <div class="measurement-row">
                            <span>Size:</span> <span>${model.size}</span>
                        </div>
                        <div class="measurement-row">
                            <span>Bust:</span> <span>${model.bust}</span>
                        </div>
                        <div class="measurement-row">
                            <span>Waist:</span> <span>${model.waist}</span>
                        </div>
                        <div class="measurement-row">
                            <span>Hips:</span> <span>${model.hips}</span>
                        </div>
                        <div class="measurement-row">
                            <span>Shoe Size:</span> <span>${model.shoeSize}</span>
                        </div>
                        <div class="measurement-row">
                            <span>Hair Color:</span> <span>${model.hairColor}</span>
                        </div>
                        <div class="measurement-row">
                            <span>Eye Color:</span> <span>${model.eyeColor}</span>
                        </div>
                    </div>
                    
                    <div class="model-about">
                        <h4>About ${model.name}</h4>
                        <p>${model.about}</p>
                    </div>
                    
                    <div class="model-availability">
                        <h4>Availability</h4>
                        <p>${model.availability}</p>
                    </div>
                    
                    <div class="model-pricing">
                        <h4>Pricing</h4>
                        <p>${model.price}</p>
                    </div>
                </div>
                
                <!-- Booking Form Section -->
                <div class="booking-form-section">
                    <h3>Book ${model.name}</h3>
                    
                    <!-- Shoot Type Selection -->
                    <div class="shoot-types-selection">
                        <h4>Select Shoot Type(s)</h4>
                        ${model.shootTypes.map(type => `
                            <div class="shoot-type-item">
                                <label>
                                    <input type="checkbox" name="shootType" value="${type}"> ${type}
                                </label>
                                <button type="button" class="expand-requirements" onclick="toggleRequirements('${type.toLowerCase()}')">
                                    ▼ Add Specific Requirements
                                </button>
                                <div id="${type.toLowerCase()}-requirements" class="requirements-box" style="display: none;">
                                    <textarea placeholder="Add specific requirements for ${type} shoot..."></textarea>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- Date and Time -->
                    <div class="datetime-section">
                        <div class="input-group">
                            <label>Preferred Date</label>
                            <input type="date" id="bookingDate" required>
                        </div>
                        <div class="input-group">
                            <label>Preferred Time</label>
                            <input type="time" id="bookingTime" required>
                        </div>
                        <div class="input-group">
                            <label>Duration (hours)</label>
                            <select id="bookingDuration">
                                <option value="2">2 hours</option>
                                <option value="4">4 hours</option>
                                <option value="6">6 hours</option>
                                <option value="8">8 hours (Full Day)</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Model Requirements -->
                    <div class="model-requirements">
                        <label>Additional Requirements for Model</label>
                        <textarea id="modelRequirements" placeholder="Specify any special requirements, wardrobe, makeup style, etc."></textarea>
                    </div>
                    
                    <!-- Booking Buttons -->
                    <div class="booking-buttons">
                        <button type="button" class="book-whatsapp" onclick="bookViaWhatsApp('${model.id}', '${category}')">
                            📱 Book via WhatsApp
                        </button>
                        <button type="button" class="book-instagram" onclick="bookViaInstagram('${model.id}', '${category}')">
                            📷 Book via Instagram
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('enhancedModelModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add new modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    window.currentModelForBooking = model;
}

// Enhanced Modal Functions
function closeEnhancedModal(event) {
    if (event && event.target !== event.currentTarget) return;
    const modal = document.getElementById('enhancedModelModal');
    if (modal) {
        modal.remove();
    }
}

function changeMainImage(imageSrc) {
    document.getElementById('mainModelImage').src = imageSrc;
}

function toggleRequirements(shootType) {
    const requirementsBox = document.getElementById(`${shootType}-requirements`);
    const button = event.target;
    
    if (requirementsBox.style.display === 'none') {
        requirementsBox.style.display = 'block';
        button.textContent = '▲ Hide Requirements';
    } else {
        requirementsBox.style.display = 'none';
        button.textContent = '▼ Add Specific Requirements';
    }
}

function bookViaWhatsApp(modelId, category) {
    const model = window.currentModelForBooking;
    const selectedShootTypes = Array.from(document.querySelectorAll('input[name="shootType"]:checked')).map(cb => cb.value);
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;
    const duration = document.getElementById('bookingDuration').value;
    const requirements = document.getElementById('modelRequirements').value;
    
    // Collect specific requirements for each shoot type
    let specificRequirements = '';
    selectedShootTypes.forEach(type => {
        const reqBox = document.getElementById(`${type.toLowerCase()}-requirements`);
        if (reqBox && reqBox.style.display === 'block') {
            const reqText = reqBox.querySelector('textarea').value;
            if (reqText) {
                specificRequirements += `\n${type} Requirements: ${reqText}`;
            }
        }
    });
    
    const bookingMessage = generateBookingMessage({
        modelName: model.name,
        modelCategory: category,
        shootTypes: selectedShootTypes.join(', '),
        date: date,
        time: time,
        duration: duration + ' hours',
        requirements: requirements,
        specificRequirements: specificRequirements,
        clientName: userAuth.getCurrentUser()?.name || 'Client'
    });
    
    const whatsappUrl = generateWhatsAppUrl('+2349018912194', bookingMessage);
    window.open(whatsappUrl, '_blank');
    
    // Save booking to history
    bookingManager.addBooking({
        modelName: model.name,
        modelCategory: category,
        shootTypes: selectedShootTypes,
        shootDate: date,
        shootTime: time,
        duration: duration + ' hours',
        requirements: requirements,
        specificRequirements: specificRequirements,
        platform: 'WhatsApp'
    });
    
    closeEnhancedModal();
}

function bookViaInstagram(modelId, category) {
    const model = window.currentModelForBooking;
    const selectedShootTypes = Array.from(document.querySelectorAll('input[name="shootType"]:checked')).map(cb => cb.value);
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;
    const duration = document.getElementById('bookingDuration').value;
    const requirements = document.getElementById('modelRequirements').value;
    
    // Collect specific requirements for each shoot type
    let specificRequirements = '';
    selectedShootTypes.forEach(type => {
        const reqBox = document.getElementById(`${type.toLowerCase()}-requirements`);
        if (reqBox && reqBox.style.display === 'block') {
            const reqText = reqBox.querySelector('textarea').value;
            if (reqText) {
                specificRequirements += `\n${type} Requirements: ${reqText}`;
            }
        }
    });
    
    const bookingDetails = `Model Booking Request:
Model: ${model.name} (${category})
Shoot Types: ${selectedShootTypes.join(', ')}
Date: ${date}
Time: ${time}
Duration: ${duration} hours
Requirements: ${requirements}${specificRequirements}
Client: ${userAuth.getCurrentUser()?.name || 'Client'}`;
    
    // Copy to clipboard and redirect to Instagram
    navigator.clipboard.writeText(bookingDetails).then(() => {
        alert('Booking details copied to clipboard! You will now be redirected to Instagram to send the message.');
        const user = userAuth.getCurrentUser();
        const instagramHandle = user?.businessInstagram || 'hdmodelsagency';
        window.open(`https://www.instagram.com/${instagramHandle.replace('@', '')}/`, '_blank');
    }).catch(() => {
        alert('Please copy this booking information and send it via Instagram DM:\n\n' + bookingDetails);
        const user = userAuth.getCurrentUser();
        const instagramHandle = user?.businessInstagram || 'hdmodelsagency';
        window.open(`https://www.instagram.com/${instagramHandle.replace('@', '')}/`, '_blank');
    });
    
    // Save booking to history
    bookingManager.addBooking({
        modelName: model.name,
        modelCategory: category,
        shootTypes: selectedShootTypes,
        shootDate: date,
        shootTime: time,
        duration: duration + ' hours',
        requirements: requirements,
        specificRequirements: specificRequirements,
        platform: 'Instagram'
    });
    
    closeEnhancedModal();
}

// Booking History Functions
function initializeBookingHistory() {
    const user = userAuth.getCurrentUser();
    
    if (!user) {
        document.getElementById('loginRequired').style.display = 'block';
        document.getElementById('noBookingsMessage').style.display = 'none';
        document.getElementById('bookingsList').style.display = 'none';
        return;
    }
    
    document.getElementById('userInfo').textContent = `Welcome back, ${user.name}!`;
    
    const userBookings = bookingManager.getUserBookings(user.id);
    
    if (userBookings.length === 0) {
        document.getElementById('noBookingsMessage').style.display = 'flex';
        document.getElementById('bookingsList').style.display = 'none';
        document.getElementById('loginRequired').style.display = 'none';
    } else {
        document.getElementById('noBookingsMessage').style.display = 'none';
        document.getElementById('loginRequired').style.display = 'none';
        document.getElementById('bookingsList').style.display = 'block';
        renderBookingHistory(userBookings);
    }
}

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

// Enhanced Booking Form Handler
function enhanceBookingForm() {
    const selectedModel = localStorage.getItem('selectedModel');
    if (selectedModel) {
        const model = JSON.parse(selectedModel);
        const modelCategorySelect = document.getElementById('modelCategory');
        if (modelCategorySelect) {
            if (model.id.includes('basic')) modelCategorySelect.value = 'basic';
            else if (model.id.includes('top')) modelCategorySelect.value = 'top';
            else if (model.id.includes('premium')) modelCategorySelect.value = 'premium';
            else if (model.id.includes('elite')) modelCategorySelect.value = 'elite';
        }
        localStorage.removeItem('selectedModel');
    }
}

// Page Initialization
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'login.html') {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
    } else if (currentPage === 'booking-history.html') {
        initializeBookingHistory();
    } else if (currentPage.includes('model.html')) {
        initializeModelGallery();
    } else if (currentPage === 'bookings.html') {
        enhanceBookingForm();
    }
});

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modelDetailsModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModelModal();
            }
        });
    }
});