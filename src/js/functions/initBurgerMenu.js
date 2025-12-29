// ---------------------------------------------------------------------------------------------------------------
// Функціонал для бургер меню. 
// ---------------------------------------------------------------------------------------------------------------

// beta version
export function initBurgerMenu() {
    document.addEventListener('DOMContentLoaded', () => {
        // ---------------------------------------------------------------------------------------------------------------
        // Класи до яких ми будемо доступатись
        // ---------------------------------------------------------------------------------------------------------------
        const burger = document.querySelector('.header__burger');
        const nav = document.querySelector('.header__nav');
        const body = document.body; // Доступ до body

        // ---------------------------------------------------------------------------------------------------------------
        // При кліці на бургер додаємо клас .active для .header__burger, .header__nav та блокуємо скрол сторінки
        // ---------------------------------------------------------------------------------------------------------------
        burger.addEventListener('click', (event) => {
            event.stopPropagation(); // Зупиняємо подію, щоб клік на бургер не закрив меню
            burger.classList.toggle('active');
            nav.classList.toggle('active');

            if (burger.classList.contains('active')) {
                body.classList.add('no-scroll'); // Заборона скролу
            } else {
                body.classList.remove('no-scroll'); // Відновлення скролу
            }
        });

        // ---------------------------------------------------------------------------------------------------------------
        // Закриття меню при кліці поза його межами
        // ---------------------------------------------------------------------------------------------------------------
        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target) && !burger.contains(event.target)) {
                if (nav.classList.contains('active')) {
                    burger.classList.remove('active');
                    nav.classList.remove('active');
                    body.classList.remove('no-scroll');
                }
            }
        });
    });
}