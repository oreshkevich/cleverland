import { useEffect, useState } from 'react';

import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Sidebar } from '../../components/sidebar';
import { ToastError } from '../../components/toast-error';

import './not-found.scss';

function NotFound({
  onClick,
  location,
  clickHideMenu,
  onShow,
  handleClickHide,
  handleClickModal,
  isErrorBook,
  isActiveMenuToggle,
}) {
  const [isModalErrorActive, setModalErrorActive] = useState(false);

  useEffect(() => {
    if (isErrorBook) {
      setModalErrorActive(true);
    } else {
      setModalErrorActive(false);
    }
  }, [isErrorBook]);

  return (
    <div className='wrapper' role='button' tabIndex={0} onKeyDown={handleClickModal} onClick={handleClickModal}>
      <Header onClick={handleClickHide} location={location} />

      {isModalErrorActive && (
        <ToastError
          message='Что-то пошло не так. Обновите страницу через некоторое время.'
          close={() => setModalErrorActive(false)}
        />
      )}
      <main className='content'>
        <div className='container '>
          {location ? (
            <Sidebar
              onClick={onClick}
              location={location}
              clickHideMenu={clickHideMenu}
              onShow={onShow}
              isActiveMenuToggle={isActiveMenuToggle}
            />
          ) : null}

          <h2 className='not-found'>Page not found</h2>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export { NotFound };
