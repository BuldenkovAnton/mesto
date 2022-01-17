export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    clear() {
        this._container.innerHTML = '';
      }

    addItem(item) {
        this._container.append(item);
    }

    prependItem(item) {
        this._container.prepend(item);
    }

    render(items) {
        this.clear();
        items.forEach((item) => {
            this._renderer(item);
        });
    }
}