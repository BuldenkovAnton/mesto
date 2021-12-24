export const profileEditButton = document.querySelector('.profile__edit-button');
export const cardAddButton = document.querySelector('.profile__add-button');


export const popupProfileEditElement = document.querySelector('.popup_type_profile');
export const popupProfileEditFormElement = popupProfileEditElement.querySelector('.form');
export const popupProfileEditNameInput = popupProfileEditFormElement.querySelector('.form__input_value_title');
export const popupProfileEditJobInput =  popupProfileEditFormElement.querySelector('.form__input_value_job');

export const popupCardAddElement = document.querySelector('.popup_type_new-card');
export const popupCardAddFormElement = popupCardAddElement.querySelector('.form');
export const popupCardAddNameInput = popupCardAddFormElement.querySelector('.form__input_value_title');
export const popupCardAddImageInput =  popupCardAddFormElement.querySelector('.form__input_value_link');

export const formValidators = {};

export const initialCards = [
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