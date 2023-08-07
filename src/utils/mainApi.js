import { BEATFILM_URL } from "./constants";

export class MainApi {
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
      return Promise.reject(`Ошибка ${ responce.status }`);
    }
  }

  getUserData() {  // Получение данных пользователя
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(responce => this._checkResponce(responce));
  }

  getSavedMovies() {  // Получение сохраненных фильмов
    return fetch(`${ this._url }/movies`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(responce => this._checkResponce(responce));
  }

  deleteMovie(idMovie) {  // Удаление фильма из соохраненных
    return fetch(`${ this._url }/movies/${ idMovie }`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(responce => this._checkResponce(responce));
  }

  updateUserData(data) {  // Обновление данных пользователя
    return fetch(`${ this._url }/users/me`, {
      method: 'PATCH',
      headers: this._headers,
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
      headers: this._headers,
      body: JSON.stringify({
        nameRU: data.nameRU,
        nameEn: data.nameEn,
        trailerLink: data.trailerLink,
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: BEATFILM_URL + data.image.url,
        thumbnail: BEATFILM_URL + data.image.formats.thumbnail.url,
        movieId: data.id,
        owner: data.user,
      }),
    })
    .then(responce => this._checkResponce(responce));
  }
};

