// Gender selection
document.querySelectorAll('.gender-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        // You can add logic here to filter hostels based on gender
    });
});

// Payment processing
document.querySelectorAll('.pay-btn').forEach(button => {
    button.addEventListener('click', function() {
        const hostel = this.dataset.hostel;
        const amount = this.dataset.amount;
        
        // Simulate payment processing
        setTimeout(() => {
            const transactionId = 'AFIT' + Math.random().toString(36).substr(2, 9).toUpperCase();
            document.getElementById('transactionId').textContent = transactionId;
            document.querySelector('.overlay').style.display = 'block';
            document.querySelector('.payment-success').style.display = 'block';
        }, 1500);
    });
});

// Print receipt
function printReceipt() {
    window.print();
}

// Back to home
function backToHome() {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.payment-success').style.display = 'none';
}

// Live chat functionality
let chatOpen = false;
document.getElementById('liveChat').addEventListener('click', function() {
    if (!chatOpen) {
        alert('Live chat support is connecting...');
        chatOpen = true;
    }
});

// Floating icons functionality
document.querySelectorAll('.floating-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        const action = this.getAttribute('title');
        switch(action) {
            case 'Help':
                alert('Opening help center...');
                break;
            case 'Support':
                alert('Connecting to support...');
                break;
            case 'Contact':
                window.location.href = 'mailto:support@afit.edu.ng';
                break;
        }
    });
});

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'

    });
    });
});

// Add hover animations for hostel cards
document.querySelectorAll('.hostel-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.card-img-top').style.opacity = '0.8';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.card-img-top').style.opacity = '1';
    });
});

// Implement room availability counter
let roomsLeft = 16;
document.querySelectorAll('.pay-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (roomsLeft > 0) {
            roomsLeft--;
            const roomCounter = this.closest('.card').querySelector('.fa-door-open').parentElement;
            roomCounter.textContent = `${roomsLeft} rooms left`;
            
            if (roomsLeft < 5) {
                roomCounter.style.color = 'red';
            }
        }
        
        if (roomsLeft === 0) {
            this.disabled = true;
            this.textContent = 'FULLY BOOKED';
        }
    });
});

// Form validation for login/signup
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const inputs = this.querySelectorAll('input');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
        if (isValid) {
            // Process form submission
            alert('Form submitted successfully!');
        }
    });
});

// Add loading spinner during payment
document.querySelectorAll('.pay-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const originalText = this.innerHTML;
        this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
        }, 1500);
    });
});

// Implement notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification`;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Handle mobile responsiveness for floating icons
function adjustFloatingIcons() {
    const floatingIcons = document.querySelector('.floating-icons');
    if (window.innerWidth < 768) {
        floatingIcons.style.display = 'none';
    } else {
        floatingIcons.style.display = 'flex';
    }
}

window.addEventListener('resize', adjustFloatingIcons);
adjustFloatingIcons();

// Initialize page loading animation
window.addEventListener('load', function() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.style.display = 'none';
    document.body.appendChild(preloader);
});

// Handle scroll-to-top button
const scrollButton = document.createElement('button');
scrollButton.className = 'btn btn-custom scroll-top';
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollButton.style.position = 'fixed';
scrollButton.style.bottom = '20px';
scrollButton.style.right = '90px';
scrollButton.style.display = 'none';
document.body.appendChild(scrollButton);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize the map
const map = L.map('map').setView([9.0579, 7.4951], 15); // Coordinates for Abuja

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a marker for the institution
const marker = L.marker([9.0579, 7.4951]).addTo(map);
marker.bindPopup("<b>AFIT Campus</b><br>Airforce Institute of Technology").openPopup();

// Update login/register button handlers
document.querySelector('a.btn-light').addEventListener('click', function(e) {
    e.preventDefault();
    new bootstrap.Modal(document.getElementById('registerModal')).show();
});

document.querySelector('a.btn-outline-light').addEventListener('click', function(e) {
    e.preventDefault();
    new bootstrap.Modal(document.getElementById('loginModal')).show();
});

// Form handling
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    showNotification('Login successful!', 'success');
    bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    showNotification('Registration successful!', 'success');
    bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
});

// Password validation for register form
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = this.querySelector('input[type="password"]');
    const confirmPassword = this.querySelectorAll('input[type="password"]')[1];
    
    if (password.value !== confirmPassword.value) {
        showNotification('Passwords do not match!', 'danger');
        return;
    }

    showNotification('Registration successful!', 'success');
    bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
});