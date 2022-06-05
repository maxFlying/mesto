export class Card {
  constructor(data, templateSelector, { handleCardClick }) {
    this._data = data;
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector(".photoalbum__title").textContent = this._title;
    this._element.querySelector(".photoalbum__image").src = this._image;
    this._element.querySelector(".photoalbum__image").alt = this._title;

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
      .addEventListener("click", (evt) => {
        this._toggleLikeButton(evt);
      });

    this._element
      .querySelector(".photoalbum__delete")
      .addEventListener("click", (evt) => {
        this._deleteCard(evt);
      });
  }

  _toggleLikeButton(evt) {
    evt.target.classList.toggle("photoalbum__like_is-active");
  }

  _deleteCard() {
    this._element.remove();
  }
}
