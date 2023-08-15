import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className='about' aria-label='Немного об этапах'>
      <h3 className='title'>О проекте</h3>
      <div className='about__info'>
        <div className='about__box'>
          <h4 className='about__title'>Дипломный проект включал 5 этапов</h4>
          <p className='about__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='about__box'>
          <h4 className='about__title'>На выполнение диплома ушло 5 недель</h4>
          <p className='about__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='about__graph'>
        <div className='about__front'>
          <span className='about__graph-elem about__graph-elem_type_dark'>1 неделя</span>
          <p className='about__education'>Back-end</p>
        </div>
        <div className='about__back'>
          <span className='about__graph-elem'>4 недели</span>
          <p className='about__education'>Front-end</p>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;