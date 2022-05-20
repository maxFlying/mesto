export class FormValidator {
  constructor(configs, formElement) {
    this._configs = configs;
    this._formElement = formElement;
    this._button = this._formElement.querySelector(this._configs.submitButtonSelector);
  }

  enableValidation() {
      this._setEventListeners();
  }

  _showError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`); 
    
    inputElement.classList.add(this._configs.inputErrorClass);
    
    this._errorElement.classList.add(this._configs.errorClass);
    this._errorElement.textContent = inputElement.validationMessage;

  }

  _hideError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._configs.inputErrorClass);
    
    this._errorElement.classList.remove(this._configs.errorClass);
    this._errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {
      this._showError(inputElement);
    } else {
      this._hideError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._configs.inputSelector));
  
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButton();
      })
    })
  } 

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
  };

  toggleButton() {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._configs.inactiveButtonClass);
      this._button.setAttribute('disabled', true);
    } else {
      this._button.classList.remove(this._configs.inactiveButtonClass);
      this._button.removeAttribute('disabled', false);
    }
  }
}