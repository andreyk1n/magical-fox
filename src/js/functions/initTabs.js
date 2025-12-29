export function initTabs() {
    const buttons = document.querySelectorAll('.tabs__button');
    const contents = document.querySelectorAll('.tabs__content');
  
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('tabs__button--active'));
        contents.forEach(content => content.classList.remove('tabs__content--active'));
  
        button.classList.add('tabs__button--active');
        contents[index].classList.add('tabs__content--active');
      });
    });
  }
