export const popupPhotoImage = document.querySelector(".popup__photoalbum-image");
export const popupPhotoTitle = document.querySelector(".popup__photoalbum-title");

export const popupPhoto = ".popup_photoalbum";
export const popupProfile = ".popup_profile";
export const popupMesto = ".popup_mesto";

export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_about");

export const popupList = Array.from(document.querySelectorAll(".popup"));
export const popupInputList = Array.from(document.querySelectorAll(".popup__input"));

export const inputUserName = "input_name";
export const inputJobName = "input_about";

export const nameUser = document.querySelector(".profile__user-name");
export const jobUser = document.querySelector(".profile__user-info");

export const editUser = document.querySelector(".profile__user-edit");
export const addMesto = document.querySelector(".profile__add");


export const popupProfileForm = document.querySelector(".popup__form_profile");

export const popupMestoForm = document.querySelector(".popup__form_mesto");
export const titleInput = document.querySelector(".popup__input_type_title");
export const linkInput = document.querySelector(".popup__input_type_link");

export const templatePhoto = document.querySelector(".template__photoalbum");

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const configs = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
