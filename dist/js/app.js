// burger
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');
    const body = document.body;

    burger.addEventListener('click', e => {
        e.stopPropagation();

        const isActive = burger.classList.toggle('active');
        nav.classList.toggle('active', isActive);
        body.classList.toggle('no-scroll', isActive);
    });

    document.addEventListener('click', e => {
        if (!burger.contains(e.target) && !nav.contains(e.target)) {
            burger.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('no-scroll');
        }
    });
});
// /burger

// animation observe
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
document.querySelectorAll('.services, .projects, .about, .faq, .footer').forEach(section => {
    observer.observe(section);
});
// /animation observe

// faq
document.querySelectorAll('.faq__question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('faq__item--active');
        document.querySelectorAll('.faq__item').forEach(el => {
            el.classList.remove('faq__item--active');
        });
        if (!isActive) {
            item.classList.add('faq__item--active');
        }
    });
});
// /faq

// current page
const currentPage =
    window.location.pathname === '/'
        ? 'index.html'
        : window.location.pathname.split('/').pop();
document.querySelectorAll('.header__link, .footer__link').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('current-page');
        link.setAttribute('aria-current', 'page');
    }
});
// /current page

// theme
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});
// /theme

// custom select
document.querySelectorAll('.custom-select').forEach(select => {
    const trigger = select.querySelector('.custom-select__trigger');
    const dropdown = select.querySelector('.custom-select__dropdown');
    const options = select.querySelectorAll('.custom-select__option');
    const input = select.querySelector('input[type="hidden"]');
    const label = trigger.querySelector('span');
    const close = () => {
        trigger.classList.remove('custom-select__trigger--active');
        dropdown.classList.remove('custom-select__dropdown--active');
    };
    trigger.addEventListener('click', () => {
        trigger.classList.toggle('custom-select__trigger--active');
        dropdown.classList.toggle('custom-select__dropdown--active');
    });
    options.forEach(option =>
        option.addEventListener('click', () => {
            options.forEach(o =>
                o.classList.remove('custom-select__option--selected')
            );
            option.classList.add('custom-select__option--selected');
            label.textContent = option.textContent;
            input.value = option.dataset.value || '';
            trigger.classList.toggle(
                'custom-select__trigger--has-value',
                !!option.dataset.value
            );

            close();
        })
    );
    document.addEventListener('click', e => {
        if (!select.contains(e.target)) close();
    });
});


// /custom select