import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(containerSelector, handleSubmitForm) {
        super(containerSelector);
        this._form = this._popup.querySelector('.form');
        this._inputElements = this._form.querySelectorAll('.form__input');
        this._inputValues = {}; 
        this._submitButton = this._popup.querySelector('.form__save');
        this._submitForm = handleSubmitForm;
    }

    renderLoading(isLoading, buttonText = 'Сохранить') {
        this._submitButton.textContent = buttonText;
        this._submitButton.disabled = isLoading;
    }

    _getInputValues() {
         this._inputElements.forEach((item) => {
            this._inputValues[item.name] = item.value;
        });
    }

    _returnInputValues() {
        this._getInputValues();
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._submitForm( this._returnInputValues() );
        } );
    }
    
    close() {
        super.close();
        this._form.reset();
    }
}