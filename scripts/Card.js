class Card {
    constructor(data, cardSelector, openImagePopup) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._openImagePopup = openImagePopup;
    }

    _getCardTemplate = () => {
        return  document
        .querySelector( this._cardSelector )
        .content
        .querySelector('.element')
        .cloneNode(true);
    }

    _setEventListener = () => {
        const showCardDetailButton = this._element.querySelector('.element__show-link');
        showCardDetailButton.addEventListener('click', (e) => this._openImagePopup(this));

        const deleteCardButton = this._element.querySelector('.trash');
        deleteCardButton.addEventListener('click', (e) => this._element.remove());
    
        const likeCardButton = this._element.querySelector('.like');
        likeCardButton.addEventListener('click',  (e) => e.target.classList.toggle('like_active'));
    }

    createCard = () => {
        this._element = this._getCardTemplate();
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__img').setAttribute('src', this._link);
        this._element.querySelector('.element__img').setAttribute('alt', this._name);

        this._setEventListener();
        return this._element;
    }
}

export default Card;