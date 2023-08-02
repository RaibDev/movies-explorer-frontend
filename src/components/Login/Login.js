import { Link } from 'react-router-dom';

import './Login.css';
import Logo from '../Logo/Logo';

const Login = () => {
  return (
    <main className='auth-page' aria-label='Форма входа'>
      <Link className='auth-page__link' to='/'><Logo /></Link>
      <h3 className='auth-page__title'>Рады видеть!</h3>
      <form className='form'>
        <label className='form__label' htmlFor='user-email'>E-mail</label>
        <input className='form__input' id='user-email' type='email' name='email' required/>
        <span className='form__error'></span>
        <label className='form__label' htmlFor='user-password'>Пароль</label>
        <input className='form__input' id='user-password' type='password' name='password' required/>
        <span className='form__error'></span>
        <button className='form__submit form__submit_type_login' type='submit'>Войти</button>
        <p className='form__text'>Ещё не зарегистрированы? <Link className='form__link' to='/signup'>Регистрация</Link></p>
      </form>
    </main>
  );
};

export default Login;
