class Api {
    
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  
  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      if (res.ok)
        return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUser() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      if(res.ok) 
        return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);   
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
      if (res.ok)
        return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addCard(name, link){
   return fetch(this._baseUrl + '/cards ', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then((res) => {
      if (res.ok)
        return res.json();

      return Promise.reject(`Ошибка: ${res.status}`);
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