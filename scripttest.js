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
    
    // Get form data - REMOVED shootType reference
    const formData = {
        clientName: document.getElementById('clientName').value,
        clientWhatsapp: document.getElementById('clientWhatsapp').value,
        instagramHandle: document.getElementById('instagramHandle').value,
        bookingDate: document.getElementById('bookingDate').value,
        bookingTime: document.getElementById('bookingTime').value,
        duration: document.getElementById('duration').value,
        modelCategory: document.getElementById('modelCategory').value,
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
    
    // Validate required fields - REMOVED shootType validation
    if (!formData.clientName || !formData.clientWhatsapp || !formData.instagramHandle || 
        !formData.bookingDate || !formData.bookingTime || !formData.duration || 
        !formData.modelCategory || !formData.location) {
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

    // Create WhatsApp message - REMOVED shootType reference
    const message = `Hi! I'd like to book a model for a professional shoot.

*BOOKING DETAILS:*
👤 Client: ${formData.clientName}
📱 WhatsApp: +${formatPhoneNumber(formData.clientWhatsapp)}
📸 Instagram: ${formData.instagramHandle}
📅 Date: ${formattedDate}
⏰ Time: ${formattedTime}
⏱️ Duration: ${formData.duration} hours
🎭 Category: ${formData.modelCategory.charAt(0).toUpperCase() + formData.modelCategory.slice(1)} Models
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
    alert('Booking request sent! You will be redirected to WhatsApp to complete your booking.');
    
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
        Age: document.getElementById('Age').value,
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
    
    // Validate required fields - REMOVED shootTypes validation
    if (!formData.fullName || !formData.email || !formData.whatsappNumber || 
        !formData.dateOfBirth || !formData.location || !formData.height || 
        !formData.dressSize || !formData.bust || !formData.waist || 
        !formData.hips || !formData.shoeSize || !formData.hairColor || 
        !formData.availability) {
        alert('Please fill in all required fields.');
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
        age: formData.Age,
        location: formData.location,
        height: formData.height,
        dressSize: formData.dressSize,
        bust: formData.bust,
        waist: formData.waist,
        hips: formData.hips,
        shoeSize: formData.shoeSize,
        hairColor: formData.hairColor,
        eyeColor: formData.eyeColor,

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
            const cookieConsentElement = document.getElementById('cookieConsent');
            if (cookieConsentElement) {
                cookieConsentElement.style.display = 'block';
            }
        }, 2000);
    }
});

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    const cookieConsentElement = document.getElementById('cookieConsent');
    if (cookieConsentElement) {
        cookieConsentElement.style.display = 'none';
    }
    
    // Initialize analytics or other cookie-dependent services here
    console.log('Cookies accepted - Analytics initialized');
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    const cookieConsentElement = document.getElementById('cookieConsent');
    if (cookieConsentElement) {
        cookieConsentElement.style.display = 'none';
    }
    
    console.log('Cookies declined - Basic functionality only');
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
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

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Gmail integration for model applications
function sendModelApplicationToGmail(applicationData) {
    const subject = `New Model Application - ${applicationData.name}`;
    const body = `
Dear HDMODELS Team,

A new model application has been submitted:

PERSONAL INFORMATION:
Name: ${applicationData.name}
Email: ${applicationData.email}
WhatsApp: +${applicationData.whatsapp}
Instagram: ${applicationData.instagram}
Age: ${applicationData.age} years
Location: ${applicationData.location}

PHYSICAL MEASUREMENTS:
Height: ${applicationData.height}cm
Dress Size: ${applicationData.dressSize}
Bust: ${applicationData.bust}" | Waist: ${applicationData.waist}" | Hips: ${applicationData.hips}"
Shoe Size: ${applicationData.shoeSize}
Hair Color: ${applicationData.hairColor}
Eye Color: ${applicationData.eyeColor}

EXPERIENCE & PORTFOLIO:
Experience Level: ${applicationData.experience}
Portfolio: ${applicationData.portfolio}
Previous Work: ${applicationData.previousWork}

AVAILABILITY:
${applicationData.availability}

MOTIVATION:
${applicationData.motivation}

Please review this application and contact the applicant if interested.

Best regards,
HDMODELS Website Application System
    `;
    
    const gmailURL = `mailto:Mebudemariam1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open default email client
    window.location.href = gmailURL;
    
    // Show confirmation
    alert('Application submitted! Your default email client will open to send the application. Please send the email to complete your application.');
}

// Image lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Model search functionality
function searchModels(query) {
    // Placeholder function for model search
    console.log(`Searching for models with query: ${query}`);
    alert(`Search functionality would filter models based on: ${query}`);
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Instagram handle validation
function validateInstagramHandle(handle) {
    const instagramRegex = /^@?[A-Za-z0-9._]{1,30}$/;
    return instagramRegex.test(handle);
}

// Price calculation function
function calculateEstimatedPrice(category, duration, location = 'standard') {
    const pricing = {
        'basic': { min: 15000, max: 25000 },
        'top': { min: 30000, max: 45000 },
        'featured': { min: 50000, max: 70000 },
        'premium': { min: 75000, max: 100000 }
    };
    
    const categoryPricing = pricing[category] || pricing['basic'];
    const basePrice = categoryPricing.min;
    const durationMultiplier = parseFloat(duration) / 5; // Base is 5 hours
    const locationMultiplier = location === 'premium' ? 1.3 : 1;
    
    return Math.round(basePrice * durationMultiplier * locationMultiplier);
}

// Social media sharing
function shareOnSocialMedia(platform, url, text) {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);
    let shareUrl = '';
    
    switch(platform) {
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            break;
        case 'instagram':
            // Instagram doesn't have direct URL sharing, so copy to clipboard
            navigator.clipboard.writeText(`${text} ${url}`);
            alert('Link copied to clipboard! You can now paste it on Instagram.');
            return;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank');
    }
}

// Event tracking
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    console.log(`Event tracked: ${eventName}`, eventData);
}

// Newsletter subscription
function subscribeToNewsletter(email) {
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // Placeholder for newsletter subscription
    console.log(`Newsletter subscription for: ${email}`);
    alert('Thank you for subscribing to our newsletter!');
    return true;
}

// Contact form handler
function handleContactForm(formData) {
    const { name, email, subject, message } = formData;
    
    if (!name || !email || !subject || !message) {
        alert('Please fill in all required fields.');
        return false;
    }
    
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // Create mailto link
    const mailtoLink = `mailto:Mebudemariam1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    window.location.href = mailtoLink;
    alert('Your default email client will open to send your message.');
    
    return true;
}

// Currency formatting
function formatCurrency(amount, currency = 'NGN') {
    const formatter = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0
    });
    
    return formatter.format(amount);
}

// Date formatting
function formatDate(date, options = {}) {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    const formatOptions = { ...defaultOptions, ...options };
    
    return new Intl.DateTimeFormat('en-GB', formatOptions).format(new Date(date));
}

// Initialize UI components
function initializeUI() {
    console.log('UI components initialized');
    
    // Initialize any additional UI components here
    trackEvent('ui_initialized');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeUI();
});