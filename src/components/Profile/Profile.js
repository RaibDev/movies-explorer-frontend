import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';

import { CurrentUserContext } from '../../context/CurrentUserContext';

import { validateName, validateEmail } from '../../utils/validation.js';
import useFormValidation from '../../hooks/useFormValidation.js';

const Profile = ({ loggedIn, onUpdate, onExit, isCompleted }) => {
  
  const { values, handleChange, isValid, setValues, setIsValid } = useFormValidation();
  const { currentUser } = useContext(CurrentUserContext);

  const [isDisabledBtn, setIsDisabledBtn] = useState(false);
  const [isSucsess, setIsSucsess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(values);
  }

  useEffect(() => {
    if(isCompleted) {
      setIsDisabledBtn(true);
      setIsSucsess(true);
    }
  }, [isCompleted])

  useEffect(() => {
    if(currentUser) {
      setIsValid(true);
      setValues(currentUser);
    }
  }, [setIsValid, setValues, currentUser]);

  return (
    <main className='profile' aria-label='Редактирование профиля'>
      <h3 className='profile__title'>Привет, {currentUser.name}!</h3>
      <form className='profile-form' onSubmit={ handleSubmit }>
        <div className='profile-form__box'>
          <label className='profile-form__label' htmlFor='name-input'>Имя</label>
          <input 
          className='profile-form__input' 
          id='name-input' 
          onChange={ handleChange }
          value={ values.name || '' }
          minLength='2'
          maxLength='30'
          disabled={ isDisabledBtn }
          reauired
          />
          <span className='profile-form__input-error'>{validateName(values.name).message}</span>
        </div>
        <div className='profile-form__box'>
          <label className='profile-form__label' htmlFor='email-input'>E-mail</label>
          <input 
          className='profile-form__input' 
          id='email-input' 
          onChange={ handleChange }
          value={ values.email || '' }
          minLength='4'
          maxLength='40'
          disabled={ !isValid }
          reauired
          />
          <span className='profile-form__input-error'>{validateEmail(values.email).message}</span>
        </div>
        {isSucsess && (
            <span className="profile-form__success-message">
              Профиль успешно обновлен!
            </span>
          )}
        <button className='profile-form__submit' type='submit' disabled={ isDisabledBtn }>Редактировать</button>
      </form>
      <button className='profile__link' onClick={ onExit }>Выйти из аккаунта</button>
    </main>
  );
};

export default Profile;
