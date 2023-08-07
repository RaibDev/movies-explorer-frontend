import userPhoto from '../images/user.png';

import svoistva from '../images/33_svoistva.png';
import kinoalmanah from '../images/100_let_disaina.png';
import vPogone from '../images/v_pogone_za_benksi.png';

export const BACKEND_URL = 'http://raibdev.nomoredomains.rocks';
export const BEATFILM_URL = 'https://api.nomoreparties.co';
export const BEATFILM_MOVIES_URL =
  'https://api.nomoreparties.co/beatfilm-movies';

// export const USER_NAME_REGEX = /^[a-zA-Zа-яА-Я\sё-]+$/;
// export const USER_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&"*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


export const userData = {
  name: 'Виталий',
  prof: 'Фронтенд-разработчик, 30 лет',
  photo: userPhoto,
  about: 'Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.',
};

export const savedMovies = [
  {
    name: '33 слова о дизайне',
    timing: '1ч 42м',
    promo: svoistva,
    _id: 1,
  },
  {
    name: 'Киноальманах «100 лет дизайна»',
    timing: '1ч 42м',
    promo: kinoalmanah,
    _id: 2,
  },
  {
    name: 'В погоне за Бенкси',
    timing: '1ч 42м',
    promo: vPogone,
    _id: 3,
  },
];

export const allMovies = [
  {
    name: '33 слова о дизайне',
    timing: '1ч 42м',
    promo: svoistva,
    _id: 1,
  },
  {
    name: 'Киноальманах «100 лет дизайна»',
    timing: '1ч 42м',
    promo: kinoalmanah,
    _id: 2,
  },
  {
    name: 'В погоне за Бенкси',
    timing: '1ч 42м',
    promo: vPogone,
    _id: 3,
  },
  {
    name: 'Баския: Взрыв реальности',
    timing: '1ч 42м',
    promo: svoistva,
    _id: 4,
  },
  {
    name: 'Бег это свобода',
    timing: '1ч 42м',
    promo: kinoalmanah,
    _id: 5,
  },
  {
    name: 'Книготорговцы',
    timing: '1ч 42м',
    promo: vPogone,
    _id: 6,
  },
  {
    name: 'Когда я думаю о Германии ночью',
    timing: '1ч 42м',
    promo: vPogone,
    _id: 7,
  },
];