import { Popup } from "./Popup.js";
import { popupPhotoImage, popupPhotoTitle } from "../utils/constants.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(image, title) {
    popupPhotoImage.src = image;
    popupPhotoImage.alt = title;
    popupPhotoTitle.textContent = title;

    super.open();
  }
}
