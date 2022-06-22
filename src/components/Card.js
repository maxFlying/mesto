export class Card {
  constructor(data, myId, templateSelector, { handleCardClick, handleDeleteClick, handleLikeClick }) {
    this._data = data;
    this._title = data.name;
    this._image = data.link;
    this._like = data.likes;
    this._id = data._id;
    this._userId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._myId= myId.id;
    // console.log(this._myId)
  }

  // f7e4050e6c1f99ee34d90013

  generateCard() {
    this._element = this._getTemplate();
    this._photoalbumTitle = this._element.querySelector(".photoalbum__title");
    this._photoalbumImage = this._element.querySelector(".photoalbum__image");

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
        // this._toggleLikeButton(evt)
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

  // _toggleLikeButton(evt) {
  //   evt.target.classList.toggle("photoalbum__like_is-active");
  // }
  
  // isLiked() {
  //   this._like.find((data) => {
  //     console.log(data._id)
  //     if(data._id === this._myId) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   })
  // }

  isLiked() {
    return Boolean(this._like.find((data) => {
      console.log(this._myId)
      // console.log(data._id)
      return data._id === this._myId;
    })
  )}

  toggleLikeScore(data) {
    this._data = data;
    this._data.likes = data.likes;
    this._likeScore = this._element.querySelector(".photoalbum__like-counter");
    this._likeButton = this._element.querySelector(".photoalbum__like");

    this._likeScore.textContent = this._data.likes.length;

    if(this.isLiked()) {
      // console.log(this.isLiked())
      this._likeButton.classList.add("photoalbum__like_is-active");
    } else {
      // console.log(this.isLiked())
      this._likeButton.classList.remove("photoalbum__like_is-active");
    }
  }
  
  // butA() {
  //   this._likeButton.classList.add("photoalbum__like_is-active");
  // }

  // butD() {  
  //   this._likeButton.classList.remove("photoalbum__like_is-active");
  // }
  
}
