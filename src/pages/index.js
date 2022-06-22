import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";


import {
  popupPhoto,
  nameInput,
  jobInput,
  inputUserName,
  inputJobName,
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
  configs,
  popupDel
} from '../utils/constants.js';

import './index.css'

//--------------------------------------------//

const PopupDeleteCard = new PopupWithConfirmation(popupDel);
PopupDeleteCard.setEventListeners();



const api = new Api();

const promises = [api.getDefaultCard(), api.getUserInfo()];

Promise.all(promises)
  .then(([defaultCard, userInfo]) => {
    profileInfo.setUserInfo2(userInfo);
    cardList.renderItems(defaultCard);
  })
  .catch((err) => {
    console.log(err);
  })

const profileInfo = new UserInfo({userName: nameUser, userJob: jobUser});

const profileFormSubmit = new PopupWithForm(popupProfile, {
  handleFormSubmit: (value) => {
    api.editUserInfo(value[inputUserName], value[inputJobName])
    .then((value) => {
      profileInfo.setUserInfo(value.name, value.about);
    })
    .catch((err) => {
      console.log(err)
    })
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
  },
    handleDeleteClick: () => {
      PopupDeleteCard.open();
      PopupDeleteCard.handleFormSubmit(() => {
        api.deleteCard(card.getId())
          .then((res) => {
            card.deleteCard()
            PopupDeleteCard.close()
          })
          .catch((err) => {
            console.log(err)
          })
      })
    },
    handleLikeClick: () => {
      if(card.isLiked()) {
        api.removeLike(card.getId())
          .then((res) => {
            card.toggleLikeScore(res)
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        api.addLike(card.getId())
          .then((res) => {
            card.toggleLikeScore(res)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
}



const newPhoto = new PopupWithForm(popupMesto, {
  handleFormSubmit: (item) => {
      api.addUserCard(item)
        .then((result) => {
          const newUserCard = addNewCard(result, templatePhoto);
          cardList.addUserItem(newUserCard);
        })
        .catch((err) => {
          console.log(err)
        })
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
  renderer: (item) => {
    const defaultCard = addNewCard(item, templatePhoto);
    cardList.addItem(defaultCard);
  }}, '.photogrid__list');

//--------------------------------------------//

const editProfileValidator = new FormValidator(configs, popupProfileForm);
editProfileValidator.enableValidation();

const newMestoValidator = new FormValidator(configs, popupMestoForm);
newMestoValidator.enableValidation();