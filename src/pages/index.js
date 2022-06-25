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

import { handleLoading } from "../utils/utils.js";

import './index.css'

//--------------------------------------------//

const popupDeleteCard = new PopupWithConfirmation(popupDel);
popupDeleteCard.setEventListeners();

const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: '02a71f6f-2ada-48d2-887a-7441d08e7ada',
    'Content-Type': 'application/json'
}
});

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
      profileInfo.setUserInfo(value);
      profileFormSubmit.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() =>{
      handleLoading(popupProfile, false);
    })
  }
})

function openPopupProfile() {
  const userInfo = profileInfo.getUserInfo()
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;

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
      popupDeleteCard.open();
      popupDeleteCard.handleFormSubmit(() => {
        api.deleteCard(card.getId())
          .then((res) => {
            card.deleteCard()
            popupDeleteCard.close()
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

const popupAddCard = new PopupWithForm(popupMesto, {
  handleFormSubmit: (item) => {
    handleLoading(popupMesto, true);
    api.addUserCard(item)
      .then((res) => {
        const newUserCard = addNewCard(res, profileInfo.getUserInfo(), templatePhoto);
        cardList.prependItem(newUserCard);
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        handleLoading(popupMesto, false);
      })
  }
})

popupAddCard.setEventListeners();

addMesto.addEventListener('click', () => {
  newMestoValidator.toggleButton();
  popupAddCard.open()
});

const popupEditAvatar = new PopupWithForm(popupAvatar, {
  handleFormSubmit: (item) => {
    handleLoading(popupAvatar, true);
    api.editUserAvatar(item)
      .then((res) => {
        profileInfo.setUserAvatar(res)
        popupEditAvatar.close()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        handleLoading(popupAvatar, false);
      })
  }
})

popupEditAvatar.setEventListeners()

editAvatar.addEventListener('click', () => {
  editAvatarValidator.toggleButton();
  popupEditAvatar.open()
});

const popupImage = new PopupWithImage(popupPhoto);

function openBigPhoto(image, title) {
  popupImage.open(image, title);
}

popupImage.setEventListeners();

const cardList = new Section({
  renderer: (item) => {
    const defaultCard = addNewCard(item, profileInfo.getUserInfo(), templatePhoto);
    cardList.appendItem(defaultCard);
  }}, '.photogrid__list');

const editProfileValidator = new FormValidator(configs, popupProfileForm);
editProfileValidator.enableValidation();

const newMestoValidator = new FormValidator(configs, popupMestoForm);
newMestoValidator.enableValidation();

const editAvatarValidator = new FormValidator(configs, popupAvatarForm);
editAvatarValidator.enableValidation();