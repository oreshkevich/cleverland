import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Auth } from '../pages/auth';
import { BookPage } from '../pages/book';
import { MainPage } from '../pages/main';
import { NotFound } from '../pages/not-found';
import { OfferPage } from '../pages/offer-page';
import { Protected } from '../pages/protected';
import { RecoverPassword } from '../pages/recover-password';
import { Registration } from '../pages/registration';
import { TermsOfUse } from '../pages/terms-of-use';
import { getCategories } from '../store/features/category/category-slice';
import { getPosts } from '../store/features/post/post-slice';

function App() {
  const dispatch = useDispatch();
  const { categories, loadingCategories } = useSelector((state) => state.category);
  const { posts, isLoadingBook, isErrorBook, bookings, bookingsChange, bookingsDelete } = useSelector(
    (state) => state.post
  );
  const [location, setLocation] = useState(false);
  const [onShow, setOnShow] = useState(false);

  const handleClickHide = () => {
    setLocation((prevValue) => !prevValue);
  };

  const handleClickModal = (event) => {
    if (event.target.classList.contains('hamburger') || event.target.classList.contains('overlay')) {
      setLocation(!location);
    }
  };
  const [isActiveMenuToggle, setActiveMenuToggle] = useState(true);
  const handleMenuToggle = () => {
    setActiveMenuToggle(!isActiveMenuToggle);
  };

  const isActiveColor = posts.length > 0 ? true : false;

  const clickHide = () => {
    setOnShow(!onShow);
  };

  const clickHideMenu = () => {
    setOnShow(true);
  };
  const tokenLocalStorage = localStorage.getItem('token');
  let token;

  if (tokenLocalStorage === 'false') {
    token = false;
  } else {
    token = tokenLocalStorage;
  }
  useEffect(() => {
    if (token) {
      dispatch(getCategories());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token) {
      dispatch(getPosts());
    }
  }, [dispatch, token, bookings, bookingsChange, bookingsDelete]);

  useSelector((state) => state.authorization);

  return (
    <HashRouter basename='/'>
      <Routes>
        <Route path='/' element={token ? <Navigate to='/books/all' /> : <Navigate to='/auth' />} />
        <Route path='/registration' element={token ? <Navigate to='/books/all' /> : <Registration />} />
        <Route path='/auth' element={token ? <Navigate to='/books/all' /> : <Auth />} />

        <Route path='/forgot-pass' element={token ? <Navigate to='/books/all' /> : <RecoverPassword />} />
        <Route element={<Protected />}>
          <Route path='/books' element={<Navigate to='/books/all' />} />
          <Route
            path='/books/:name'
            element={
              <MainPage
                onClick={handleClickHide}
                clickHide={clickHide}
                clickHideMenu={clickHideMenu}
                onShow={onShow}
                location={location}
                categories={categories}
                posts={posts}
                isLoadingBook={isLoadingBook}
                loadingCategories={loadingCategories}
                isActiveColor={isActiveColor}
                handleClickModal={handleClickModal}
                isErrorBook={isErrorBook}
                handleMenuToggle={handleMenuToggle}
                isActiveMenuToggle={isActiveMenuToggle}
              />
            }
          />
          <Route
            path='/books/:name/:id'
            element={
              <BookPage
                onClick={handleClickHide}
                location={location}
                clickHide={clickHide}
                clickHideMenu={clickHideMenu}
                onShow={onShow}
                categories={categories}
                handleClickModal={handleClickModal}
                isErrorBook={isErrorBook}
                handleMenuToggle={handleMenuToggle}
                isActiveMenuToggle={isActiveMenuToggle}
              />
            }
          />
          <Route
            path='/terms'
            element={
              <TermsOfUse
                onClick={handleClickHide}
                location={location}
                clickHideMenu={clickHideMenu}
                onShow={onShow}
                clickHide={clickHide}
                handleClickModal={handleClickModal}
                isErrorBook={isErrorBook}
                categories={categories}
                handleMenuToggle={handleMenuToggle}
                isActiveMenuToggle={isActiveMenuToggle}
              />
            }
          />
          <Route
            path='/offer'
            element={
              <OfferPage
                onClick={handleClickHide}
                location={location}
                clickHideMenu={clickHideMenu}
                onShow={onShow}
                clickHide={clickHide}
                handleClickModal={handleClickModal}
                isErrorBook={isErrorBook}
                categories={categories}
                handleMenuToggle={handleMenuToggle}
                isActiveMenuToggle={isActiveMenuToggle}
              />
            }
          />
        </Route>
        <Route path='*' element={<NotFound onClick={handleClickHide} location={location} />} />
      </Routes>
    </HashRouter>
  );
}

export { App };
