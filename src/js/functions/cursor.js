
  // Створення кастомного елемента для курсору
  const customCursor = document.createElement("div");
  customCursor.classList.add("custom-cursor");
  document.body.appendChild(customCursor);

  // Відстеження руху миші
  document.addEventListener("mousemove", (event) => {
    customCursor.style.transform = `translate(${event.pageX}px, ${event.pageY}px)`;
  });

  // Функція для встановлення кастомного курсору
  function setCustomCursor(iconPath) {
    customCursor.style.backgroundImage = `url(${iconPath})`;
    customCursor.style.width = "50px"; // Ширина курсора
    customCursor.style.height = "50px"; // Висота курсора
  }

  // Встановлення кастомного курсору, замініть шлях на ваш локальний або зовнішній
  setCustomCursor("/images/icon.svg"); // Приклад з локальним шляхом до зображенняa