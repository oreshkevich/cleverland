import React from 'react';

import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Main } from '../../components/main';
import { Sidebar } from '../../components/sidebar';
import { Spinner } from '../../components/spinner/spinner';
import { Toast } from '../../components/toast';

import './main-page.scss';

function MainPage({
  onClick,
  location,
  clickHide,
  clickHideMenu,
  onShow,
  categories,
  posts,
  isLoadingBook,
  loadingCategories,
  isActiveColor,
  handleClickHide,
  handleClickModal,
  isErrorBook,
  handleMenuToggle,
  isActiveMenuToggle,
}) {
  const arrDate = [...posts];
  const arrDateSort = arrDate.sort((a, b) => (+a.rating > +b.rating ? -1 : 1));

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <React.Fragment>
      {isLoadingBook && loadingCategories ? (
        <Spinner />
      ) : (
        <div className='wrapper' role='button' tabIndex={0} onKeyDown={handleClickModal} onClick={handleClickModal}>
          <Header onClick={handleClickHide} location={location} handleMenuToggle={handleMenuToggle} />

          {isErrorBook && <Toast />}

          <main className='content'>
            <div className='container '>
              <div className='grid'>
                <Sidebar
                  onClick={onClick}
                  location={location}
                  clickHideMenu={clickHideMenu}
                  clickHide={clickHide}
                  onShow={onShow}
                  categories={categories}
                  isActiveColor={isActiveColor}
                  isActiveMenuToggle={isActiveMenuToggle}
                />

                <Main
                  categories={categories}
                  arrDateSort={arrDateSort}
                  loadingCategories={loadingCategories}
                  isLoadingBook={isLoadingBook}
                />
              </div>
            </div>
          </main>

          <Footer />
        </div>
      )}
    </React.Fragment>
  );
}

export { MainPage };
