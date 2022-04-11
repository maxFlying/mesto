// Переменные

const nameUser = document.querySelector('.profile__user-name');
const jobUser = document.querySelector('.profile__user-info');
const editUser = document.querySelector('.profile__user-edit');

const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const popupSaveButton = document.querySelector('.popup__button');
const popupContainer = document.querySelector('.popup__container');
const nameInput = popupContainer.querySelector('.popup__input_type_name');
const jobInput = popupContainer.querySelector('.popup__input_type_about');

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
    popupMesto.classList.remove('popup_is-active');
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

//----------------------Проектная работа №5----------------------//

// Добавление карточек на страницу через template

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

const popupPhoto = document.querySelector('.popup_photoalbum');

function render() {
    const photogrid = initialCards.map(getElement);
    photoContainer.append(...photogrid);
}

function getElement(item) {
    const getElementTemplate = templatePhoto.content.cloneNode(true);
    
    const name = getElementTemplate.querySelector('.photoalbum__title');
    name.textContent = item.name;
    
    const link = getElementTemplate.querySelector('.photoalbum__image');
    link.src = item.link;
    link.alt = item.name;

    // Лайк
    getElementTemplate.querySelector('.photoalbum__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('photoalbum__like_is-active');
    });

    //Удаление карточки
    getElementTemplate.querySelector('.photoalbum__delete').addEventListener('click', function(evt) {
        const element = evt.target.closest('.photoalbum');
        element.remove();
    });

    //Попап Фото
    getElementTemplate.querySelector('.photoalbum__image').addEventListener('click', function() {
        popupPhoto.classList.add('popup_is-active');

        const img = document.querySelector('.popup__photoalbum-image');
        img.src = item.link;
        img.alt = item.name;

        const title = document.querySelector('.popup__photoalbum-title');
        title.textContent = item.name;
    });

    document.querySelector('.popup__close_photoalbum').addEventListener('click', function() {
        popupPhoto.classList.remove('popup_is-active');
    });;
    
    return getElementTemplate;
}

render();

// Попап Новое место

const popupMesto = document.querySelector('.popup_mesto');
const addMesto = document.querySelector('.profile__add');
const popupCreateButton = document.querySelector('.popup__button_create');
const popupMestoCloseButton = document.querySelector('.popup__close_mesto');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

function openPopupMesto() {
    popupMesto.classList.add('popup_is-active');
}

addMesto.addEventListener('click', openPopupMesto);

function closePopupMesto() {
    popupMesto.classList.remove('popup_is-active');
}

popupMestoCloseButton.addEventListener('click', closePopupMesto);

function createNewPhoto(evt) {

    evt.preventDefault();

    const initialCardsNewTitle = getElement({name: titleInput.value, link: linkInput.value})
    photoContainer.prepend(initialCardsNewTitle);

    closePopupMesto();
}

popupCreateButton.addEventListener('click', createNewPhoto);