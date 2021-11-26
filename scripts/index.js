const profileElement = document.querySelector('.profile');
const profileNameInput = profileElement.querySelector('.profile__title');
const profileJobInput = profileElement.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');

const cardsElement = document.querySelector('.elements');
const cardAddButton = document.querySelector('.profile__add-button');

const popupProfileEditElement = document.querySelector('.popup_type_profile');
const popupProfileEditCloseButton = popupProfileEditElement.querySelector('.popup__close');
const popupProfileEditFormElement = popupProfileEditElement.querySelector('.form');
const popupProfileEditNameInput = popupProfileEditFormElement.querySelector('.form__input_value_title');
const popupProfileEditJobInput =  popupProfileEditFormElement.querySelector('.form__input_value_job');

const popupCardAddElement = document.querySelector('.popup_type_new-card');
const popupCardAddCloseButton = popupCardAddElement.querySelector('.popup__close');
const popupCardAddFormElement = popupCardAddElement.querySelector('.form');
const popupCardAddNameInput = popupCardAddFormElement.querySelector('.form__input_value_title');
const popupCardAddImageInput =  popupCardAddFormElement.querySelector('.form__input_value_link');

const popupImageShowElement = document.querySelector('.popup_type_image');
const popupImageShowCloseButton = popupImageShowElement.querySelector('.popup__close');
const popupImageShowFigureImgElement = popupImageShowElement.querySelector('.popup__image');
const popupImageShowFigureCaptionElement = popupImageShowElement.querySelector('.popup__figcaption');

const cardTemplate = document.querySelector('#card').content;

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


function createCard(card){
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__title').textContent = card.name;
    cardElement.querySelector('.element__img').setAttribute('src', card.link);
    cardElement.querySelector('.element__img').setAttribute('alt', card.name);

    const showCardDetailButton = cardElement.querySelector('.element__show-link');
    showCardDetailButton.addEventListener('click', (e) => openImageShowPopupHandler(card));

    const deleteCardButton = cardElement.querySelector('.trash');
    deleteCardButton.addEventListener('click', (e) => cardElement.remove());

    const likeCardButton = cardElement.querySelector('.like');
    likeCardButton.addEventListener('click', (e) => e.target.classList.toggle('like_active'));

    return cardElement;
}


function addCard(card){
    const cardElement = createCard(card);
    cardsElement.prepend(cardElement);
}

function renderStartCards(){
    initialCards.forEach( (card) => addCard(card));
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

function openProfileEditPopupHandler() {
    popupProfileEditNameInput.value = profileNameInput.textContent;
    popupProfileEditNameInput.dispatchEvent(new Event('input'));
    popupProfileEditJobInput.value = profileJobInput.textContent;
    popupProfileEditJobInput.dispatchEvent(new Event('input'));
    openPopup(popupProfileEditElement);
}

function closeProfileEditPopupHandler() {
    closePopup(popupProfileEditElement);
}

function submitProfileEditPopupHandler(e) {
    e.preventDefault(); 
    profileNameInput.textContent = popupProfileEditNameInput.value;
    profileJobInput.textContent = popupProfileEditJobInput.value;
    closeProfileEditPopupHandler();
}


function openCardAddPopupHandler() {
    openPopup(popupCardAddElement);
}

function closeCardAddPopupHandler() {
    closePopup(popupCardAddElement);
}

function submitCardAddPopupHandler(e) {
    e.preventDefault(); 
    const card = {
        'name': popupCardAddNameInput.value,
        'link': popupCardAddImageInput.value
    }
    addCard(card);
    popupCardAddNameInput.value = '';
    popupCardAddImageInput.value = '';
    closeCardAddPopupHandler();
    popupCardAddNameInput.dispatchEvent(new Event('input'));
    popupCardAddImageInput.dispatchEvent(new Event('input'));
}

function openImageShowPopupHandler(card) {
    popupImageShowFigureImgElement.setAttribute('src', card.link);
    popupImageShowFigureImgElement.setAttribute('alt', card.name);
    popupImageShowFigureCaptionElement.textContent = card.name;
    openPopup(popupImageShowElement);
}

function closeImageShowPopupHandler() {
    closePopup(popupImageShowElement);
}

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


renderStartCards();

profileEditButton.addEventListener('click', openProfileEditPopupHandler);
popupProfileEditFormElement.addEventListener('submit', submitProfileEditPopupHandler);
popupProfileEditCloseButton.addEventListener('click', closeProfileEditPopupHandler);

cardAddButton.addEventListener('click', openCardAddPopupHandler);
popupCardAddFormElement.addEventListener('submit', submitCardAddPopupHandler);
popupCardAddCloseButton.addEventListener('click', closeCardAddPopupHandler);

popupImageShowCloseButton.addEventListener('click', closeImageShowPopupHandler);