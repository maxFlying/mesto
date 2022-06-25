export function handleLoading(popupSelector, isLoading) {
    const popup = document.querySelector(popupSelector);
    const popupButton = popup.querySelector('.popup__button');
  
    if(isLoading) {
      popupButton.textContent = 'Сохранение...';
    } else {
      popupButton.textContent = 'Сохранить';
    }
  }