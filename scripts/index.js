// Из блока profile

const nameUser = document.querySelector('.profile__user-name');
const jobUser = document.querySelector('.profile__user-info');

const editUser = document.querySelector('.profile__user-edit');
const addMesto = document.querySelector('.profile__add');

// Попап Профиль

const popupProfile = document.querySelector('.popup_profile');
const popupProfileButton = document.querySelector('.popup__button_profile');
const popupProfileForm = document.querySelector('.popup__form_profile')
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');

// Попап Новое место

const popupMesto = document.querySelector('.popup_mesto');
const popupMestoButton = document.querySelector('.popup__button_create');
const popupMestoForm = document.querySelector('.popup__form_mesto');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

//--------------------------------------------//

const popupList = Array.from(document.querySelectorAll('.popup'));
const inputList = Array.from(document.querySelectorAll('.popup__input'));

//--------------------------------------------//

function openPopup(popup) {
    popup.classList.add('popup_is-active');
    document.addEventListener('keydown', closePopupEsc); 
}

function openPopupProfile() {
    
    nameInput.value = nameUser.textContent;
    jobInput.value = jobUser.textContent;

    editProfileValidator.toggleButton(popupProfileButton);
    
    openPopup(popupProfile);
}

function openPopupMesto() {
    popupMestoForm.reset()

    newMestoValidator.toggleButton(popupMestoButton);

    openPopup(popupMesto);
    
}

editUser.addEventListener('click', openPopupProfile);
addMesto.addEventListener('click', openPopupMesto);

//--------------------------------------------//

function closePopup(popup) {
    popup.classList.remove('popup_is-active');
    document.removeEventListener('keydown', closePopupEsc); 
}

popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_is-active')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    });
});

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-active');
    closePopup(openedPopup);
  }
};

//--------------------------------------------//

function handleProfileFormSubmit (evt) {
    
    evt.preventDefault();

    nameUser.textContent = nameInput.value;
    jobUser.textContent = jobInput.value;

    closePopup(popupProfile);
}

popupProfileForm.addEventListener('submit', handleProfileFormSubmit);


function createNewPhoto(evt) {

    evt.preventDefault();

      const card = new Card({name: titleInput.value, link: linkInput.value}, templatePhoto);
      const cardElement = card.generateCard();
    
      photoContainer.prepend(cardElement);

    closePopup(popupMesto);
}

popupMestoForm.addEventListener('submit', createNewPhoto);

//--------------------------------------------//

import { Card } from "./Card.js";

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg' 
    }
];

const photoContainer = document.querySelector('.photogrid__list');
const templatePhoto = document.querySelector('.template__photoalbum');

initialCards.forEach((item) => {
  const card = new Card(item, templatePhoto);
  const cardElement = card.generateCard();


  photoContainer.append(cardElement);
});

import { FormValidator } from "./FormValidator.js";

const configs = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const editProfileValidator = new FormValidator(configs, popupProfileForm);
editProfileValidator.enableValidation();

const newMestoValidator = new FormValidator(configs, popupMestoForm);
newMestoValidator.enableValidation();