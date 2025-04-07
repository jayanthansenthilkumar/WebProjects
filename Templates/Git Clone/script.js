// Handle active menu state
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.menu a');
    
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Handle page-specific active states
    menuLinks.forEach(link => {
        if (link.dataset.page === currentPage.replace('.html', '')) {
            link.classList.add('active');
        }
    });

    // Add hover animation for cards
    const cards = document.querySelectorAll('.workshop-card, .repo-card, .resource-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add loading animation
    document.body.classList.add('loaded');

    // Add index to resource cards for staggered animation
    document.querySelectorAll('.resource-card').forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });

    // Add index to feature items for staggered animation
    document.querySelectorAll('.feature-item').forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });

    // Animate elements when they enter viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    // Observe elements with animations
    document.querySelectorAll('.resource-card, .feature-item, .trial-cta').forEach(el => {
        observer.observe(el);
    });
});

// Animate stat cards
document.querySelectorAll('.stat-card').forEach((card, index) => {
    card.style.setProperty('--order', index);
});

// Animate counters
document.querySelectorAll('.counter').forEach(counter => {
    const target = counter.closest('.stat-card').dataset.value;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = counter.textContent.includes('$') 
                ? '$' + Math.floor(current).toLocaleString()
                : Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = counter.textContent.includes('$')
                ? '$' + parseInt(target).toLocaleString()
                : parseInt(target).toLocaleString();
        }
    };

    updateCounter();
});

// Recent registrations data
const recentRegistrations = [
    { name: 'Emma Wilson', time: '2 minutes ago', ticket: 'VIP Pass' },
    { name: 'James Chen', time: '5 minutes ago', ticket: 'Regular' },
    { name: 'Sarah Miller', time: '10 minutes ago', ticket: 'VIP Pass' },
    { name: 'David Kim', time: '15 minutes ago', ticket: 'Regular' }
];

// Populate recent registrations
const registrationList = document.querySelector('.registration-list');
recentRegistrations.forEach(registration => {
    const item = document.createElement('div');
    item.className = 'registration-item';
    item.innerHTML = `
        <div class="attendee-avatar">
            <span class="material-icons">person</span>
        </div>
        <div class="attendee-info">
            <h4>${registration.name}</h4>
            <p>${registration.ticket} • ${registration.time}</p>
        </div>
    `;
    registrationList.appendChild(item);
});

// Update chart for Git workshop statistics
const ctx = document.getElementById('growthChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Commits',
            data: [156, 235, 410, 589],
            borderColor: '#0366d6',
            backgroundColor: 'rgba(3, 102, 214, 0.1)',
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Repository Activity'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Number of Commits'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    }
});

// Add hover effects to topic cards
document.querySelectorAll('.topic-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('i, .material-icons').style.transform = 'scale(1.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('i, .material-icons').style.transform = 'scale(1)';
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

// Repository search functionality
const repoSearch = document.getElementById('repoSearch');
if (repoSearch) {
    repoSearch.addEventListener('input', (e) => {
        const searchText = e.target.value.toLowerCase();
        const repoCards = document.querySelectorAll('.repo-card');
        
        repoCards.forEach(card => {
            const repoName = card.querySelector('.repo-name h3').textContent.toLowerCase();
            const repoDesc = card.querySelector('.repo-description').textContent.toLowerCase();
            
            if (repoName.includes(searchText) || repoDesc.includes(searchText)) {
                card.style.display = 'block';
                // Add fade-in animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });

        // Update repo count
        const visibleRepos = document.querySelectorAll('.repo-card[style="display: block"]').length;
        const repoCount = document.querySelector('.repo-count');
        if (repoCount) {
            repoCount.textContent = `${visibleRepos} ${visibleRepos === 1 ? 'repository' : 'repositories'}`;
        }
    });
}

// Track repository visits
document.querySelectorAll('.repo-title').forEach(link => {
    link.addEventListener('click', (e) => {
        const repoName = link.querySelector('h3').textContent;
        console.log(`Visiting repository: ${repoName}`);
        // You can add analytics tracking here if needed
    });
});

// Add hover animation for upgrade buttons
document.querySelectorAll('.upgrade-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px) scale(1.05)';
        btn.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0) scale(1)';
        btn.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
});
