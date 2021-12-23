class FormValidator {
    constructor (options, formElement){
        this._options = options;
        this._formElement = formElement;

        this._inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));

        this._buttonElement = this._formElement.querySelector(this._options.submitButtonSelector);
    }

    resetValidation() {
      this._toggleButtonState();

      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
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
    
    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
      });
    }
    
    _toggleButtonState = () => {
        if (this._hasInvalidInput()) { 
          this._buttonElement.classList.add(this._options.inactiveButtonClass);
          this._buttonElement.setAttribute('disabled', true);
        } else {
          this._buttonElement.classList.remove(this._options.inactiveButtonClass);
          this._buttonElement.removeAttribute('disabled');
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
      this._toggleButtonState();

      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
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