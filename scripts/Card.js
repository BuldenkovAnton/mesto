class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;

        this._element = this._getCardTemplate();
        this._detailButton = this._element.querySelector('.element__show-link');
        this._deleteButton = this._element.querySelector('.trash');
        this._likedButton = this._element.querySelector('.like');
    }

    _getCardTemplate = () => {
        return  document
        .querySelector( this._cardSelector )
        .content
        .querySelector('.element')
        .cloneNode(true);
    }

    _setEventListener = () => {
        this._detailButton.addEventListener('click', (e) => this._handleCardClick(this._name, this._link));
        this._deleteButton.addEventListener('click', (e) => this._element.remove());
        this._likedButton.addEventListener('click',  (e) => e.target.classList.toggle('like_active'));
    }

    generateCard = () => {  
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__img').setAttribute('src', this._link);
        this._element.querySelector('.element__img').setAttribute('alt', this._name);

        this._setEventListener();
        return this._element;
    }
}

export default Card;