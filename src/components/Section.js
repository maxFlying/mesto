export class Section {
  constructor({ renderer }, containerSelector) {
    // this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(array) {
    array.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }

  addUserItem(element) {
    this._container.prepend(element);
  }
}