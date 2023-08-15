import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Login.css';
import Logo from '../Logo/Logo';
import useFormValidation from '../../hooks/useFormValidation.js';
import { validateEmail } from '../../utils/validation.js';

const Login = ({ loggedIn, onLogin, apiErrors }) => {

  const navigate = useNavigate();
  const { values, handleChange, errors, isValid } = useFormValidation();

  useEffect(() => {
    if(loggedIn) {
      navigate('/movies');
    }
  }, [loggedIn]);

  return (
    <main className='auth-page' aria-label='Форма входа'>
      <Link className='auth-page__link' to='/'><Logo /></Link>
      <h3 className='auth-page__title'>Рады видеть!</h3>
      <form 
        className='form'
        onSubmit={ e => {
          e.preventDefault();
          onLogin(values);
        } }
      >
        <label className='form__label' htmlFor='user-email'>E-mail</label>
        <input 
          className='form__input' 
          id='user-email' 
          type='email' 
          // pattern='^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$'
          name='email' 
          value={values.email || ''}
          onChange={handleChange}
          placeholder='Введите почту'
          minLength='4'
          maxLength='40'
          required
        />
        <span className='form__error'>{ validateEmail(values.email).message }</span>
        <label className='form__label' htmlFor='user-password'>Пароль</label>
        <input 
          className='form__input' 
          id='user-password' 
          type='password' 
          name='password'
          minLength='2' 
          value={ values.password || '' }
          onChange={ handleChange }
          placeholder='Введите пароль'
          required
        />
        <span className='form__error'>{ errors.password }</span>
        <span className="form__api-error">
            { apiErrors.login.message === 'Failed to fetch'
              ? 'При авторизации произошла ошибка.'
              : apiErrors.login.errorText }
          </span>
        <button 
          className={`form__submit form__submit_type_login ${ isValid ? 'form__submit_type_hover' : 'form__submit_disabled' }`}
          type='submit' 
          disabled={ !isValid || validateEmail(values.email).invalid }
        >
            Войти
          </button>
        <p className='form__text'>Ещё не зарегистрированы? <Link className='form__link' to='/signup'>Регистрация</Link></p>
      </form>
    </main>
  );
};

export default Login;
