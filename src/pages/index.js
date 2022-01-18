import '../pages/index.css'; 

import {
    profileEditButton,
    cardAddButton,
    avatarChangeButton,
    popupProfileEditFormElement,
    popupProfileEditNameInput,
    popupProfileEditJobInput,
    popupCardAddFormElement,
    popupDeleteCardIdHidden,
    formValidators,
    popupChangeAvatarFormElement,
} from '../utils/constants.js';


import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import api from '../components/Api.js';


const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.avatar__image');

function openProfileEditPopupHandler() {
    const {name, job} = userInfo.getUserInfo();
    popupProfileEditNameInput.value = name;
    popupProfileEditJobInput.value = job;

    formValidators[popupProfileEditFormElement.name].resetValidation();

    editProfilePopup.open();
}

const editProfilePopup = new PopupWithForm('.popup_type_profile', (data) => {
    editProfilePopup.renderLoading(true, 'Сохранение...');

    api.setUser(data.avtorName, data.avtorJob)
    .then((data) => {
        userInfo.setUserInfo(data);
        editProfilePopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        editProfilePopup.renderLoading(false);
        });
});





function handleCardClick(name, link) {
    imagePopup.open(name, link);
}

function handleCardAddLike(card) {
    api.addLike(card.getId())
        .then((data) => {
            card.updateLikesCard(data.likes);
        })
        .catch((err) => console.log(err));
}

function handleCardDeleteLike(card) {
    api.deleteLike(card.getId())
        .then((data) => {
            card.updateLikesCard(data.likes);
        })
        .catch((err) => console.log(err));
}

function handleCardDelete(cardId) {
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
    addCardPopup.renderLoading(true, 'Сохранение...');

    api.addCard(data.cardName, data.cardLink)
        .then((data) => {
            cards.prependItem(createCard(data));
            addCardPopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            addCardPopup.renderLoading(false);
        });

});


const deleteCardPopup = new PopupWithForm('.popup_type_delete-card', (data) => {
    deleteCardPopup.renderLoading(true, 'Удаление...');
    api.deleteCard(data.id)
        .then((res) => {
            document.querySelector('#id-' + data.id).remove();
            deleteCardPopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            deleteCardPopup.renderLoading(false, 'Да');
        });

});





const changeAvatarPopup = new PopupWithForm('.popup_type_change-avatar', (data) => {
    changeAvatarPopup.renderLoading(true, 'Сохранение...');
    api.changeAvatar(data.avatar)
    .then((data) => {
        userInfo.setUserInfo(data);
        changeAvatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
        changeAvatarPopup.renderLoading(false);
    });
});



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

function loadData() {
    api.getUser() 
    .then((data) => {
        userInfo.setUserInfo(data);
    })
    .then(() => {
       return api.getInitialCards(); 
    })
    .then((data) => {
        cards.render(data);
    })
    .catch((err) => console.log(err));
}


loadData();

profileEditButton.addEventListener('click', openProfileEditPopupHandler);
cardAddButton.addEventListener('click',  () => {
    formValidators[popupCardAddFormElement.name].resetValidation();
    addCardPopup.open();
});
avatarChangeButton.addEventListener('click', () => {
    formValidators[popupChangeAvatarFormElement.name].resetValidation();
    changeAvatarPopup.open();
});

addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
imagePopup.setEventListeners();
changeAvatarPopup.setEventListeners();
deleteCardPopup.setEventListeners();
