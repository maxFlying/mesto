export class Card {
  constructor(data, myId, templateSelector, { handleCardClick, handleDeleteClick, handleLikeClick }) {
    this._data = data;
    this._title = data.name;
    this._image = data.link;
    this._id = data._id;
    this._userId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._myId= myId.id;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._photoalbumTitle = this._element.querySelector(".photoalbum__title");
    this._photoalbumImage = this._element.querySelector(".photoalbum__image");
    this._likeScore = this._element.querySelector(".photoalbum__like-counter");
    this._likeButton = this._element.querySelector(".photoalbum__like");

    this._setEventListeners();
    this._setDeleteIcon();
    this.toggleLikeScore(this._data);
    
    this._photoalbumTitle.textContent = this._title;
    this._photoalbumImage.src = this._image;
    this._photoalbumImage.alt = this._title;

    return this._element;
  }

  _getTemplate() {
    const сardElement = this._templateSelector.content
      .querySelector(".photoalbum")
      .cloneNode(true);

    return сardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".photoalbum__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._image, this._title);
      });

    this._element
      .querySelector(".photoalbum__like")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._element
      .querySelector(".photoalbum__delete")
      .addEventListener("click", () => {
        
        this._handleDeleteClick();
      });
  }

  _setDeleteIcon() {
    if(this._data.owner._id === this._myId) {
      this._element.querySelector(".photoalbum__delete").classList.remove("photoalbum__delete_off");
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return Boolean(this._data.likes.find((data) => {
      return data._id === this._myId;
    })
  )}

  toggleLikeScore(data) {
    this._data.likes = data.likes;
    this._likeScore.textContent = this._data.likes.length;

    if(this.isLiked()) {
      this._likeButton.classList.add("photoalbum__like_is-active");
    } else {
      this._likeButton.classList.remove("photoalbum__like_is-active");
    }
  }

}
