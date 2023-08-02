import { Link } from "react-router-dom";

import { userData } from '../../utils/constants';
import './AboutMe.css';

const AboutMe = () => {
  return (
    <section className='about-me' aria-label='О студенте'>
          <h3 className='title'>Студент</h3>
          <div className='about-me__info'>
            <div className='about-me__text'>
              <h2 className='about-me__name'>{userData.name }</h2>
              <h4 className='about-me__profession'>{userData.prof }</h4>
              <p className='about-me__about'>{userData.about }</p>
              <Link className='about-me__link' to='https://github.com/RaibDev' target='_blank'>Github</Link>
            </div>
            <img className='about-me__img' src={ userData.photo } alt={ userData.name }/>
          </div>
        </section>
  );
};

export default AboutMe;