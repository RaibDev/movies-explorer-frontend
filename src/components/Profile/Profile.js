import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

import { CurrentUserContext } from '../../context/CurrentUserContext';

import { validateName, validateEmail } from '../../utils/validation.js';
import useFormValidation from '../../hooks/useFormValidation.js';

const Profile = ({ loggedIn, onUpdate, onExit, apiErrors, isCompleted }) => {
  const navigate = useNavigate();
  
  const { values, handleChange, isValid, setValues, setIsValid } = useFormValidation();
  const { currentUser } = useContext(CurrentUserContext);

  const [isDisabledBtn, setIsDisabledBtn] = useState(true);
  const [isSucsess, setIsSucsess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(values);
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate('/');
    }
  }, [loggedIn]);

  useEffect(() => {
    if(isCompleted) {
      setIsDisabledBtn(true);
      setIsSucsess(true);
    }
  }, [isCompleted, apiErrors])

  useEffect(() => {
    if(currentUser) {
      setValues(currentUser);
      setIsValid(true);
    }
  }, [setIsValid, setValues, currentUser]);

  useEffect(() => {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      setIsValid(false);
    }
  }, [values]);

  return (
    <main className='profile' aria-label='Редактирование профиля'>
      <h3 className='profile__title'>Привет, {currentUser.name}!</h3>
      <form className='profile-form' onSubmit={ handleSubmit }>
        <div className='profile-form__box'>
          <label className='profile-form__label' htmlFor='name-input'>Имя</label>
          <input 
            className='profile-form__input' 
            id='name-input' 
            name='name'
            type='text'
            pattern='[a-zA-Zа-яА-Я -]{1,}'
            onChange={ handleChange }
            value={ values.name || '' }
            placeholder='Введите имя'
            minLength='2'
            maxLength='30'
            autoComplete='off'
            disabled={ isDisabledBtn }
            required
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
            placeholder='Введите почту'
            type='email'
            pattern='^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$'
            name='email'
            minLength='4'
            maxLength='40'
            autoComplete='off'
            disabled={ isDisabledBtn }
            required
          />
          <span className='profile-form__input-error'>{validateEmail(values.email).message}</span>
        </div>
        { apiErrors.profile && (<span className='form__api-error'>{ apiErrors.profile.errorText }</span>) }
        {isSucsess && (
            <span className="profile-form__success-message">
              Профиль успешно обновлен!
            </span>
          )}
        {/* <button className='profile-form__submit' type='submit' disabled={ isDisabledBtn }>Редактировать</button> */}
        { !isDisabledBtn ? (
            <button
              type="submit"
              className="profile-form__submit"
              disabled={
                !isValid ||
                (values.email === currentUser.email && values.name === currentUser.name) ||
                validateEmail(values.email).invalid || validateName(values.name).invalid
              }
            >
              Сохранить
            </button>
          ) : (
            <button
              type="button"
              className="profile-form__submit"
              onClick={(e) => {
                e.preventDefault();
                setIsDisabledBtn(false);
                setIsSucsess(false);
              }}
            >
              Редактировать
            </button>
          )}
      </form>
      <button className='profile__link' onClick={ onExit }>Выйти из аккаунта</button>
    </main>
  );
};

export default Profile;
