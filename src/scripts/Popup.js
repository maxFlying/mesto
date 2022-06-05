import { popupList } from "../utils/constants.js";

export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add("popup_is-active");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    this._popupSelector.classList.remove("popup_is-active");
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    popupList.forEach((popup) => {
      popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup_is-active")) {
          this.close();
        }
        if (evt.target.classList.contains("popup__close")) {
          this.close();
        }
      });
    });
  }
}
