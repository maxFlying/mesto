function showError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); 
    
    inputElement.classList.add(config.inputErrorClass);
    
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
};

function hideError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement, config) {
    if(!inputElement.validity.valid) {
      showError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideError(formElement, inputElement, config);
    }
};

function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const button = formElement.querySelector(config.submitButtonSelector);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, config);
        toggleButton(inputList, button, config);
      })
    });
}


function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  
      setEventListeners(formElement, config);
  }); 
};

const configs = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }

enableValidation(configs);

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function toggleButton(inputList, button, config) {
    if (hasInvalidInput(inputList)) {
        button.classList.add(config.inactiveButtonClass);
        button.setAttribute('disabled', true);
    } else {
        button.classList.remove(config.inactiveButtonClass);
        button.removeAttribute('disabled', false);
    }
};