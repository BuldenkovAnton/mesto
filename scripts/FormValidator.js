class FormValidator {
    constructor (options, formElement){
        this._options = options;
        this._formElement = formElement;
    }

    _showInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._options.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._options.errorClass);
    };
      
    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._options.inputErrorClass);
        errorElement.classList.remove(this._options.errorClass);
        errorElement.textContent = '';
    };
    
    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
      });
    }
    
    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) { 
          buttonElement.classList.add(this._options.inactiveButtonClass);
          buttonElement.setAttribute('disabled', true);
        } else {
          buttonElement.classList.remove(this._options.inactiveButtonClass);
          buttonElement.removeAttribute('disabled');
        } 
    }
    
    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }


    _setEventListeners = () => {
        const inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
        const buttonElement = this._formElement.querySelector(this._options.submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement);
    
        inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState(inputList, buttonElement);
          });
        });
      };

    
    enableValidation = () => {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    
        this._setEventListeners();
    };
}

export default FormValidator;