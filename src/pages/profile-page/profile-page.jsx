import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Profile } from '../../components/profile';
import { Sidebar } from '../../components/sidebar';
import { ToastError } from '../../components/toast-error';
import { fetchUser, getPosts } from '../../store/features/post/post-slice';

import './profile-page.scss';

function ProfilePage({
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
  const { isErrorUser } = useSelector((state) => state.post);
  const bookPageSidebar = true;
  const [isModalErrorActive, setModalErrorActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isErrorUser) {
      setModalErrorActive(true);
    } else {
      setModalErrorActive(false);
    }
  }, [isErrorUser]);
  useEffect(() => {
    dispatch(getPosts());
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className='wrapper' role='button' tabIndex={0} onKeyDown={handleClickModal} onClick={handleClickModal}>
      <Header message='Личный кабинет' onClick={handleClickHide} location={location} />

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

          {isModalErrorActive && (
            <ToastError
              message='Что-то пошло не так. Обновите страницу через некоторое время.'
              close={() => setModalErrorActive(false)}
            />
          )}
          {isErrorUser ? null : <Profile />}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export { ProfilePage };
