// import { BEATFILM_URL } from "./constants";

export class MainApi {
  constructor({ url }) {
    this._url = url;
  }

  _checkResponce(responce) {
    if(responce) {
      if(responce.ok) {
        return responce.json();
      }
    } else {
      return Promise.reject(`Ошибка ${ responce.status }`);
    }
  }

  getUserData() {  // Получение данных пользователя
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        "authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
    .then(responce => this._checkResponce(responce));
  }

  getSavedMovies() {  // Получение сохраненных фильмов
    return fetch(`${ this._url }/movies`, {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        "authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
    .then(responce => this._checkResponce(responce));
  }

  deleteMovie(idMovie) {  // Удаление фильма из соохраненных
    return fetch(`${ this._url }/movies/${ idMovie }`, {
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json',
        "authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
    .then(responce => this._checkResponce(responce));
  }

  updateUserData(data) {  // Обновление данных пользователя
    return fetch(`${ this._url }/users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json',
        "authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    })
    .then(responce => this._checkResponce(responce));
  }

  likeSavedMovies(data) {  //  Лайк карточки и добавление в сохраненные
    return fetch(`${ this._url }/movies`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        trailerLink: data.trailerLink,
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co/${data.image.url}`,
        thumbnail: `https://api.nomoreparties.co/${data.image.formats.thumbnail.url}`,
        movieId: data.id,
        owner: data.user,
      }),
    })
    .then(responce => this._checkResponce(responce));
  }
};

