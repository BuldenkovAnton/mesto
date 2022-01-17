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

export const popupChangeAvatarElement = document.querySelector('.popup_type_change-avatar');
export const popupChangeAvatarFormElement = popupCardAddElement.querySelector('.form');
export const popupChangeAvatarUrlInput = popupCardAddFormElement.querySelector('.form__input_value_title');

export const popupDeleteCardElement = document.querySelector('.popup_type_delete-card');
export const popupDeleteCardFormElement = popupDeleteCardElement.querySelector('.form');
export const popupDeleteCardIdHidden = popupDeleteCardFormElement.querySelector('.form__input_value_id');

export const formValidators = {};