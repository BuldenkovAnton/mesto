import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

    constructor(containerSelector) {
        super(containerSelector);

        this._img = document.querySelector('.popup__image');
        this._caption = document.querySelector('.popup__figcaption');
    }

    open(name, link) {
        super.open();
        this._img.setAttribute('src', link);
        this._img.setAttribute('alt', name);
        this._caption.textContent = name;
    }
}