import '../pages/index.css'; 

import {
    profileEditButton,
    cardAddButton,
    popupProfileEditFormElement,
    popupProfileEditNameInput,
    popupProfileEditJobInput,
    popupCardAddFormElement,
    formValidators,
    initialCards
} from '../utils/constants.js';


import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import api from '../components/Api.js';



const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');
function handlerGetUserByApi(data) {
    userInfo.setUserInfo(data.name, data.about, data.avatar);
}

api.getUser(handlerGetUserByApi);






function handleCardClick(name, link) {
    imagePopup.open(name, link);
}

function createCard(item) {
    const card = new Card(item, '#card', handleCardClick);
    return card.generateCard();
}

const cards = new Section({
    renderer: (item) => {
        const card = createCard(item);
        cards.addItem(card);
      }
}, '.elements');

const addCardPopup = new PopupWithForm('.popup_type_new-card', (data) => {
    const card = {
        'name': data.cardName,
        'link': data.cardLink
    }
    cards.unshiftItem(createCard(card));
    addCardPopup.close();
    formValidators[popupCardAddFormElement.name].resetValidation();
});

function openAddPopupHandler() {
    addCardPopup.open();
}

const imagePopup = new PopupWithImage('.popup_type_image');



const editProfilePopup = new PopupWithForm('.popup_type_profile', (data) => {
    userInfo.setUserInfo(data.avtorName, data.avtorJob)
    editProfilePopup.close();
});

function openProfileEditPopupHandler() {
    const {name, job} = userInfo.getUserInfo();
    popupProfileEditNameInput.value = name;
    popupProfileEditJobInput.value = job;

    popupProfileEditNameInput.dispatchEvent(new Event('input'));
    popupProfileEditJobInput.dispatchEvent(new Event('input'));
    formValidators[popupProfileEditFormElement.name].resetValidation();

    editProfilePopup.open();
}


const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        formValidators[ formElement.name ] = validator;
        validator.enableValidation();
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

cards.render(initialCards);



profileEditButton.addEventListener('click', openProfileEditPopupHandler);
cardAddButton.addEventListener('click',  openAddPopupHandler);

addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
imagePopup.setEventListeners();
