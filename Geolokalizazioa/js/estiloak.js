// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const currentThemeSpan = document.getElementById('currentTheme');
const toggleDemoBtn = document.getElementById('toggleDemo');

// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem('theme') || 'light';

// Apply the saved theme
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.checked = true;
    currentThemeSpan.textContent = 'Dark';
} else {
    currentThemeSpan.textContent = 'Light';
}

// Toggle theme when switch is clicked
themeToggle.addEventListener('change', function () {
    if (this.checked) {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        currentThemeSpan.textContent = 'Dark';
    } else {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        currentThemeSpan.textContent = 'Light';
    }
});

// Demo button to toggle theme
toggleDemoBtn.addEventListener('click', function () {
    themeToggle.checked = !themeToggle.checked;
    // Trigger the change event
    themeToggle.dispatchEvent(new Event('change'));
});

// Navbar page navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Get the target page
        const targetPage = this.getAttribute('data-page');

        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });

        // Add active class to clicked nav link
        this.classList.add('active');

        // Hide all page content
        document.querySelectorAll('.page-content').forEach(page => {
            page.classList.remove('active');
        });

        // Show the target page
        document.getElementById(targetPage).classList.add('active');
    });
});