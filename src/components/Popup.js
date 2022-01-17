export default class Popup {
    constructor(containerSelector) {
        this._popup = document.querySelector(containerSelector);
    }

    _handleEscClose = (e) => {
        if (e.key === 'Escape') {
            this.close();     
        } 
    }

    _handleOverlayAndButtonClose = (e) => {  
        if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__close')) {
            this.close();
        }
    }

    open() {
        this._popup.classList.add('popup_opened');   
        document.addEventListener('keydown', this._handleEscClose); 
    }

    close() {
        this._popup.classList.remove('popup_opened');   
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._popup.addEventListener('click', this._handleOverlayAndButtonClose);
    }
}