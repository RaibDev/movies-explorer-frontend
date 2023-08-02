import { Link } from 'react-router-dom';

import './Menu.css';

const Menu = ({ isOpen, onClose }) => {

  return (
    <nav className={`menu ${ isOpen ? 'menu_type_active' : '' }`}>
      <div className='blur' />
      <ul className='menu__links'>
        <li className='menu__link'><Link className='menu__link-el' to='/'>Главная</Link></li>
        <li className='menu__link'><Link className='menu__link-el' to='/movies'>Фильмы</Link></li>
        <li className='menu__link'><Link className='menu__link-el' to='/saved-movies'>Сохранённые фильмы</Link></li>
        <li className='menu__link'><Link className='menu__link-el menu__link-el_type_back' to='/profile'>Аккаунт</Link></li>
      </ul>
      <button className='close-btn' type='button' onClick={ onClose }>+</button>
    </nav>
  );
};

export default Menu;