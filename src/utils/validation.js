const USER_NAME_REGEX = /^[a-zA-Zа-яА-Я\sё-]+$/;
const USER_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&"*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function validateName(name) {
  if (name !== undefined) {
    if (name.length === 0) {
      return { invalid: true, message: 'Поле обязательно к заполнению!' };
    } else if (!USER_NAME_REGEX.test(name.toLowerCase())) {
      return {
        invalid: true,
        message:
          'Имя пользователя может состоять только из букв кириллицей или латиницей, дефиса и пробела!',
      };
    } else if (USER_NAME_REGEX.test(name.toLowerCase())) {
      return { invalid: false, message: '' };
    }
  } else {
    return { invalid: true, message: '' };
  }
}

export function validateEmail(email) {
  if (email !== undefined) {
    if (email.length === 0) {
      return { invalid: true, message: 'Поле обязательно к заполнению!' };
    } else if (!USER_EMAIL_REGEX.test(email.toLowerCase())) {
      return { invalid: true, message: 'Некорректно введён email !' };
    } else if (USER_EMAIL_REGEX.test(email.toLowerCase())) {
      return { invalid: false, message: '' };
    }
  } else {
    return { invalid: true, message: '' };
  }
}