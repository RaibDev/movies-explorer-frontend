import { Link } from "react-router-dom";

import './Portfolio.css';
import portfolioIcon from '../../images/portfolio-icon.svg';

const Portfolio = () => {
  return (
    <section className='portfolio' aria-label='Портфолио'>
      <h5 className='portfolio__title'>Портфолио</h5>
      <ul className='portfolio__links'>
        <li className='portfolio__box'>
          <Link className='portfolio__link' to='https://github.com/RaibDev/how-to-learn' target='_blank'>
            <p className='portfolio__link-text'>Статичный сайт</p>
            <img src={ portfolioIcon } className='portfolio__icon' alt='Иконка ссылки статичного сайта' />
          </Link>
        </li>
        <li className='portfolio__box'>
          <Link className='portfolio__link' to='https://github.com/RaibDev/russian-travel' target='_blank'>
            <p className='portfolio__link-text'>Адаптивный сайт</p>
            <img src={ portfolioIcon } className='portfolio__icon' alt='Иконка ссылки адаптивного сайта' />
          </Link>
        </li>
        <li className='portfolio__box'>
          <Link className='portfolio__link' to='https://github.com/RaibDev/mesto-react' target='_blank'>
            <p className='portfolio__link-text'>Одностраничное приложение</p>
            <img src={ portfolioIcon } className='portfolio__icon' alt='Иконка ссылки одностраничного приложения' />
          </Link>  
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;