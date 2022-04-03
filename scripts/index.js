// Переменные

let nameUser = document.querySelector('.user__name');
let jobUser = document.querySelector('.user__info');
let editUser = document.querySelector('.user__edit');

let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close');
let popupSaveButton = document.querySelector('.popup__save');
let popupContainer = document.querySelector('.popup__container');
let nameInput = popupContainer.querySelector('.popup__user-name');
let jobInput = popupContainer.querySelector('.popup__user-about');

// Заполение инпутов

nameInput.value = nameUser.textContent
jobInput.value = jobUser.textContent

// Открытие и закрытие попапа

function togglePopup() {
    popup.classList.toggle('popup_is-active');
}

editUser.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);

// Редактирование информации о пользователе

function formSubmitHandler (evt) {
    
    evt.preventDefault();

    nameUser.textContent = nameInput.value;
    jobUser.textContent = jobInput.value;

    togglePopup();
}

popupContainer.addEventListener('submit', formSubmitHandler);