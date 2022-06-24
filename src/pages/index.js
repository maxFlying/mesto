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
  templatePhoto,
  configs,
  popupDel,
  avatarUser,
  popupAvatar,
  editAvatar,
  popupAvatarForm
} from '../utils/constants.js';

import './index.css'

//--------------------------------------------//

const PopupDeleteCard = new PopupWithConfirmation(popupDel);
PopupDeleteCard.setEventListeners();

const api = new Api();

const promises = [api.getDefaultCard(), api.getUserInfo()];

Promise.all(promises)
  .then(([defaultCard, userInfo]) => {
    profileInfo.setUserInfo(userInfo);
    profileInfo.setUserAvatar(userInfo)
    cardList.renderItems(defaultCard);
  })
  .catch((err) => {
    console.log(err);
  })

const profileInfo = new UserInfo({userName: nameUser, userJob: jobUser, userAvatar: avatarUser});

const profileFormSubmit = new PopupWithForm(popupProfile, {
  handleFormSubmit: (value) => {
    handleLoading(popupProfile, true);
    api.editUserInfo(value[inputUserName], value[inputJobName])
    .then((value) => {
      profileInfo.setUserInfo(value.name, value.about);
      handleLoading(popupProfile, false);
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

function addNewCard(arrayItem, myId, template) {
  const card = new Card(arrayItem, myId, template, {
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
    handleLoading(popupMesto, true);
    api.addUserCard(item)
      .then((res) => {
        const newUserCard = addNewCard(res, profileInfo.getUserInfo(), templatePhoto);
        cardList.addUserItem(newUserCard);
        handleLoading(popupMesto, false);
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

const newAvatar = new PopupWithForm(popupAvatar, {
  handleFormSubmit: (item) => {
    handleLoading(popupAvatar, true);
    api.editUserAvatar(item)
      .then((res) => {
        profileInfo.setUserAvatar(res)
        handleLoading(popupAvatar, false);
      })
      .catch((err) => {
        console.log(err)
      })
  }
})

newAvatar.setEventListeners()

editAvatar.addEventListener('click', () => {
  editAvatarValidator.toggleButton();
  newAvatar.open()
});

function handleLoading(popupSelector, isLoading) {
  const popup = document.querySelector(popupSelector);
  const popupButton = popup.querySelector('.popup__button');

  if(isLoading) {
    popupButton.textContent = 'Сохранение...';
  } else {
    popupButton.textContent = 'Сохранить';
  }
}

const bigPhoto = new PopupWithImage(popupPhoto);

function openBigPhoto(image, title) {
  bigPhoto.open(image, title);
}

bigPhoto.setEventListeners()

const cardList = new Section({
  renderer: (item) => {
    const defaultCard = addNewCard(item, profileInfo.getUserInfo(), templatePhoto);
    cardList.addItem(defaultCard);
  }}, '.photogrid__list');

const editProfileValidator = new FormValidator(configs, popupProfileForm);
editProfileValidator.enableValidation();

const newMestoValidator = new FormValidator(configs, popupMestoForm);
newMestoValidator.enableValidation();

const editAvatarValidator = new FormValidator(configs, popupAvatarForm);
editAvatarValidator.enableValidation();