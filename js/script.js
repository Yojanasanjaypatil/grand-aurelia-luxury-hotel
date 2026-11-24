


const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Open and close mobile menu
menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    // Change menu icon
    if (navLinks.classList.contains("active")) {
        menuToggle.textContent = "✕";
        menuToggle.setAttribute("aria-label", "Close navigation menu");
    } else {
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

});

// Close menu when a navigation link is clicked
document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-label", "Open navigation menu");

    });

});




const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");

// Get today's date in local time
function getToday() {

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}

// Prevent past dates
checkin.min = getToday();
checkout.min = getToday();

// When check-in date changes
checkin.addEventListener("change", function () {

    // Checkout must be after check-in
    if (checkin.value) {

        const nextDay = new Date(checkin.value + "T00:00:00");

        nextDay.setDate(nextDay.getDate() + 1);

        const year = nextDay.getFullYear();
        const month = String(nextDay.getMonth() + 1).padStart(2, "0");
        const day = String(nextDay.getDate()).padStart(2, "0");

        const minimumCheckout = `${year}-${month}-${day}`;

        checkout.min = minimumCheckout;

        // Clear invalid checkout date
        if (checkout.value && checkout.value < minimumCheckout) {
            checkout.value = "";
        }

    }

});




const bookingButton = document.querySelector(".booking-button");

// Your hotel's WhatsApp number
const hotelNumber = "919876543210";

bookingButton.addEventListener("click", function (event) {

    event.preventDefault();

    const checkinDate = checkin.value;
    const checkoutDate = checkout.value;

    const guests = document.getElementById("guests").value;

    // Check required booking information
    if (!checkinDate || !checkoutDate) {

        alert("Please select both check-in and check-out dates.");

        return;

    }

    // Validate dates
    if (checkoutDate <= checkinDate) {

        alert("Check-out date must be after check-in date.");

        return;

    }

    // Create WhatsApp message
    const message =

        `Hello Grand Aurelia!

        I would like to enquire about a room booking.

        Check-in: ${checkinDate}
        Check-out: ${checkoutDate}
        Guests: ${guests}

        Please share the availability and pricing.

        Thank you!`;

    // Encode message for URL
    const whatsappURL =
        `https://wa.me/${hotelNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");

});




const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get user details
    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const message = document.getElementById("message").value.trim();

    // Validate empty fields
    if (!name || !email || !phone || !message) {

        alert("Please fill in all the fields.");

        return;

    }

    // Create enquiry message
    const whatsappMessage =

        `Hello Grand Aurelia!

        I have a new enquiry.

        Name: ${name}
        Email: ${email}
        Phone: ${phone}

        Message: ${message}

        Please contact me regarding my enquiry.

        Thank you!`;

    // Create WhatsApp URL
    const whatsappURL =
        `https://wa.me/${hotelNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");

    // Reset form
    contactForm.reset();

});




const footer = document.querySelector("footer");

const footerText = footer.querySelector("p:last-child");

footerText.textContent =
    `© ${new Date().getFullYear()} Grand Aurelia. All Rights Reserved.`;

