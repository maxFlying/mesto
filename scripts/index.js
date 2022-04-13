// Из блока profile

const nameUser = document.querySelector('.profile__user-name');
const jobUser = document.querySelector('.profile__user-info');

const editUser = document.querySelector('.profile__user-edit');
const addMesto = document.querySelector('.profile__add');

// Попап Профиль

const popupProfile = document.querySelector('.popup_profile');
const popupProfileCloseButton = document.querySelector('.popup__close_profile');
const popupProfileButton = document.querySelector('.popup__button_profile');
const popupProfileForm = document.querySelector('.popup__form_profile')
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');

// Попап Новое место

const popupMesto = document.querySelector('.popup_mesto');
const popupMestoButton = document.querySelector('.popup__button_create');
const popupMestoCloseButton = document.querySelector('.popup__close_mesto');
const popupMestoForm = document.querySelector('.popup__form_mesto');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

//Попап Фотоальбом

const popupPhoto = document.querySelector('.popup_photoalbum');
const popupPhotoCloseButton = document.querySelector('.popup__close_photoalbum');
const popupPhotoImage = document.querySelector('.popup__photoalbum-image');
const popupPhotoTitle = document.querySelector('.popup__photoalbum-title');

//--------------------------------------------//

function openPopup(popup) {

    popup.classList.add('popup_is-active');
}

function openPopupProfile() { 
    nameInput.value = nameUser.textContent;
    jobInput.value = jobUser.textContent;
    
    openPopup(popupProfile);
} 

function openPopupMesto() { 
    titleInput.value = '';
    linkInput.value = '';
    
    openPopup(popupMesto);
} 

editUser.addEventListener('click', openPopupProfile);
addMesto.addEventListener('click', openPopupMesto);

//--------------------------------------------//

function closePopup(popup) {
    popup.classList.remove('popup_is-active');
}

popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
popupMestoCloseButton.addEventListener('click', () => closePopup(popupMesto));
popupPhotoCloseButton.addEventListener('click', () => closePopup(popupPhoto));

//--------------------------------------------//

function formSubmitHandler (evt) {
    
    evt.preventDefault();

    nameUser.textContent = nameInput.value;
    jobUser.textContent = jobInput.value;

    closePopup(popupProfile);
}

popupProfileForm.addEventListener('submit', formSubmitHandler);


function createNewPhoto(evt) {

    evt.preventDefault();

    const initialCardsNewTitle = getElement({name: titleInput.value, link: linkInput.value})
    photoContainer.prepend(initialCardsNewTitle);

    closePopup(popupMesto);
}

popupMestoForm.addEventListener('submit', createNewPhoto);

//--------------------------------------------//

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
        
        popupPhotoImage.src = item.link;
        popupPhotoImage.alt = item.name;

        popupPhotoTitle.textContent = item.name;
        
        openPopup(popupPhoto);
    });
    
    return getElementTemplate;
}

render();