// import { BACKEND_URL } from "./constants";

class Auth {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponce(responce) {
    if(responce) {
      if(responce.ok) {
        return responce.json();
      }
    } else {
      return Promise.reject(`Ошибка ${ responce.status }`)
    }
  }

  checkToken(jwt) {
    return fetch(`${ this._url }`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${ jwt }`,
      },
    })
      .then(responce => this._checkResponce(responce));
  }

  login(email, password) {
    return fetch(`${ this._url }/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    .then(responce => this._checkResponce(responce));
  }

  registrateUser(name, email, password) {
    return fetch(`${ this._url }/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
    .then(responce => this._checkResponce(responce));
  }
};

export const auth = new Auth({
  url: 'http://raibdev.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json',
  },
});

