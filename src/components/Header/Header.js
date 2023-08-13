import { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';

import './Header.css';

const Header = ({ loggedIn }) => {

  const [ isMenuOpen, setIsMenuOpen ] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <>
      <section className={`header ${loggedIn ? 'header_type_loggedIn' : ''}`}>
        <nav className='navigation'>
          <Link to='/'><Logo /></Link>
          <Link className='nav-link nav-link_type_first' to='/movies'>Фильмы</Link>
          <Link className='nav-link' to='/saved-movies'>Сохранённые фильмы</Link>
        </nav>
        <Link className={`nav-link nav-link_type_back ${ loggedIn ? 'nav-link_type_loggedIn' : '' }`} to='/profile'>Аккаунт</Link>
        <button className={`burger ${ loggedIn ? 'burger_type_loggedIn' : '' }`} type='button' onClick={ handleMenuClick }></button>
      </section>
      <Menu isOpen={ isMenuOpen } onClose={ closeMenu } />
    </>
  );
};

export default Header;
