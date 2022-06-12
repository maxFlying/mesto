import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupInputList = Array.from(document.querySelectorAll(".popup__input"));
    this._popupFormSelector = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputValues = {};
    this._popupInputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  open() {
    super.open();
  }

  close() {
    super.close();
    this._popupFormSelector.reset();
  }
}
