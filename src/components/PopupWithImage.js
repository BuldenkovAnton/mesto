import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

    constructor(containerSelector) {
        super(containerSelector);

        this._img = this._popup.querySelector('.popup__image');
        this._caption = this._popup.querySelector('.popup__figcaption');
    }

    open(name, link) {
        super.open();
        this._img.setAttribute('src', link);
        this._img.setAttribute('alt', name);
        this._caption.textContent = name;
    }
}