import { BEATFILM_MOVIES_URL } from "./constants";

class MoviesApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponce(responce) {  // Проверка на выполнение промиса
    if(responce) {
      if(responce.ok) {
        return responce.json();
      }
    } else {
      return Promise.reject(`Ошибка ${responce.status}`)
    }
  }

  getAllMovies() {  //  Получение всех фильмов c BeatfilmMoviesApi
    return fetch(`${this._url}`, {
      method: 'GET',
        headers: this._header,
    })
      .then(responce => this._checkResponce(responce));
    }
};

export const moviesApi = new MoviesApi({
  url: BEATFILM_MOVIES_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
