// HDMODELS Website JavaScript



// Ensure userAuth is defined, especially if auth.js might not always load or is conditional.
// This simplified version will allow booking history to check for a user.
if (typeof userAuth === 'undefined') {
    window.userAuth = {
        getCurrentUser: function() {
            // Retrieve current user from localStorage.
            // Adjust the key 'currentUser' if your actual auth.js uses a different one.
            const userString = localStorage.getItem('currentUser') || localStorage.getItem('currentUser ');
            try {
                return userString ? JSON.parse(userString) : null;
            } catch (e) {
                console.error("Error parsing user from localStorage:", e);
                return null;
            }
        },
        // You can add other placeholder methods if needed elsewhere, e.g.,
        // login: function() { console.warn("Login function not available without full auth.js"); },
        // logout: function() { console.warn("Logout function not available without full auth.js"); }
    };
}







// WhatsApp Integration
function generateWhatsAppURL(phoneNumber, message) {
    const cleaned = String(phoneNumber).replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(message || '');
    return `https://wa.me/${cleaned}?text=${encoded}`;
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
        'elite': { min: 50000, max: 70000 },
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
${modelRequirements}${formData.requirements ? `*ADDITIONAL REQUIREMENTS:*\n${formData.requirements}\n\n` : ''}

Thank you!`;
    
    // Agency WhatsApp number (replace with actual number)
    const agencyWhatsApp = '2348146518310'; // Your WhatsApp number
    
    // Generate WhatsApp URL and open
    const whatsappURL = generateWhatsAppURL('2348146518310', message);
    
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
        // availability: document.getElementById('availability').value
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
        !formData.hips || !formData.shoeSize || !formData.hairColor       ) {
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
    const agencyWhatsApp = '2348146518310';
    
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
        // availability: formData.availability,
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
        'elite': { min: 50000, max: 70000 },
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
        alert('There was an error submitting your application. Please try again or contact us directly at +2348146518310.');
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
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
            
            createdAt: new Date().toISOString(),
            userId: userAuth.getCurrentUser()?.id
        };
        
        this.bookings.push(booking);
        this.saveBookingsToStorage();
        return booking;
    }

    getUserBookings(userId) {
        return this.bookings.filter(booking => booking.userId === userId)
        .reverse();
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

document.addEventListener('DOMContentLoaded', initializeModelGallery);

// MANUAL MODEL DATA - INPUT YOUR MODELS HERE
const modelGalleryData = {
    basic: [
        // // ADD YOUR BASIC MODELS HERE - EXAMPLE:
        // {
        //     // id: 'basic_1',
        //     // name: 'Sophia Grace',
        //     // image: 'path/to/sophia-main.jpg', // Replace with your model's main image
        //     // additionalImages: [
        //     //     'path/to/sophia-2.jpg', // Replace with additional images/videos
        //     //     'path/to/sophia-3.jpg',
        //     //     'path/to/sophia-4.jpg',
        //     //     'path/to/sophia-video.mp4'
        //     // ],
        //     // height: '165cm',
        //     // size: 'S',
        //     // bust: '32"',
        //     // waist: '24"',
        //     // hips: '34"',
        //     // shoeSize: '7',
        //     // hairColor: 'Brown',
        //     // eyeColor: 'Hazel',
        //     // about: 'Professional model with 2 years experience in fashion and beauty shoots.',
        //     // shootTypes: ['Fashion', 'Beauty', 'Skincare'],
            
            
        // }
        // ADD MORE MODELS BY COPYING THE STRUCTURE ABOVE
    ],
    top: [
        // ADD YOUR TOP MODELS HERE - EXAMPLE:
        

 {
            id: 'top_1',
            name: 'Fehilah',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.05_27012135.jpg',
            additionalImages: [
                'top models/WhatsApp Image 2025-09-15 at 22.23.01_ee3b4ffe.jpg',
                // 'path/to/isabella-3.jpg',
                // 'path/to/isabella-4.jpg',
                // 'path/to/isabella-video.mp4'
            ],
            height: '5^3',
            size: 'uk-size 6/8',
            bust: '32"',
            waist: '26"',
            hips: '39"',
            shoeSize: '39/40',
            hairColor: 'ginger-natural',
            eyeColor: 'dark-brown',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen','Brand'],
            // availability: 'Monday - Saturday: 10AM - 8PM'
        },

         {
            id: 'top_2',
            name: 'Gold',
            image: 'top models/IMG_0721.JPG',
            additionalImages: [
                
                'top models/IMG_0723.JPG',
                // 'path/to/isabella-4.jpg',
                // 'path/to/isabella-video.mp4'
            ],
            height: '5^10',
            size: '10/12',
            bust: '40"',
            waist: '36"',
            hips: '46"',
            shoeSize: '43',
            hairColor: 'color-2(relaxed)',
            eyeColor: 'brown',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen','Brand'],
            // availability: 'Monday - Saturday: 10AM - 8PM'
        },
        
 {
            id: 'top_3',
            name: 'Princess',
            image: 'top models/_OLA3402.JPG',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
            height: '5*6',
            size: '6/8',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '37/38',
            hairColor: 'Black(Natural)',
            eyeColor: 'Brown',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
           
        },

        {
             id: 'top_4',
         name: 'Funmibi',
            image: 'top models/WhatsApp Image 2025-09-15 at 22.22.58_13f510f3.jpg',
            additionalImages: [
                'top models/WhatsApp Image 2025-09-15 at 22.22.57_38ca0dd5.jpg',
                'top models/WhatsApp Image 2025-09-15 at 22.22.57_214a72ed.jpg',
               
            ],
             height:'5*4"',
             size: 'uk-8"',
           bust:'35"',
           waist:'29"',
           hips:'39"',
           shoeSize:'38',
           hairColor: 'Black(relaxed)',
           eyeColor: 'Black', 
           about: 'My name is funmibi, I’m a student and a face model.  I’m very passionate about modeling and how to even becoming more better in the career, and with the help of HDMODELS I’ve been able to work and also learn to perfect my skills',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Brand', 'Video Vixen'],
           
            
        },

        {
            id: 'top_5',
            name: 'Christine',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.06_1d3d794e.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
             height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
          
        },

        {
            id: 'top_6',
            name: 'Benny',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.06_70cfdd0a.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
            height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
           
        },

        {
            id: 'top_7',
            name: 'Everly',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.06_c81bf50a.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
            height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Skin-care'],
           
        },

        {
            id: 'top_8',
            name: 'Elizabeth',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.06_dd98867c.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
             height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
            
        },

        {
            id: 'top_9',
            name: 'Chinaza',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.07_2ae17b7d.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
             height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
          
        },

         {
            id: 'top_10',
            name: 'Rolex',
            image: 'top models/WhatsApp Image 2025-09-16 at 00.57.57_4a4ded19.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
            height: '5*6',
            size: '12',
            bust: '40',
            waist: '33"',
            hips: '42"',
            shoeSize: '39',
            hairColor: 'Black(relaxed)',
            eyeColor: 'chestnut brown',
            about: 'My name is Goodness but most people call me Rolex I’m a student and an entrepreneur started out as a freelance model for 2 years and joined an agency in my third year and this is my fourth year as a face model ,I love transitions,I love the camera,I love posing I want to be one of the best face models in Nigeria 🇳🇬',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
            
        },

         {
            id: 'top_11',
            name: 'Dominion',
            image: 'top models/IMG_2306.JPG',
            additionalImages: [
                'top models/IMG_2307.JPG',
                // 'path/to/isabella-3.jpg',
                // 'path/to/isabella-4.jpg',
                // 'path/to/isabella-video.mp4'
            ],
            height: '5^5',
            size: '10',
            bust: '36"',
            waist: '30"',
            hips: '40"',
            shoeSize: 'small 40',
            hairColor: 'Black',
            eyeColor: 'Black(Natural)',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.Been modelling for monts now and it has been going well!.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
           
        },

        {
            id: 'top_31',
            name: 'Florence',
            image: 'top models/WhatsApp Image 2025-09-16 at 00.57.57_fd02d33b.jp',
            additionalImages: [
                'top models/WhatsApp Image 2025-09-16 at 00.57.57_7fba98d6.jpg',
                // 'path/to/isabella-3.jpg',
                // 'path/to/isabella-4.jpg',
                // 'path/to/isabella-video.mp4'
            ],
            height: '5^4',
            size: '10',
            bust: '37"',
            waist: '35"',
            hips: '42"',
            shoeSize: '41',
            hairColor: 'Black(Natural)',
            eyeColor: 'Dark Brown',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
            
        },

        {
            id: 'top_12',
            name: 'Promise',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.07_aded66e6.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
            height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
           
        },

        {
            id: 'top_13',
            name: 'Favour',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.08_6d330f70.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
             height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
         
        },

        {
            id: 'top_14',
            name: 'Clare',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.08_59a231d9.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
            height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
           
        },

         {
           id: 'top_15',
            name: 'Blessing',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.08_823ae6ed.jpg',
            additionalImages: [
                'top models/WhatsApp Image 2025-09-15 at 22.22.59_47134015.jpg',
                'top models/WhatsApp Image 2025-09-15 at 22.22.59_675d8bb4.jpg',
                
            ],
             height:'5*7"',
             size: 'uk-6/8"',
           bust:'32"',
           waist:'27"',
           hips:'36"',
          hairColor: 'Black(relaxed)',
           shoeSize:'37-38"',
           eyeColor: 'Brown', 
           about: 'BLESSING ADAEZE MICEAL>>AE:20>>NATIONALITY:NIERIA>>SATE OF ORIIN:ABIA STATE>>I have worked on commercial,print and event campaigns for several brands,i enjoy working with brands that',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Brand', 'Video Vixen'],
            
            
        },

        {
            id: 'top_16',
            name: 'Ebube',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.08_c7dc07ec.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
            height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
           
        },

        {
            id: 'top_17',
            name: 'Tofunmi',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.09_4517eacd.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
            height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
            
        },

        {
            id: 'top_18',
            name: 'Frank',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.09_73123808.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
             height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
           
        },

        {
            id: 'top_19',
            name: 'Olayinka',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.09_aebae7b9.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
             height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
           
        },

        {
            id: 'top_20',
            name: 'Adedayo',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.10_6a5f23b4.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
             height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
           
        },

        {
            id: 'top_21',
            name: 'Joan',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.10_0635faa7.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
            height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
           
        },

        {
            id: 'top_22',
            name: 'Fave',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.10_4221800f.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
             height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
           
        },

        {
            id: 'top_23',
            name: 'Hope',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.10_f071227b.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
            height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
          
        },

        {
            id: 'top_24',
            name: 'Lauretta',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.11_7dc3ae49.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
             height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
        
        },

        {
            id: 'top_25',
            name: 'Victoria',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.11_63eea47c.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
             height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
            
        },

        {
            id: 'top_26',
            name: 'Samantha',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.11_b74fe721.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
            height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
         
        },

        {
            id: 'top_27',
            name: 'Gbemi',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.11_bf220ff3.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
             height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
            
        },

        {
            id: 'top_28',
            name: 'Choice',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.12_1efacad7.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
            height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
            
        }, 

       {
            id: 'top_29',
            name: 'Alex',
            image: 'top models/WhatsApp Image 2025-06-13 at 22.22.12_a64cdbcb.jpg',
            additionalImages: [
                'path/to/isabella-2.jpg',
                'path/to/isabella-3.jpg',
                'path/to/isabella-4.jpg',
                'path/to/isabella-video.mp4'
            ],
             height: '...',
            size: '.',
            bust: '..."',
            waist: '..."',
            hips: '..."',
            shoeSize: '.',
            hairColor: '...',
            eyeColor: '...',
            about: 'Top-tier model with extensive experience in high-fashion campaigns.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
          
        },

        {
            id: 'top_30',
            name: 'Amarachi',
            image: 'top models/girllllll.jpg',
            additionalImages: [
                // 'path/to/isabella-2.jpg',
                // 'path/to/isabella-3.jpg',
                // 'path/to/isabella-4.jpg',
                // 'path/to/isabella-video.mp4'
            ],
            height: '5^10',
            size: '10',
            bust: '39"',
            waist: '33"',
            hips: '43"',
            shoeSize: '42/43',
            hairColor: 'dark-brown/realxed',
            eyeColor: 'dark-brown',
            about: 'My name is Amarachi and I^m a 19 year old commercial and face model under Hd models based between Lagos and Enugu Currently in university,I bring a clean,expressive look and on-camera, confidence to beauty, lifestyle and brand campaigns',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Video Vixen', 'Brand'],
            // availability: 'Monday - Saturday: 10AM - 8PM'
        },


        
        // ADD MORE MODELS HERE
    ],
    elite: [
        // ADD YOUR ELITE MODELS HERE - EXAMPLE:
        // {
        //     // id: 'elite_1',
        //     // name: 'Anastasia Divine',
        //     // image: 'path/to/anastasia-main.jpg',
        //     // additionalImages: [
        //     //     'path/to/anastasia-2.jpg',
        //     //     'path/to/anastasia-3.jpg',
        //     //     'path/to/anastasia-4.jpg',
        //     //     'path/to/anastasia-video.mp4'
        //     // ],
        //     // height: '175cm',
        //     // size: 'XS',
        //     // bust: '34"',
        //     // waist: '23"',
        //     // hips: '34"',
        //     // shoeSize: '8',
        //     // hairColor: 'Auburn',
        //     // eyeColor: 'Green',
        //     // about: 'Elite supermodel with international campaign experience and runway expertise.',
        //     // shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Brand', 'Video Vixen'],
            
           
        // },
        // ADD MORE MODELS HERE
         {
            id: 'elite_2',
            name: 'Jessica oba',
            image: 'Elitemodels/jessica premium.jpg',
            additionalImages: [
                'Elitemodels/IMG_5451.JPG',
                'Elitemodels/IMG_5449.JPG',
                // 'path/to/anastasia-4.jpg',
                // 'path/to/anastasia-video.mp4'
            ],
            height: '5^11',
            size: '14',
            bust: '39"',
            waist: '32"',
            hips: '43"',
            shoeSize: '42/43',
            hairColor: 'Black',
            eyeColor: 'Brown',
            about: 'Elite supermodel with international campaign experience and runway expertise.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Brand', 'Video Vixen'],
          
        },

        {
            id: 'elite_3',
            name: 'Finey',
            image: 'path/to/anastasia-main.jpg',
            additionalImages: [
                'path/to/anastasia-2.jpg',
                'path/to/anastasia-3.jpg',
                'path/to/anastasia-4.jpg',
                'path/to/anastasia-video.mp4'
            ],
            height: '5^5',
            size: '8',
            bust: '34"',
            waist: '27"',
            hips: '40"',
            shoeSize: '39',
            hairColor: 'Brown',
            eyeColor: 'Brown',
            about: 'I started modeling professionally this year and have worked with a range of brands across fashion and beauty. I’m passionate about bringing creative ideas to life through visuals and enjoy being part of teams that value quality and expression.I love modeling because it allows me to express different moods, styles, and stories  and I’m always looking to grow, learn, and bring value to any project I’m part of.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Brand', 'Video Vixen'],
          
        },
    ],


    premium: [
        // ADD YOUR ELITE MODELS HERE - EXAMPLE:4
        //  {
        //     // id: 'elite_1',
        //     // name: 'Anastasia Divine',
        //     // image: 'path/to/anastasia-main.jpg',
        //     // additionalImages: [
        //     //     'path/to/anastasia-2.jpg',
        //     //     'path/to/anastasia-3.jpg',
        //     //     'path/to/anastasia-4.jpg',
        //     //     'path/to/anastasia-video.mp4'
        //     // ],
        //     // height: '175cm',
        //     // size: 'XS',
        //     // bust: '34"',
        //     // waist: '23"',
        //     // hips: '34"',
        //     // shoeSize: '8',
        //     // hairColor: 'Auburn',
        //     // eyeColor: 'Green',
        //     // about: 'Elite supermodel with international campaign experience and runway expertise.',
        //     // shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Brand', 'Video Vixen'],
        //     // // price: '₦500,000 - ₦1,000,000',
        //     // // availability: 'By Appointment: 12PM - 10PM'
        // },
       
        // ADD MORE MODELS HERE
         {
           id: 'premium_1',
            name: 'Temiloluwa',
            image: '',
            additionalImages: [
                // 'top models/model1.jpg',
                '',
                '',
                ''
            ],
             height:'5*6"',
             size: 'uk-6"',
           bust:'35"',
           Waist:'28"',
           hips:'38"',
           shoeSize:'39"',
            hairColor: 'Black(relaxed)',
           eyeColor: 'Deep Brown', 
           about: '',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Brand', 'Video Vixen'],
         
            
        },

         {
           id: 'premium_2',
            name: 'Ndi Amaka',
            image: 'premium models/WhatsApp Image 2025-09-15 at 22.22.55_79ebf4f5.jpg',
            additionalImages: [
                'top models/model1.jpg',
                'premium models/WhatsApp Image 2025-09-15 at 22.22.53_a893620b.jpg',
                'premium models/WhatsApp Image 2025-09-15 at 22.22.54_fa8ed431.jpg',
                'premium models/WhatsApp Image 2025-09-15 at 22.22.55_fcfd58d5.jpg'
            ],
             height:'5*7"',
             size: 'uk-6"',
           bust:'30"',
           Waist:'25"',
           hips:'34"',
           shoeSize:'38"',
          hairColor: 'Black(relaxed)',
           eyeColor: 'Black', 
           about: '',
             shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Brand', 'Video Vixen'],
          
            
        },

         {
           id: 'premium_3',
            name: 'Bukola',
            image: 'premium models/WhatsApp Image 2025-09-15 at 22.22.55_bf492e2c.jpg',
            additionalImages: [
            
                'premium models/adeotun.jpg',
                'premium models/WhatsApp Image 2025-09-15 at 22.22.56_dada021c.jpg',
                'premium models/WhatsApp Image 2025-09-15 at 22.22.55_bf492e2c.jpg'
            ],
             height:'"',
             size: 'uk-6"',
           bust:'30"',
           waist:'25"',
           hips:'34"',
            shoeSize:'38"',
          hairColor: 'Black(relaxed)',
           eyeColor: 'Black', 
           about: 'My name is Olatunbosun Rejoice, I^m 19 years old and still a student . I have started my modelling career since 2022 till date. I am a face and fashion model . I am a model under Honey drop modelling agency since 2023.',
             shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Brand', 'Video Vixen'],
           
            
        },

        {
           id: 'premium_4',
            name: 'Rejoice',
            image: 'premium models/WhatsApp Image 2025-09-15 at 22.22.57_edf0f59f.jpg',
            additionalImages: [
                '',
                '',
                '',
                ''
            ],
             height:'5*5"',
             size: 'uk-6/8"',
           bust:'32"',
           waist:'27"',
           hips:'38"',
            shoeSize:'39"',
          hairColor: 'Brown(relaxed)',
           eyeColor: 'Black', 
           about: 'My name is Olatunbosun Rejoice, I^m 19 years old and still a student . I have started my modelling career since 2022 till date. I am a face and fashion model . I am a model under Honey drop modelling agency since 2023.',
             shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Brand', 'Video Vixen'],
          
            
        },

        {
           id: 'premium_5',
            name: 'Jane',
            image: 'premium models/WhatsApp Image 2025-09-15 at 22.23.03_b1404d23.jpg',
            additionalImages: [
                'premium models/WhatsApp Image 2025-09-15 at 22.23.02_634c9e6e.jpg',
                '',
                '',
                ''
            ],
             height:'..."',
             size: 'uk-14"',
           bust:'42 and a half"',
           waist:'36"',
           hips:'45"',
           shoeSize:'42"',
          hairColor: 'Black(relaxed)',
           eyeColor: 'Brown', 
           about: '',
             shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Brand', 'Video Vixen'],
           
        },

        {
           id: 'premium_6',
            name: 'Feyi',
            image: 'premium models/Feyi[1].png',
            additionalImages: [
                '',
                '',
                '',
                ''
            ],
             height:'5*7"',
             size: 'uk-10"',
           bust:'38"',
           waist:'34/35"',
           hips:'39"',
           shoeSize:'38/39"',
          hairColor: 'Brown(relaxed)',
           eyecolor: 'Dark Brown', 
           about: 'Well, I’m Feyi a fashion designer and model. I love creating and also being in front of the camera. Modeling has given me the chance to express myself in different ways and it’s helped me grow so much.',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Brand',
               'Video Vixen'],
           
            
           
        },

         {
           id: 'premium_7',
            name: 'Jummy',
            image: 'premium models/jummy.jpg',
            additionalImages: [
                '',
                '',
                '',
                ''
            ],
             height:'5*5"',
             size: 'uk-10/12"',
           bust:'42/under-bust-33"',
           waist:'35"',
           hips:'43"',
           shoeSize:'40"',
          hairColor: 'Black(relaxed)',
           eyecolor: 'Brown', 
           about: '',
            shootTypes: ['Fashion', 'Beauty', 'Bridal', 'Brand',
               'Video Vixen'],
           
            
           
        }
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
                    <h2 style="color:black">${model.name}</h2>
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
                        <h4>Abou ${model.name}</h4>
                        <p>${model.about}</p>
                    </div>
                    
                   
                    
                
                </div>
                
                <!-- Booking Form Section -->
                <div class="booking-form-section">
                    <h3 style="color:black">Book ${model.name}</h3>
                    
                    <!-- Shoot Type Selection -->
                    <div class="shoot-types-selection">
                        <h4>Select Shoot Type(s)</h4>
                        ${model.shootTypes.map(type => `
  
  
                            <div class="shoot-type-item">
  <label>
    <input type="checkbox" name="shootType" value="${type}"> ${type}
  </label>

  <button style="color:black" type="button" class="expand-requirements" onclick="toggleRequirements('${type.toLowerCase()}')">
    + Add Specific Requirements
  </button>

  <div id="${type.toLowerCase()}-requirements" class="requirements-box" style="display:none;">
    <textarea placeholder="Add specific requirements for ${type} shoot..."></textarea>

    <!-- Only Fashion and Brand have duration/time -->
    ${['Fashion', 'Brand'].includes(type)
      ? `
        <div class="duration-section" style="margin-top:10px;">
          <h5 style="color:black;">Duration</h5>
          <label style="display:block; margin-bottom:5px;">
            <input type="radio" name="${type.toLowerCase()}-duration" value="5-hours">
            5 Hours
          </label>
          <label style="display:block;">
            <input type="radio" name="${type.toLowerCase()}-duration" value="full-day">
            Full Day (9 AM – 5 PM)
          </label>

          
        </div>
      `
      : ''
    }
  </div>
</div>
`).join('')}
                    </div>
                    
                    <!-- Date and Time -->
                    <div class="datetime-section">
                        <div class="input-group">
                            <label style="color:black;">Preferred Date</label>
                            <input type="date" id="bookingDate" required>
                        </div>

                         <div class="input-group">
                            <label style="color:black;">Preferred Time</label>
                            <input type="time" id="bookingTime" required>
                        </div>

                        
            
                       
                    </div>
                    
                    <!-- Model Requirements -->
                    <div class="model-requirements">
                        <label style="color:black;">Additional Requirements for Model</label>
                        <textarea id="modelRequirements" placeholder="Specify any special requirements, wardrobe, makeup style, etc."></textarea>
                    </div>
                    
                    <!-- Booking Buttons -->
                    <div class="booking-buttons">
                        <button style="color:black "type="button" class="book-whatsapp" onclick="bookViaWhatsApp('${model.id}', '${category}')"> 📱 Book via WhatsApp</button>
                           
                        
                        <button style="color:black" type="button" class="book-instagram" onclick="bookViaInstagram('${model.id}', '${category}')">   📷 Book via Instagram
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
// function bookViaWhatsApp(modelId, category) {
//   const model = window.currentModelForBooking;
//   const selectedShootTypes = Array.from(document.querySelectorAll('input[name="shootType"]:checked')).map(cb => cb.value);
//   const date = document.getElementById('bookingDate').value || 'N/A';
//   const time = document.getElementById('bookingTime').value || 'N/A';
//   const durationInput = document.getElementById('bookingDuration');
//   const duration = durationInput ? durationInput.value : 'N/A';
//   const requirements = document.getElementById('modelRequirements').value || 'N/A';
  
//   // ✅ Get logged-in client handle
//   const clientHandle = userAuth.getCurrentUser()?.username || 'Unknown';

//   // ✅ Collect any specific requirements
//   let specificRequirements = '';
//   selectedShootTypes.forEach(type => {
//     const reqBox = document.getElementById(`${type.toLowerCase()}-requirements`);
//     if (reqBox && reqBox.style.display === 'block') {
//       const reqText = reqBox.querySelector('textarea').value;
//       if (reqText) specificRequirements += `\n${type} Requirements: ${reqText}`;
//     }
//   });

//   // ✅ Message format
//   const bookingMessage = `Hi! I'd like to book ${model.name} (${category} model).

// 📅 Date: ${date}
// ⏰ Time: ${time}
// ⌛ Duration: ${duration} hours
// 🎬 Shoot Type(s): ${selectedShootTypes.join(', ')}
// 📝 Requirements: ${requirements}
// ${specificRequirements}
// Client: @${clientHandle}`;

// // ✅ Copy to clipboard (after opening)
//   navigator.clipboard.writeText(bookingMessage).then(() => {
//     alert('Booking details copied! WhatsApp opened successfully.');
//   }).catch(() => {
//     alert('Could not copy text automatically. WhatsApp opened.');
//   });

//   // ✅ Your official WhatsApp business short link (replace this with yours)
//   const whatsappUrl = `https://wa.me/2348146518310?text=${encodeURIComponent(bookingMessage)}`;

//   // ✅ Open WhatsApp first (avoids browser blocking)
//   window.open(whatsappUrl, '_blank');

  

//   // ✅ Save to booking history
//   bookingManager.addBooking({
//     clientInstagram: '@' + clientHandle,
//     modelName: model.name,
//     modelCategory: category,
//     shootTypes: selectedShootTypes,
//     shootDate: date,
//     shootTime: time,
//     duration: duration + ' hours',
//     requirements: requirements,
//     specificRequirements: specificRequirements,
//     platform: 'WhatsApp'
//   });

//   closeEnhancedModal();
// }



// Function to handle booking via WhatsApp
function bookViaWhatsApp(modelId, category) {
  const model = window.currentModelForBooking;
  const selectedShootTypes = Array.from(
    document.querySelectorAll('input[name="shootType"]:checked')
  ).map(cb => cb.value);

  const date = document.getElementById('bookingDate')?.value || 'N/A';
  const time = document.getElementById('bookingTime')?.value || 'N/A';
  const requirements = document.getElementById('modelRequirements')?.value.trim() || 'None specified';

  // Build detailed section per shoot type
  let shootDetails = "";
  selectedShootTypes.forEach(type => {
    const lower = type.toLowerCase();

    // Check if requirement box is shown and get requirements text
    const reqBox = document.getElementById(`${lower}-requirements`);
    let reqText = "";
    if (reqBox && reqBox.style.display === "block") {
      const textarea = reqBox.querySelector("textarea");
      reqText = textarea ? textarea.value.trim() : "";
    }

    // Check for duration only for Fashion & Brand
    let durationText = "";
    if (["fashion", "brand"].includes(lower)) {
      const durationInput = document.querySelector(`input[name="${lower}-duration"]:checked`);
      if (durationInput) {
        durationText =
          durationInput.value === "full-day"
            ? "Full Day (9 AM - 5 PM)"
            : "5 Hours";
      }
    }

    // Append everything neatly for WhatsApp message
    shootDetails += `\n🎬 ${type} Shoot:`;
    if (durationText) shootDetails += `\n⌛ Duration: ${durationText}`;
    if (reqText) shootDetails += `\n📝 Requirements: ${reqText}`;
    shootDetails += "\n";
  });

  // Client IG handle
  let clientHandle = 'Client';
  const savedUser = JSON.parse(
    localStorage.getItem('currentUser') || localStorage.getItem('currentUser ') || '{}'
  );
  if (savedUser.username) clientHandle = savedUser.username;
  else if (savedUser.instagram) clientHandle = savedUser.instagram;
  else if (savedUser.name) clientHandle = savedUser.name;

  // WhatsApp message
  const bookingMessage = `Hi! I'd like to book ${model.name} (${category} model).

📅 Date: ${date}
⏰ Time: ${time}
${shootDetails}
📝 General Notes: ${requirements}
Client: @${clientHandle}`;

  // Open WhatsApp
  const whatsappUrl = `https://wa.me/2349018912194?text=${encodeURIComponent(bookingMessage)}`;
  window.open(whatsappUrl, '_blank');

  const currentUser = userAuth.getCurrentUser();
  const currentUserId = currentUser ? currentUser.id : null;
  
  // Save booking
  bookingManager.addBooking({
    clientInstagram: '@' + clientHandle,
    modelName: model.name,
    modelCategory: category,
    shootTypes: selectedShootTypes,
    shootDate: date,
    shootTime: time,
    duration: shootDetails.replace(/\n/g, '; ').trim(), // Summarize durations for history if needed
    requirements: requirements,
    specificRequirements: shootDetails.replace(/\n/g, '; ').trim(), // Use shootDetails here too for detail
    platform: 'WhatsApp',
    userId: currentUserId
  });

  closeEnhancedModal();
}

// Function to handle booking via Instagram
function bookViaInstagram(modelId, category) {
  const model = window.currentModelForBooking;
  const selectedShootTypes = Array.from(
    document.querySelectorAll('input[name="shootType"]:checked')
  ).map(cb => cb.value);

  const date = document.getElementById('bookingDate')?.value || 'N/A';
  const time = document.getElementById('bookingTime')?.value || 'N/A';
  const requirements = document.getElementById('modelRequirements')?.value.trim() || 'None specified';

  // Build detailed section per shoot type
  let shootDetails = "";
  selectedShootTypes.forEach(type => {
    const lower = type.toLowerCase();

    // Check if requirement box is shown and get requirements text
    const reqBox = document.getElementById(`${lower}-requirements`);
    let reqText = "";
    if (reqBox && reqBox.style.display === "block") {
      const textarea = reqBox.querySelector("textarea");
      reqText = textarea ? textarea.value.trim() : "";
    }

    // Check for duration only for Fashion & Brand
    let durationText = "";
    if (["fashion", "brand"].includes(lower)) {
      const durationInput = document.querySelector(`input[name="${lower}-duration"]:checked`);
      if (durationInput) {
        durationText =
          durationInput.value === "full-day"
            ? "Full Day (9 AM - 5 PM)"
            : "5 Hours";
      }
    }

    // Append everything neatly for Instagram message
    shootDetails += `\n🎬 ${type} Shoot:`;
    if (durationText) shootDetails += `\n⌛ Duration: ${durationText}`;
    if (reqText) shootDetails += `\n📝 Requirements: ${reqText}`;
    shootDetails += "\n";
  });

  let clientHandle = 'Client';
  const savedUser = JSON.parse(
    localStorage.getItem('currentUser') || localStorage.getItem('currentUser ') || '{}'
  );
  if (savedUser.username) clientHandle = savedUser.username;
  else if (savedUser.instagram) clientHandle = savedUser.instagram;
  else if (savedUser.name) clientHandle = savedUser.name;

  const bookingDetails = `Model Booking Request:

👩‍🎤 Model: ${model.name} (${category})
📅 Date: ${date}
⏰ Time: ${time}
${shootDetails}
📝 General Notes: ${requirements}
Client: @${clientHandle}`;

  navigator.clipboard.writeText(bookingDetails).then(() => {
    alert('Booking details copied! Redirecting to Instagram...');
    window.open("https://www.instagram.com/hdmodels.co/", "_blank");
  }).catch(() => {
    alert('Please copy and send via Instagram DM:\n\n' + bookingDetails);
    window.open("https://www.instagram.com/hdmodels.co/", "_blank");
  });

  const currentUser = userAuth.getCurrentUser();
  const currentUserId = currentUser ? currentUser.id : null;

  bookingManager.addBooking({
    clientInstagram: '@' + clientHandle,
    modelName: model.name,
    modelCategory: category,
    shootTypes: selectedShootTypes,
    shootDate: date,
    shootTime: time,
    duration: shootDetails.replace(/\n/g, '; ').trim(), // Summarize durations for history
    requirements: requirements,
    specificRequirements: shootDetails.replace(/\n/g, '; ').trim(), // Use shootDetails here too for detail
    platform: 'Instagram',
    userId: currentUserId
  });

  closeEnhancedModal();
}





// function bookViaWhatsApp(modelId, category) {
//   const model = window.currentModelForBooking;
//   const selectedShootTypes = Array.from(
//     document.querySelectorAll('input[name="shootType"]:checked')
//   ).map(cb => cb.value);

//   // ✅ Collect form inputs safely
//   const date = document.getElementById('bookingDate')?.value || 'N/A';
//   const time = document.getElementById('bookingTime')?.value || 'N/A';
//   const requirements = document.getElementById('modelRequirements')?.value.trim() || 'None specified';

//   // ✅ Duration (works for dropdown or radio)
//   let duration = 'N/A';
//   const selectEl = document.querySelector('select[id$="-duration-select"]');
//   const radioEl = document.querySelector('input[type="radio"][name$="-duration"]:checked');
//   if (selectEl && selectEl.value) {
//     duration = selectEl.value === 'fullday' ? 'Full Day (9 AM - 5 PM)' : '5 Hours';
//   } else if (radioEl && radioEl.value) {
//     duration = radioEl.value === 'full-day' ? 'Full Day (9 AM - 5 PM)' : '5 Hours';
//   }

//   // ✅ Specific requirements
//   let specificRequirements = '';
//   selectedShootTypes.forEach(type => {
//     const reqBox = document.getElementById(`${type.toLowerCase()}-requirements`);
//     if (reqBox && reqBox.style.display === 'block') {
//       const reqText = reqBox.querySelector('textarea').value;
//       if (reqText) specificRequirements += `\n${type} Requirements: ${reqText}`;
//     }
//   });

//   // ✅ Client IG handle (works even if key has space)
//   let clientHandle = 'Client';
//   const savedUser = JSON.parse(
//     localStorage.getItem('currentUser') || localStorage.getItem('currentUser ') || '{}'
//   );
//   if (savedUser.username) clientHandle = savedUser.username;
//   else if (savedUser.instagram) clientHandle = savedUser.instagram;
//   else if (savedUser.name) clientHandle = savedUser.name;

//   // ✅ WhatsApp message
//   const bookingMessage = `Hi! I'd like to book ${model.name} (${category} model).

// 📅 Date: ${date}
// ⏰ Time: ${time}
// ⌛ Duration: ${duration}
// 🎬 Shoot Type(s): ${selectedShootTypes.join(', ')}
// 📝 Requirements: ${requirements}
// ${specificRequirements}
// Client: @${clientHandle}`;

//   // ✅ Open WhatsApp
//   const whatsappUrl = `https://wa.me/2349018912194?text=${encodeURIComponent(bookingMessage)}`;
//   window.open(whatsappUrl, '_blank');


//   const currentUser = userAuth.getCurrentUser();
// const currentUserId = currentUser ? currentUser.id : null;
// console.log("Attempting to add booking for userId:", currentUserId);

// bookingManager.addBooking({
//   // ... existing booking data ...
//   userId: currentUserId // Use the logged variable
// });

//   // ✅ Save booking
//   bookingManager.addBooking({
//     clientInstagram: '@' + clientHandle,
//     modelName: model.name,
//     modelCategory: category,
//     shootTypes: selectedShootTypes,
//     shootDate: date,
//     shootTime: time,
//     duration: duration,
//     requirements: requirements,
//     specificRequirements: specificRequirements,
//     platform: 'WhatsApp'
//   });

//   closeEnhancedModal();
// }

// // function bookViaInstagram(modelId, category) {
// //   const model = window.currentModelForBooking;
// //   const selectedShootTypes = Array.from(document.querySelectorAll('input[name="shootType"]:checked')).map(cb => cb.value);
// //   const date = document.getElementById('bookingDate').value || 'N/A';
// //   const time = document.getElementById('bookingTime').value || 'N/A';
// //   const durationInput = document.getElementById('bookingDuration');
// //   const duration = durationInput ? durationInput.value : 'N/A';
// //   const requirements = document.getElementById('modelRequirements').value || 'N/A';
// //   const savedUser = JSON.parse(localStorage.getItem('newUser')) || {};
// // const clientHandle =
// //   savedUser.username ||
// //   savedUser.name ||
// //   savedUser.instagram ||
// //   savedUser.handle ||
// //   'Unknown';

// //   // ✅ Collect specific requirements
// //   let specificRequirements = '';
// //   selectedShootTypes.forEach(type => {
// //     const reqBox = document.getElementById(`${type.toLowerCase()}-requirements`);
// //     if (reqBox && reqBox.style.display === 'block') {
// //       const reqText = reqBox.querySelector('textarea').value;
// //       if (reqText) specificRequirements += `\n${type} Requirements: ${reqText}`;
// //     }
// //   });

// //   // ✅ Message to send
// //   const bookingDetails = `Model Booking Request:

// // 👩‍🎤 Model: ${model.name} (${category})
// // 📅 Date: ${date}
// // ⏰ Time: ${time}
// // ⌛ Duration: ${duration} hours
// // 🎬 Shoot Type(s): ${selectedShootTypes.join(', ')}
// // 📝 Requirements: ${requirements}
// // ${specificRequirements}

// // Client: @${clientHandle}`;

// //   // ✅ Copy to clipboard, then open Instagram
// //   navigator.clipboard.writeText(bookingDetails).then(() => {
// //     alert('Booking details copied! Redirecting to Instagram...');
// //     window.open("https://www.instagram.com/hdmodels.co/", "_blank"); // ← Your real agency IG link
// //   }).catch(() => {
// //     alert('Please copy this booking information and send it via Instagram DM:\n\n' + bookingDetails);
// //     window.open("https://www.instagram.com/hdmodels.co/", "_blank"); // same link for fallback
// //   });

// //   // ✅ Save to booking history
// //   bookingManager.addBooking({
// //     clientInstagram: '@' + clientHandle,
// //     modelName: model.name,
// //     modelCategory: category,
// //     shootTypes: selectedShootTypes,
// //     shootDate: date,
// //     shootTime: time,
// //     duration: duration + ' hours',
// //     requirements: requirements,
// //     specificRequirements: specificRequirements,
// //     platform: 'Instagram'
// //   });

// //   closeEnhancedModal();
// // }


// function bookViaInstagram(modelId, category) {
//   const model = window.currentModelForBooking;
//   const selectedShootTypes = Array.from(
//     document.querySelectorAll('input[name="shootType"]:checked')
//   ).map(cb => cb.value);

//   const date = document.getElementById('bookingDate')?.value || 'N/A';
//   const time = document.getElementById('bookingTime')?.value || 'N/A';
//   const requirements = document.getElementById('modelRequirements')?.value.trim() || 'None specified';

// //   let duration = 'N/A';
// //   const selectEl = document.querySelector('select[id$="-duration-select"]');
// //   const radioEl = document.querySelector('input[type="radio"][name$="-duration"]:checked');
// //   if (selectEl && selectEl.value) {
// //     duration = selectEl.value === 'fullday' ? 'Full Day (9 AM - 5 PM)' : '5 Hours';
// //   } else if (radioEl && radioEl.value) {
// //     duration = radioEl.value === 'full-day' ? 'Full Day (9 AM - 5 PM)' : '5 Hours';
// //   }

// // ✅ Build detailed section per shoot type
// let shootDetails = "";

// selectedShootTypes.forEach(type => {
//   const lower = type.toLowerCase();

//   // Check if requirement box is shown and get requirements text
//   const reqBox = document.getElementById(`${lower}-requirements`);
//   let reqText = "";
//   if (reqBox && reqBox.style.display === "block") {
//     const textarea = reqBox.querySelector("textarea");
//     reqText = textarea ? textarea.value.trim() : "";
//   }

//   // Check for duration only for Fashion & Brand
//   let durationText = "";
//   if (["fashion", "brand"].includes(lower)) {
//     const durationInput = document.querySelector(`input[name="${lower}-duration"]:checked`);
//     if (durationInput) {
//       durationText =
//         durationInput.value === "full-day"
//           ? "Full Day (9am-5pm)"
//           : "5 Hours";
//     }
//   }

//   // Append everything neatly for WhatsApp message
//   shootDetails += `\n🎬 ${type} Shoot:`;
//   if (durationText) shootDetails += `\n⌛ Duration: ${durationText}`;
//   if (reqText) shootDetails += `\n📝 Requirements: ${reqText}`;
//   shootDetails += "\n";
// });


// // // ✅ Collect durations for each shoot type separately
// // let durationText = "";
// // selectedShootTypes.forEach(type => {
// //   if (["Fashion", "Brand"].includes(type)) {
// //     const durationInput = document.querySelector(`input[name="${type.toLowerCase()}-duration"]:checked`);
// //     if (durationInput) {
// //       const duration =
// //         durationInput.value === "full-day"
// //           ? "Full Day (9am-5pm)"
// //           : "5 Hours";
// //       durationText += `\n⌛ ${type} Duration: ${duration}`;
// //     }
// //   }
// // });

// //   let specificRequirements = '';
// //   selectedShootTypes.forEach(type => {
// //     const reqBox = document.getElementById(`${type.toLowerCase()}-requirements`);
// //     if (reqBox && reqBox.style.display === 'block') {
// //       const reqText = reqBox.querySelector('textarea').value;
// //       if (reqText) specificRequirements += `\n${type} Requirements: ${reqText}`;
// //     }
// //   });

//   let clientHandle = 'Client';
//   const savedUser = JSON.parse(
//     localStorage.getItem('currentUser') || localStorage.getItem('currentUser ') || '{}'
//   );
//   if (savedUser.username) clientHandle = savedUser.username;
//   else if (savedUser.instagram) clientHandle = savedUser.instagram;
//   else if (savedUser.name) clientHandle = savedUser.name;

//   const bookingDetails = `Model Booking Request:

// 👩‍🎤 Model: ${model.name} (${category})
// 📅 Date: ${date}
// ⏰ Time: ${time}
// ${shootDetails}
// 📝 Gneral Notes: ${requirements}
// Client: @${clientHandle}`;

//   navigator.clipboard.writeText(bookingDetails).then(() => {
//     alert('Booking details copied! Redirecting to Instagram...');
//     window.open("https://www.instagram.com/hdmodels.co/", "_blank");
//   }).catch(() => {
//     alert('Please copy and send via Instagram DM:\n\n' + bookingDetails);
//     window.open("https://www.instagram.com/hdmodels.co/", "_blank");
//   });

//   bookingManager.addBooking({
//     clientInstagram: '@' + clientHandle,
//     modelName: model.name,
//     modelCategory: category,
//     shootTypes: selectedShootTypes,
//     shootDate: date,
//     shootTime: time,
//     duration: duration,
//     requirements: requirements,
//     specificRequirements: specificRequirements,
//     platform: 'Instagram'
//   });

//   closeEnhancedModal();
// }

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
    if (!bookingsList) {
        console.error("Bookings list container not found!");
        return;
    }

    if (bookings.length === 0) {
        bookingsList.innerHTML = '<p>No bookings found for this user.</p>';
        return;
    }

    bookingsList.innerHTML = bookings.map(booking => {
        // Prepare data for display
        const modelName = booking.modelName || 'N/A';
        const modelCategory = booking.modelCategory ? booking.modelCategory.charAt(0).toUpperCase() + booking.modelCategory.slice(1) : 'N/A';
        const shootDate = booking.shootDate || 'N/A';
        const shootTime = booking.shootTime || 'N/A';
        const duration = booking.duration || 'N/A';
        const shootTypes = Array.isArray(booking.shootTypes) ? booking.shootTypes.join(', ') : booking.shootTypes || 'N/A';
        const requirements = booking.requirements && booking.requirements.trim() !== '' ? booking.requirements : 'None specified';
        const specificRequirements = booking.specificRequirements && booking.specificRequirements.trim() !== '' ? booking.specificRequirements : 'None specified';
        const clientInstagram = booking.clientInstagram || 'N/A';
        const platform = booking.platform || 'N/A';
        const status = booking.status ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) : 'Pending';
        const bookingId = booking.id || 'N/A';
        const createdAt = booking.createdAt ? new Date(booking.createdAt).toLocaleString() : 'N/A';


        return `
            <div class="booking-card">
                <h3 class="booking-card-title">Booking ID: ${bookingId}</h3>
                <p><strong>Status:</strong> <span class="booking-status booking-status-${status.toLowerCase()}">${status}</span></p>
                <div class="booking-details">
                    <p><strong>Model:</strong> ${modelName} (${modelCategory} Model)</p>
                    <p><strong>Date & Time:</strong> ${shootDate} at ${shootTime}</p>
                    <p><strong>Duration:</strong> ${duration}</p>
                    <p><strong>Shoot Type(s):</strong> ${shootTypes}</p>
                    <p><strong>Client:</strong> ${clientInstagram}</p>
                    <p><strong>Booked via:</strong> ${platform}</p>
                    <p><strong>General Requirements:</strong> ${requirements}</p>
                    ${specificRequirements !== 'None specified' ? `<p><strong>Specific Requirements:</strong> ${specificRequirements}</p>` : ''}
                    <p class="booking-timestamp">Booked on: ${createdAt}</p>
                </div>
                <!-- You can add action buttons here, e.g., to cancel or view details -->
                <button class="booking-action-button" onclick="alert('Functionality to re-book or modify is not implemented yet.')">Re-Book / Modify</button>
            </div>
        `;
    }).join('');
}


// function renderBookingHistory(bookings) {
//     const bookingsList = document.getElementById('bookingsList');
//    bookingsList.innerHTML = bookings.map(booking => `
//   <div class="booking-item">
//     <pre class="booking-message">
// Model Booking Request:

// 👩‍🎤 Model: ${booking.modelName || 'N/A'} (${booking.modelCategory || 'N/A'})
// 📅 Date: ${booking.shootDate || 'N/A'}
// ⏰ Time: ${booking.shootTime || 'N/A'}
// ⌛ Duration: ${booking.duration || 'N/A'}
// 🎬 Shoot Type(s): ${Array.isArray(booking.shootTypes) ? booking.shootTypes.join(', ') : booking.shootTypes || 'N/A'}
// 📝 Requirements: ${booking.requirements || 'N/A'}${booking.specificRequirements ? '\n' + booking.specificRequirements : ''}

// Client: ${booking.clientInstagram || 'N/A'}
// Platform: ${booking.platform || 'N/A'}
//     </pre>
//   </div>
// `).join('');
//    }

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

// Specific initialization for booking-history.html
document.addEventListener('DOMContentLoaded', function() {
    // Check if we are on the booking-history.html page
    if (window.location.pathname.split('/').pop() === 'booking-history.html') {
        initializeBookingHistory();
    }

    // --- Keep existing DOMContentLoaded listeners for other functionalities if they are outside this block ---
    // (e.g., WhatsApp Integration, Cookie Management, Navigation active state, Smooth scrolling, Form input animations)
    // If you had other general DOMContentLoaded listeners, they should remain.
    // For example, if you have a separate DOMContentLoaded for cookie consent, keep it.
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


