// Highlight active navigation item
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.sidebar li');
    
    navLinks.forEach(link => {
        const linkHref = link.querySelector('a').getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Year tab filtering with stats update
    const yearTabs = document.querySelectorAll('.year-tab');
    const studentCards = document.querySelectorAll('.student-card');

    function updateStats(selectedYear) {
        const visibleCards = Array.from(studentCards).filter(card => 
            selectedYear === 'all' || card.dataset.year === selectedYear
        );

        // Update total students
        document.querySelector('.students-stats .number').textContent = visibleCards.length;

        // Calculate average CGPA
        const avgCGPA = visibleCards.reduce((acc, card) => {
            const cgpa = parseFloat(card.querySelector('.student-stats span:first-child').textContent.split(': ')[1]);
            return acc + cgpa;
        }, 0) / visibleCards.length;

        // Update CGPA display
        document.querySelectorAll('.students-stats .number')[1].textContent = avgCGPA.toFixed(1);

        // Update attendance
        const avgAttendance = visibleCards.reduce((acc, card) => {
            const attendance = parseInt(card.querySelector('.student-stats span:nth-child(2)').textContent.split(': ')[1]);
            return acc + attendance;
        }, 0) / visibleCards.length;

        document.querySelector('.students-stats .trend').textContent = 
            `${Math.round(avgAttendance)}% Average Attendance`;
    }

    yearTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            yearTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const selectedYear = tab.dataset.year;
            studentCards.forEach(card => {
                if (selectedYear === 'all' || card.dataset.year === selectedYear) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });

            updateStats(selectedYear);
        });
    });

    // Initial stats update
    updateStats('all');
});

// Add current date display
const currentDate = document.querySelector('.current-date');
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
currentDate.textContent = new Date().toLocaleDateString('en-US', options);

// Chart setup
const ctx = document.getElementById('mainChart').getContext('2d');
const mainChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Department Performance',
            data: [85, 87, 84, 89, 90, 92],
            borderColor: '#ff6b6b',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(108, 92, 231, 0.1)',
            borderWidth: 2,
            pointBackgroundColor: '#6c5ce7'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Department Performance Trend'
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                min: 70,
                max: 100,
                grid: {
                    color: 'rgba(255, 107, 107, 0.1)'
                },
                ticks: {
                    maxTicksLimit: 5
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    maxTicksLimit: 6
                }
            }
        }
    }
});

// Add animation to stat cards
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Notification handling
const notificationBtn = document.querySelector('.action-btn');
notificationBtn.addEventListener('click', () => {
    // Add notification functionality here
    alert('No new notifications');
});

// Quick action handlers
document.querySelectorAll('.action-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const action = e.target.closest('.action-button').textContent.trim();
        console.log(`Quick action clicked: ${action}`);
        // Add specific functionality for each action
    });
});

// Schedule view handling
document.addEventListener('DOMContentLoaded', () => {
    const yearTabs = document.querySelectorAll('.year-tabs .year-tab');
    const scheduleContainers = document.querySelectorAll('.schedule-container');

    yearTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            yearTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show corresponding schedule
            const selectedYear = tab.dataset.year;
            scheduleContainers.forEach(container => {
                if (container.dataset.year === selectedYear) {
                    container.style.display = 'block';
                } else {
                    container.style.display = 'none';
                }
            });
        });
    });
});

// Schedule year handling
document.addEventListener('DOMContentLoaded', () => {
    const scheduleYearTabs = document.querySelectorAll('.year-tabs .year-tab');
    const scheduleContainers = document.querySelectorAll('.schedule-container');

    // Show initial schedule
    const initialYear = scheduleYearTabs[0].dataset.year;
    showSchedule(initialYear);

    scheduleYearTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            scheduleYearTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show selected year's schedule
            showSchedule(tab.dataset.year);
        });
    });

    function showSchedule(year) {
        scheduleContainers.forEach(container => {
            if (container.dataset.year === year) {
                container.style.display = 'block';
                container.style.opacity = '1';
            } else {
                container.style.display = 'none';
                container.style.opacity = '0';
            }
        });
    }
});

// Reports Chart
if (document.getElementById('reportsChart')) {
    const reportsCtx = document.getElementById('reportsChart').getContext('2d');
    const reportsChart = new Chart(reportsCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Reports Generated',
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: '#ff6b6b',
                borderRadius: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 107, 107, 0.1)'
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
}

// Report card hover effects
document.querySelectorAll('.report-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Students Chart
if (document.getElementById('studentsChart')) {
    const studentsCtx = document.getElementById('studentsChart').getContext('2d');
    const studentsChart = new Chart(studentsCtx, {
        type: 'line',
        data: {
            labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
            datasets: [{
                label: 'Average CGPA',
                data: [7.8, 8.0, 8.1, 8.2, 8.3, 8.5],
                borderColor: '#ff6b6b',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(108, 92, 231, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: '#6c5ce7'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Class Performance Trend'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 7,
                    max: 10,
                    grid: {
                        color: 'rgba(255, 107, 107, 0.1)'
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
}

// Student card hover effects
document.querySelectorAll('.student-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Sample student data
const sampleStudents = [
    { id: 'CSE22001', name: 'John Smith', year: '1', cgpa: 8.5, attendance: 95, rank: 12 },
    { id: 'CSE22002', name: 'Emma Wilson', year: '1', cgpa: 8.7, attendance: 98, rank: 5 },
    { id: 'CSE21001', name: 'Michael Brown', year: '2', cgpa: 8.2, attendance: 92, rank: 15 },
    { id: 'CSE20001', name: 'Sarah Davis', year: '3', cgpa: 8.9, attendance: 96, rank: 3 },
    // Add more sample data
];

// Initialize DataTable with enhanced features
$(document).ready(function() {
    const studentsTable = $('#studentsTable').DataTable({
        data: sampleStudents,
        columns: [
            { data: 'id' },
            { 
                data: 'name',
                render: function(data) {
                    return `<div class="student-name">
                        <img src="https://ui-avatars.com/api/?name=${data}" alt="Student">
                        <span>${data}</span>
                    </div>`;
                }
            },
            { 
                data: 'year',
                render: function(data) {
                    return `<span class="year-badge">${data}st Year</span>`;
                }
            },
            { data: 'cgpa' },
            { 
                data: 'attendance',
                render: function(data) {
                    return data + '%';
                }
            },
            { 
                data: 'rank',
                render: function(data) {
                    return '#' + data;
                }
            },
            {
                data: null,
                render: function() {
                    return `<div class="table-actions">
                        <button class="btn-view"><i class="ri-eye-line"></i></button>
                        <button class="btn-edit"><i class="ri-edit-line"></i></button>
                        <button class="btn-delete"><i class="ri-delete-bin-line"></i></button>
                    </div>`;
                }
            }
        ],
        order: [[2, 'asc']],
        pageLength: 10,
        dom: '<"table-top"lf>rt<"table-bottom"ip>',
        language: {
            search: "",
            searchPlaceholder: "Search students..."
        }
    });

    // Year tab filtering
    $('.year-tab').on('click', function() {
        const year = $(this).data('year');
        
        $('.year-tab').removeClass('active');
        $(this).addClass('active');

        if (year === 'all') {
            studentsTable.column(2).search('').draw();
        } else {
            studentsTable.column(2).search(year).draw();
        }

        updateStats();
    });

    // CRUD Operations
    $('#addStudentForm').on('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const newStudent = {
            id: formData.get('studentId'),
            name: formData.get('name'),
            year: formData.get('year'),
            cgpa: parseFloat(formData.get('cgpa')),
            attendance: parseInt(formData.get('attendance')),
            rank: 0 // Calculate rank based on CGPA
        };
        
        studentsTable.row.add(newStudent).draw();
        $('#addStudentModal').modal('hide');
        this.reset();
        updateStats();
    });

    // Update statistics
    function updateStats() {
        const filteredData = studentsTable.rows({ search: 'applied' }).data().toArray();
        
        // Update total students
        $('.students-stats .number').first().text(filteredData.length);

        // Calculate average CGPA
        const avgCGPA = filteredData.reduce((acc, curr) => acc + curr.cgpa, 0) / filteredData.length;
        $('.students-stats .number').eq(1).text(avgCGPA.toFixed(2));

        // Calculate attendance rate
        const avgAttendance = filteredData.reduce((acc, curr) => acc + curr.attendance, 0) / filteredData.length;
        $('.students-stats .number').last().text(avgAttendance.toFixed(0) + '%');
    }

    // Initialize stats
    updateStats();
});

// Update students chart based on filtered data
function updateStudentsChart(data) {
    if (!window.studentsChart) return;
    
    const cgpaData = data.map(student => student.cgpa);
    window.studentsChart.data.datasets[0].data = cgpaData;
    window.studentsChart.update();
}

// Initialize DataTable
$(document).ready(function() {
    const studentsTable = $('#studentsTable').DataTable({
        pageLength: 10,
        order: [[2, 'asc']], // Sort by year by default
        dom: '<"table-top"lf>rt<"table-bottom"ip>',
        language: {
            search: "",
            searchPlaceholder: "Search students..."
        },
        columnDefs: [
            { orderable: false, targets: 6 }, // Disable sorting for actions column
            {
                targets: 2,
                render: function(data, type, row) {
                    return `<span class="year-badge">${data}</span>`;
                }
            }
        ]
    });

    // Year tab filtering
    $('.year-tab').on('click', function() {
        const year = $(this).data('year');
        
        $('.year-tab').removeClass('active');
        $(this).addClass('active');

        if (year === 'all') {
            studentsTable.column(2).search('').draw();
        } else {
            studentsTable.column(2).search(year + '').draw();
        }
    });
});

// Enhanced DataTable initialization with export buttons
$(document).ready(function() {
    const studentsTable = $('#studentsTable').DataTable({
        // ...existing DataTable options...
        dom: '<"table-top"Blfr>t<"table-bottom"ip>',
        select: true,
        buttons: [
            {
                extend: 'collection',
                text: 'Export',
                buttons: ['excel', 'pdf', 'csv']
            },
            'selectAll',
            'selectNone'
        ],
        // Add checkbox column
        columnDefs: [
            {
                targets: 0,
                checkboxes: {
                    selectRow: true
                }
            }
        ]
    });

    // Bulk Actions
    $('#bulkMail').click(function() {
        const selectedRows = studentsTable.rows({ selected: true }).data();
        const emails = selectedRows.map(row => row.email).toArray();
        if (emails.length === 0) {
            alert('Please select students first');
            return;
        }
        // Implement email functionality
    });

    $('#bulkDelete').click(function() {
        const selectedRows = studentsTable.rows({ selected: true });
        if (selectedRows.count() === 0) {
            alert('Please select students to delete');
            return;
        }
        if (confirm(`Delete ${selectedRows.count()} students?`)) {
            selectedRows.remove().draw();
            updateStats();
        }
    });

    // Student Details Modal
    function showStudentDetails(studentData) {
        const modal = $('#studentDetailsModal');
        
        // Update student profile
        modal.find('.student-avatar').attr('src', `https://ui-avatars.com/api/?name=${studentData.name}`);
        modal.find('.student-name').text(studentData.name);
        modal.find('.student-id').text(studentData.id);

        // Performance Chart
        const performanceCtx = document.getElementById('performanceChart').getContext('2d');
        new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                datasets: [{
                    label: 'CGPA Progression',
                    data: studentData.cgpaHistory || [8.0, 8.2, 8.5, 8.4, 8.6, 8.5],
                    borderColor: '#ff6b6b',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Attendance Chart
        const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
        new Chart(attendanceCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Monthly Attendance',
                    data: studentData.attendanceHistory || [95, 92, 88, 95, 90, 93],
                    backgroundColor: '#6c5ce7'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        modal.modal('show');
    }

    // View student details
    $('#studentsTable').on('click', '.btn-view', function() {
        const data = studentsTable.row($(this).closest('tr')).data();
        showStudentDetails(data);
    });

    // Edit student
    $('#studentsTable').on('click', '.btn-edit', function() {
        const data = studentsTable.row($(this).closest('tr')).data();
        const form = $('#addStudentForm');
        
        // Populate form
        form.find('[name="studentId"]').val(data.id);
        form.find('[name="name"]').val(data.name);
        form.find('[name="year"]').val(data.year);
        form.find('[name="cgpa"]').val(data.cgpa);
        form.find('[name="attendance"]').val(data.attendance);
        
        $('#addStudentModal').modal('show');
    });

    // Delete student
    $('#studentsTable').on('click', '.btn-delete', function() {
        if (confirm('Are you sure you want to delete this student?')) {
            studentsTable.row($(this).closest('tr')).remove().draw();
            updateStats();
        }
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'f') { // Ctrl+F
        e.preventDefault();
        document.querySelector('.dataTables_filter input').focus();
    }
    if (e.ctrlKey && e.key === 'n') { // Ctrl+N
        e.preventDefault();
        $('#addStudentModal').modal('show');
    }
});

// Generate more sample data
const generateSampleStudents = () => {
    const years = ['1', '2', '3', '4'];
    const names = ['John Smith', 'Emma Wilson', 'Michael Brown', 'Sarah Davis', 'James Johnson', 'Emily White', 'William Lee', 'Olivia Garcia'];
    
    return Array.from({ length: 50 }, (_, i) => ({
        id: `CSE${Math.floor(Math.random() * 100000)}`,
        name: names[Math.floor(Math.random() * names.length)],
        year: years[Math.floor(Math.random() * years.length)],
        cgpa: (Math.random() * (10 - 7) + 7).toFixed(2),
        attendance: Math.floor(Math.random() * (100 - 75) + 75),
        rank: i + 1,
        email: `student${i}@example.com`,
        cgpaHistory: Array.from({ length: 6 }, () => (Math.random() * (10 - 7) + 7).toFixed(2)),
        attendanceHistory: Array.from({ length: 6 }, () => Math.floor(Math.random() * (100 - 75) + 75))
    }));
};

// Initialize DataTable with proper configuration
$(document).ready(function() {
    const students = generateSampleStudents();
    
    const table = $('#studentsTable').DataTable({
        data: students,
        columns: [
            { 
                data: null,
                defaultContent: '',
                orderable: false,
                className: 'select-checkbox'
            },
            { data: 'id' },
            // ...existing column definitions...
        ],
        select: {
            style: 'multi',
            selector: 'td:first-child'
        },
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'collection',
                text: 'Export',
                buttons: [
                    {
                        extend: 'excel',
                        exportOptions: {
                            columns: [1, 2, 3, 4, 5, 6]
                        }
                    },
                    {
                        extend: 'pdf',
                        exportOptions: {
                            columns: [1, 2, 3, 4, 5, 6]
                        }
                    },
                    {
                        extend: 'csv',
                        exportOptions: {
                            columns: [1, 2, 3, 4, 5, 6]
                        }
                    }
                ]
            },
            'selectAll',
            'selectNone'
        ],
        // ...existing options...
    });

    // Fix modal functionality
    const addStudentModal = new bootstrap.Modal(document.getElementById('addStudentModal'));
    const detailsModal = new bootstrap.Modal(document.getElementById('studentDetailsModal'));

    // Add student handler
    $('#saveStudent').click(function() {
        const form = $('#addStudentForm');
        if (!form[0].checkValidity()) {
            form[0].reportValidity();
            return;
        }

        const formData = new FormData(form[0]);
        const newStudent = {
            id: formData.get('studentId'),
            name: formData.get('name'),
            year: formData.get('year'),
            cgpa: parseFloat(formData.get('cgpa')),
            attendance: parseInt(formData.get('attendance')),
            rank: table.data().length + 1,
            email: `${formData.get('studentId').toLowerCase()}@example.com`,
            cgpaHistory: [formData.get('cgpa')],
            attendanceHistory: [formData.get('attendance')]
        };

        table.row.add(newStudent).draw();
        addStudentModal.hide();
        form[0].reset();
        updateStats();
    });

    // Fix bulk actions
    $('#bulkMail').click(function() {
        const selectedData = table.rows({ selected: true }).data();
        if (selectedData.length === 0) {
            alert('Please select students first');
            return;
        }
        const emails = selectedData.map(row => row.email).join(', ');
        window.location.href = `mailto:${emails}`;
    });

    // Fix charts update
    function updateCharts(data) {
        if (window.performanceChart) {
            window.performanceChart.destroy();
        }
        if (window.attendanceChart) {
            window.attendanceChart.destroy();
        }

        // ... existing chart creation code ...
    }

    // Fix year filter
    $('.year-tab').click(function() {
        const year = $(this).data('year');
        table.column(2).search(year === 'all' ? '' : year).draw();
        updateStats();
    });

    // Initialize tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();
});

// ... rest of existing code ...
