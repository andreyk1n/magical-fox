export function currentPage() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link').forEach(link => {
        if (link.getAttribute('href') === currentPath) link.classList.add('currentPage');
    });
}