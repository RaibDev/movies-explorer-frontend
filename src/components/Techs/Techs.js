
import './Techs.css';

const Techs = () => {
  return (
    <section className='techs' aria-label='Список технологий'>
      <h3 className='title'>Технологии</h3>
      <h2 className='techs__title'>7 технологий</h2>
      <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className='instruments'>
        <li className='instrument'>HTML</li>
        <li className='instrument'>CSS</li>
        <li className='instrument'>JS</li>
        <li className='instrument'>React</li>
        <li className='instrument'>Git</li>
        <li className='instrument'>Express.js</li>
        <li className='instrument'>mongoDB</li>
      </ul>
    </section>
  );
};

export default Techs;