import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <section className='footer'>
      <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__copyright'>
        <p className='footer__year'>&copy; {new Date().getFullYear()}</p>
        <div className='footer__links'>
          <Link className='footer__link' rel="noreferrer" to='https://practicum.yandex.ru/' target='_blank'>Яндекс.Практикум</Link>
          <Link className='footer__link' rel="noreferrer" to='https://github.com/RaibDev' target='_blank'>Github</Link>
        </div>
      </div>
    </section>
  );
} ;

export default Footer;
