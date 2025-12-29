export function initializeModalTriggers() {
    let modalOpenedByMouseLeave = false;
    setTimeout(() => location = '#open-modal', 30000); // 30sec
    setInterval(() => location = '#open-modal', 300000); // 300 sec 
    document.addEventListener('mouseleave', e => {
        if (!modalOpenedByMouseLeave && (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= innerWidth || e.clientY >= innerHeight)) {
            location = '#open-modal';
            modalOpenedByMouseLeave = true;
        }
    });
};