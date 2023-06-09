import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { BookItem } from '../../components/book-item';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Sidebar } from '../../components/sidebar';
import { ToastError } from '../../components/toast-error';

import './book-page.scss';

function BookPage({
  onClick,
  location,
  clickHideMenu,
  onShow,
  clickHide,
  categories,
  handleClickHide,
  handleClickModal,
  isActiveMenuToggle,
}) {
  const { error } = useSelector((state) => state.book);
  const bookPageSidebar = true;
  const [isModalErrorActive, setModalErrorActive] = useState(false);

  useEffect(() => {
    if (error) {
      setModalErrorActive(true);
    } else {
      setModalErrorActive(false);
    }
  }, [error]);

  return (
    <div className='wrapper' role='button' tabIndex={0} onKeyDown={handleClickModal} onClick={handleClickModal}>
      <Header onClick={handleClickHide} location={location} />

      <main className='content'>
        <div className='book-list'>
          <Sidebar
            onClick={onClick}
            location={location}
            clickHideMenu={clickHideMenu}
            onShow={onShow}
            clickHide={clickHide}
            categories={categories}
            bookPageSidebar={bookPageSidebar}
            isActiveMenuToggle={isActiveMenuToggle}
          />
          {error ? (
            <React.Fragment>
              {isModalErrorActive && (
                <ToastError
                  message='Что-то пошло не так. Обновите страницу через некоторое время.'
                  close={() => setModalErrorActive(false)}
                />
              )}
              <div className='book-list__nav '>
                <div className='container'>
                  <span className='book-list__page'>Бизнес книги</span>
                  <span className='book-list__span'> / </span>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <BookItem />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export { BookPage };
