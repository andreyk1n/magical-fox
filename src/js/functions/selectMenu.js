export function selectMenu() {
    document.addEventListener('click', (e) => {
        // Закриваємо всі відкриті списки, окрім поточного
        document.querySelectorAll('.select__dropdown').forEach(dropdown => {
          const parentSelect = dropdown.closest('.select');
          if (!parentSelect.contains(e.target)) {
            dropdown.classList.remove('select__dropdown--active');
          }
        });
      
        // Обробка кліку по селекту
        const select = e.target.closest('.select');
        if (select) {
          const dropdown = select.querySelector('.select__dropdown');
          const button = select.querySelector('.select__button');
      
          // Перевіряємо, чи селект уже активний
          const isActive = dropdown.classList.contains('select__dropdown--active');
          dropdown.classList.toggle('select__dropdown--active', !isActive); // Тогл активного стану
      
          // Обробка вибору опції
          if (e.target.classList.contains('select__option')) {
            button.textContent = e.target.textContent; // Оновлюємо текст кнопки
            dropdown.classList.remove('select__dropdown--active'); // Закриваємо список після вибору
          }
        }
      });     
}