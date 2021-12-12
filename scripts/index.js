import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popups = document.querySelectorAll('.popup');

const popupProfileEditElement = document.querySelector('.popup_type_profile');
const popupProfileEditFormElement = popupProfileEditElement.querySelector('.form');
const popupProfileEditNameInput = popupProfileEditFormElement.querySelector('.form__input_value_title');
const popupProfileEditJobInput =  popupProfileEditFormElement.querySelector('.form__input_value_job');

const popupCardAddElement = document.querySelector('.popup_type_new-card');
const popupCardAddFormElement = popupCardAddElement.querySelector('.form');
const popupCardAddNameInput = popupCardAddFormElement.querySelector('.form__input_value_title');
const popupCardAddImageInput =  popupCardAddFormElement.querySelector('.form__input_value_link');

const popupImageShowElement = document.querySelector('.popup_type_image');
const popupImageShowFigureImgElement = popupImageShowElement.querySelector('.popup__image');
const popupImageShowFigureCaptionElement = popupImageShowElement.querySelector('.popup__figcaption');


const profileElement = document.querySelector('.profile');
const profileNameInput = profileElement.querySelector('.profile__title');
const profileJobInput = profileElement.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');

const cardsElement = document.querySelector('.elements');
const cardAddButton = document.querySelector('.profile__add-button');

const formValidators = {};

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


function closePopupByEscapeHandeler(e) {
    if (e.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_opened');
        if (currentPopup) closePopup(currentPopup);
    } 
}

function closePopupByOverlayClick(e) {
    if (e.target.classList.contains('popup_opened')) {
        closePopup(e.target);
    } 
}


function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEscapeHandeler);
    document.addEventListener('click', closePopupByOverlayClick);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscapeHandeler);
    document.removeEventListener('click', closePopupByOverlayClick);
}



function handleCardClick(name, link) {
    popupImageShowFigureImgElement.setAttribute('src', link);
    popupImageShowFigureImgElement.setAttribute('alt', name);
    popupImageShowFigureCaptionElement.textContent = name;
    openPopup(popupImageShowElement);
}

function createCard(item) {
    const card = new Card(item, '#card', handleCardClick);
    return card.generateCard();
}

function openCardAddPopupHandler() {
    openPopup(popupCardAddElement);
}

function submitCardAddPopupHandler(e) {
    e.preventDefault(); 
    const card = {
        'name': popupCardAddNameInput.value,
        'link': popupCardAddImageInput.value
    }
    cardsElement.prepend( createCard(card) );

    popupCardAddNameInput.value = '';
    popupCardAddImageInput.value = '';
    closePopup(popupCardAddElement);
    formValidators[popupCardAddFormElement.name].resetValidation();
}

function openProfileEditPopupHandler() {
    popupProfileEditNameInput.value = profileNameInput.textContent;
    popupProfileEditNameInput.dispatchEvent(new Event('input'));
    popupProfileEditJobInput.value = profileJobInput.textContent;
    popupProfileEditJobInput.dispatchEvent(new Event('input'));
    openPopup(popupProfileEditElement);
    formValidators[popupProfileEditFormElement.name].resetValidation();
}

function submitProfileEditPopupHandler(e) {
    e.preventDefault(); 
    profileNameInput.textContent = popupProfileEditNameInput.value;
    profileJobInput.textContent = popupProfileEditJobInput.value;
    closePopup(popupProfileEditElement);
}

function setEventListenerPopups(){
    popups.forEach((popup) => {
        popup.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup_opened')) {
                closePopup(popup);
            }
            if (e.target.classList.contains('popup__close')) {
                closePopup(popup);
            }
        })
    })
}

function renderStartCards(){
    initialCards.forEach( (card) => {
        cardsElement.prepend( createCard(card) );
    });
}

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        formValidators[ formElement.name ] = validator;
        validator.enableValidation();
    });
};


setEventListenerPopups();
renderStartCards();

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

profileEditButton.addEventListener('click', openProfileEditPopupHandler);
popupProfileEditFormElement.addEventListener('submit', submitProfileEditPopupHandler);

cardAddButton.addEventListener('click', openCardAddPopupHandler);
popupCardAddFormElement.addEventListener('submit', submitCardAddPopupHandler);
