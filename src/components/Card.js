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
        
        this._likedButton = this._element.querySelector('.like');
        this._likesCount = this._element.querySelector('.like__count');
    }

    _hasLike() {
        let b = this._data.likes.filter((item) => item._id === this._currentUserId).length > 0;
        console.log(b) ;
        return b;
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
                //this._element.remove();
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
            
            //e.target.classList.toggle('like_active');
        });
    }

    generateCard = () => {  
        this._title.textContent = this._data.name;
        this._img.setAttribute('src', this._data.link);
        this._img.setAttribute('alt', this._data.name);
        this._likesCount.textContent = this._data.likes.length;
        this._setEventListener();
        return this._element;
    }
}

export default Card;