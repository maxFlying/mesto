import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhotoImage = this._popup.querySelector(".popup__photoalbum-image");
    this._popupPhotoTitle = this._popup.querySelector(".popup__photoalbum-title");
  }

  open(image, title) {
    this._popupPhotoImage.src = image;
    this._popupPhotoImage.alt = title;
    this._popupPhotoTitle.textContent = title;

    super.open();
  }
}
