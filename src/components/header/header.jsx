import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import avatarCat from '../../assets/img/avatar_cat.png';
import mainLogo from '../../assets/svg/logo.svg';

import './header.scss';

function Header({ onClick, location, message }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.post);

  const exit = () => {
    localStorage.setItem('token', false);
    window.location.assign('./');
    navigate('/auth');
  };

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrap'>
          <div className='header__item '>
            <Link to='/books/all' className='header__logo'>
              <img src={mainLogo} alt='logo' />
            </Link>
            <button
              data-test-id='button-burger'
              type='button'
              className={`hamburger ${location ? 'hamburger-close' : ''}`}
              onClick={onClick}
              aria-label='Бургер меню'
            />
            <h1 className='header__title'>{message ? message : 'Библиотека'}</h1>
          </div>
          <div className='header__item header__item_avatar'>
            <span className='header__span'>Привет, {user?.firstName}!</span>
            <img className='header__img' src={user.avatar ? `${user.avatar}` : avatarCat} alt='' />
            <div className='user-navigation'>
              <div data-test-id='profile-button'>
                <Link to='/profile'>Профиль</Link>
              </div>
              <div>
                <Link onClick={exit} to='/auth'>
                  Выход
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export { Header };
