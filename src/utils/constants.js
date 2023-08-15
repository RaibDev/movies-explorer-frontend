import userPhoto from '../images/user.png';

const BACKEND_URL = 'https://raibdev.nomoredomains.rocks';
const BEATFILM_URL = 'https://api.nomoreparties.co';
const BEATFILM_MOVIES_URL =
  'https://api.nomoreparties.co/beatfilm-movies';

const DEVICE_WIDTH = {
    desktop: {
        width: 1280,
        cards: {
            total: 7,
            more: 7,
        },
    },
    tablet: {
        width: 768,
        cards: {
            total: 7,
            more: 2,
        },
    },
    mobile: {
        width: 490,
        cards: {
            total: 5,
            more: 2,
        },
    },
};

const SHORT_TIMING = 40;

const USER_NAME_REGEX = /^[a-zA-Zа-яА-Я\sё-]+$/;
const USER_SEARCH_REGEX = /^[a-zA-Zа-яА-Я\sё]+$/;
const USER_EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;


const userData = {
  name: 'Виталий',
  prof: 'Фронтенд-разработчик, 30 лет',
  photo: userPhoto,
  about: 'Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.',
};

export {
  userData,
  DEVICE_WIDTH,
  BACKEND_URL,
  BEATFILM_URL,
  BEATFILM_MOVIES_URL,
  SHORT_TIMING,
  USER_EMAIL_REGEX,
  USER_NAME_REGEX,
  USER_SEARCH_REGEX,
}
