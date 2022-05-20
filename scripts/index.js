import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";

// Из блока profile

const nameUser = document.querySelector('.profile__user-name');
const jobUser = document.querySelector('.profile__user-info');

const editUser = document.querySelector('.profile__user-edit');
const addMesto = document.querySelector('.profile__add');

// Попап Профиль

const popupProfile = document.querySelector('.popup_profile');
const popupProfileForm = document.querySelector('.popup__form_profile')
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');

// Попап Новое место

const popupMesto = document.querySelector('.popup_mesto');
const popupMestoForm = document.querySelector('.popup__form_mesto');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

//--------------------------------------------//

const popupList = Array.from(document.querySelectorAll('.popup'));
const photoContainer = document.querySelector('.photogrid__list');
const templatePhoto = document.querySelector('.template__photoalbum');

//--------------------------------------------//

export function openPopup(popup) {
    popup.classList.add('popup_is-active');
    document.addEventListener('keydown', closePopupEsc); 
}

function openPopupProfile() {
    
    nameInput.value = nameUser.textContent;
    jobInput.value = jobUser.textContent;

    editProfileValidator.toggleButton();
    
    openPopup(popupProfile);
}

function openPopupMesto() {
    popupMestoForm.reset()

    newMestoValidator.toggleButton();

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
    
    photoContainer.prepend(addNewCard({name: titleInput.value, link: linkInput.value}, templatePhoto));

    closePopup(popupMesto);
}

popupMestoForm.addEventListener('submit', createNewPhoto);

//--------------------------------------------//

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

function addNewCard(arrayItem, template) {
  const card = new Card(arrayItem, template);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((item) => {
  photoContainer.append(addNewCard(item, templatePhoto));
});

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