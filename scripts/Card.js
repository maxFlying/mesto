// class Card222 {
//     constructor(data, templateSelector) {
//         this._name = data.name;
//         this._link = data.link;
//         this._templateSelector = templateSelector;
//     }

//     getElement() {
//         this._element = this._templateSelector.content.cloneNode(true).querySelector('.photoalbum');
        
//         this._element.querySelector('.photoalbum__title').textContent = this._name;
//         this._element.querySelector('.photoalbum__image').link = this._link;
//         this._element.querySelector('.photoalbum__image').alt = this._name;

//         this._element.querySelector('.photoalbum__like').addEventListener('click', (evt) => {
//             evt.target.classList.toggle('photoalbum__like_is-active');
//         });

//         this._element.querySelector('.photoalbum__delete').addEventListener('click', (evt) => {
//             evt.target.closest('.photoalbum').remove();
//         });
//     }
// }

const popupPhotoImage = document.querySelector('.popup__photoalbum-image');
const popupPhotoTitle = document.querySelector('.popup__photoalbum-title');
const popupPhoto = document.querySelector('.popup_photoalbum');

export class Card {
    constructor(data, templateSelector) {
        this._title = data.name;
        this._image = data.link;
        this._templateSelector = templateSelector;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        
        this._element.querySelector('.photoalbum__title').textContent = this._title;
        this._element.querySelector('.photoalbum__image').src = this._image;
        this._element.querySelector('.photoalbum__image').alt = this._title;
    
        return this._element; 
    }

    _getTemplate() {
        const CardElement = this._templateSelector.content.querySelector('.photoalbum').cloneNode(true);
        
        return CardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.photoalbum__image').addEventListener('click', () => {
        this._openPopup();
      });

      this._element.querySelector('.photoalbum__like').addEventListener('click', (evt) => {
        this. _toggleLikeButton(evt);
      });

      this._element.querySelector('.photoalbum__delete').addEventListener('click', (evt) => {
        this._deleteCard(evt);
      });
    }

    _openPopup() {
        popupPhotoImage.src = this._image;
        popupPhotoImage.alt = this._title;
        popupPhotoTitle.textContent = this._title;
        
        popupPhoto.classList.add('popup_is-active');

        
    }

    _toggleLikeButton(evt) {
        evt.target.classList.toggle('photoalbum__like_is-active');
    }

    _deleteCard(evt) {
        evt.target.closest('.photoalbum').remove();
    }

}