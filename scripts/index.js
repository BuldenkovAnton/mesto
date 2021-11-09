const profileElement = document.querySelector('.profile');
const profileNameInput = profileElement.querySelector('.profile__title');
const profileJobInput = profileElement.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');

const cardAddButton = document.querySelector('.profile__add-button');
const cardsElement = document.querySelector('.elements');

const popupElement = document.querySelector('.popup');
const popupContainerElement = document.querySelector('.popup__container');
const popupCloseButton = popupElement.querySelector('.popup__close');

const cardTemplate = document.querySelector('#card').content;
const formAvtorEditTemplate = document.querySelector('#avtor_edit').content;
const formCardAddTemplate = document.querySelector('#card_add').content;
const popupImageTemplate = document.querySelector('#popup_image').content;

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

function addCard(name, link) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__title').textContent = name;
    cardElement.querySelector('.element__img').setAttribute('src', link);

    cardElement.querySelector('.element__show-link').addEventListener('click', function(e){
        const name = e.target.closest('.element').querySelector('.element__title').textContent;
        const link = e.target.getAttribute('src');
        renderPopupImageHandler(name, link);
    });

    cardElement.querySelector('.trash').addEventListener('click', function(e){
        const cardElement = e.target.closest('.element');
        cardElement.remove();
    });

    cardElement.querySelector('.like').addEventListener('click', function(e){
        const likeButton = e.target;
        likeButton.classList.toggle('like_active');
    });

    cardsElement.prepend(cardElement);
}

function renderStartCards(){
    initialCards.forEach( function(card){
        addCard(card.name, card.link);
    });
}

function clearPopup(){
    if (popupElement.classList.contains('popup_element_image')){
        popupElement.classList.remove('popup_element_image');
    }
    if (popupContainerElement.classList.contains('popup__container_element_image')){
        popupContainerElement.classList.remove('popup__container_element_image');
    }
    if (popupContainerElement.querySelector('.form')) 
        popupContainerElement.querySelector('.form').remove();
    if (popupContainerElement.querySelector('.popup__figure')) 
        popupContainerElement.querySelector('.popup__figure').remove();
    
}

function popupShow() {
    popupElement.classList.add('popup_opened');
}

function popupCloseHandle(e){
    popupElement.classList.remove('popup_opened');
}

function renderFormAvtorEditHandler(e){
    clearPopup();
    const formAvtorEdit = formAvtorEditTemplate.querySelector('.form').cloneNode(true);
    formAvtorEdit.querySelector('.form__input_value_title').setAttribute('value', profileNameInput.textContent);
    formAvtorEdit.querySelector('.form__input_value_job').setAttribute('value', profileJobInput.textContent);

    formAvtorEdit.querySelector('.form__save').addEventListener('click', function(e){
        e.preventDefault(); 
        profileNameInput.textContent = formAvtorEdit.querySelector('.form__input_value_title').value;
        profileJobInput.textContent = formAvtorEdit.querySelector('.form__input_value_job').value;
        popupCloseHandle();
    })

    popupContainerElement.append(formAvtorEdit);
    popupShow();
}


function renderFormCardAddHandler(e){
    clearPopup();
    const formCardAdd = formCardAddTemplate.querySelector('.form').cloneNode(true);
    
    formCardAdd.querySelector('.form__save').addEventListener('click', function(e){
        e.preventDefault(); 
        const name = formCardAdd.querySelector('.form__input_value_title').value;
        const link = formCardAdd.querySelector('.form__input_value_link').value;
        addCard(name, link);
        popupCloseHandle();
    })

    popupContainerElement.append(formCardAdd);
    popupShow();
}

function renderPopupImageHandler(name, link){
    clearPopup();
    popupElement.classList.add('popup_element_image');
    popupContainerElement.classList.add('popup__container_element_image');

    const popupImage = popupImageTemplate.querySelector('.popup__figure').cloneNode(true);
    popupImage.querySelector('.popup__link').setAttribute('src', link);
    popupImage.querySelector('.popup__figcaption').textContent = name;

    popupContainerElement.append(popupImage);
    popupShow();
}

renderStartCards();

profileEditButton.addEventListener('click', renderFormAvtorEditHandler);
cardAddButton.addEventListener('click', renderFormCardAddHandler);
popupCloseButton.addEventListener('click', popupCloseHandle);
