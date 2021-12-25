export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    clear() {
        this._containerSelector.innerHTML = '';
      }

    addItem(item) {
        this._containerSelector.append(item);
    }

    unshiftItem(item) {
        this._containerSelector.prepend(item);
    }

    render(items) {
        this.clear();
        
        items.forEach((item) => {
            this._renderer(item);
        });
    }
}