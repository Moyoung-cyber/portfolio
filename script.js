// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Menu
const menuToggles = document.querySelectorAll('.menu-toggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggles.forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggles.forEach(b => b.setAttribute('aria-expanded', isOpen));
  });
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      if (mobileMenu.classList.contains('open')) mobileMenu.classList.remove('open');
    }
  });
});

// Project Filtering
document.querySelectorAll('.filters .chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filters .chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    document.querySelectorAll('#projectsGrid .project').forEach(project => {
      project.style.display = (filter === 'all' || project.dataset.type === filter) ? 'flex' : 'none';
    });
  });
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light' || (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
  root.classList.add('light');
  moonIcon.style.display = 'none';
  sunIcon.style.display = 'block';
  themeToggle.setAttribute('aria-pressed', 'true');
}

themeToggle.addEventListener('click', () => {
  const isLight = root.classList.toggle('light');
  moonIcon.style.display = isLight ? 'none' : 'block';
  sunIcon.style.display = isLight ? 'block' : 'none';
  themeToggle.setAttribute('aria-pressed', isLight);
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Skill Bars Animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar > i').forEach(bar => {
        const width = bar.parentElement.parentElement.querySelector('.skill-label').nextElementSibling.querySelector('i').style.width;
        bar.style.width = width;
      });
    }
  });
}, { threshold: 0.5 });

const skillsList = document.querySelector('.skills-list');
if (skillsList) observer.observe(skillsList);

// Focus visibility
document.body.addEventListener('keydown', e => {
  if (e.key === 'Tab') document.body.classList.add('show-focus');
}, { once: true });