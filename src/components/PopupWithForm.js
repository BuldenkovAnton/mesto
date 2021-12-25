import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(containerSelector, handleSubmitForm) {
        super(containerSelector);
        this._form = this._containerSelector.querySelector('.form');
        this._inputElements = this._form.querySelectorAll('.form__input');
        this._inputValues = []; 
        this._submitForm = handleSubmitForm;
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