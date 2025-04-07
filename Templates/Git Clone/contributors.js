const contributors = [
    {
        name: 'Emma Wilson',
        department: 'Computer Science',
        email: 'emma.w@example.com',
        phone: '+1 234-567-8901',
        github: 'emmaw'
    },
    {
        name: 'James Chen',
        department: 'Information Technology',
        email: 'james.c@example.com',
        phone: '+1 234-567-8902',
        github: 'jameschen'
    },
    {
        name: 'Sarah Miller',
        department: 'Software Engineering',
        email: 'sarah.m@example.com',
        phone: '+1 234-567-8903',
        github: 'sarahm'
    }
];

function renderTable(data) {
    const tableBody = document.getElementById('contributorsTableBody');
    tableBody.innerHTML = '';

    data.forEach(contributor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contributor.name}</td>
            <td>${contributor.department}</td>
            <td>
                <a href="mailto:${contributor.email}" class="email-link">
                    ${contributor.email}
                </a>
            </td>
            <td>${contributor.phone}</td>
            <td>
                <a href="https://github.com/${contributor.github}" target="_blank" class="github-link">
                    @${contributor.github}
                </a>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn" onclick="viewProfile('${contributor.github}')" title="View Profile">
                        <span class="material-icons">visibility</span>
                    </button>
                    <button class="action-btn" onclick="editContributor('${contributor.email}')" title="Edit">
                        <span class="material-icons">edit</span>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = contributors.filter(contributor => 
        contributor.name.toLowerCase().includes(searchTerm) ||
        contributor.department.toLowerCase().includes(searchTerm) ||
        contributor.email.toLowerCase().includes(searchTerm) ||
        contributor.github.toLowerCase().includes(searchTerm)
    );
    renderTable(filtered);
});

// Action handlers
function viewProfile(github) {
    window.open(`https://github.com/${github}`, '_blank');
}

function editContributor(email) {
    console.log('Edit contributor:', email);
    // Implement edit functionality
}

// Initial render
renderTable(contributors);
