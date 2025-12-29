document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox__img');
    const lightboxCounter = lightbox.querySelector('#lightboxCounter');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const prevBtn = lightbox.querySelector('.lightbox__prev');
    const nextBtn = lightbox.querySelector('.lightbox__next');
    let currentImages = [], currentIndex = 0;
    let isLightboxOpen = false; 
  
    document.querySelectorAll('[data-lightbox-item]').forEach(item => {
      item.addEventListener('click', () => {
        currentImages = Array.from(item.closest('[data-lightbox-container]').querySelectorAll('[data-lightbox-item]'));
        currentIndex = currentImages.indexOf(item);
        openLightbox(currentIndex);
      });
    });
  
    [closeBtn, lightbox].forEach(el => el.addEventListener('click', e => {
      if (e.target === lightbox || e.target === closeBtn) closeLightbox();
    }));
  
    nextBtn.addEventListener('click', () => {
      if (isLightboxOpen) changeImage(1);
    });
    prevBtn.addEventListener('click', () => {
      if (isLightboxOpen) changeImage(-1);
    });
    
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
      if (isLightboxOpen) {
        if (e.key === 'ArrowRight') changeImage(1);
        if (e.key === 'ArrowLeft') changeImage(-1);
      }
    });
  
    const openLightbox = index => {
      lightboxImg.src = currentImages[index].src;
      lightboxCounter.textContent = `${index + 1}/${currentImages.length}`;
      lightbox.style.display = 'block';
      isLightboxOpen = true; 
    };
  
    const closeLightbox = () => {
      lightbox.style.display = 'none';
      isLightboxOpen = false; 
    };
  
    const changeImage = direction => {
      currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
      openLightbox(currentIndex);
    };
  });        