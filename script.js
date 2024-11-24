document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s forwards';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Mobile menu toggle
    let isSidebarOpen = false;
    const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('main');

    function createMobileMenuButton() {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-bars"></i>';
        button.className = 'mobile-menu-button';
        button.style.cssText = `
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 0.5rem;
            border-radius: 5px;
            cursor: pointer;
            display: none;
        `;
        document.body.appendChild(button);

        // Show button only on mobile
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        function handleMobileChange(e) {
            button.style.display = e.matches ? 'block' : 'none';
        }
        mediaQuery.addListener(handleMobileChange);
        handleMobileChange(mediaQuery);

        // Toggle sidebar on button click
        button.addEventListener('click', () => {
            isSidebarOpen = !isSidebarOpen;
            sidebar.style.transform = isSidebarOpen ? 'translateX(0)' : 'translateX(100%)';
            button.innerHTML = isSidebarOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    createMobileMenuButton();

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Add loading state
        const submitButton = contactForm.querySelector('button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'שולח...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual form submission logic)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        submitButton.textContent = 'נשלח בהצלחה!';
        submitButton.style.background = '#27ae60';

        // Reset form
        setTimeout(() => {
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
        }, 3000);
    });

    // Skill cards animation
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('i').style.transform = 'scale(1.2) rotate(360deg)';
            card.querySelector('i').style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.querySelector('i').style.transform = 'scale(1) rotate(0)';
        });
    });

    // Project cards image hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const img = card.querySelector('img');
        card.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.1)';
            img.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
});
