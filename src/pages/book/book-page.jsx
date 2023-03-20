import React from 'react';
import { useSelector } from 'react-redux';

import { BookItem } from '../../components/book-item';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Sidebar } from '../../components/sidebar';
import { Toast } from '../../components/toast';

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
  handleMenuToggle,
  isActiveMenuToggle,
}) {
  const { error } = useSelector((state) => state.book);
  const bookPageSidebar = true;

  return (
    <div className='wrapper' role='button' tabIndex={0} onKeyDown={handleClickModal} onClick={handleClickModal}>
      <Header onClick={handleClickHide} location={location} handleMenuToggle={handleMenuToggle} />

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
              <Toast />
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
