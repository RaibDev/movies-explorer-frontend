import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Login.css';
import Logo from '../Logo/Logo';
import useFormValidation from '../../hooks/useFormValidation.js';
import { validateEmail } from '../../utils/validation.js';

const Login = ({ loggedIn, onLogin, responceError }) => {

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
        <input className='form__input' id='user-email' type='email' name='email' required/>
        <span className='form__error'></span>
        <label className='form__label' htmlFor='user-password'>Пароль</label>
        <input 
          className='form__input' 
          id='user-password' 
          type='password' 
          name='password'
          minLength='2' 
          required
        />
        <span className='form__error'></span>
        <button className='form__submit form__submit_type_login' type='submit' disabled={ !isValid }>Войти</button>
        <p className='form__text'>Ещё не зарегистрированы? <Link className='form__link' to='/signup'>Регистрация</Link></p>
      </form>
    </main>
  );
};

export default Login;
