import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { Popup } from "./components/Popup.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { UserInfo } from "./components/UserInfo.js";
import { PopupWithForm } from "./components/PopupWithForm.js";


import {
  popupPhoto,
  nameInput,
  jobInput,
  inputUserName,
  inputJobName,
  initialCards,
  nameUser,
  jobUser,
  editUser,
  addMesto,
  popupProfile,
  popupProfileForm,
  popupMesto,
  popupMestoForm,
  titleInput,
  linkInput,
  templatePhoto,
  configs
} from './utils/constants.js';

import './pages/index.css'


function openPopup(popupSelector) {
  const popupClass = new Popup (popupSelector);
  popupClass.open();
  popupClass.setEventListeners();
}

// function closePopup(popupSelector) {
//   const popupClass = new Popup (popupSelector);
//   popupClass.close();
// }

//--------------------------------------------//

const profileInfo = new UserInfo({userName: nameUser, userJob: jobUser});

const profileFormSubmit = new PopupWithForm(popupProfile, {
  handleFormSubmit: (value) => {
    profileInfo.setUserInfo(value[inputUserName], value[inputJobName]);
  }
})

function openPopupProfile() {
  nameInput.value = profileInfo.getUserInfo().name;
  jobInput.value = profileInfo.getUserInfo().job;

  editProfileValidator.toggleButton();
  
  openPopup(popupProfile);
}

profileFormSubmit.setEventListeners();

editUser.addEventListener('click', openPopupProfile);

//--------------------------------------------//

function addNewCard(arrayItem, template) {
  const card = new Card(arrayItem, template, {
    handleCardClick: (image, title) => {
    openBigPhoto(image, title);
  }});
  const cardElement = card.generateCard();
  return cardElement;
}

const newPhoto = new PopupWithForm(popupMesto, {
  handleFormSubmit: (item) => {
      const newUserCard = addNewCard({name: titleInput.value, link: linkInput.value}, templatePhoto);
      CardList.addUserItem(newUserCard);
  }
})

newPhoto.setEventListeners();

function openPopupMesto() {
  newMestoValidator.toggleButton();
  openPopup(popupMesto);
}

addMesto.addEventListener('click', openPopupMesto);

//--------------------------------------------//

const bigPhoto = new PopupWithImage(popupPhoto);

function openBigPhoto(image, title) {
  bigPhoto.open(image, title);
}

bigPhoto.setEventListeners()

const CardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, templatePhoto, {
      handleCardClick: (image, title) => {
        openBigPhoto(image, title);
      }});
    const cardElement = card.generateCard();
    CardList.addItem(cardElement);
  }}, '.photogrid__list');

CardList.renderItems()

//--------------------------------------------//

const editProfileValidator = new FormValidator(configs, popupProfileForm);
editProfileValidator.enableValidation();

const newMestoValidator = new FormValidator(configs, popupMestoForm);
newMestoValidator.enableValidation();