import { Link } from 'react-router-dom';

import './NavTab.css';
import Logo from '../Logo/Logo';

const NavTab = () => {
  return (
    <header className='nav-tab' aria-label='навигация авторизации'>
      <Logo />
      <nav className='nav-tab__links'>
        <Link className='nav-tab__link' to='/signup'>Регистрация</Link>
        <Link className='nav-tab__button' to='/signin'>Войти</Link>
      </nav>
    </header>
  );
};

export default NavTab;