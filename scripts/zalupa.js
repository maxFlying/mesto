function showError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); 
  
  inputElement.classList.add('popup__input_type_error');
  
  errorElement.classList.add('popup__input-error_active');
  errorElement.textContent = errorMessage;
};

function hideError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
  inputElement.classList.remove('popup__input_type_error');
  
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement) {
  if(!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const button = formElement.querySelector('.popup__button')
  toggleButton(inputList, button);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButton(inputList, button);
    })
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

    setEventListeners(formElement);
}); 
};

enableValidation();

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  });
};

function toggleButton(inputList, button) {
  if (hasInvalidInput(inputList)) {
      button.classList.add('popup__button_disabled');
      button.setAttribute('disabled', true);
  } else {
      button.classList.remove('popup__button_disabled');
      button.removeAttribute('disabled', false);
  }
};

// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
//   });

