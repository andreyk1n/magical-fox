// Функція ініціалізації лічильників
export function initializeCounters() {
    const observerOptions = { threshold: 0.3 };
    const observer = new IntersectionObserver(onSectionIntersect, observerOptions);
    document.querySelectorAll(".page_section").forEach(section => observer.observe(section));
}

// Функція, що обробляє перетин секцій
function onSectionIntersect(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll("[data-counter-target]");
            counters.forEach(counter => animateCounter(counter));
            observer.unobserve(entry.target);
        }
    });
}

// Анімація лічильника
function animateCounter(counter) {
    const targetValue = parseInt(counter.dataset.counterTarget) || 0;
    const duration = 1000;  // Можна змінити на бажаний час
    const startValue = parseInt(counter.textContent) || 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        counter.textContent = Math.floor(progress * (targetValue - startValue) + startValue);

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}
