import { useEffect, useState } from 'react';

import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Offer } from '../../components/offer';
import { Sidebar } from '../../components/sidebar';
import { ToastError } from '../../components/toast-error';

function OfferPage({
  onClick,
  location,
  clickHideMenu,
  onShow,
  clickHide,
  handleClickHide,
  handleClickModal,
  isErrorBook,
  categories,
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
          <div className='grid'>
            <Sidebar
              onClick={onClick}
              location={location}
              clickHideMenu={clickHideMenu}
              onShow={onShow}
              clickHide={clickHide}
              categories={categories}
              isActiveMenuToggle={isActiveMenuToggle}
            />
            <Offer />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export { OfferPage };
