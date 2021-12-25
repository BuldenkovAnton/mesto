export default class Popup {
    constructor(containerSelector) {
        this._containerSelector = document.querySelector(containerSelector);
    }

    _handleEscClose = (e) => {
        if (e.key === 'Escape') {
            this.close();     
        } 
    }

    _handleOverlayAndButtonClose = (e) => {  
        if (e.target.classList.contains('popup_opened')) {
            this.close();
        }
        if (e.target.classList.contains('popup__close')) {
            this.close();
        }
    }

    open() {
        this._containerSelector.classList.add('popup_opened');   
        document.addEventListener('keydown', this._handleEscClose); 
    }

    close() {
        this._containerSelector.classList.remove('popup_opened');   
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        document.addEventListener('click', this._handleOverlayAndButtonClose);
    }
}