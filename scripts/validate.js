
const showInputError = (formOptions, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(formOptions.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(formOptions.errorClass);
  };
  
  const hideInputError = (formOptions, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(formOptions.inputErrorClass);
    errorElement.classList.remove(formOptions.errorClass);
    errorElement.textContent = '';
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  });
  }

const toggleButtonState = (formOptions, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) { 
      buttonElement.classList.add(formOptions.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(formOptions.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    } 
 }

const checkInputValidity = (formOptions, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formOptions, formElement, inputElement);
    } else {
      hideInputError(formOptions, formElement, inputElement);
    }
  };

  const setEventListeners = (formOptions, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(formOptions.inputSelector));
    const buttonElement = formElement.querySelector(formOptions.submitButtonSelector);
    toggleButtonState(formOptions, inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formOptions, formElement, inputElement);
        toggleButtonState(formOptions, inputList, buttonElement);
      });
    });
  };

const enableValidation = (forms) => {
    const formOptions = forms;
    const formList = Array.from(document.querySelectorAll(formOptions.formSelector));

    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
  
      setEventListeners(formOptions, formElement);   
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }); 