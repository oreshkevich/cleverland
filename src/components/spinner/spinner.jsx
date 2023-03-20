import { ReactComponent as Loader } from '../../assets/svg/louding.svg';

import './spinner.scss';

function Spinner() {
  return (
    <div className='modal-spinner' data-test-id='loader'>
      <Loader />
    </div>
  );
}

export { Spinner };
