import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Register.css'
import Logo from '../Logo/Logo';
import useFormValidation from '../../hooks/useFormValidation.js';
import { validateName, validateEmail } from '../../utils/validation.js';

const Register = ({ loggedIn, onRegister, apiErrors }) => {

  const navigate = useNavigate();
  const { values, handleChange, errors, isValid } = useFormValidation();

  useEffect(() => {
    if(loggedIn) {
      navigate('/movies');
    }
  }, [loggedIn]);

  return (
    <main className='auth-page' aria-label='Форма регистрации'>
      <Link className='auth-page__link' to='/'><Logo /></Link>
      <h3 className='auth-page__title'>Добро пожаловать!</h3>
      <form 
        className='form'
        onSubmit={ e => {
          e.preventDefault();
          onRegister(values);
        } }
      >
        <label className='form__label' htmlFor='user-name'>Имя</label>
        <input 
          className='form__input' 
          id='user-name' 
          name='name' 
          onChange={ handleChange }
          value={ values.name || '' }
          type= 'text'
          placeholder='Введите имя'
          minLength='2'
          maxLength='30'
          required
        />
        <span className='form__error'>{validateName(values.name).message}</span>
        <label className='form__label' htmlFor='user-email'>E-mail</label>
        <input 
          className='form__input' 
          id='user-email' 
          type='email' 
          name='email' 
          onChange={ handleChange }
          value={ values.email || '' }
          placeholder='Введите почту'
          minLength='4'
          maxLength='40'
          required
        />
        <span className='form__error'>{validateEmail(values.email).message}</span>
        <label className='form__label' htmlFor='user-password'>Пароль</label>
        <input 
          className='form__input' 
          id='user-password' 
          type='password' 
          name='password' 
          onChange={ handleChange }
          value={ values.password || '' }
          placeholder='Введите пароль'
          minLength='2'
          required
        />
        <span className='form__error'>{ errors.password }</span>
        <span className="form__api-error">
            {apiErrors.register.message === 'Failed to fetch'
              ? 'При регистрации пользователя произошла ошибка.'
              : apiErrors.register.errorText}
          </span>
        <button 
          className={ `form__submit form__submit_type_register ${ isValid ? 'form__submit_type_hover' : 'form__submit_disabled' }` }
          type='submit' 
          disabled={ !isValid || validateName(values.name).invalid || validateEmail(values.email).invalid }
          >
            Зарегистрироваться
          </button>
        <p className='form__text'>Уже зарегистрированы? <Link className='form__link' to='/signin'>Войти</Link></p>
      </form>
    </main>
  );
};

export default Register;
