import { USER_EMAIL_REGEX, USER_NAME_REGEX, USER_SEARCH_REGEX } from "./constants";

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
};

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
};

export function validateSearch(search) {
  if (search !== undefined) {
    if (search.length === 0) {
      return { invalid: true, message: 'Нужно ввести ключевое слово' };
    } else if (!USER_SEARCH_REGEX.test(search.toLowerCase())) {
      return {
        invalid: true,
        message:
          'В поле можно использовать только кириллицу, латиницу, пробелы',
      };
    } else if (USER_SEARCH_REGEX.test(search.toLowerCase())) {
      return { invalid: false, message: '' };
    }
  } else {
    return { invalid: true, message: '' };
  }
};