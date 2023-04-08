import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Main } from '../../components/main';
import { Sidebar } from '../../components/sidebar';
import { Spinner } from '../../components/spinner/spinner';
import { ToastError } from '../../components/toast-error';
import { fetchUser, getPosts } from '../../store/features/post/post-slice';

import './main-page.scss';

function MainPage({
  onClick,
  location,
  clickHide,
  clickHideMenu,
  onShow,
  categories,
  //   posts,
  //   isLoadingBook,
  loadingCategories,
  isActiveColor,
  handleClickHide,
  handleClickModal,
  //   isErrorBook,
  isActiveMenuToggle,
  token,
}) {
  const { posts, isLoadingBook, isErrorBook, bookings, bookingsChange, bookingsDelete } = useSelector(
    (state) => state.post
  );
  const arrDate = [...posts];
  const arrDateSort = arrDate.sort((a, b) => (+a.rating > +b.rating ? -1 : 1));
  const [isModalErrorActive, setModalErrorActive] = useState(false);
  const dispatch = useDispatch();
  //   const { categories, loadingCategories } = useSelector((state) => state.category);

  useEffect(() => {
    if (isErrorBook) {
      setModalErrorActive(true);
    } else {
      setModalErrorActive(false);
    }
  }, [isErrorBook]);
  useEffect(() => {
    if (token) {
      dispatch(getPosts());
      dispatch(fetchUser());
    }
  }, [dispatch, token, bookings, bookingsChange, bookingsDelete]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <React.Fragment>
      {isLoadingBook && loadingCategories ? (
        <Spinner />
      ) : (
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
