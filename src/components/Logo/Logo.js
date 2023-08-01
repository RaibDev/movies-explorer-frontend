import './Logo.css';
import logo from '../../images/logo.png';

const Logo = () => {
  return (
    <img className='logo' src={logo} alt='Логотип'/>
  );
}

export default Logo;