import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className='not-found-page'>
      <div className='not-found-page__container'>
        <h4 className='not-found-page__title'>404</h4>
        <p className='not-found-page__text'>Страница не найдена</p>
      </div>
      <Link to='/' className='not-found-page__btn'>Назад</Link>
    </main>
  );
};

export default NotFound;
