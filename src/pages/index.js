import '../pages/index.css'; 

import {
    profileEditButton,
    cardAddButton,
    popupProfileEditFormElement,
    popupProfileEditNameInput,
    popupProfileEditJobInput,
    popupCardAddFormElement,
    popupDeleteCardFormElement,
    popupDeleteCardIdHidden,
    formValidators,
} from '../utils/constants.js';


import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import api from '../components/Api.js';


const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

function openProfileEditPopupHandler() {
    const {name, job} = userInfo.getUserInfo();
    popupProfileEditNameInput.value = name;
    popupProfileEditJobInput.value = job;

    popupProfileEditNameInput.dispatchEvent(new Event('input'));
    popupProfileEditJobInput.dispatchEvent(new Event('input'));
    formValidators[popupProfileEditFormElement.name].resetValidation();

    editProfilePopup.open();
}

const editProfilePopup = new PopupWithForm('.popup_type_profile', (data) => {
    api.setUser(data.avtorName, data.avtorJob)
    .then((data) => {
        console.log(data);
        userInfo.setUserInfo(data);
      })
      .catch((err) => console.log(err))
      .finally(() => editProfilePopup.close());
});





function handleCardClick(name, link) {
    imagePopup.open(name, link);
}

function handleCardAddLike(cardId) {
    api.addLike(cardId)
        .then((data) => {
            console.log(data);
            this.updateLikesCard(data.likes);
        })
        .catch((err) => console.log(err));
}

function handleCardDeleteLike(cardId) {
    api.deleteLike(cardId)
        .then((data) => {
            console.log(data);
            this.updateLikesCard(data.likes);
        })
        .catch((err) => console.log(err));
}

function handleCardDelete(cardId) {
    console.log('delete', cardId);
    popupDeleteCardIdHidden.value = cardId;
    deleteCardPopup.open();
}


function createCard(item) {
    const card = new Card(
        userInfo.getUserId(), 
        item, 
        '#card', 
        handleCardClick, 
        handleCardAddLike, 
        handleCardDeleteLike, 
        handleCardDelete
    );

    return card.generateCard();
}

const cards = new Section({
    renderer: (item) => {
        const card = createCard(item);
        cards.addItem(card);
      }
}, '.elements');

const imagePopup = new PopupWithImage('.popup_type_image');

const addCardPopup = new PopupWithForm('.popup_type_new-card', (data) => {
    const card = {
        'name': data.cardName,
        'link': data.cardLink
    }

    api.addCard(data.cardName, data.cardLink)
        .then((data) => {
            console.log(data);
            cards.prependItem(createCard(data));
        })
        .catch((err) => console.log(err))
        .finally(() => {
            addCardPopup.close();
            formValidators[popupCardAddFormElement.name].resetValidation();
        });

});


const deleteCardPopup = new PopupWithForm('.popup_type_delete-card', (data) => {
  api.deleteCard(data.id)
        .then((res) => {
            console.log(res);
            document.querySelector('#id-' + data.id).remove();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            deleteCardPopup.close();
        });

});





const changeAvatarPopup = new PopupWithForm('.popup_type_change-avatar', (data) => {
    // const card = {
    //     'name': data.cardName,
    //     'link': data.cardLink
    // }

    // api.addCard(data.cardName, data.cardLink)
    //     .then((data) => {
    //         console.log(data);
    //         cards.prependItem(createCard(data));
    //     })
    //     .catch((err) => console.log(err));

    changeAvatarPopup.close();
    formValidators[popupCardAddFormElement.name].resetValidation();
});



const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        formValidators[ formElement.name ] = validator;
        validator.enableValidation();
    });

    console.log(formValidators);
};


enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

function loadData() {
    api.getUser() 
    .then((data) => {
        console.log(data);
        userInfo.setUserInfo(data);
    })
    .then(() => {
       return api.getInitialCards(); 
    })
    .then((data) => {
        console.log(data);
        cards.render(data);
    })
    .catch((err) => console.log(err));
}


loadData();

profileEditButton.addEventListener('click', openProfileEditPopupHandler);
cardAddButton.addEventListener('click',  () => addCardPopup.open());

addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
imagePopup.setEventListeners();
changeAvatarPopup.setEventListeners();
deleteCardPopup.setEventListeners();
