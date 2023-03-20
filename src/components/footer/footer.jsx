import iconFacebook from '../../assets/svg/icon-facebook.svg';
import iconInstagram from '../../assets/svg/icon-instagram.svg';
import iconLinkedin from '../../assets/svg/icon-linkedin.svg';
import iconVk from '../../assets/svg/icon-vk.svg';

import './footer.scss';

function Footer() {
  return (
    <footer className='footer '>
      <div className='container'>
        {/* <div className="line"></div> */}
        <hr className='line' />
        <div className='footer__wrap'>
          <p className='footer__text'>© 2020-2023 Cleverland. Все права защищены.</p>
          <div className='footer__item'>
            <a className='footer__link' href='#section'>
              <img src={iconFacebook} alt='facebook' />
            </a>
            <a className='footer__link' href='#section'>
              <img src={iconInstagram} alt='instagram' />
            </a>
            <a className='footer__link' href='#section'>
              <img src={iconVk} alt='vk' />
            </a>
            <a className='footer__link' href='#section'>
              <img src={iconLinkedin} alt='linkedin' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export { Footer };
