export function moveElements() {
  document.addEventListener('DOMContentLoaded', () => {
    const movedElements = document.querySelectorAll('[data-move]');
    const originalContainers = new WeakMap();
    const originalIndexes = new WeakMap();

    movedElements.forEach((element) => {
      const targetSelector = element.getAttribute('data-move');
      const breakpoint = parseInt(element.getAttribute('data-breakpoint'), 10);
      const log = element.hasAttribute('data-move-log');

      if (!targetSelector || isNaN(breakpoint)) return;

      const parent = element.parentNode;
      originalContainers.set(element, parent);
      originalIndexes.set(element, Array.from(parent.children).indexOf(element));

      const moveElement = () => {
        if (window.innerWidth <= breakpoint) {
          const targetContainer = document.querySelector(targetSelector);
          if (targetContainer) {
            targetContainer.appendChild(element);
            if (log) console.log(`→ Переміщено (${element.className}) → (${targetContainer.className})`);
          } else if (log) {
            console.log(`× Не знайдено контейнер для (${targetSelector})`);
          }
        } else {
          const originalContainer = originalContainers.get(element);
          const originalIndex = originalIndexes.get(element);
          if (originalContainer) {
            const referenceNode = originalContainer.children[originalIndex];
            referenceNode
              ? originalContainer.insertBefore(element, referenceNode)
              : originalContainer.appendChild(element);
            if (log) console.log(`← Повернуто (${element.className}) ← (${originalContainer.className})`);
          }
        }
      };

      window.addEventListener('resize', moveElement);
      moveElement();
    });
  });
}

export default moveElements;
