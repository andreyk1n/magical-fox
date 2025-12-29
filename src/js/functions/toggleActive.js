export function toggleActive() {
    document.addEventListener('DOMContentLoaded', () => {
        // Отримуємо всі елементи з атрибутом data-toggle
        const toggleElements = document.querySelectorAll('[data-toggle]');
    
        toggleElements.forEach(element => {
          element.addEventListener('click', () => {
            // Перемикання класу active
            element.classList.toggle('active');
          });
        });
      });
}