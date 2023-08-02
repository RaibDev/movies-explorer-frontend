import { Link } from 'react-router-dom';

import './Register.css'
import Logo from '../Logo/Logo';

const Register = () => {
  return (
    <main className='auth-page' aria-label='Форма регистрации'>
      <Link className='auth-page__link' to='/'><Logo /></Link>
      <h3 className='auth-page__title'>Добро пожаловать!</h3>
      <form className='form'>
        <label className='form__label' htmlFor='user-name'>Имя</label>
        <input className='form__input' id='user-name' name='name' required/>
        <span className='form__error'></span>
        <label className='form__label' htmlFor='user-email'>E-mail</label>
        <input className='form__input' id='user-email' type='email' name='email' required/>
        <span className='form__error'></span>
        <label className='form__label' htmlFor='user-password'>Пароль</label>
        <input className='form__input' id='user-password' type='password' name='password' required/>
        <span className='form__error'></span>
        <button className='form__submit form__submit_type_register' type='submit'>Зарегистрироваться</button>
        <p className='form__text'>Уже зарегистрированы? <Link className='form__link' to='/signin'>Войти</Link></p>
      </form>
    </main>
  );
};

export default Register;
