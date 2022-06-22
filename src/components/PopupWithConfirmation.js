import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._deleteButton = this._popup.querySelector(".popup__button_delete");
  }

  handleFormSubmit(fn) {
    this._functionDelete = fn;
  }

  setEventListeners() {
    this._deleteButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._functionDelete();
    });
    super.setEventListeners();
  }
}
