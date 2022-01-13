class Api {
    
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUser(getUserHandler) {
    fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      if(res.ok) 
        return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);   
    })
    .then((data) => {
      console.log(data);
      getUserHandler(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  setUser(name, about, setUserHandler){
    fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then((res) => {
      if (res.ok)
        return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      console.log(data);
      setUserHandler(data);
    })
    .catch((err) => console.log(err));
  }

  getInitialCards(cardRenderHandler) {
    return fetch(this._baseUrl + '/cards', {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      if (res.ok)
        return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      console.log(data);
      cardRenderHandler(data);
    })
    .catch((err) => console.log(err));
  }

  // другие методы работы с API
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  headers: {
    authorization: 'c6a811d8-dd67-4646-8ee0-cab8dba953a1',
    'Content-Type': 'application/json'
  }
});


export default api;