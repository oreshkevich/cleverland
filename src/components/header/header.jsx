import { Link } from 'react-router-dom';

import avatar from '../../assets/img/avatar.png';
import mainLogo from '../../assets/svg/logo.svg';

import './header.scss';

function Header({ onClick, location, handleMenuToggle }) {
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrap'>
          <div className='header__item '>
            <Link to='/' className='header__logo'>
              <img src={mainLogo} alt='logo' />
            </Link>
            <button
              data-test-id='button-burger'
              type='button'
              className={`hamburger ${location ? 'hamburger-close' : ''}`}
              onClick={onClick}
              aria-label='Бургер меню'
            />
            <h1 className='header__title'>Библиотека</h1>
          </div>
          <div
            className='header__item header__item_avatar'
            role='button'
            tabIndex={0}
            onKeyDown={handleMenuToggle}
            onClick={handleMenuToggle}
          >
            <span className='header__span'>Привет, Иван!</span>
            <img className='header__img' src={avatar} alt='avatar' />
          </div>
        </div>
      </div>
    </header>
  );
}
export { Header };
