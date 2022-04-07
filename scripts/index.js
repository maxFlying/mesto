// Переменные

let nameUser = document.querySelector('.profile__user-name');
let jobUser = document.querySelector('.profile__user-info');
let editUser = document.querySelector('.profile__user-edit');

let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close');
let popupSaveButton = document.querySelector('.popup__save');
let popupContainer = document.querySelector('.popup__container');
let nameInput = popupContainer.querySelector('.poput__input_name');
let jobInput = popupContainer.querySelector('.poput__input_about');

// Открытие попапа

function openPopup() {
    popup.classList.add('popup_is-active');
    
    nameInput.value = nameUser.textContent
    jobInput.value = jobUser.textContent
}

editUser.addEventListener('click', openPopup);

// Закрытие попапа

function closePopup() {
    popup.classList.remove('popup_is-active');
}

popupCloseButton.addEventListener('click', closePopup);

// Редактирование информации о пользователе

function formSubmitHandler (evt) {
    
    evt.preventDefault();

    nameUser.textContent = nameInput.value;
    jobUser.textContent = jobInput.value;

    closePopup();
}

popupContainer.addEventListener('submit', formSubmitHandler);