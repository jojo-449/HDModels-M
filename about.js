// // ===================================================
// // SLIDESHOW FUNCTIONS - Auto-changing hero images
// // ===================================================
// function initializeSlideshow() {
//     // Setup click handlers for slideshow indicators
//     indicators.forEach((indicator, index) => {
//         indicator.addEventListener('click', () => {
//             goToSlide(index);   // Jump to specific slide
//         });
//     });

//     // Start automatic slideshow
//     startSlideshow();

//     // Pause slideshow when user hovers over it
//     const slideshowSection = document.querySelector('.slideshow-section');
//     if (slideshowSection) {
//         slideshowSection.addEventListener('mouseenter', pauseSlideshow);
//         slideshowSection.addEventListener('mouseleave', startSlideshow);
//     }
// }

// // Navigate to specific slide
// function goToSlide(slideIndex) {
//     // Remove active class from current slide and indicator
//     slides[currentSlide].classList.remove('active');
//     indicators[currentSlide].classList.remove('active');

//     // Update current slide index
//     currentSlide = slideIndex;

//     // Add active class to new slide and indicator
//     slides[currentSlide].classList.add('active');
//     indicators[currentSlide].classList.add('active');
// }

// // Move to next slide in sequence
// // Move to next slide in sequence
// function nextSlide() {
//     // Increment currentSlide by 1 and use the modulo operator to loop back to the first slide
//     const nextIndex = (currentSlide + 1) % slides.length;
//     goToSlide(nextIndex);
// }

// // Start automatic slideshow with 2-second intervals
// function startSlideshow() {
//     pauseSlideshow(); // Clear any existing interval
//     slideInterval = setInterval(nextSlide, 2000); // Auto-change every 2 seconds
// }

// // Stop automatic slideshow
// function pauseSlideshow() {
//     if (slideInterval) {
//         clearInterval(slideInterval);
//     }
// }






// ===================================================
// SLIDESHOW FUNCTIONS - Auto-changing hero images
// ===================================================

// --- NEW: Global Variables for Slideshow ---
let slides; // Will hold all slide elements
let indicators; // Will hold all indicator elements
let currentSlide = 0; // Tracks the currently active slide
let slideInterval; // Stores the interval ID for clearing

// Function to run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // --- NEW: Initialize slides and indicators arrays ---
    slides = document.querySelectorAll('.slide');
    indicators = document.querySelectorAll('.indicator');

    // Only initialize if slideshow elements exist
    if (slides.length > 0 && indicators.length > 0) {
        initializeSlideshow();
    }
});


function initializeSlideshow() {
    // Setup click handlers for slideshow indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);   // Jump to specific slide
        });
    });

    // Start automatic slideshow
    startSlideshow();

    // Pause slideshow when user hovers over it
    const slideshowSection = document.querySelector('.slideshow-section');
    if (slideshowSection) {
        slideshowSection.addEventListener('mouseenter', pauseSlideshow);
        slideshowSection.addEventListener('mouseleave', startSlideshow);
    }
}

// Navigate to specific slide
function goToSlide(slideIndex) {
    // Remove active class from current slide and indicator
    if (slides[currentSlide]) slides[currentSlide].classList.remove('active');
    if (indicators[currentSlide]) indicators[currentSlide].classList.remove('active');

    // Update current slide index
    currentSlide = slideIndex;

    // Add active class to new slide and indicator
    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (indicators[currentSlide]) indicators[currentSlide].classList.add('active');
}

// Move to next slide in sequence
function nextSlide() {
    // Corrected: Increment currentSlide by 1 for the next slide
    const nextIndex = (currentSlide + 1) % slides.length; // Loop back to first slide
    goToSlide(nextIndex);
}

// Start automatic slideshow with 2-second intervals
function startSlideshow() {
    pauseSlideshow(); // Clear any existing interval
    slideInterval = setInterval(nextSlide, 2000); // Auto-change every 2 seconds
}

// Stop automatic slideshow
function pauseSlideshow() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}
