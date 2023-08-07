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

  checkToken(token) {
    return fetch(`${ this._url }/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${ token }`,
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
      body: JSON.stringify({ name, email, password }),
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

