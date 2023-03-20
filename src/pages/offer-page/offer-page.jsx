import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Offer } from '../../components/offer';
import { Sidebar } from '../../components/sidebar';
import { Toast } from '../../components/toast';

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
  handleMenuToggle,
  isActiveMenuToggle,
}) {
  return (
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
