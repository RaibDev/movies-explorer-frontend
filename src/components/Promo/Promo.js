import './Promo.css';
import promoImg from '../../images/main.png';

const Promo = () => {
  return (
    <section className='promo' aria-label='О проекте'>
      <div className='promo__info'>
        <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
        <p className='promo__text'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <button className='promo__button' type='button'>Узнать больше</button>
      </div>
      <img src={ promoImg } className='promo__image' alt='стилизация' />
    </section>
  );
};

export default Promo;