
import './Main.css';
import NavTab from '../NavTab/NavTab';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Header from '../Header/Header';

const Main = ({ loggedIn }) => {
  return (
    <>
      { loggedIn ? <Header loggedIn={ loggedIn }/> : <NavTab /> }
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
    </>
  );
}

export default Main;