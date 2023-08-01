import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  return (
    <section className='profile' aria-label='Редактирование профиля'>
      <h3 className='profile__title'>Привет, Виталий!</h3>
      <form className='profile-form'>
        <div className='profile-form__box'>
          <label className='profile-form__label' htmlFor='name-input'>Имя</label>
          <input className='profile-form__input' id='name-input' value='Виталий'/>
        </div>
        <div className='profile-form__box'>
          <label className='profile-form__label' htmlFor='email-input'>E-mail</label>
          <input className='profile-form__input' id='email-input' value='pochta@yandex.ru'/>
        </div>
        <button className='profile-form__submit' type='submit'>Редактировать</button>
      </form>
      <Link className='profile__link' to='/signin'>Выйти из аккаунта</Link>
    </section>
  );
};

export default Profile;
