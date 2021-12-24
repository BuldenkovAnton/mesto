export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    clear() {
        this._containerSelector.innerHTML = '';
      }

    addItem(item) {
        this._containerSelector.prepend(item);
    }

    render() {
        this.clear();
        
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }
}