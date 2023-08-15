import React from 'react';
import { useNavigate } from 'react-router-dom';

import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className='not-found-page'>
      <div className='not-found-page__container'>
        <h4 className='not-found-page__title'>404</h4>
        <p className='not-found-page__text'>Страница не найдена</p>
      </div>
      <button to='/' className='not-found-page__btn' onClick={ () => navigate(-1) }>Назад</button>
    </main>
  );
};

export default NotFound;
