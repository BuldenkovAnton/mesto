class Api {
    
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _isSuccess(res) {
    if (res.ok)
      return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      return this._isSuccess(res);
    });
  }

  getUser() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      return this._isSuccess(res);
    });
  }

  setUser(name, about){
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then((res) => {
      return this._isSuccess(res);
    });
  }

  addCard(name, link){
   return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then((res) => {
      return this._isSuccess(res);
    });
  }

  addLike(cardId){
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId
      })
    })
    .then((res) => {
      return this._isSuccess(res);
    });
  }

  deleteLike(cardId){
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId
      })
    })
    .then((res) => {
      return this._isSuccess(res);
    });
  }

  deleteCard(cardId){
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId
      })
    })
    .then((res) => {
      return this._isSuccess(res);
    });
  }

  changeAvatar(avatar){
    return fetch(this._baseUrl + '/users/me/avatar ', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then((res) => {
      return this._isSuccess(res);
    });
  }

}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  headers: {
    authorization: 'c6a811d8-dd67-4646-8ee0-cab8dba953a1',
    'Content-Type': 'application/json'
  }
});


export default api;