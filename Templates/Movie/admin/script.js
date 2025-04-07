document.addEventListener('DOMContentLoaded', () => {
    // Fix theme persistence
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);

    // Fix notification popup positioning
    function showNotificationPopup() {
        const existingPopup = document.querySelector('.notifications-popup');
        if (existingPopup) {
            existingPopup.remove();
            return;
        }
        
        const popup = document.createElement('div');
        popup.className = 'notifications-popup';
        popup.innerHTML = `
            <div class="notification-header">
                <h3>Notifications</h3>
                <i class="ri-close-line" style="cursor: pointer;"></i>
            </div>
            <div class="notification-list">
                <div class="notification-item unread new">
                    <div class="notification-icon">
                        <i class="ri-ticket-2-line"></i>
                    </div>
                    <div class="notification-content">
                        <p><strong>New Booking</strong> - Ticket booked for Avatar 2</p>
                        <small>2 minutes ago</small>
                    </div>
                </div>
                <div class="notification-item new">
                    <div class="notification-icon">
                        <i class="ri-movie-2-line"></i>
                    </div>
                    <div class="notification-content">
                        <p><strong>New Movie Added</strong> - The Dark Knight</p>
                        <small>1 hour ago</small>
                    </div>
                </div>
                <div class="notification-item">
                    <div class="notification-icon">
                        <i class="ri-user-line"></i>
                    </div>
                    <div class="notification-content">
                        <p><strong>User Activity</strong> - New user registration</p>
                        <small>3 hours ago</small>
                    </div>
                </div>
            </div>
            <div class="notification-actions">
                <span class="mark-all-read">Mark all as read</span>
                <span class="clear-all">Clear all</span>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Close button handler
        popup.querySelector('.ri-close-line').addEventListener('click', () => popup.remove());
        
        // Mark all as read handler
        popup.querySelector('.mark-all-read').addEventListener('click', () => {
            popup.querySelectorAll('.notification-item').forEach(item => {
                item.classList.remove('unread');
            });
        });
        
        // Clear all handler
        popup.querySelector('.clear-all').addEventListener('click', () => {
            popup.querySelector('.notification-list').innerHTML = `
                <div style="padding: 20px; text-align: center; color: var(--text-light);">
                    No notifications
                </div>
            `;
        });
    }

    // Fix mobile sidebar
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            sidebar.classList.toggle('active');
            // Don't toggle minimized on mobile
            sidebar.classList.remove('minimized');
        } else {
            sidebar.classList.toggle('minimized');
            // Update icon
            const icon = hamburger.querySelector('i');
            icon.className = sidebar.classList.contains('minimized') 
                ? 'ri-menu-unfold-line'
                : 'ri-menu-fold-line';
        }
    });

    // Click outside to close sidebar (mobile only)
    document.addEventListener('click', (e) => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !hamburger.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        const isMobile = window.innerWidth <= 768;
        if (!isMobile && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // Fix stat counter animation
    function animateCounter(counter) {
        const target = parseInt(counter.dataset.target || counter.innerText);
        const duration = 1000;
        const steps = 50;
        const stepValue = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += stepValue;
            if (current > target) {
                counter.innerText = target.toLocaleString();
                clearInterval(timer);
            } else {
                counter.innerText = Math.floor(current).toLocaleString();
            }
        }, duration / steps);
    }

    document.querySelectorAll('.counter').forEach(counter => {
        counter.dataset.target = counter.innerText;
        animateCounter(counter);
    });

    // Navigation active state
    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Notification system
    const notificationBell = document.querySelector('.notifications');
    notificationBell.addEventListener('click', () => {
        // Add notification popup logic here
        showNotificationPopup();
    });

    // Profile Dropdown
    const profileTrigger = document.getElementById('profile-trigger');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    profileTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdownMenu.contains(e.target) && !profileTrigger.contains(e.target)) {
            dropdownMenu.classList.remove('active');
        }
    });

    // Handle dropdown items click
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const action = item.querySelector('span').textContent;
            handleDropdownAction(action);
            dropdownMenu.classList.remove('active');
        });
    });

    // Animate stats on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-card').forEach(card => {
        observer.observe(card);
    });

    // Header shadow on scroll
    const headerContainer = document.querySelector('.header-container');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            headerContainer.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            headerContainer.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });

    // Remove welcome card interaction
    const welcomeCard = document.querySelector('.welcome-card');
    if (welcomeCard) {
        welcomeCard.remove();
    }

    // Theme Toggle
    const themeSwitch = document.querySelector('.theme-switch');
    
    themeSwitch.addEventListener('click', () => {
        themeSwitch.classList.add('switching');
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update Remix icon
        const themeIcon = themeSwitch.querySelector('i');
        themeIcon.className = newTheme === 'dark' 
            ? 'ri-moon-line'
            : 'ri-sun-line';
            
        setTimeout(() => themeSwitch.classList.remove('switching'), 500);
    });

    // Load saved theme
    document.querySelector('.theme-switch i').className = 
        savedTheme === 'dark' ? 'ri-moon-line' : 'ri-sun-line';

    // Sidebar Toggle
    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('minimized');
        const icon = hamburger.querySelector('i');
        icon.className = sidebar.classList.contains('minimized')
            ? 'ri-menu-unfold-line'
            : 'ri-menu-fold-line';
    });

    // Add hover effect to stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.background = `
                radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(124, 58, 237, 0.1),
                    transparent 50%
                )
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });

    // Improve stat card animations
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.stat-icon i');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.stat-icon i');
            icon.style.transform = 'scale(1) rotate(0deg)';
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

    // Improve theme toggle
    themeSwitch.addEventListener('click', () => {
        document.documentElement.classList.add('theme-transitioning');
        // ...existing theme toggle code...
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transitioning');
        }, 300);
    });

    // Add notification badge update
    let notificationCount = 3;
    const badge = document.querySelector('.badge');
    const updateNotificationCount = (count) => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'block' : 'none';
    };

    // Booking functionality
    const bookNowButtons = document.querySelectorAll('.book-now-btn');
    const bookingForm = document.getElementById('bookingForm');
    const selectedMovieInput = document.getElementById('selectedMovie');

    if (bookNowButtons && bookingForm) {
        bookNowButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const movieCard = e.target.closest('.movie-card');
                const movieTitle = movieCard.querySelector('.movie-info h3').textContent;
                selectedMovieInput.value = movieTitle;
                bookingForm.style.display = 'block';
                bookingForm.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    // Handle form submission
    const bookingFormElement = document.querySelector('.booking-form');
    if (bookingFormElement) {
        bookingFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your booking logic here
            alert('Booking confirmed! You will receive a confirmation email shortly.');
        });
    }

    // Booking System
    const showTimeSelect = document.querySelector('select[name="showTime"]');
    const ticketsInput = document.querySelector('input[name="tickets"]');
    const seatTypeSelect = document.querySelector('select[name="seatType"]');
    let selectedTime = null;

    // Handle show time selection
    document.querySelectorAll('.time').forEach(time => {
        time.addEventListener('click', (e) => {
            if (!e.target.classList.contains('available')) return;
            
            document.querySelectorAll('.time').forEach(t => t.classList.remove('selected'));
            e.target.classList.add('selected');
            selectedTime = e.target.textContent;
            
            // Update form
            if (showTimeSelect) {
                showTimeSelect.value = selectedTime;
            }
        });
    });

    // Handle book now button clicks
    document.querySelectorAll('.book-now-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const movieCard = e.target.closest('.movie-card');
            const movieTitle = movieCard.querySelector('.movie-info h3').textContent;
            const price = movieCard.querySelector('.price').textContent;
            
            selectedMovieInput.value = movieTitle;
            bookingForm.style.display = 'block';
            bookingForm.scrollIntoView({ behavior: 'smooth' });
            
            // Reset form
            if (showTimeSelect) showTimeSelect.value = '';
            if (ticketsInput) ticketsInput.value = '1';
            if (seatTypeSelect) seatTypeSelect.value = '';
        });
    });

    // Calculate total price
    function updateTotalPrice() {
        const tickets = parseInt(ticketsInput.value) || 0;
        const seatType = seatTypeSelect.value;
        let basePrice = 200; // Standard price
        
        switch(seatType) {
            case 'Premium - ₹300':
                basePrice = 300;
                break;
            case 'VIP - ₹500':
                basePrice = 500;
                break;
        }
        
        const total = tickets * basePrice;
        document.getElementById('totalPrice').textContent = `₹${total}`;
    }

    // Add event listeners for price calculation
    if (ticketsInput && seatTypeSelect) {
        ticketsInput.addEventListener('change', updateTotalPrice);
        seatTypeSelect.addEventListener('change', updateTotalPrice);
    }

    // Handle form submission
    if (bookingFormElement) {
        bookingFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!selectedTime) {
                alert('Please select a show time');
                return;
            }
            
            // Simulate booking confirmation
            const confirmationMessage = `
                Booking Confirmed!
                Movie: ${selectedMovieInput.value}
                Time: ${selectedTime}
                Tickets: ${ticketsInput.value}
                Seat Type: ${seatTypeSelect.value}
                Total: ${document.getElementById('totalPrice').textContent}
                
                You will receive a confirmation email shortly.
            `;
            
            alert(confirmationMessage);
            bookingForm.style.display = 'none';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Reset selections
            document.querySelectorAll('.time').forEach(t => t.classList.remove('selected'));
            selectedTime = null;
        });
    }

    // Theater Seat Selection
    const seats = document.querySelectorAll('.seat:not(.occupied)');
    const selectedSeatsDisplay = document.getElementById('selectedSeatsDisplay');
    const totalAmount = document.getElementById('totalAmount');
    const checkoutBtn = document.getElementById('proceedToCheckout');
    let selectedSeats = [];

    seats.forEach(seat => {
        seat.addEventListener('click', () => {
            if (seat.classList.contains('occupied')) return;

            seat.classList.toggle('selected');
            const row = seat.closest('.seat-row').dataset.row;
            const seatNum = seat.dataset.seat;
            const seatId = `${row}${seatNum}`;
            const seatPrice = seat.closest('.seat-category').querySelector('h4').textContent.includes('Premium') ? 500 : 200;

            if (seat.classList.contains('selected')) {
                selectedSeats.push({ id: seatId, price: seatPrice });
            } else {
                selectedSeats = selectedSeats.filter(s => s.id !== seatId);
            }

            // Update display
            updateBookingSummary();
        });
    });

    function updateBookingSummary() {
        if (selectedSeats.length > 0) {
            selectedSeatsDisplay.textContent = selectedSeats.map(s => s.id).join(', ');
            const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
            totalAmount.textContent = `₹${total}`;
            checkoutBtn.disabled = false;
        } else {
            selectedSeatsDisplay.textContent = 'None';
            totalAmount.textContent = '₹0';
            checkoutBtn.disabled = true;
        }
    }

    // Handle checkout
    checkoutBtn.addEventListener('click', () => {
        const confirmMessage = `
            Confirm Booking
            Seats: ${selectedSeats.map(s => s.id).join(', ')}
            Total: ${totalAmount.textContent}
            
            Proceed with payment?
        `;

        if (confirm(confirmMessage)) {
            alert('Booking confirmed! Redirecting to payment...');
            // Add payment gateway integration here
        }
    });

    // Theater Layout Generation
    function generateTheaterLayout() {
        const container = document.querySelector('.screen-struct-cotent > div');
        const rows = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P'];
        
        rows.forEach(row => {
            const ul = document.createElement('ul');
            ul.style.width = '1085px';
            
            // Add row label
            const leftLabel = document.createElement('li');
            leftLabel.className = 'seat-name initial-ctrl';
            leftLabel.dataset.tickettype = 'scr1fc';
            leftLabel.textContent = row;
            ul.appendChild(leftLabel);
            
            // Get seat configuration for this row
            const config = getSeatConfig(row);
            
            // Add seats based on configuration
            config.forEach((type, index) => {
                const li = document.createElement('li');
                if (type === 'path') {
                    li.className = 'path';
                } else {
                    li.className = type === 'booked' ? 'seat_bk' : 'seat_av';
                    li.id = `${row}${index + 1}`;
                    li.textContent = index + 1;
                }
                ul.appendChild(li);
            });
            
            // Add right label
            const rightLabel = document.createElement('li');
            rightLabel.className = 'seat-name';
            rightLabel.textContent = row;
            ul.appendChild(rightLabel);
            
            container.appendChild(ul);
            
            // Add divider
            const divider = document.createElement('div');
            divider.style.clear = 'both';
            container.appendChild(divider);
        });
    }

    function getSeatConfig(row) {
        // Default configuration for each row
        const configs = {
            'A': {count: 16, booked: true, pathAfter: [8, 20]},
            'B': {count: 16, booked: true, pathAfter: [8, 20]},
            'C': {count: 34, booked: true, pathAfter: [1, 9, 25]},
            'D': {count: 33, booked: false, pathAfter: [9, 24, 26]},
            'E': {count: 33, booked: false, pathAfter: [9, 24, 26]},
            'F': {count: 33, booked: false, pathAfter: [9, 24, 26]},
            'G': {count: 32, booked: false, pathAfter: [9, 23, 25, 26]},
            'H': {count: 32, booked: false, pathAfter: [9, 23, 25, 26]},
            'I': {count: 32, booked: false, pathAfter: [9, 23, 25, 26]},
            'J': {count: 31, booked: false, pathAfter: [9, 22, 23, 24, 25]},
            'K': {count: 31, booked: false, pathAfter: [9, 22, 23, 24, 25]},
            'L': {count: 30, booked: false, pathAfter: [9, 21, 22, 23, 24, 25]},
            'M': {count: 26, booked: false, pathAfter: [0, 1, 7, 19, 24, 25, 35, 36]},
            'N': {count: 29, booked: false, pathAfter: [9, 20, 21, 22, 23, 24, 25]},
            'O': {count: 29, booked: false, pathAfter: [9, 20, 21, 22, 23, 24, 25]},
            'P': {count: 9, booked: false, pathAfter: [9]}
        };
        
        const config = configs[row];
        const seatArray = [];
        
        for(let i = 1; i <= config.count; i++) {
            if (config.pathAfter.includes(i)) {
                seatArray.push('path');
            } else {
                seatArray.push(config.booked ? 'booked' : 'available');
            }
        }
        
        return seatArray;
    }

    // Initialize theater layout
    document.addEventListener('DOMContentLoaded', () => {
        generateTheaterLayout();
        
        // Seat selection handling
        const seats = document.querySelectorAll('.seat_av');
        seats.forEach(seat => {
            seat.addEventListener('click', () => {
                seat.classList.toggle('selected');
                updateBookingSummary();
            });
        });
    });

    function updateBookingSummary() {
        const selectedSeats = document.querySelectorAll('.seat_av.selected');
        const selectedSeatsDisplay = document.getElementById('selectedSeatsDisplay');
        const totalAmount = document.getElementById('totalAmount');
        const checkoutBtn = document.getElementById('proceedToCheckout');
        
        const seatList = Array.from(selectedSeats).map(seat => seat.id);
        const total = selectedSeats.length * 200; // Base price per seat
        
        selectedSeatsDisplay.textContent = seatList.length ? seatList.join(', ') : 'None';
        totalAmount.textContent = `₹${total}`;
        checkoutBtn.disabled = !seatList.length;
    }
});

function handleDropdownAction(action) {
    switch(action) {
        case 'My Profile':
            // Handle profile action
            console.log('Navigate to profile page');
            break;
        case 'Settings':
            // Handle settings action
            console.log('Navigate to settings page');
            break;
        case 'Logout':
            // Handle logout action
            console.log('Perform logout');
            break;
    }
}

// Enhanced Seat Booking Functionality
document.addEventListener('DOMContentLoaded', () => {
    const seats = document.querySelectorAll('.seat_av');
    const selectedSeatsDisplay = document.getElementById('selectedSeatsDisplay');
    const totalAmount = document.getElementById('totalAmount');
    const checkoutBtn = document.getElementById('proceedToCheckout');
    let selectedSeats = new Set();

    // Seat selection handler
    seats.forEach(seat => {
        seat.addEventListener('click', () => {
            seat.classList.toggle('selected');
            
            if (seat.classList.contains('selected')) {
                selectedSeats.add(seat.id);
            } else {
                selectedSeats.delete(seat.id);
            }
            
            // Update summary
            updateBookingSummary();
        });
    });

    // Update booking summary
    function updateBookingSummary() {
        if (selectedSeats.size > 0) {
            const seatsList = Array.from(selectedSeats);
            selectedSeatsDisplay.textContent = seatsList.join(', ');
            totalAmount.textContent = `₹${selectedSeats.size * 200}`; // ₹200 per seat
            checkoutBtn.disabled = false;
        } else {
            selectedSeatsDisplay.textContent = 'None';
            totalAmount.textContent = '₹0';
            checkoutBtn.disabled = true;
        }
    }

    // Handle checkout button
    checkoutBtn.addEventListener('click', () => {
        if (selectedSeats.size > 0) {
            const message = `
                Selected Seats: ${Array.from(selectedSeats).join(', ')}
                Total Amount: ${totalAmount.textContent}
                
                Do you want to proceed with the booking?
            `;
            
            if (confirm(message)) {
                alert('Booking successful! Redirecting to payment...');
                // Clear selections after booking
                seats.forEach(seat => {
                    if (selectedSeats.has(seat.id)) {
                        seat.classList.remove('selected');
                        seat.classList.add('seat_bk');
                        seat.classList.remove('seat_av');
                    }
                });
                selectedSeats.clear();
                updateBookingSummary();
            }
        }
    });
});
