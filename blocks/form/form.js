let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__input_value_title');
let jobInput =  formElement.querySelector('.form__input_value_job');

let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');

let profile = document.querySelector('.profile');
let profileEdit = profile.querySelector('.edit-button');
let profileName = profile.querySelector('.profile__title');
let profileJob = profile.querySelector('.profile__subtitle');

function popupShowHendler(e) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popup.classList.add('popup_opened');
}

profileEdit.addEventListener('click', popupShowHendler);

function popupCloseHandler(e){
    nameInput.value = "";
    jobInput.value = "";
    popup.classList.remove('popup_opened');
}

popupClose.addEventListener('click', popupCloseHandler);


function formSubmitHandler (e) {
    e.preventDefault(); 

    profileName.textContent = formElement.querySelector('.form__input_value_title').value;
    profileJob.textContent = formElement.querySelector('.form__input_value_job').value;
   
    popupCloseHandler();
}

formElement.addEventListener('submit', formSubmitHandler);