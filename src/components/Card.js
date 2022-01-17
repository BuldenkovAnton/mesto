class Card {
    constructor(userId, data, cardSelector, handleCardClick, handleCardAddLike, handleCardDeleteLike, handleCardDelete) {
        this._currentUserId = userId;
        this._data = data;

        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardAddLike = handleCardAddLike;
        this._handleCardDeleteLike = handleCardDeleteLike;
        this._handleCardDelete = handleCardDelete;

        this._element = this._getCardTemplate();
        this._title = this._element.querySelector('.element__title');
        this._img = this._element.querySelector('.element__img');
        this._detailButton = this._element.querySelector('.element__show-link');
        this._deleteButton = this._element.querySelector('.trash');

        if (this._currentUserId !== this._data.owner._id) {
            this._deleteButton.remove();
        }
        
        this._likedButton = this._element.querySelector('.like__button');
        this._likesCount = this._element.querySelector('.like__count');
    }

    updateLikesCard(likes){
        this._data.likes = likes;
        this._likesCount.textContent = this._data.likes.length;
        this._updateLikeIcon();
    }

    _hasLike() {
        return this._data.likes.filter((item) => item._id === this._currentUserId).length > 0;
    }

    _updateLikeIcon() {
        if (this._hasLike()) {
            this._likedButton.classList.add('like__button_active');
        } else {
            this._likedButton.classList.remove('like__button_active');
        }
    }


    _getCardTemplate = () => {
        return  document
        .querySelector( this._cardSelector )
        .content
        .querySelector('.element')
        .cloneNode(true);
    }

    _setEventListener = () => {
        this._detailButton.addEventListener('click', () => this._handleCardClick(this._data.name, this._data.link));
        if (this._currentUserId === this._data.owner._id) {
            this._deleteButton.addEventListener('click', () => {
                this._handleCardDelete(this._data._id);
            });
        }
        this._likedButton.addEventListener('click',  (e) => {
            if (this._hasLike()){
                console.log('delete');
                this._handleCardDeleteLike(this._data._id);
            } else {
                console.log('like');
                this._handleCardAddLike(this._data._id);
            }
        });
    }

    generateCard = () => {  
        this._element.id = 'id-' + this._data._id;
        this._title.textContent = this._data.name;
        this._img.setAttribute('src', this._data.link);
        this._img.setAttribute('alt', this._data.name);
        this.updateLikesCard(this._data.likes);
        this._setEventListener();
        return this._element;
    }
}

export default Card;