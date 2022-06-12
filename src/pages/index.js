import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";


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
} from '../utils/constants.js';

import './index.css'

//--------------------------------------------//

const profileInfo = new UserInfo({userName: nameUser, userJob: jobUser});

const profileFormSubmit = new PopupWithForm(popupProfile, {
  handleFormSubmit: (value) => {
    profileInfo.setUserInfo(value[inputUserName], value[inputJobName]);
  }
})

function openPopupProfile() {
  const UserInfo = profileInfo.getUserInfo()
  nameInput.value = UserInfo.name;
  jobInput.value = UserInfo.job;

  editProfileValidator.toggleButton();
}

profileFormSubmit.setEventListeners();

editUser.addEventListener('click', () => {
  openPopupProfile();
  profileFormSubmit.open();
});

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
      cardList.addUserItem(newUserCard);
  }
})

newPhoto.setEventListeners();

addMesto.addEventListener('click', () => {
  newMestoValidator.toggleButton();
  newPhoto.open()
});

//--------------------------------------------//

const bigPhoto = new PopupWithImage(popupPhoto);

function openBigPhoto(image, title) {
  bigPhoto.open(image, title);
}

bigPhoto.setEventListeners()

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const defaultCard = addNewCard(item, templatePhoto);
    cardList.addItem(defaultCard);
  }}, '.photogrid__list');

cardList.renderItems()

//--------------------------------------------//

const editProfileValidator = new FormValidator(configs, popupProfileForm);
editProfileValidator.enableValidation();

const newMestoValidator = new FormValidator(configs, popupMestoForm);
newMestoValidator.enableValidation();